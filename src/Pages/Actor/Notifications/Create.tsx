
import { Field, Form, Formik, useFormikContext } from "formik";
import { FormikCheckbox } from "../../../Components/Forms/FormikCheckbox";
import { FormikImage } from "../../../Components/Forms/FormikImage";
import { FormikSearch } from "../../../Components/Forms/FormikSearch";
import { FormikButton } from "../../../Components/Forms/FormikButton";
import * as yup from 'yup';
import { DivOutlined, Spinner } from '../../../Components/Elements/StyledComponents';
import { BiData, BiMessage, BiNotification, BiSave } from "react-icons/bi";
import { LayoutSection, LayoutTitle, LayoutStackedPanel, LayoutSpacer, LayoutNote } from "../../../Components/Layout/StyledComponents";
import { NotificationsContext } from "../../../Contexts/NotificationContext";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { ILocation } from "../../../Interfaces/Data";
import { IFormState } from "../../../Interfaces/Data";
import { DefaultFormState } from "../../../Data/DefaultValues";
import { RawLocations, LocationsFullPath, LocationByID, LocationFullPath, GetLocationByPath, GetDepartments, GetLocalitysByDeparment } from "../../../Utils/Locations";
import { formGetInitialValues, formGetValidations } from "../../../Interfaces/FormFields";
import { FormikField } from "../../../Components/Forms/FormikField";
import moment from "moment";
import { ButtonWrapper, Element, ElementInstance, ElementSchema, ElementSchemaTypes, ValidateForm } from "../../../Modules/FormElements";
import { Button } from "../../../Components/Forms/Button";
import { AiOutlineAreaChart, AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai";
import { MdOutlineAutoGraph } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Pages } from "../../../Routes/Pages";
import { CountDown } from "../../../Components/Elements/CountDown";

export const DA_Notifications_Create = () =>{

  const { CreateNotification, GetScope } = useContext(NotificationsContext);
  const ref:any = useRef(null);

  const [ ScopeFormState, setScopeFormState ] = useState<IFormState>(DefaultFormState);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
  const [ Scope, setScope ] = useState<number>(-1);

  const [ Locations, setLocations ] = useState<ILocation[]>([]);
  const [ Deparments, setDeparments ] = useState<any[]>([]);
  const [ Localities, setLocalities ] = useState<any[]>([]);

  const [Fields, setFields] = useState( {
    Title: new ElementInstance("Title",new ElementSchema('TEXT',{label:'Título'},["isRequired"])),
    Message: new ElementInstance("Message",new ElementSchema('TEXTAREA',{label:'Mensaje',length_max:100},["isRequired"])),
    StartDate: new ElementInstance("StartDate",new ElementSchema('DATE',{label:'Fecha desde'},["isRequired"]),null),
    EndDate: new ElementInstance("EndDate",new ElementSchema('DATE',{label:'Fecha hasta'},["isRequired"]),null),
    SendByEmail: new ElementInstance("SendByEmail",new ElementSchema('CHECKBOX',{label:'Enviar por Correo'}),false),
    Attachments: new ElementInstance("Attachments",new ElementSchema('FILE',{label:'Selecciona un Archivo'}), null),
    Recipients: new ElementInstance("Recipients",new ElementSchema('SELECT',{label:'Seleccione un destinatario',options:[{
      value: "actor",
      label: 'Actores'
    },{
      value: "citizen",
      label: 'Ciudadanos'
    },{
      value: "both",
      label: 'Todos'
    }]},["isRequired"]), "both"),
    AgeFrom: new ElementInstance("AgeFrom",new ElementSchema('NUMBER',{label:'Edad desde',value_min:1, value_max:120})),
    AgeTo: new ElementInstance("AgeTo",new ElementSchema('NUMBER',{label:'Edad hasta',value_min:1, value_max:120})),
   
  })
  const [departmentFields, setDepartmentsFields] = useState( 
    new ElementInstance("Department",new ElementSchema('SELECT',{label:'Departamento',options:Deparments})),
  )
  const [localityFields, setLocalityFields]= useState( 
    new ElementInstance("Locality",new ElementSchema('SELECT',{label:'Localidad',options:Localities})),
  )

  const initialValues = Object.entries(Fields).reduce((acc, [key, obj]) => ({ ...acc, [key]: obj.value }), {});

  const handleChange = (e:any) => {
    setLocalities(GetLocalitysByDeparment(Locations,e.target.value*1))
    setLocalityFields( 
      new ElementInstance("Locality",new ElementSchema('SELECT',{label:'Localidad',options:GetLocalitysByDeparment(Locations,e.target.value*1)}))
    )
  }

  const handleLocations = async() => {
    const response = await RawLocations();
    setLocations(response)
    setLocalityFields( 
      new ElementInstance("Locality",new ElementSchema('SELECT',{label:'Localidad',options:response}))
    )
    setDepartmentsFields( 
      new ElementInstance("Department",new ElementSchema('SELECT',{label:'Departamento',options:GetDepartments(response)})),
    )
    
  }
  const handleScope = async (e:any) => {
    e.preventDefault()
    const values:any = ref.current.values;
    const ScopeResponse = await GetScope({
      recipients: values.Recipients,
      age_from: values.AgeFrom===""?1:values.AgeFrom,
      age_to: values.AgeTo===""?120:values.AgeTo,
      department_id: departmentFields.getValue() || 0,
      locality_id: localityFields.getValue() || 0,
      }, setScopeFormState);
    if(ScopeResponse?.data?.success){
      setScope(ScopeResponse.data.data.notification_scope)
    } else{
      setScope(-1)
    }
  }

  useEffect(() => { handleLocations(); },[])

  return (<>
    <LayoutNote>
      Administre desde esta sección las notificaciones generales que serán publicadas en <b>Ciudadano Digital</b>.
      <br/>Podrá configurar sus notificaciones por rango de edad, ubicación, y si lo desea, enviarlas por correo electrónico.
      <br/>Vea el alcance que va a tener su notificación.
    </LayoutNote>
    <LayoutSection>
      <h1><BiNotification/>Crear Nueva Notificación General</h1>
      {FormState.finish?<>
        <DivOutlined className="mt-2 mb-4 flex-col" color="primary">
          <b className='mb-2'>Nueva Notificación General creada exitosamente.</b>
          <span className='text-sm'>Puedes revisarla en el Gestor de Notificaciones</span>
        </DivOutlined>
        <LayoutStackedPanel className="-mb-4">
          <Link to={Pages.DA_NOTIFICATIONS}><Button color="gray">
            <AiOutlineArrowLeft/>Volver a <b className='-ml-1'>Gestor de Notificaciones</b>                                
          </Button></Link>
          <LayoutSpacer/>
          <FormikButton disabled={false} color="secondary" onClick={()=>setFormState(prev=>({...prev, finish:false}))}>
            Crear nueva Notificación
          </FormikButton>
        </LayoutStackedPanel>
      </>:<>
        <Formik
          innerRef={ref}
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={async(values:any)=>{
            const test = {
              recipients: values.Recipients,
              age_from: values.AgeFrom===""?1:values.AgeFrom,
              age_to: values.AgeTo===""?120:values.AgeTo,
              notification_date_from: moment(values.StartDate).format("DD/MM/YYYY"),  
              notification_date_to: moment(values.EndDate).format("DD/MM/YYYY"), 
              department_id: departmentFields.getValue() || 0,
              locality_id: localityFields.getValue() || 0,
              message_title: values.Title,
              message_body: values.Message,
              attachment: values.HELPAttachments,
              send_by_email: values.SendByEmail?true:false,
            };

            const response = await CreateNotification(test, setFormState);
          }}
          validate={(values:any) => ValidateForm(values, Fields)}
        >
        <Form autoComplete="off">
          <Element instance={Fields.Title}/>
          <Element instance={Fields.Message}/>
            <LayoutStackedPanel>
          <Element instance={Fields.Attachments} className="flex-2"/>
              <Element instance={Fields.StartDate} className="flex-1"/>
              <Element instance={Fields.EndDate} className="flex-1"/>
            </LayoutStackedPanel>
          <hr className="mb-4"/>
            <h2>Configuración del mensaje</h2>
          <LayoutStackedPanel>
            <Element instance={Fields.Recipients} className="flex-1"/>
            <Element instance={Fields.AgeFrom} className="flex-1"/>
            <Element instance={Fields.AgeTo} className="flex-1"/>
          </LayoutStackedPanel>
          <LayoutStackedPanel>
            <Element instance={departmentFields} className="flex-1" disabled={Deparments.length===0} onChange={handleChange}/>
            <Element instance={localityFields} className="flex-1" disabled={Localities.length===0}/>
            <div><ButtonWrapper onClick={handleScope}>{ScopeFormState.loading ? <Spinner /> : "Ver Alcance"}<FaSearch/></ButtonWrapper></div>
            <div><ButtonWrapper disabled color="gray">{Scope>-1?Scope+" destinatarios":"?"}<MdOutlineAutoGraph/></ButtonWrapper></div>
          </LayoutStackedPanel>
          <hr className="mb-4"/>
          <LayoutStackedPanel className="-mb-4">
            <Element instance={Fields.SendByEmail} className="mt-2"/>
            <LayoutSpacer/>
            <FormikButton disabled={false} color="secondary" type="submit">{FormState.loading ? <Spinner /> : "Enviar Notificación"}</FormikButton>
          </LayoutStackedPanel>
        </Form>
        </Formik>
        <DivOutlined className="mt-2" open={FormState.error ? true : false}>
          {FormState.error}
        </DivOutlined>
      </>}
    </LayoutSection>
  </>)
}


/*




<Formik 
        initialValues={FieldValues}
        enableReinitialize={true} 
        validateOnChange={false} 
        validateOnBlur={false}
        validationSchema={formGetValidations(FormRequiredFields).concat(yup.object({
        'Locality': yup.string().required('El campo es obligatorio').oneOf(LocationsFullPath(LocationsValues), "Debes seleccionar una localidad valida.")
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
            <FormikField name="Notification_Date_From" disabled={FormState.loading} className="flex-3"></FormikField>
            <FormikField name="Notification_Date_To" disabled={FormState.loading} className="flex-3"></FormikField>
          </LayoutStackedPanel>
          <LayoutStackedPanel>
            <FormikImage name="Attachment" disabled={FormState.loading} className="flex-3"></FormikImage>
          </LayoutStackedPanel>
          <h2>Configuración del mensaje</h2>
          <LayoutStackedPanel>
            <FormikField name="Recipients" disabled={FormState.loading} className="flex-3"></FormikField>
            <FormikField name="Age_From" disabled={FormState.loading} className="flex-3"></FormikField>
            <FormikField name="Age_To" disabled={FormState.loading} className="flex-3"></FormikField>
          </LayoutStackedPanel>
          <FormikSearch name="Locality" label="Localidad" disabled={FormState.loading || LocationsValues.length==0} data={LocationsFullPath(LocationsValues)}/>
                
          <FormikCheckbox name="Send_By_Email"/>
          <LayoutStackedPanel>
            <LayoutSpacer/><FormikButton disabled={false} color="secondary" type="submit">{FormState.loading ? <Spinner /> : "Enviar Notificación"}</FormikButton>
          </LayoutStackedPanel>
        </Form>
      </Formik>*/