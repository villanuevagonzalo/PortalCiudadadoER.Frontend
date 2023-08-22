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
import { BiArrowBack } from "react-icons/bi";

interface Arguments {
    procedureInstance:ProcedureInstance<ElementSchemaTypes>;
}

interface FormGenericData {
    code: string;
    title:string;
  }

  export const CiudadanoProcedureData: React.FC<Arguments> = ({procedureInstance}) => {

   
    const {formularios, UpdateForms} = useContext(FormContext);
    const { ciudadanoProcedures } = useContext(CiudadanoProcedureContext);

    const [formsOfGenericProcedure, setFormsOfGenericProcedure] = useState <FormInstance<ElementSchemaTypes>[]> ([]);
    const [procedureData, setProcedureData] = useState <ProcedureData > ();

    const [formToComplete, setFormToComplete] = useState <FormInstance<ElementSchemaTypes>> ();
    const [render, setRender] = useState("home")

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
        
        console.log("esto es lo que tengo en ciudadanoProcedures: "+JSON.stringify(ciudadanoProcedures))
        const filteredProcedure = ciudadanoProcedures.find(procedure => procedure.getProcedureUnitId() === procedureInstance.getId());
        console.log("asdf "+JSON.stringify(filteredProcedure))
        setProcedureData(filteredProcedure);

    },[ciudadanoProcedures])
    

    useEffect(()=>{

        if (formToComplete!=undefined && procedureData!=undefined){

            setRender("form")
        }
    },[formToComplete])


    const renderFormComponent = () => {
        if (formToComplete && procedureData) {
            return (
                <CiudadanoFormElement form={formToComplete} procedureID={procedureData.getId()} close={setRender} />
            );
        }
        return null;
    };

    if (render==="form"){
        return renderFormComponent();

    }else{

        return (
            <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto", padding:"15px"}}>
                
                <Button style={{width:"200px", margin:"0px 0px 15px 0px"}} > <BiArrowBack/>Volver a trámites</Button>

                <LayoutSectionProcedureTitle style={{display:"flex", flexDirection:"column", justifyContent:"center", margin:"5px 0px 15px 0px"}}>
                    <h1 style={{textAlign:"center"}} >{procedureInstance.getTitle()}</h1>
                </LayoutSectionProcedureTitle>
                <LayoutSection style={{margin:"5px 0px 15px 0px"}}>
                    <h1><MdOutlineNewLabel />Datos Generales del Trámite</h1>
                    <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                        <h1>Categoría</h1>
                        <p>{procedureInstance.getTheme()}</p>
                    </LayoutSection>
                    <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                        <h1>Descripción</h1>
                        <p>{procedureInstance.getDescription()}</p>
                    </LayoutSection>
                    <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                        <h1>Organismo</h1>
                        <p>{procedureInstance.getSecretary()}</p>
                    </LayoutSection>
                 </LayoutSection>    
      
                <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto"}}>
                <LayoutSection style={{margin:"5px 0px 15px 0px"}}>
                  <h1><MdOutlineDataset />Campos del trámite</h1>
                  <h2><MdOutlineDataset />Formularios del trámite</h2>
                  {procedureInstance.getForms().length>0&&formsOfGenericProcedure.map((forms:any, index: number) => (
                  <div key={index}  style={{display:"flex", flexDirection:"column", width:"auto", margin:"10px 0px 15px 0px"}}>
                      <LayoutSection>
                      <h1>{forms.getTitle()} </h1>
                     {procedureData && procedureData.getForms().includes(forms.getCode().toString()) ? (
                            <><h1><MdCheck />Formulario completado</h1></>
                        ) : (
                            <Button onClick={() => completarForm(forms)}> <HiOutlineMagnifyingGlass />Completar Formulario</Button>
                        )}
                      </LayoutSection>
                  </div>
                  ))}  
                </LayoutSection> 
                
                <LayoutSection> 
                {procedureInstance.getAttachments().length > 0 && (
                <div>
                    <h2><MdOutlineDataset />Adjuntos</h2>
                    {procedureInstance.getAttachments().map((attachment: any, index: number) => (
                        <div key={index} style={{ display: "flex", flexDirection: "column", width: "auto", margin: "10px 0px 15px 0px" }}>
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
                    ))}
                </div>
            )}
                </LayoutSection> 
                </div>
                
                
            </div>
        )

    }
    
  }