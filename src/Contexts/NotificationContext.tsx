import { FC, createContext, useContext, useEffect, useState } from "react";
import { DefaultUserContact, DefaultUserRol } from "../Data/DefaultValues";
import { IUserContact, IUserRol, IResponse, Notification, ActorNotification, CitizenNotification, FileBlob } from "../Interfaces/Data";
import { delLSData, getLSData } from "../Utils/General";
import { NotificationsAPI } from "../Services/NotificationsAPI";
import moment from "moment";
import axios, { AxiosResponse } from "axios";
import { fileTypes, getFileType } from "../Interfaces/FileTypes";
import { AuthContext } from "./AuthContext";
import { ResponseError, handleResponse } from "../Config/Axios";

const NotificationsUpdateSecondsInterval = 1000

function cleanJsonString(jsonString:string) {
  return jsonString.replace(/[\x00-\x1F\x7F-\x9F]/g, ''); // Elimina caracteres no válidos
}

const ContextValues = () => {

  const AxiosNotificationAPI = new NotificationsAPI();
  const { isLogged } = useContext(AuthContext);
   
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");
  const [userNotifications, setUserNotifications] = useState<CitizenNotification[]>([]);
  const [actorNotifications, setActorNotifications] = useState<ActorNotification[]>([]);

  const parseAttachements = (data:string) => (data?.match(/\d+/g) || []).map((e: any) => parseInt(e)).filter((e: any) => e > 0);

  const UpdateNotifications = async() => {

    setIsLoading(true)
    let responseAll:AxiosResponse | ResponseError | null = null;
    let responseNew:AxiosResponse | ResponseError | null = null;
    
    try { responseAll = await AxiosNotificationAPI.GetByUserAll(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }
    try { responseNew = await AxiosNotificationAPI.GetByUserNews(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales sin leer. Por favor, intente nuevamente mas tarde.") }

    let notificationsData = "[]";
    if(responseAll && responseAll.status!==204) notificationsData = responseAll.data.data.notifications;
    else if(responseNew && responseNew.status!==204) notificationsData = responseNew.data.data.notifications;
    
    const notificationsDataCleaned = cleanJsonString(notificationsData);
    const notificationsObj = JSON.parse(notificationsDataCleaned);

    let newNotificaionsIDs: number[] = [];
    if(responseNew && responseNew.status!==204) newNotificaionsIDs = JSON.parse(notificationsDataCleaned).map((notification:Partial<Notification>)=>notification.ID);

    const Notifications:CitizenNotification[] = notificationsObj.map((notification:Partial<Notification>)=>{

      return { 
        ID: notification.ID,
        MESSAGE_TITLE: notification.MESSAGE_TITLE,
        MESSAGE_BODY: notification.MESSAGE_BODY,
        ATTACHMENTS: parseAttachements(notification.MULTIMEDIA_ID as string),
        CREATED_AT: notification.CREATED_AT,
        TYPE: "general",
        NEW: newNotificaionsIDs.includes(notification.ID as number)
       }
    }).sort((a:CitizenNotification,b:CitizenNotification)=>(new Date(b.CREATED_AT).getTime() - new Date(a.CREATED_AT).getTime()));
    setUserNotifications(Notifications);
    setIsLoading(false); 
  }

  const ReadNotification = async (notification_id: number, setFormState: Function) => {
    try {
      setFormState(notification_id);
      const response: any = await AxiosNotificationAPI.Read({ notification_id });
      if (response.data) {
        setUserNotifications((prev) =>
          prev.map((N) =>
            N.ID === notification_id ? { ...N, NEW: false } : N
          )
        );
        setErrors("");
      } else {
        setErrors(response.message);
      }
      setFormState(0);
      return response;
    } catch (error) {
      // Maneja el error aquí según tus necesidades
      setErrors("Hubo un problema al leer la notificación. Por favor, inténtelo de nuevo más tarde.");
      setFormState(0);
      return null; // Puedes devolver null u otra cosa según sea necesario
    }
  };
  

  const CreateNotification = async (data:any, setFormState:Function) => {

    const response:AxiosResponse = await handleResponse(AxiosNotificationAPI.Create, data, setFormState);
    if(response.data) setUserNotifications(prevState => ([...prevState, data]));
    return response;

  }

  const DeleteNotification = async (notification_id:number, setFormState:Function) => {

    const response:AxiosResponse = await handleResponse(AxiosNotificationAPI.Delete, {notification_id}, setFormState);
    if(response.data){
      setActorNotifications(prev => prev.map(N => N.ID === notification_id ? { ...N, DELETED_AT: "now" } : N));
      //setUserNotifications(prevState => ([...prevState, data]));
    }
    return response;

  }

  const GetScopeByID = async (notification_id:number, setFormState:Function) => {
    setFormState(true);
    try {
    const response:AxiosResponse = await AxiosNotificationAPI.GetScopeByID({ notification_id });
    if(response.data){
      //setUserNotifications(prevState => ([...prevState, data]));
    }
    setFormState(false);
    return response;

  } catch (error) {
    setFormState(false);
    console.error('Error al obtener los datos:', error);
    //throw error;
  }
  }

  const GetAllNotifications = async (notification_rows:number, setNotificationsNumber:Function) => {

    setIsLoading(true)
    /*let value=0
    if (notification_rows!=0){
      value=notification_rows+1
    }*/
    const jsonObject = {
      notification_rows: notification_rows
    };
    let responseAll:AxiosResponse | ResponseError | null = null;
    
    try { responseAll = await AxiosNotificationAPI.GetAll(jsonObject); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }

    let notificationsData = "[]";
    if(responseAll && responseAll.status!==204) notificationsData = responseAll.data.data.notifications;

    const notificationsDataCleaned = cleanJsonString(notificationsData);
    const Notifications:ActorNotification[] = JSON.parse(notificationsDataCleaned).map((notification:Partial<Notification>)=>{
      //console.log(notification)
      return { 
        ID: notification.ID,
        MESSAGE_TITLE: notification.MESSAGE_TITLE,
        MESSAGE_BODY: notification.MESSAGE_BODY,
        ATTACHMENTS: parseAttachements(notification.MULTIMEDIA_ID as string),
        CREATED_AT: notification.CREATED_AT,
        DELETED_AT: notification.DELETED_AT,
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


    console.log(JSON.stringify(Notifications))
    setActorNotifications((prevNotifications) => [...prevNotifications, ...Notifications]);
    setNotificationsNumber(notification_rows+21)
    setIsLoading(false);
  }

  const GetScope = async (data:any, setFormState:Function) => await handleResponse(AxiosNotificationAPI.GetScope, data, setFormState);


  const GetAttachments = async (data:any, setFormState:Function) => {

    setFormState(true);
    const FileIds:number[] = data;

    try {
      const promises = FileIds.map(async (id) => {
        const response = await AxiosNotificationAPI.GetAttachment({ multimedia_id: id });
        const response2 = await AxiosNotificationAPI.GetAttachmentName({ multimedia_id: id });
        const reader = new FileReader();
  
        return new Promise<FileBlob>((resolve, reject) => {
          reader.onloadend = () => {
            const imageDataURL = reader.result as string;
            const filefile = response2.data.data.attachment_name;
            const filext = filefile.split(".");
            const data:FileBlob = {
              name: filefile,
              type: filext[1],
              data: imageDataURL.replace('text/html', getFileType(filext[1]).fulltype),
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

  useEffect(() => {
    if(isLogged){ UpdateNotifications() }
  }, [isLogged])

  return {
    UpdateNotifications, ReadNotification, errors,
    isLoading, userNotifications, actorNotifications,
    setUserNotifications, GetScope, GetAttachments, GetScopeByID,
    CreateNotification, GetAllNotifications, DeleteNotification,
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