
import { Field, Form, Formik } from "formik";
import { FormikCheckbox } from "../../../Components/Forms/FormikCheckbox";
import { FormikImage } from "../../../Components/Forms/FromikImage";
import { FormikSearch } from "../../../Components/Forms/FormikSearch";
import { FormikButton } from "../../../Components/Forms/FormikButton";
import * as yup from 'yup';
import { useTable } from "react-table"
import { Spinner } from "../../../Components/Elements/StyledComponents";
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
  'Attachment_Type',
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
    <LayoutSection className="items-center">
      <BiMessage /> No tienes ningun mensaje
    </LayoutSection>
    <LayoutSection className="items-center">
      {
        mostrarNotificaciones?.length>0 && mostrarNotificaciones.map((notificacion: any) => (
          <div key={notificacion.ID}>
            <h3>{notificacion.MESSAGE_TITLE}</h3>
            <p>{notificacion.MESSAGE_BODY}</p>
          </div>
        ))
      }
      

    </LayoutSection>
      
      <LayoutStackedPanel>
        <div>
          <Formik 
            initialValues={FieldValues}
            enableReinitialize={true} 
            validateOnChange={false} 
            validateOnBlur={false}
            validationSchema={formGetValidations(FormRequiredFields).concat(yup.object({
              'Locality': yup.string().oneOf(LocationsFullPath(LocationsValues), "Debes seleccionar una localidad valida.")
            }))}
            onSubmit={async (values: any) => {
              console.log(values)

              /*const LocationData = GetLocationByPath(LocationsValues, values.Locality);
              const CreateResponse = await CreateNotification({
                recipients: values.Recipients,
                age_from: values.Age_From,
                age_to: values.Age_To,
                notification_date_from: values.Notification_Date_From,
                notification_date_to: values.Notification_Date_To,
                department_id: LocationData?.DEP_ID,
                locality_id: LocationData?.ID,
                message_title: values.Message_Title,
                message_body: values.Message_Body,
                attachment_type: values.Attachment_Type,
                attachment: values.AttachmentTest,
                send_by_email: values.Send_By_Email,
              }, setFormState);

              console.log(CreateResponse)*/
              }}
          >
              <Form autoComplete="off">
                <LayoutStackedPanel>
                  <FormikField name="Recipients" disabled={FormState.loading} className="flex-3"></FormikField>
                  <FormikField name="Age_From" disabled={FormState.loading} className="flex-3"></FormikField>
                  <FormikField name="Age_To" disabled={FormState.loading} className="flex-3"></FormikField>
                </LayoutStackedPanel>
                <LayoutStackedPanel>
                  <FormikField name="Notification_Date_From" disabled={FormState.loading} className="flex-3"></FormikField>
                  <FormikField name="Notification_Date_To" disabled={FormState.loading} className="flex-3"></FormikField>
                </LayoutStackedPanel>
                <FormikSearch name="Locality" disabled={FormState.loading || LocationsValues.length==0} data={LocationsFullPath(LocationsValues)}/>
                <FormikField name="Message_Title" disabled={FormState.loading} className="flex-3"></FormikField>
                <FormikField name="Message_Body" disabled={FormState.loading} className="flex-3"></FormikField>
                <LayoutStackedPanel>
                  <FormikField name="Attachment_Type" disabled={FormState.loading} className="flex-3"></FormikField>
                  {/* <Field 
                  name="image" 
                  disabled={FormState.loading} 
                  type="file" 
                  className="flex-3"
                  onChange={(e: any) => {
                    handleImageChange(e);
                  }}
                  ></Field> */}
                  <FormikImage name="Attachment" disabled={FormState.loading} className="flex-3"></FormikImage>
                </LayoutStackedPanel>
                <FormikCheckbox name="Send_By_Email"/>
                {/* <FormikField name="Send_By_Email" disabled={FormState.loading} className="flex-3"></FormikField> */}
                <LayoutStackedPanel>
                  <FormikButton disabled={false} color="secondary" type="submit">{FormState.loading ? <Spinner /> : "Enviar Notificación"}</FormikButton>
                </LayoutStackedPanel>
                
              </Form>
          </Formik></div>
        
        
      </LayoutStackedPanel>
      
    </LayoutSection>

    {/* <Button onClick={() => {prueba()}}>Leer</Button> */}
  </>)
}

/**/