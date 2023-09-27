import {Element} from '../FormElements/Components/Element';

import { MdBarChart, MdCheck, MdOutlineDataset, MdOutlineNewLabel, MdVerifiedUser } from "react-icons/md";
import { LayoutSection, LayoutSectionProcedureTitle, LayoutSpacer } from "../../Components/Layout/StyledComponents";
import {  ElementInstance, ElementSchema, FormInstance, ProcedureData, ProcedureInstance } from "../FormElements/Class";
import { ElementSchemaTypes } from "../FormElements/Types";
import { Button } from "../../Components/Forms/Button";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useContext, useEffect, useState } from "react";
import { FieldsType, FormContext } from "../../Contexts/FormContext";
import { CiudadanoFormElement } from "./FormDataElement";
import { CiudadanoProcedureContext } from "../../Contexts/CiudadanoProcedureContext";
import { BiArrowBack, BiSend, BiTrash } from "react-icons/bi";
import { CitizeProcedureUploadedProps, CitizenGenericAlertPopUp } from "../../Components/Forms/CitizenPopUpCards";
import { Form, Formik } from "formik";
import { FormikButton } from '../../Components/Forms/FormikButton';
import { FilesContext } from '../../Contexts/FilesContext';
import { DefaultFormState } from '../../Data/DefaultValues';
import { IFormState } from '../../Interfaces/Data';
import { CiudadanoFormToCheckElement } from './FormDatoUpdateElement';
import { CiudadanoFormContext } from '../../Contexts/CiudadanoFormContext';

interface Arguments {
    procedureInstance:ProcedureInstance<ElementSchemaTypes>;
    backFunction:Function,
}

interface FormGenericData {
    code: string;
    title:string;
  }


  export const CiudadanoProcedureData: React.FC<Arguments> = ({procedureInstance, backFunction}) => {


    const { ciudadanoProcedures, sendProcedureAttachment, GetCiudadanoProcedureAttachment, DeleteCiudadanoProcedureAttachment } = useContext(CiudadanoProcedureContext); //This is the total citizen data procedures
    const {UpdateCitizenForms}= useContext(CiudadanoFormContext); //This is the total citizen data procedures
    const [procedureData, setProcedureData] = useState <ProcedureData > (); //Is this procedure citizen data

    const {formularios, UpdateForms} = useContext(FormContext); // Is is the total created forms which it does not implies that the citizen has data here. 
    const [formsOfGenericProcedure, setFormsOfGenericProcedure] = useState <FormInstance<ElementSchemaTypes>[]> ([]); // Procedures forms that are not the forms that the citizen has completed but are the forms of the procedure instance
    //const { ciudadanoFormularios } = useContext(CiudadanoFormContext); //this is the total citizen data forms
    const [formToComplete, setFormToComplete] = useState <FormInstance<ElementSchemaTypes>> (); //Form to complete by the citizen
    const [formToCheck, setFormToCheck] = useState <FormInstance<ElementSchemaTypes>> (); // Form completed by the citizen but it can be seeing and updated

    const {fileArray, clearFileArray} = useContext(FilesContext)
    const [procedureInstanceAttachments, setProcedureInstanceAttachments] = useState <ElementInstance<ElementSchemaTypes>[]>([]) // Procedure instance attachments, this are the attachment of the procedure but it doesnt implies that the citizen uploaded it
    const [procedureDataAttachments, setProcedureDataAttachments ] = useState <string[]>([])

    const [render, setRender] = useState("home") //diferent render views.

    //Alerts
    const [showProcedureCorrectedUploaded, setShowProcedureCorrectedUploaded] = useState(false) 
    const [showAttachmentMessage, setShowAttachmentMessage] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertMessage2, setAlertMessage2] = useState("")

    const [FormState, setFormState] = useState<IFormState>(DefaultFormState);

    const currentPath = window.location.pathname;
    
    const completarForm = (formSelected:FormInstance<ElementSchemaTypes>) => {
        setFormToComplete(formSelected)
    }
    const checkForm = (formSelected:FormInstance<ElementSchemaTypes>) => {
        if (formSelected!=undefined){
            setFormToCheck(formSelected)

        }
    }

    const completarAdjunto = (attachment:string) => {

    }

    useEffect(()=>{
        UpdateForms()
        UpdateCitizenForms()
        const filteredProcedure = ciudadanoProcedures.find(procedure => procedure.getProcedureUnitId() === procedureInstance.getId());
        if (filteredProcedure){
                setProcedureData(filteredProcedure);
                setProcedureDataAttachments(filteredProcedure.getAttachments()!)
            }
        
    },[])

    //se busca formularios del tramite como se definió por el actor
    useEffect(()=>{
        const formulariosProcedureInstance = procedureInstance.getForms();
        const formulariosFiltrados = formularios.filter(formulario =>
            formulariosProcedureInstance.some(procFormulario => procFormulario === formulario.getCode())
        );
        setFormsOfGenericProcedure(formulariosFiltrados)
    },[formularios])


    useEffect(() => {
        if (procedureInstance) {

            if (procedureInstance.getAttachments().length > 0 )
            {
                let attachmentsAux: ElementInstance<ElementSchemaTypes>[] = [];
                const newAttachments = procedureInstance.getAttachments().map((attachment, index) => {
                const Attachments= new ElementInstance(index.toString(),new ElementSchema('FILE',{label:attachment}), null)
                attachmentsAux.push(Attachments);
                });
                setProcedureInstanceAttachments(attachmentsAux);
            }
        }
      }, [procedureInstance]);
    

    useEffect(()=>{
        
        const filteredProcedure = ciudadanoProcedures.find(procedure => procedure.getProcedureUnitId() === procedureInstance.getId());
        if (filteredProcedure){
            setProcedureData(filteredProcedure);
            setProcedureDataAttachments(filteredProcedure.getAttachments()!)
        }
        
    },[ciudadanoProcedures])


    useEffect(()=>{
        
    },[procedureData])
    

    
    useEffect(()=>{

        if (formToComplete!=undefined && procedureData!=undefined){
            setRender("form")
        }
    },[formToComplete])


    useEffect(()=>{

        if (formToCheck!=undefined && formToCheck!=undefined){
            setRender("checkForm")
        }
    },[formToCheck])


    useEffect(()=>{
        if (render=="home"){
            setFormToComplete(undefined)
        }
      },[render])


    const renderFormComponent = () => {
        if (formToComplete && procedureData) {
            window.scrollTo({ top: 0, behavior: 'smooth' });

            return (
                <CiudadanoFormElement form={formToComplete} procedureData={procedureData} close={setRender} />
            );
        }
        return null;
    };


    const renderFormToCheckComponent = () => {

        if (formToCheck && procedureData) {
            window.scrollTo({ top: 0, behavior: 'smooth' });

            return (
                <CiudadanoFormToCheckElement form={formToCheck} procedureData={procedureData} setFormToCheck={setFormToCheck} close={setRender} />
            );
        }
        return null;
    };

    const downloadAttachment = async (attachmentName:string) => {

        const attachments = procedureData?.getAttachments()
        const multimediaId = procedureData?.getMultimediaId()
        let position = -1; 
        if (attachments && attachmentName) {
            for (let i = 0; i < attachments.length; i++) {
              if (attachments[i] === attachmentName) {
                position = i; // Guardamos la posición cuando encontramos el elemento
                break; // Salimos del bucle una vez que lo encontramos
              }
            }
          }
        if (position !== -1 && multimediaId) {
            const multimediaIdAtIndex = multimediaId[position];

            const response = await GetCiudadanoProcedureAttachment(multimediaIdAtIndex, attachmentName, setFormState);
           
        } else {
            setShowAttachmentMessage(true)
            setAlertMessage ("Error en la visualización del documento")
            setAlertMessage2 ("Intente más tarde.")
        }

    }

    const deleteAttachment = async (attachmentName:string) => {

        const attachments = procedureData?.getAttachments()
        const multimediaId = procedureData?.getMultimediaId()
        let position = -1; 

        if (attachments && attachmentName) {
            for (let i = 0; i < attachments.length; i++) {
              if (attachments[i] === attachmentName) {
                position = i; // Guardamos la posición cuando encontramos el elemento
                break; // Salimos del bucle una vez que lo encontramos
              }
            }
          }

        if (position !== -1 && multimediaId) {
            const multimediaIdAtIndex = multimediaId[position];
            const response = await DeleteCiudadanoProcedureAttachment( procedureData?.getId()!, multimediaIdAtIndex, setFormState);
            if (response){
                setShowAttachmentMessage(true)
                setAlertMessage ("Documento adjunto eliminado")
            }
            // Ahora "multimediaIdAtIndex" contiene el elemento en la posición "position"
        } else {
            setAlertMessage ("Error")
            setAlertMessage2 ("Intente más tarde.")
            setShowAttachmentMessage(true)

        }

    }

    const FormSection: React.FC<{ forms: FormInstance<ElementSchemaTypes>[], procedureData: ProcedureData, completarForm: Function }> = ({ forms, procedureData, completarForm }) => {
        return (
            <LayoutSection style={{ margin: "5px 0px 15px 0px" }}>
                <h1><MdOutlineDataset />Formularios del trámite</h1>
                {forms.map((form, index) => (
                    <FormularioItem key={index} form={form} procedureData={procedureData} completarForm={completarForm} />
                ))}
            </LayoutSection>
        );
    };

    
    const FormularioItem: React.FC<{ form: FormInstance<ElementSchemaTypes>, procedureData: ProcedureData, completarForm: Function }> = ({ form, procedureData, completarForm }) => {
        return (
            <div style={{ display: "flex", flexDirection: "column", width: "auto", margin: "10px 0px 15px 0px" }}>
                <LayoutSection>
                    <h1>{form.getTitle()}</h1>
                    {procedureData && procedureData.getForms().includes(form.getCode().toString()) ? (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <h1><MdCheck /> Formulario completado</h1>
                            <Button style={{ width:"120px", marginLeft: "auto", marginTop:"15px" }} onClick={() => { checkForm(form) }} ><HiOutlineMagnifyingGlass/>Revisar</Button>
                        </div>
                    ) : (
                        <Button onClick={() => {completarForm(form)}}><HiOutlineMagnifyingGlass />Completar Formulario</Button>
                    )}
                </LayoutSection>
            </div>
        );
    };

    
    const AttachmentSection: React.FC<{ procedureInstance: ProcedureInstance<ElementSchemaTypes>; procedureData: ProcedureData; completarAdjunto: Function }> = ({ procedureInstance, procedureData, completarAdjunto }) => {
        return (
            
            procedureInstance.getAttachments().length > 0 ? (
                <LayoutSection style={{ margin: "5px 0px 15px 0px" }}>
                    <h1><MdOutlineDataset />Adjuntos del trámite</h1>
                    {/* Suponiendo que "getAttachments" es una función de tu "procedureInstance" y "AttachmentItem" es un componente similar al de FormularioItem */}
                    <div>
                        <h2><MdOutlineDataset />Adjuntos</h2>                      
                        <Formik
                        validateOnBlur={false}
                        validateOnChange={false}
                        enableReinitialize={true}
                        initialValues={[]}
                        onSubmit={(e:any)=>{
                            sendFile(procedureData)
                        }}
                    >
                        <Form autoComplete="off">
                        {procedureInstanceAttachments &&
                        procedureInstanceAttachments.map((element: ElementInstance<ElementSchemaTypes>, index: number) => (
                            <div key={element.name}  style={{display:"flex", flexDirection:"column", width:"auto", margin:"30px 0px 15px 0px"}}>
                                {procedureDataAttachments.includes(element.properties.label) ? (
                                <div style={{display:"flex", flexDirection:"column"}} >
                                    <p>Archivo {element.properties.label} cargado</p>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop:"15px" }}>
                                        <Button fullwidth={false}  onClick={() => downloadAttachment(element.properties.label)}  ><HiOutlineMagnifyingGlass/>Ver</Button>
                                        <Button color="secondary" fullwidth={false}  onClick={() => deleteAttachment(element.properties.label)}><BiTrash />Eliminar</Button>
                                    </div>
                                </div>
                                ) : (
                                    <>
                                    <Element instance={element} className="flex-2" />
                                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                                      <FormikButton style={{ width: "200px" }} disabled={false} color="secondary" type="submit">
                                        Cargar archivo
                                      </FormikButton>
                                    </div>
                                  </>                               
                                )}
                            </div>
                            ))}  

                        </Form>
                    </Formik>
                    </div>
                </LayoutSection>
            ) : null
        );
    };
    

    const sendFile = async (procedureData: ProcedureData) => {
        const data = {
            procedure_data_id: Number(procedureData.getId()),
            attachments: fileArray  // Agregar las attachments solo si hasArray es true
          };
        
        const response = await sendProcedureAttachment(procedureData, data, setFormState);
        if (response){            
            clearFileArray()
            setShowAttachmentMessage(true)
            setAlertMessage ("Documento cargado correctamente")
        }else{
            clearFileArray()
            setShowAttachmentMessage(true)
            setAlertMessage ("Error en la carga del documento")
            setAlertMessage2 ("Intente más tarde.")
        }
    }

    if (!procedureInstance){
        return null;
    }

    if (render==="form"){

        return renderFormComponent();

    }else if (render==="checkForm"){

        return renderFormToCheckComponent();

    }else{

        return (
            <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto", padding:"15px"}}>
                {showProcedureCorrectedUploaded && (<CitizeProcedureUploadedProps close={backFunction} ProcedureTitle={procedureInstance.getTitle()} />)}
                { showAttachmentMessage && (<CitizenGenericAlertPopUp message={alertMessage} message2={alertMessage2} close={setShowAttachmentMessage} />)}
                <LayoutSectionProcedureTitle style={{display:"flex", flexDirection:"row", justifyContent:"center", margin:"5px 0px 15px 0px"}}>
                    <div style={{ width: "25%", display: "flex", alignItems: "center" }}>
                    {currentPath === '/dashboard/procedures/started/' ? (
                        <img
                        src={`../../../../public/ProceduresIcons/icono_${procedureInstance.getIcon()}.svg`}
                        alt={procedureInstance.getTitle()}
                        style={{ width: "64px", height: "64px" }}
                        />
                    ) : (
                        <img
                        src={`../../../public/ProceduresIcons/icono_${procedureInstance.getIcon()}.svg`}
                        alt={procedureInstance.getTitle()}
                        style={{ width: "64px", height: "64px" }}
                        />
                    )}
                    </div>
                    <h1 style={{textAlign:"center"}} >{procedureInstance.getTitle()}</h1>
                </LayoutSectionProcedureTitle>

                <LayoutSection style={{margin:"0px 0px 10px 0px", paddingBottom:"10px"}}>
                        <h1><MdBarChart/>Estado del trámite</h1>
                        <h2>{procedureData?.getStatus()}</h2>
                    </LayoutSection>
                    
                <LayoutSection style={{margin:"5px 0px 15px 0px"}}>
                    <h1><MdOutlineNewLabel />Datos Generales del Trámite</h1>
                    <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                        <h1>Descripción</h1>
                        <p>{procedureInstance.getDescription()}</p>
                    </LayoutSection>
                    <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                        <h1>Categoría</h1>
                        <p>{procedureInstance.getTheme()}</p>
                    </LayoutSection>
                    <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                        <h1>Organismo</h1>
                        <p>{procedureInstance.getSecretary()}</p>
                    </LayoutSection>
                    <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                        <h1>Precio</h1>
                        <p>{procedureInstance.getPrice()}</p>
                    </LayoutSection>
                 </LayoutSection>    
                <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto"}}>
                    <LayoutSection style={{margin:"5px 0px 15px 0px"}}>
                        <FormSection forms={formsOfGenericProcedure} procedureData={procedureData!} completarForm={completarForm} />
                        <AttachmentSection procedureInstance={procedureInstance} procedureData={procedureData!} completarAdjunto={completarAdjunto} />
                    </LayoutSection>
                    <LayoutSection style={{margin:"5px 0px 15px 0px"}}> 
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Button style={{width:"200px", margin:"0px 0px 15px 0px"}} onClick={() => backFunction("home")} > <BiArrowBack/>Volver</Button>
                            <Button style={{width:"200px", margin:"0px 0px 15px 0px"}}  color={"secondary"} >Cargar<BiSend/> </Button>
                        </div>
                    </LayoutSection>
                </div>
            </div>
        )
    }
  }