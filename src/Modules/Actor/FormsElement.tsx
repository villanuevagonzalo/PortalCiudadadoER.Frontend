import { ElementPropsMap, ElementSchemaTypes, FormElementBases, HelpToken } from "../FormElements/Types";
import { ElementInstance, ElementSchema, FormInstance } from "../FormElements/Class";
import { ErrorMessage, Form, Formik, getIn, useField, useFormikContext } from "formik";
import { MdOutlineDataset, MdOutlineNewLabel, MdRadioButtonUnchecked } from "react-icons/md";
import { LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../../Components/Layout/StyledComponents";
import {Element} from './../FormElements/Components/Element';
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../../Contexts/FormContext";
import { IFormState } from "../../Interfaces/Data";
import { DefaultFormState } from "../../Data/DefaultValues";
import { LoadingFormPopUp } from "../../Components/Forms/PopUpCards";


interface Arguments {
    form:FormInstance<ElementSchemaTypes>;
  }

  export const BackOfficesFormElement: React.FC<Arguments> = ({form}) => {


    const { GetElementsByCode, GetFormByCode, isLoading} = useContext(FormContext);
    const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
    const [ fields, setFields ] = useState<ElementInstance<ElementSchemaTypes>[]>([]);

    /* const [ description, setDescription ] = useState<string>(form.getDescription());
    const [ subtitle, setSubtitle ] = useState<string>(form.getSubtitle());

   useEffect(()=>{
       //this is the new code to get the elements appart
        if (form.elements.length==0){
          GetElementsByCode(form.getCode(),setFormState )
        }else{
          setFields(form.elements);
        }
        console.log("esto es lo que hay: "+form.getDescription==undefined )
        if (form.getDescription==undefined && form.getSubtitle==undefined){
            GetFormByCode(form.getCode(),setFormState)
        }
        
      },[])*/

      useEffect(() => {
    
        const fetchData = async () => {
         
            // Luego ejecuta GetFormByCode si es necesario
          if (form.description === undefined && form.subtitle === undefined) {
            await GetFormByCode(form.getCode(), setFormState);
          }

          // Comienza por ejecutar GetElementsByCode
          if (form.elements.length === 0) {
            await GetElementsByCode(form.getCode(), setFormState);
          } else {
            setFields(form.elements);
          }
        };
      
        fetchData();
      }, []);
    
        //this is the new code to get the elements appart
      useEffect(()=>{
          setFields(form.elements);
      },[form.elements])

  /*    useEffect(()=>{
        setDescription(form.getDescription());
    },[form.description])

    useEffect(()=>{
        setDescription(form.getSubtitle());
    },[form.subtitle])*/

    const initialValues = Object.entries(form.elements).reduce((acc, [key, obj]) => ({ ...acc, [key]: obj.value }), {});
    return (
        
        <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto", padding:"15px"}}>
            {isLoading&& <LoadingFormPopUp />}

            <LayoutSection style={{margin:"5px 0px 15px 0px"}}>
                <h1><MdOutlineNewLabel />Datos Generales del Formulario</h1>
                
                <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                    <h1>Título</h1>
                    <p>{form.getTitle()}</p>
                </LayoutSection>
                <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                    <h1>Subtítulo</h1>
                    <p>{form.getSubtitle()}</p>
                </LayoutSection>
                <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                    <h1>Descripción</h1>
                    <p>{form.getDescription()} </p>
                </LayoutSection>
                <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                    <h1>Palabras claves</h1>
                    <p>{form.getKeywords()} </p>
                </LayoutSection>

            </LayoutSection>    
            <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto"}}>
                <LayoutSection style={{margin:"5px 0px 15px 0px"}}>
                    <h1><MdOutlineDataset />Campos de formulario</h1>
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
                            {fields.map((element: ElementInstance<ElementSchemaTypes>, index: number) => (
                            <div key={element.name}  style={{display:"flex", flexDirection:"column", width:"auto", margin:"10px 0px 15px 0px"}}>
                                <Element instance={element} />
                            </div>
                            ))}  
                            <LayoutStackedPanel>
                                <LayoutSpacer/>
                            </LayoutStackedPanel>
                        </Form>
                    </Formik>
                </LayoutSection> 
            </div>
            <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto"}}>
            </div>
        </div>
    )
  }