import { FC, createContext, useState } from "react";
import { DefaultUserContact, DefaultUserNotification, DefaultUserRol } from "../Data/DefaultValues";
import { IUserContact, IUserNotification, IUserRol, IResponse } from "../Interfaces/Data";
import { delLSData } from "../Utils/General";
import { NotificationsAPI } from "../Services/NotificationsAPI";



const ContextValues = () => {

  const AxiosNotificationAPI = new NotificationsAPI();
   
  const [userNotifications, setUserNotifications] = useState<IUserNotification[]>([]);

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

  const UpdateNotification = async (data:any, setFormState:Function) => {
    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:IResponse | any = await AxiosNotificationAPI.Get(data);
    setUserNotifications(prevState => {
      const index = prevState.findIndex(x => x.ID === data.ID);
      prevState[index] = data;
      return prevState;
    });
  }

  return {
    userNotifications
    ,setUserNotifications
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