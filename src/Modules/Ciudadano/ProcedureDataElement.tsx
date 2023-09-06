import { MdCheck, MdOutlineDataset, MdOutlineNewLabel, MdVerifiedUser } from "react-icons/md";
import { LayoutSection, LayoutSectionProcedureTitle, LayoutSpacer } from "../../Components/Layout/StyledComponents";
import { FormInstance, ProcedureData, ProcedureInstance } from "../FormElements/Class";
import { ElementSchemaTypes } from "../FormElements/Types";
import { Button } from "../../Components/Forms/Button";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useContext, useEffect, useState } from "react";
import { FieldsType, FormContext } from "../../Contexts/FormContext";
import { CiudadanoFormElement } from "./FormDataElement";
import { CiudadanoProcedureContext } from "../../Contexts/CiudadanoProcedureContext";
import { BiArrowBack, BiSend } from "react-icons/bi";
import { CitizeProcedureUploadedProps } from "../../Components/Forms/CitizenPopUpCards";

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
    const { ciudadanoProcedures } = useContext(CiudadanoProcedureContext);

    const [formsOfGenericProcedure, setFormsOfGenericProcedure] = useState <FormInstance<ElementSchemaTypes>[]> ([]);
    const [procedureData, setProcedureData] = useState <ProcedureData > ();

    const [formToComplete, setFormToComplete] = useState <FormInstance<ElementSchemaTypes>> ();
    const [render, setRender] = useState("home")

    const [showProcedureCorrectedUploaded, setShowProcedureCorrectedUploaded] = useState(false) 

    const completarForm = (formCode:FormInstance<ElementSchemaTypes>) => {
        setFormToComplete(formCode)
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
        if (render=="home"){
            setFormToComplete(undefined)
        }
      },[render])

    const renderFormComponent = () => {
        if (formToComplete && procedureData) {
            return (
                <CiudadanoFormElement form={formToComplete} procedureID={procedureData.getId()} close={setRender} />
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
                        <h1><MdCheck />Formulario completado</h1>
                    ) : (
                        <Button onClick={() => completarForm(form)}><HiOutlineMagnifyingGlass />Completar Formulario</Button>
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
                        {procedureInstance.getAttachments().map((attachment, index) => (
                            <AttachmentItem key={index} attachment={attachment} procedureData={procedureData} completarAdjunto={completarAdjunto} />
                        ))}
                    </div>
                </LayoutSection>
            ) : null
        );
    };
    

    const AttachmentItem: React.FC<{ attachment: any, procedureData: ProcedureData, completarAdjunto: Function }> = ({ attachment, procedureData, completarAdjunto }) => {
        return(
            <div style={{ display: "flex", flexDirection: "column", width: "auto", margin: "10px 0px 15px 0px" }}>
            <LayoutSection>
                <h1>{attachment} </h1>
                {procedureData && procedureData.getAttachments() && procedureData.getAttachments()!.includes(attachment) ? (
                    <h1><MdCheck />Adjunto completado</h1>
                ) : (
                    <Button onClick={() => completarAdjunto(attachment)}>
                        <HiOutlineMagnifyingGlass />Adjuntar Documento</Button>
                )}
            </LayoutSection>
        </div>
        )
    };
    

    if (render==="form"){
        return renderFormComponent();

    }else{

        return (
            <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto", padding:"15px"}}>
                {showProcedureCorrectedUploaded && (<CitizeProcedureUploadedProps close={backFunction} ProcedureTitle={procedureInstance.getTitle()} />)}

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