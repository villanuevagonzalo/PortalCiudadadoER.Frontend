
import { Field, Form, Formik } from "formik";
import { FormikCheckbox } from "../../../Components/Forms/FormikCheckbox";
import { FormikImage } from "../../../Components/Forms/FormikImage";
import { FormikSearch } from "../../../Components/Forms/FormikSearch";
import { FormikButton } from "../../../Components/Forms/FormikButton";
import * as yup from 'yup';
import { useTable } from "react-table"
import { Spinner, Card, DivSubtitle, DivTitle2, NotificationCard, NotificacionCompletaContenido, NotificacionCompleta } from '../../../Components/Elements/StyledComponents';
import { BiMessage, BiNotification } from "react-icons/bi";
import { LayoutSection, LayoutTitle, LayoutStackedPanel, LayoutSpacer, LayoutNote } from "../../../Components/Layout/StyledComponents";
import { NotificationsContext } from "../../../Contexts/NotificationContext";
import { useContext, useState, useEffect, useMemo } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { ILocation } from "../../../Interfaces/Data";
import { IFormState } from "../../../Interfaces/Data";
import { DefaultFormState } from "../../../Data/DefaultValues";
import { RawLocations, LocationsFullPath, LocationByID, LocationFullPath, GetLocationByPath } from "../../../Utils/Locations";
import { formGetInitialValues, formGetValidations } from "../../../Interfaces/FormFields";
import { Button } from "../../../Components/Forms/Button";
import { IResponse, INotification } from "../../../Interfaces/Data";


import { Link } from "react-router-dom";
import { Pages } from "../../../Routes/Pages";
import { FormikField } from "../../../Components/Forms/FormikField";
import { FormWrapperButton } from "../../../Components/Forms/StyledComponents";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../../Components/Elements/Table";


const FormRequiredFields = [
  'Recipients',
  'Age_From',
  'Age_To',
  'Notification_Date_From',
  'Notification_Date_To',
  'Locality',
  'Message_Title',
  'Message_Body',
];

interface Notificacion{
  ID: number,
  MESSAGE_TITLE: string,
  MESSAGE_BODY: string,
  VISTA: boolean,
}

export const DC_Notifications = () =>{

  const { userNotifications, setUserNotifications } = useContext(NotificationsContext);

  const [notificacionCompleta, setNotificacionCompleta] = useState<INotification | null>(null);


  function viewCompleteNotification(notificacion: INotification){
    // alert(`Título: ${notificacion.MESSAGE_TITLE}\n\nCuerpo: ${notificacion.MESSAGE_BODY}`);
    // notificacion.VISTA = true;
    setNotificacionCompleta(notificacion);
    setUserNotifications(prev =>
      prev.map(notif =>
        notif.ID === notificacion.ID ? { ...notif, SEE: true } : notif
      )
    );
  }

  function cerrarNotificacionCompleta() {
    setNotificacionCompleta(null);
  }
  
  
  const mcolumns = useMemo<ColumnDef<INotification>[]>(()=>[
    {
      header: 'Fecha',
      accessorKey: 'CREATED_AT',
    },
    {
      header: 'Titulo',
      accessorKey: 'MESSAGE_TITLE',
    },
    {
      header: 'Mensaje',
      accessorKey: 'MESSAGE_BODY',
    }
  ],[]);
  
  return (<>
    <LayoutNote>Enterate de las actualizaciones de tus trámites y notificaciones de la plataforma</LayoutNote>
    <LayoutSection>
      <h1><BiNotification />Notificaciones</h1>
      
      {userNotifications.length > 0 ? (
        userNotifications.map((notificacion: INotification) => (
          <NotificationCard
            key={notificacion.ID}
            onClick={() => viewCompleteNotification(notificacion)}
            seen={notificacion.SEE}
          >
            <h1>{notificacion.MESSAGE_TITLE}</h1>
            <p style={{wordBreak:'break-all'}}>{notificacion.MESSAGE_BODY}</p>
          </NotificationCard>
        ))
      ) : (
        <LayoutSection className="items-center">
          <BiMessage /> No tienes ningun mensaje
        </LayoutSection>
      )}

      {notificacionCompleta && (
        <NotificacionCompleta>
          <NotificacionCompletaContenido>
            <h1>{notificacionCompleta.MESSAGE_TITLE}</h1>
            <p style={{wordBreak:'break-all'}}>{notificacionCompleta.MESSAGE_BODY}</p>
            <br />
            <FormWrapperButton
              color="primary"
              onClick={cerrarNotificacionCompleta}
            >
              Cerrar
            </FormWrapperButton>
          </NotificacionCompletaContenido>
        </NotificacionCompleta>
      )}
    </LayoutSection>
  </>);
}

/**/