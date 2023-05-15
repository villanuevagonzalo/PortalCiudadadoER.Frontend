
import { Field, Form, Formik } from "formik";
import { FormikCheckbox } from "../../../Components/Forms/FormikCheckbox";
import { FormikImage } from "../../../Components/Forms/FromikImage";
import { FormikSearch } from "../../../Components/Forms/FormikSearch";
import { FormikButton } from "../../../Components/Forms/FormikButton";
import * as yup from 'yup';
import { useTable } from "react-table"
import { Spinner, Card, DivSubtitle, DivTitle2 } from '../../../Components/Elements/StyledComponents';
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

export const DC_Notifications = () =>{

  const { UpdateNotification, CreateNotification, userNotifications } = useContext(NotificationsContext);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState([]);

  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));

  const { userData, userContact, userRol, SaveData, AFIP_getURL } = useContext(AuthContext);
  const [ LocationsValues, setLocationsValues ] = useState< ILocation[]>([]);


  useEffect(() => {
    if(userContact){
      if(userContact.LOCALITY_ID!==0 && LocationsValues.length>0){
        setFieldValues({...FieldValues, Locality: LocationFullPath(LocationByID(LocationsValues,userContact.LOCALITY_ID))})
      }
    }
  },[LocationsValues])

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

  // const prueba = async () => {
  //   const response = await UpdateNotification();
  //     if(response.status){
  //       setMostrarNotificaciones(response.data);
  //     }
      
  //     console.log(response)
  // }

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setFieldValues({...FieldValues, Attachment: file});
    console.log(file);
  }




  return (<>
    <LayoutSection>
    <LayoutTitle>
      Notificaciones
    </LayoutTitle>
    <LayoutSection>
      {
        mostrarNotificaciones?.length>0 && mostrarNotificaciones.map((notificacion: any) => (
          <Card key={notificacion.ID}>
            <h1>{notificacion.MESSAGE_TITLE}</h1>
            <p>{notificacion.MESSAGE_BODY}</p>
          </Card>
        ))
      }
    </LayoutSection>
      {
      mostrarNotificaciones?.length === 0 && 
      <LayoutSection className="items-center">
        <BiMessage /> No tienes ningun mensaje
      </LayoutSection>
      }

    </LayoutSection>

    {/* <Button onClick={() => {prueba()}}>Leer</Button> */}
  </>)
}

/**/