import { FC, createContext, useEffect, useState } from "react";
import { DefaultUserContact, DefaultUserNotification, DefaultUserRol } from "../Data/DefaultValues";
import { IUserContact, IUserRol, IResponse, INotification } from "../Interfaces/Data";
import { delLSData } from "../Utils/General";
import { NotificationsAPI } from "../Services/NotificationsAPI";
import { async } from "q";
import { DummyNotifications } from "../Data/DummyData";

const NotificationsUpdateSecondsInterval = 1000

const ContextValues = () => {

  const AxiosNotificationAPI = new NotificationsAPI();
   
  const [userNotifications, setUserNotifications] = useState<INotification[]>([]);
  const [actorNotifications, setActorNotifications] = useState<INotification[]>(DummyNotifications);


  const UpdateNotifications = async() => {
    
    const response:IResponse | any = await AxiosNotificationAPI.GetByUserAll();

    if(response?.data?.success) setUserNotifications(JSON.parse(response.data.data.notifications))

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









  

  const UpdateNotificationOld = async () => {
    // setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:IResponse | any = await AxiosNotificationAPI.GetByUserNews();
    if(response.status){
      setUserNotifications(response.data);
      // setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else {
      // setFormState((prev:any) => ({ ...prev, error: response.message }));
    }
    // console.log(response)
    return response
  }


  const GetAllNotifications = async () => {

    const response:IResponse | any = await AxiosNotificationAPI.GetAll();

    if(response.data.success) setActorNotifications(response.data);

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
    UpdateNotifications,
    userNotifications, actorNotifications,
    setUserNotifications, 
    CreateNotification, GetAllNotifications,
    UpdateNotification: UpdateNotificationOld
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