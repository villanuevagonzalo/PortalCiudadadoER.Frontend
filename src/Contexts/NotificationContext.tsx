import { FC, createContext, useState } from "react";
import { DefaultUserContact, DefaultUserNotification, DefaultUserRol } from "../Data/DefaultValues";
import { IUserContact, IUserNotification, IUserRol, IResponse, IActorNotification } from "../Interfaces/Data";
import { delLSData } from "../Utils/General";
import { NotificationsAPI } from "../Services/NotificationsAPI";



const ContextValues = () => {

  const AxiosNotificationAPI = new NotificationsAPI();
   
  const [userNotifications, setUserNotifications] = useState<IUserNotification[]>([]);
  const [actorNotifications, setActorNotifications] = useState<IActorNotification[]>([]);

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

  const UpdateNotification = async () => {
    // setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:IResponse | any = await AxiosNotificationAPI.Get({});
    if(response.status){
      setUserNotifications(response.data);
      // setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else {
      // setFormState((prev:any) => ({ ...prev, error: response.message }));
    }
    // console.log(response)
    return response
  }

  const UpdateActorNotification = async () => {
    const response:IResponse | any = await AxiosNotificationAPI.GetActor({});
    if(response.status){
      setActorNotifications(response.data);
    } else {
      // setFormState((prev:any) => ({ ...prev, error: response.message }));
    }
    // console.log(response)
    return response
  }

  return {
    userNotifications
    ,setUserNotifications, UpdateNotification, CreateNotification, UpdateActorNotification
  }
}

export const NotificationsContext = createContext({} as ReturnType<typeof ContextValues>);

const NotificationsContextProvider: FC<{}> = (props) => {
  return (
    <NotificationsContext.Provider value={ContextValues()}>
      {props.children}
    </NotificationsContext.Provider>
  );
}

export default NotificationsContextProvider;