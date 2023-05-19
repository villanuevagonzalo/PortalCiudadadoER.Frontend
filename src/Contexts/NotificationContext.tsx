import { FC, createContext, useEffect, useState } from "react";
import { DefaultUserContact, DefaultUserRol } from "../Data/DefaultValues";
import { IUserContact, IUserRol, IResponse, INotification, CitizenNotification } from "../Interfaces/Data";
import { delLSData } from "../Utils/General";
import { NotificationsAPI } from "../Services/NotificationsAPI";
import { async } from "q";
import { DummyNotifications } from "../Data/DummyData";
import moment from "moment";

const NotificationsUpdateSecondsInterval = 1000

const ContextValues = () => {

  const AxiosNotificationAPI = new NotificationsAPI();
   
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");
  const [userNotifications, setUserNotifications] = useState<CitizenNotification[]>([]);
  const [actorNotifications, setActorNotifications] = useState<INotification[]>(DummyNotifications);


  const UpdateNotifications = async() => {

    setIsLoading(true)
    
    const responseAll:IResponse | any = await AxiosNotificationAPI.GetByUserAll();
    const responseNew:IResponse | any = await AxiosNotificationAPI.GetByUserNews();

    if(!responseAll?.data?.success){ setErrors("ERROR LOADING 1"); setIsLoading(false); return; }
    if(!responseNew?.data?.success){ setErrors("ERROR LOADING 2"); setIsLoading(false); return; }

    const NewNotifications:number[] = JSON.parse(responseNew.data.data.notifications).map((notification:Partial<INotification>)=>notification.ID)

    const Notifications:CitizenNotification[] = JSON.parse(responseAll.data.data.notifications).map((notification:Partial<INotification>)=>{
      return { 
        ID: notification.ID,
        MESSAGE_TITLE: notification.MESSAGE_TITLE,
        MESSAGE_BODY: notification.MESSAGE_BODY,
        ATTACHMENTS: [],
        CREATED_AT: notification.CREATED_AT,
        TYPE: "general",
        NEW: NewNotifications.includes(notification.ID as number)
       }
    })

    setUserNotifications(Notifications.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.CREATED_AT).getTime() - new Date(a.CREATED_AT).getTime();
    }));
    setIsLoading(false); 
  }

  const ReadNotification = async (notification_id:number, setFormState:Function) => {
    setFormState(notification_id);
    const response:IResponse | any = await AxiosNotificationAPI.Read({notification_id});
    if(response?.data?.success){
      setUserNotifications(prev => prev.map(N => N.ID === notification_id ? { ...N, NEW: false } : N));
      setErrors("");
    } else {
      setErrors(response.message);
    }
    setFormState(0);
    return response;
  }

  const CreateNotification = async (data:any, setFormState:Function) => {
    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:IResponse | any = await AxiosNotificationAPI.Create(data);
    if(response.status){
      setUserNotifications(prevState => ([...prevState, data]));
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else {
      setFormState((prev:any) => ({ ...prev, error: response.message }));
    }
    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const GetAllNotifications = async () => {

    setIsLoading(true)
    const response:IResponse | any = await AxiosNotificationAPI.GetAll();

    if(response.data.success){ setActorNotifications(response.data) }
    else{
      setErrors("ERROR ACTOR")
    }

    setIsLoading(false)
  }

  /*useEffect(() => {
    const interval = setInterval(() => {
      console.log('test')
    }, NotificationsUpdateSecondsInterval);
  
    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);*/

  useEffect(() => {
    UpdateNotifications()
  }, [])

  return {
    UpdateNotifications, ReadNotification,
    isLoading, userNotifications, actorNotifications,
    setUserNotifications, 
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