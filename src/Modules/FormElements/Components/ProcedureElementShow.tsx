import { ButtonHTMLAttributes, ChangeEvent, HTMLAttributes, SetStateAction, useContext, useEffect, useState } from "react";
import { FormElement, FormElementInstance } from "../OLDTYPES";
import { ElementPropsMap, ElementSchemaTypes, FormElementBases, HelpToken } from "../Types";
import { ElementWrapper, BaseWrapperInfo, InputWrapper, ElementError, SelectWrapper, FileWrapper, CheckboxWrapper } from "./StyledComponents";
import { FormWrapperInput } from "../../../Components/Forms/StyledComponents";
import { AiOutlineCheckCircle, AiOutlineEyeInvisible } from "react-icons/ai";
import { ElementInstance, ElementSchema, FormInstance, ProcedureInstance } from "../Class";
import { ErrorMessage, Form, Formik, getIn, useField, useFormikContext } from "formik";
import { validationFunctions } from "../Validators";
import { MdOutlineDataset, MdOutlineNewLabel, MdRadioButtonUnchecked } from "react-icons/md";
import { LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../../../Components/Layout/StyledComponents";
import {Element} from './Element';
import { Button } from "../../../Components/Forms/Button";
import { FormContext } from "../../../Contexts/FormContext";
import { FormElementShow } from "./FormsElement";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";


interface Arguments {
    procedure:ProcedureInstance<ElementSchemaTypes>;
}

interface FormGenericData {
    code: string;
    title:string;
  }

  export const ProcedureElementShow: React.FC<Arguments> = ({procedure}) => {
    
    const initialValues = Object.entries(procedure.getForms()).reduce((acc, [key, obj]) => ({ ...acc, [key]: obj.valueOf }), {});
    
    const { UpdateForms, formularios, isLoading} = useContext(FormContext);
    const [form, setForm] = useState <FormInstance<ElementSchemaTypes>> ();
    const [formData, setFormData]=useState <FormGenericData []> ([]);

    const [showForm, setShowForm] = useState(false)

    const checkForm = (formCode:string) => {
        if (formCode && formCode!=""){
            if (formularios.length>0){
                const formularioEncontrado = formularios.find(
                    (formulario) => formulario.getCode() === formCode
                  );
                setForm (formularioEncontrado)
            }else{
                setForm(undefined)
                setShowForm(false)
            }
        }
    }

    useEffect(()=>{
        const formulariosAux: SetStateAction<FormGenericData[]> = [];

        procedure.getForms().map((element, index: number) => {

            const formularioEncontrado = formularios.find(
                (formulario) => formulario.getCode() === element);

            if (formularioEncontrado){
                const formDataAux: FormGenericData = {
                    code: formularioEncontrado.getCode(),
                    title: formularioEncontrado.getTitle(),
                  };
                  formulariosAux.push(formDataAux)
            }
            
            setFormData(formulariosAux)
         })
    },[])

    useEffect(()=>{
        if (form!=undefined){
            setShowForm(true)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }else{
            setShowForm(false)
        }
    },[form])

    
    

    if (showForm){
        return (
            <>
              <FormElementShow form={form!}  />
              <Button style={{margin:"25px 0px 25px 0px"}} onClick={() => setShowForm(false)}>Volver a Tramite</Button>
            </>
          )
    }else{
        return (
            <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto", padding:"15px"}}>
                <LayoutSection>
                    <h1><MdOutlineNewLabel />Datos Generales del Trámite</h1>
                    <h2 style={{textAlign:"center"}}> {procedure.getTitle()} </h2>
                    <h2> Temática: {procedure.getTheme()} </h2>
                    <h2> Descripción:{procedure.getDescription()} </h2>
                 </LayoutSection>    
                <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto"}}>
                <LayoutSection>
                    <h1><MdOutlineDataset />Campos del trámite</h1>
    
                    <Formik
                validateOnBlur={false}
                validateOnChange={false}
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={(e:any)=>{
                    console.log(e)
                }}
                >
                <Form autoComplete="off">
    
                <h2><MdOutlineDataset />Formularios del trámite</h2>
    
                {formData.length>0&&formData.map((element, index: number) => (
                <div key={index}  style={{display:"flex", flexDirection:"column", width:"auto", margin:"10px 0px 15px 0px"}}>
                    <LayoutSection>
                    <h1>{element.code} - {element.title} </h1>
                    <Button onClick={ () => checkForm(element.code)} > <HiOutlineMagnifyingGlass/>Ver Formulario</Button>
                    </LayoutSection>
                </div>
                ))}  
                    <h2><MdOutlineDataset />Adjuntos habilitados</h2>
    
                    <LayoutSpacer/>
                        {procedure.getAttachments().map((element, index: number) => (
                        <div key={index}  style={{display:"flex", flexDirection:"column", width:"auto", margin:"10px 0px 15px 0px"}}>
                            <LayoutSection>
                            <h1>{element}</h1>
                            </LayoutSection>
                        </div>
                        ))}  
                </Form>
                </Formik>
                </LayoutSection> 
                </div>
                
                <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto"}}>
    
                </div>
            </div>
        )
    }
    
  }