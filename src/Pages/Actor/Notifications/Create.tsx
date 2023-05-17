
import { Field, Form, Formik } from "formik";
import { FormikCheckbox } from "../../../Components/Forms/FormikCheckbox";
import { FormikImage } from "../../../Components/Forms/FormikImage";
import { FormikSearch } from "../../../Components/Forms/FormikSearch";
import { FormikButton } from "../../../Components/Forms/FormikButton";
import * as yup from 'yup';
import { Spinner, Card, DivSubtitle, DivTitle2, NotificationCard, NotificacionCompleta, NotificacionCompletaContenido } from '../../../Components/Elements/StyledComponents';
import { BiData, BiMessage } from "react-icons/bi";
import { LayoutSection, LayoutTitle, LayoutStackedPanel, LayoutSpacer } from "../../../Components/Layout/StyledComponents";
import { NotificationsContext } from "../../../Contexts/NotificationContext";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { ILocation } from "../../../Interfaces/Data";
import { IFormState } from "../../../Interfaces/Data";
import { DefaultFormState } from "../../../Data/DefaultValues";
import { RawLocations, LocationsFullPath, LocationByID, LocationFullPath, GetLocationByPath } from "../../../Utils/Locations";
import { formGetInitialValues, formGetValidations } from "../../../Interfaces/FormFields";
import { FormikField } from "../../../Components/Forms/FormikField";
import moment from "moment";


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


export const DA_Notifications_Create = () =>{

  const { userContact } = useContext(AuthContext);
  const { CreateNotification } = useContext(NotificationsContext);

  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
  const [ FieldValues, setFieldValues ] = useState(formGetInitialValues(FormRequiredFields));
  const [ LocationsValues, setLocationsValues ] = useState<ILocation[]>([]);


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

  return (<>
    <LayoutSection>
      <h1><BiData/>Crear Nueva Notificación</h1>
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

          const LocationData = GetLocationByPath(LocationsValues, values.Locality);
          const CreateResponse = await CreateNotification({
          recipients: values.Recipients,
          age_from: values.Age_From,
          age_to: values.Age_To,
          notification_date_from: moment(values.Notification_Date_From).format("DD/MM/YYYY"),  
          notification_date_to: moment(values.Notification_Date_To).format("DD/MM/YYYY"), 
          department_id: LocationData?.DEP_ID,
          locality_id: LocationData?.ID,
          message_title: values.Message_Title,
          message_body: values.Message_Body,
          attachment: values.AttachmentTest,
          send_by_email: values.Send_By_Email?true:false,
          }, setFormState);

          console.log(CreateResponse)
        }}
      >
        <Form autoComplete="off">
          <h2>Información del mensaje</h2>
          <FormikField name="Message_Title" disabled={FormState.loading} className="flex-3"></FormikField>
          <FormikField name="Message_Body" disabled={FormState.loading} className="flex-3"></FormikField>
          <LayoutStackedPanel>
            <FormikImage name="Attachment" disabled={FormState.loading} className="flex-3"></FormikImage>
          </LayoutStackedPanel>
          <h2>Filtros</h2>
          <LayoutStackedPanel>
            <FormikField name="Recipients" disabled={FormState.loading} className="flex-3"></FormikField>
            <FormikField name="Age_From" disabled={FormState.loading} className="flex-3"></FormikField>
            <FormikField name="Age_To" disabled={FormState.loading} className="flex-3"></FormikField>
          </LayoutStackedPanel>
          <LayoutStackedPanel>
            <FormikField name="Notification_Date_From" disabled={FormState.loading} className="flex-3"></FormikField>
            <FormikField name="Notification_Date_To" disabled={FormState.loading} className="flex-3"></FormikField>
          </LayoutStackedPanel>
          <FormikSearch name="Locality" label="Localidad" disabled={FormState.loading || LocationsValues.length==0} data={LocationsFullPath(LocationsValues)}/>
                
          <FormikCheckbox name="Send_By_Email"/>
          <LayoutStackedPanel>
            <LayoutSpacer/><FormikButton disabled={false} color="secondary" type="submit">{FormState.loading ? <Spinner /> : "Enviar Notificación"}</FormikButton>
          </LayoutStackedPanel>
        </Form>
      </Formik>
    </LayoutSection>
  </>)
}