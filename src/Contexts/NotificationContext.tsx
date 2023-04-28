import { FC, createContext, useState } from "react";
import { DefaultUserContact, DefaultUserNotification, DefaultUserRol } from "../Data/DefaultValues";
import { IUserContact, IUserNotification, IUserRol } from "../Interfaces/Data";
import { delLSData } from "../Utils/General";



const ContextValues = () => {
   
  const [userNotifications, setUserNotifications] = useState<IUserNotification[]>([]);

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