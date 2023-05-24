import { FC, createContext, useContext, useEffect, useState } from "react";
import { DefaultUserContact, DefaultUserRol } from "../Data/DefaultValues";
import { IUserContact, IUserRol, IResponse, Notification, ActorNotification, CitizenNotification, FileBlob } from "../Interfaces/Data";
import { delLSData, getLSData } from "../Utils/General";
import { NotificationsAPI } from "../Services/NotificationsAPI";
import moment from "moment";
import axios, { AxiosResponse } from "axios";
import { fileTypes } from "../Interfaces/FileTypes";
import { AuthContext } from "./AuthContext";
import { ResponseError, handleResponse } from "../Config/Axios";

const NotificationsUpdateSecondsInterval = 1000

const ContextValues = () => {

  const AxiosNotificationAPI = new NotificationsAPI();
  const { isLogged } = useContext(AuthContext);
   
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");
  const [userNotifications, setUserNotifications] = useState<CitizenNotification[]>([]);
  const [actorNotifications, setActorNotifications] = useState<ActorNotification[]>([]);


  const UpdateNotifications = async() => {

    setIsLoading(true)
    let responseAll:AxiosResponse | ResponseError | null = null;
    let responseNew:AxiosResponse | ResponseError | null = null;
    
    try { responseAll = await AxiosNotificationAPI.GetByUserAll(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }
    try { responseNew = await AxiosNotificationAPI.GetByUserNews(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales sin leer. Por favor, intente nuevamente mas tarde.") }

    let notificationsData = "[]";
    if(responseAll && responseAll.status!==204) notificationsData = responseAll.data.data.notifications;
    else if(responseNew && responseNew.status!==204) notificationsData = responseNew.data.data.notifications;
    const notificationsObj = JSON.parse(notificationsData);

    let newNotificaionsIDs: number[] = [];
    if(responseNew && responseNew.status!==204) newNotificaionsIDs = JSON.parse(responseNew.data.data.notifications).map((notification:Partial<Notification>)=>notification.ID);

    const Notifications:CitizenNotification[] = notificationsObj.map((notification:Partial<Notification>)=>{
      return { 
        ID: notification.ID,
        MESSAGE_TITLE: notification.MESSAGE_TITLE,
        MESSAGE_BODY: notification.MESSAGE_BODY,
        ATTACHMENTS: notification.MULTIMEDIA_ID!=""?[{
          ID: notification.MULTIMEDIA_ID,
          type: notification.ATTACHMENT_TYPE
        }]:[],
        CREATED_AT: notification.CREATED_AT,
        TYPE: "general",
        NEW: newNotificaionsIDs.includes(notification.ID as number)
       }
    }).sort((a:CitizenNotification,b:CitizenNotification)=>(new Date(b.CREATED_AT).getTime() - new Date(a.CREATED_AT).getTime()));
    console.log(Notifications)
    setUserNotifications(Notifications);
    setIsLoading(false); 
  }

  const ReadNotification = async (notification_id:number, setFormState:Function) => {
    setFormState(notification_id);
    const response:any = await AxiosNotificationAPI.Read({notification_id});
    if(response.data){
      setUserNotifications(prev => prev.map(N => N.ID === notification_id ? { ...N, NEW: false } : N));
      setErrors("");
    } else {
      setErrors(response.message);
    }
    setFormState(0);
    return response;
  }

  const CreateNotification = async (data:any, setFormState:Function) => {

    const response:AxiosResponse = await handleResponse(AxiosNotificationAPI.Create, data, setFormState);
    if(response.data) setUserNotifications(prevState => ([...prevState, data]));
    return response;

  }

  const GetAllNotifications = async () => {

    setIsLoading(true)
    let responseAll:AxiosResponse | ResponseError | null = null;
    
    try { responseAll = await AxiosNotificationAPI.GetAll(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }

    let notificationsData = "[]";
    if(responseAll && responseAll.status!==204) notificationsData = responseAll.data.data.notifications;

    const Notifications:ActorNotification[] = JSON.parse(notificationsData).map((notification:Partial<Notification>)=>{
      return { 
        ID: notification.ID,
        MESSAGE_TITLE: notification.MESSAGE_TITLE,
        MESSAGE_BODY: notification.MESSAGE_BODY,
        ATTACHMENTS: notification.MULTIMEDIA_ID!=""?[{
          ID: notification.MULTIMEDIA_ID,
          type: notification.ATTACHMENT_TYPE
        }]:[],
        CREATED_AT: notification.CREATED_AT,
        DATE_FROM: notification.NOTIFICATION_DATE_FROM,
        DATE_TO: notification.NOTIFICATION_DATE_TO,
        AGE_FROM: notification.AGE_FROM,
        AGE_TO: notification.AGE_TO,
        LOCALITY: notification.LOCALITY,
        DEPARTMENT: notification.DEPARTMENT,
        RECIPIENTS: notification.RECIPIENTS,
        TYPE: "general"
       }
    }).sort((a:CitizenNotification,b:CitizenNotification)=>(new Date(b.CREATED_AT).getTime() - new Date(a.CREATED_AT).getTime()));
    setActorNotifications(Notifications);
    setIsLoading(false);
  }

  const GetScope = async (data:any, setFormState:Function) => await handleResponse(AxiosNotificationAPI.GetScope, data, setFormState);

  const GetAttachments = async (data:any, setFormState:Function) => {

    setFormState(true);
    const FileIds:{ID:number,type:string}[] = data;

    try {
      const promises = FileIds.map(async (element) => {
        const response = await AxiosNotificationAPI.GetAttachment({ multimedia_id: element.ID });
        const response2 = await AxiosNotificationAPI.GetAttachmentName({ multimedia_id: element.ID });
        const reader = new FileReader();
  
        return new Promise<FileBlob>((resolve, reject) => {
          reader.onloadend = () => {
            console.log(element);
            const imageDataURL = reader.result as string;
            const data:FileBlob = {
              name: response2.data.data.attachment_name,
              type: element.type,
              data: imageDataURL.replace('text/html', fileTypes[element.type].fulltype),
            };
            resolve(data);
          };
  
          reader.onerror = reject;
  
          reader.readAsDataURL(response.data.data);
        });
      });
  
      const responses:FileBlob[] = await Promise.all(promises);
  
      setFormState(false);
  
      return responses;


    } catch (error) {
      setFormState(false);
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }




  /*
  
    
  
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('test')
    }, NotificationsUpdateSecondsInterval);
  
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);*/

  useEffect(() => {
    console.log(isLogged)
    if(isLogged){ UpdateNotifications() }
  }, [isLogged])

  return {
    UpdateNotifications, ReadNotification, errors,
    isLoading, userNotifications, actorNotifications,
    setUserNotifications, GetScope, GetAttachments,
    CreateNotification, GetAllNotifications,
  }
}

export const NotificationsContext = createContext({} as ReturnType<typeof ContextValues>);

const NotificationsContextProvider: FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <NotificationsContext.Provider value={ContextValues()}>
      {props.children}
    </NotificationsContext.Provider>
  );
}

export default NotificationsContextProvider;