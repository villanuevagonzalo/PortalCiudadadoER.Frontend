import { MdCheck, MdOutlineDataset, MdOutlineNewLabel, MdVerifiedUser } from "react-icons/md";
import { LayoutSection, LayoutSpacer } from "../../Components/Layout/StyledComponents";
import { FormInstance, ProcedureInstance } from "../FormElements/Class";
import { ElementSchemaTypes } from "../FormElements/Types";
import { Button } from "../../Components/Forms/Button";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useContext, useEffect, useState } from "react";
import { FieldsType, FormContext } from "../../Contexts/FormContext";
import { CiudadanoFormElement } from "./FormDataElement";

interface Arguments {
    procedureInstance:ProcedureInstance<ElementSchemaTypes>;
    procedureData:ProcedureInstance<ElementSchemaTypes>;
}

interface FormGenericData {
    code: string;
    title:string;
  }

  export const CiudadanoProcedureData: React.FC<Arguments> = ({procedureInstance, procedureData}) => {

   
    const {formularios, UpdateForms} = useContext(FormContext);
    const [form, setForm] = useState <FormInstance<ElementSchemaTypes>[]> ([]);
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

    useEffect(()=>{
        const formulariosProcedureInstance = procedureInstance.getForms();
        const formulariosFiltrados = formularios.filter(formulario =>
            formulariosProcedureInstance.some(procFormulario => procFormulario === formulario.getCode())
        );
        setForm(formulariosFiltrados)
    },[formularios])

    useEffect(()=>{
        if (formToComplete!=undefined){
            setRender("form")
        }
    },[formToComplete])

    if (render=="form"){

        return (
            <CiudadanoFormElement form={formToComplete!} procedureID={procedureInstance.getId()!} close={setRender} />
        )

    }else{

        return (
            <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto", padding:"15px"}}>
                <LayoutSection style={{margin:"5px 0px 15px 0px"}}>
                    <h1><MdOutlineNewLabel />Datos Generales del Trámite</h1>
                    <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                        <h1>Título</h1>
                        <p>{procedureInstance.getTitle()}</p>
                    </LayoutSection>
                    <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                        <h1>Temática</h1>
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
                  {procedureInstance.getForms().length>0&&form.map((forms:any, index: number) => (
                  <div key={index}  style={{display:"flex", flexDirection:"column", width:"auto", margin:"10px 0px 15px 0px"}}>
                      <LayoutSection>
                      <h1>{forms.getTitle()} </h1>
                      {forms.getCode().includes(procedureData.getForms()) ? (
                      <><h1><MdCheck />Formulario completado</h1>
                      <Button onClick={() => completarForm(forms)}> <HiOutlineMagnifyingGlass />Completar Formulario</Button></>

                      ) : (
                        <Button onClick={ () => completarForm(forms)} > <HiOutlineMagnifyingGlass/>Completar Formulario</Button>
                      ) }
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
                                {attachment.includes(procedureData.getAttachments()) ? (
                                    <h1><MdCheck />Adjunto completado</h1>
                                ) : (
                                    <Button onClick={() => completarAdjunto(attachment)}><HiOutlineMagnifyingGlass />Completar Formulario</Button>
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