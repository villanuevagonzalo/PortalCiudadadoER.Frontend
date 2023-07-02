import { useContext, useEffect, useState } from "react";
import { BiChevronsLeft, BiMenu, BiNotification, BiUserCircle } from "react-icons/bi";
import { Link, NavLink, Outlet } from "react-router-dom";
import { NotificationsContext } from "../../Contexts/NotificationContext";
import { Card, DivSubtitle, DivTitle2, NotificationCardWrapper, NotificationFullSizeWrapper } from "../Elements/StyledComponents";
import { Button } from "../Forms/Button";
import { LogoCiudadanoDigital } from "../Images/LogoCiudadanoDigital";

import { HiBellAlert } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";
import { Pages } from "../../Routes/Pages";
import { CitizenNotification, INavigation } from "../../Interfaces/Data";
import { LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../Layout/StyledComponents";

import moment from "moment";
import 'moment/locale/es';
import { AiOutlineClose, AiOutlineNotification } from "react-icons/ai";
import { BsFiletypeJpg, BsFiletypePdf } from "react-icons/bs";
import { fileTypes } from "../../Interfaces/FileTypes";
import { NotificationFile } from "./File";
import { NotificationCardReduced } from "./Card";
import { NotificationFullSize } from "./FullSize";

export const NotificationPopUp = () => {
    
    const { userNotifications, ReadNotification } = useContext(NotificationsContext);
    const newNotifications = userNotifications.filter((N) => N.NEW);
    const [ open, setOpen ] = useState<boolean>(true);
    const [ loadingNotification, setLoadingNotification ] = useState<number>(0);
    const [ FullSizeNotification, setFullSizeNotification ] = useState<CitizenNotification | null>(null);

    const ShowNotification = async (N: CitizenNotification) => {
      const response = await ReadNotification(N.ID, setLoadingNotification);
      if(response?.data?.success){
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setFullSizeNotification(N);
      } else{
        console.log(response,0);
      }
    }

    const CloseNotification = () => setFullSizeNotification(null);

    if (FullSizeNotification){
      return (
        <NotificationFullSize data={FullSizeNotification} func={CloseNotification} />
      )
    }else { 

    if (newNotifications.length !== 0 && open) {
      return (
        <>
        <NotificationFullSizeWrapper >
          <LayoutSection className="content">
            <div className="header">
              <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
              <span className="flex-1"></span>
            </div>
            <h1>Nuevas notificaciones Generales</h1>
            <ul>
              {newNotifications.slice(-4).map((notification) => (
                <NotificationCardReduced
                  data={notification}
                  key={notification.ID}
                  onClick={() => {
                    ShowNotification(notification);
                    setOpen(false);
                  }}
                  loading={notification.ID === loadingNotification}
                />
              ))}
            </ul>
          <LayoutStackedPanel className="mt-2">
            <Link to={Pages.DC_NOTIFICATIONS} className="button notifications">
              <Button style={{marginBottom:"5px"}} onClick={() => setOpen(false)}>VER NOTIFICACIONES</Button>
            </Link>
            <LayoutSpacer />

              <Button onClick={() => setOpen(false)}>Cerrar</Button>
          </LayoutStackedPanel>
        </LayoutSection><LayoutSpacer />
    </NotificationFullSizeWrapper>
    </>
  );
    } else {
      return null; // Devuelve null si no hay nuevas notificaciones
    }
    }
  };