
import { Field, Form, Formik } from "formik";
import { FormikCheckbox } from "../../../Components/Forms/FormikCheckbox";
import { FormikImage } from "../../../Components/Forms/FromikImage";
import { FormikSearch } from "../../../Components/Forms/FormikSearch";
import { FormikButton } from "../../../Components/Forms/FormikButton";
import * as yup from 'yup';
import { useTable } from "react-table"
import { Spinner, Card, DivSubtitle, DivTitle2, NotificationCard, NotificacionCompletaContenido, NotificacionCompleta } from '../../../Components/Elements/StyledComponents';
import { BiMessage } from "react-icons/bi";
import { LayoutSection, LayoutTitle, LayoutStackedPanel, LayoutSpacer } from "../../../Components/Layout/StyledComponents";
import { NotificationsContext } from "../../../Contexts/NotificationContext";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { ILocation } from "../../../Interfaces/Data";
import { IFormState } from "../../../Interfaces/Data";
import { DefaultFormState } from "../../../Data/DefaultValues";
import { RawLocations, LocationsFullPath, LocationByID, LocationFullPath, GetLocationByPath } from "../../../Utils/Locations";
import { formGetInitialValues, formGetValidations } from "../../../Interfaces/FormFields";
import { Button } from "../../../Components/Forms/Button";
import { IResponse, IUserNotification } from "../../../Interfaces/Data";


import { Link } from "react-router-dom";
import { Pages } from "../../../Routes/Pages";
import { FormikField } from "../../../Components/Forms/FormikField";
import { FormWrapperButton } from "../../../Components/Forms/StyledComponents";


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

  const { UpdateNotification, CreateNotification, userNotifications } = useContext(NotificationsContext);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState<Notificacion[]>([]);
  const [notificacionCompleta, setNotificacionCompleta] = useState<Notificacion | null>(null);

  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));

  const { userData, userContact, userRol, SaveData, AFIP_getURL } = useContext(AuthContext);
  const [ LocationsValues, setLocationsValues ] = useState< ILocation[]>([]);

  useEffect(() => {
    
    RawLocations().then((response)=>{
      setLocationsValues(response)
    }).catch((e:any)=>{
      console.log(e)
    })

  },[userContact])

  useEffect(() => {
    const getNotifications = async () => {

      const response = await UpdateNotification();
      console.log(response)
      if(response.status){
        setMostrarNotificaciones(JSON.parse(response.response.data.notifications));
      }
      
      console.log(response)
      // console.log(mostrarNotificaciones)
    };
    
    getNotifications();
  }, []);


  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setFieldValues({...FieldValues, Attachment: file});
    console.log(file);
  }

  function viewCompleteNotification(notificacion: Notificacion){
    // alert(`Título: ${notificacion.MESSAGE_TITLE}\n\nCuerpo: ${notificacion.MESSAGE_BODY}`);
    // notificacion.VISTA = true;
    setNotificacionCompleta(notificacion);
    setMostrarNotificaciones(prevmostrarNotificaciones =>
      prevmostrarNotificaciones.map(notif =>
        notif.ID === notificacion.ID ? { ...notif, VISTA: true } : notif
      )
    );
  }

  function cerrarNotificacionCompleta() {
    setNotificacionCompleta(null);
  }



  return (<>
    <LayoutSection>
    <LayoutTitle>
      Notificaciones
    </LayoutTitle>
    {/* <LayoutSection> */}
      
      {
        mostrarNotificaciones?.length>0 && mostrarNotificaciones.map((notificacion: Notificacion) => (
          <NotificationCard 
          key={notificacion.ID} 
          onClick={() => viewCompleteNotification(notificacion)}
          color={notificacion.VISTA ? 'white' : undefined}
          // vista={notificacion.VISTA}
          >
            <h1>{notificacion.MESSAGE_TITLE}</h1>
            <p>{notificacion.MESSAGE_BODY}</p>
          </NotificationCard>
        ))
      }
      {notificacionCompleta && (
        <NotificacionCompleta>
          <NotificacionCompletaContenido>
            <h1>{notificacionCompleta.MESSAGE_TITLE}</h1>
            <p>{notificacionCompleta.MESSAGE_BODY}</p>
            <br/>
            <FormWrapperButton color="primary" onClick={cerrarNotificacionCompleta}>Cerrar</FormWrapperButton>
          </NotificacionCompletaContenido>
          
        </NotificacionCompleta>
      )
      }
    {/* </LayoutSection> */}
      {
      mostrarNotificaciones?.length === 0 && 
      <LayoutSection className="items-center">
        <BiMessage /> No tienes ningun mensaje
      </LayoutSection>
      }

    </LayoutSection>

  </>)
}

/**/