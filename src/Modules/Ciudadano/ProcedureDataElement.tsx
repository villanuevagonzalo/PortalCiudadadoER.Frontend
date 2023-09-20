import {Element} from '../FormElements/Components/Element';

import { MdCheck, MdOutlineDataset, MdOutlineNewLabel, MdVerifiedUser } from "react-icons/md";
import { LayoutSection, LayoutSectionProcedureTitle, LayoutSpacer } from "../../Components/Layout/StyledComponents";
import {  ElementInstance, ElementSchema, FormInstance, ProcedureData, ProcedureInstance } from "../FormElements/Class";
import { ElementSchemaTypes } from "../FormElements/Types";
import { Button } from "../../Components/Forms/Button";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useContext, useEffect, useState } from "react";
import { FieldsType, FormContext } from "../../Contexts/FormContext";
import { CiudadanoFormElement } from "./FormDataElement";
import { CiudadanoProcedureContext } from "../../Contexts/CiudadanoProcedureContext";
import { BiArrowBack, BiSend } from "react-icons/bi";
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

   
    const {formularios, UpdateForms} = useContext(FormContext);
    const { ciudadanoProcedures, sendProcedureAttachment } = useContext(CiudadanoProcedureContext);
    const { ciudadanoFormularios } = useContext(CiudadanoFormContext);

    const {fileArray} = useContext(FilesContext)
    const [FormState, setFormState] = useState<IFormState>(DefaultFormState);

    const [formsOfGenericProcedure, setFormsOfGenericProcedure] = useState <FormInstance<ElementSchemaTypes>[]> ([]);
    const [procedureData, setProcedureData] = useState <ProcedureData > ();

    const [formToComplete, setFormToComplete] = useState <FormInstance<ElementSchemaTypes>> ();
    const [formToCheck, setFormToCheck] = useState <FormInstance<ElementSchemaTypes>> ();

    const [render, setRender] = useState("home")

    const [showProcedureCorrectedUploaded, setShowProcedureCorrectedUploaded] = useState(false) 

    const [attachments, setAttachments] = useState <ElementInstance<ElementSchemaTypes>[]>([])

    const [showAttachmentMessage, setShowAttachmentMessage] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertMessage2, setAlertMessage2] = useState("")

    const completarForm = (formCode:FormInstance<ElementSchemaTypes>) => {
        setFormToComplete(formCode)
    }
    const checkForm = (formCode:FormInstance<ElementSchemaTypes>) => {
        setFormToCheck(formCode)
    }

    const completarAdjunto = (attachment:string) => {

    }

    useEffect(()=>{
        UpdateForms()
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
                setAttachments(attachmentsAux);
            }
        }
      }, [procedureInstance]);
    
    /*  useEffect(() => {
        console.log(JSON.stringify(attachments))
      }, [attachments]); */
      
    useEffect(()=>{
        
        const filteredProcedure = ciudadanoProcedures.find(procedure => procedure.getProcedureUnitId() === procedureInstance.getId());
        setProcedureData(filteredProcedure);

    },[ciudadanoProcedures])
    

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
            return (
                <CiudadanoFormElement form={formToComplete} procedureData={procedureData} close={setRender} />
            );
        }
        return null;
    };

    const renderFormToCheckComponent = () => {
        if (formToCheck && procedureData) {
            return (
                <CiudadanoFormToCheckElement form={formToCheck} procedureData={procedureData} close={setRender} />
            );
        }
        return null;
    };


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
                        <div>
                            <h1><MdCheck />Formulario completado</h1>
                            <div onClick={() => {checkForm(form)}}><HiOutlineMagnifyingGlass /></div>
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
                        {attachments &&
                        attachments.map((element: ElementInstance<ElementSchemaTypes>, index: number) => (
                            <div key={element.name}  style={{display:"flex", flexDirection:"column", width:"auto", margin:"10px 0px 15px 0px"}}>
                                <Element instance={element} className="flex-2"/>
                            </div>
                            ))}  
                        <FormikButton disabled={false} color="secondary" type="submit" a>Cargar archivo</FormikButton>

                        </Form>
                    </Formik>
                    </div>
                </LayoutSection>
            ) : null
        );
    };
    

    const sendFile = async (procedureData: ProcedureData) => {

        console.log("Esta es la información que tengo: "+JSON.stringify(procedureInstance))
        const data = {
            procedure_data_id: Number(procedureData.getId()),
            attachments: fileArray  // Agregar las attachments solo si hasArray es true
          };
        
        const response = await sendProcedureAttachment(data, setFormState);
        if (response){

            setShowAttachmentMessage(true)
            setAlertMessage ("Documento cargado correctamente")
        }else{
            setShowAttachmentMessage(true)
            setAlertMessage ("Error en la carga del documento")
            setAlertMessage2 ("Intente más tarde.")

        }

    }
    
    //Required to not render until it is procedureInstance
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

                <LayoutSectionProcedureTitle style={{display:"flex", flexDirection:"column", justifyContent:"center", margin:"5px 0px 15px 0px"}}>
                    <h1 style={{textAlign:"center"}} >{procedureInstance.getTitle()}</h1>
                </LayoutSectionProcedureTitle>
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