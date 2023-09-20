import { MdOutlineDataset, MdOutlineNewLabel } from "react-icons/md";
import { LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../../Components/Layout/StyledComponents";
import { ElementInstance, FormInstance, ProcedureData } from "../FormElements/Class";
import { ElementSchemaTypes } from "../FormElements/Types";
import { Form, Formik } from "formik";
import {Element} from '../FormElements/Components/Element';
import { Button } from "../../Components/Forms/Button";
import { CitizenFormCompleteAllFiles } from "../../Components/Forms/PopUpCards";
import { useContext, useEffect, useState } from "react";
import { BiArrowBack, BiSend } from "react-icons/bi";
import { CiudadanoFormContext } from "../../Contexts/CiudadanoFormContext";
import { IFormState } from "../../Interfaces/Data";
import { DefaultFormState } from "../../Data/DefaultValues";
import { CitizeFormUploadedProps, CitizenGenericAlertPopUp } from "../../Components/Forms/CitizenPopUpCards";
import { ButtonWrapper } from "../FormElements/Components/StyledComponents";
import { FormikButton } from "../../Components/Forms/FormikButton";
import { FilesContext } from "../../Contexts/FilesContext";
import { FormContext } from "../../Contexts/FormContext";

interface Arguments {
    procedureData:ProcedureData,
    form:FormInstance<ElementSchemaTypes>;
    close:Function
  }

  type FieldsType = ElementInstance<ElementSchemaTypes>[];

  export const CiudadanoFormToCheckElement: React.FC<Arguments> = ({procedureData, form, close}) => {
    
    const { SaveForm } = useContext(CiudadanoFormContext);
    const { GetElementsByCode, GetFormByCode, isLoading} = useContext(FormContext);

    const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
    const {fileArray} = useContext(FilesContext)

    const [showAlertCompleteElements, setShowAlertCompleteElements] = useState(false); 
    const [elementToComplete, setElementToComplete] = useState <string> ()
    const [showFormCorrectedUploaded, setShowFormCorrectedUploaded] = useState(false)
    const [showFormUploadError, setShowFormUploadError] = useState(false)

    const checkValues = () => {
        let hasRequiredEmptyElement = false;
    
        form.elements.forEach((element: ElementInstance<ElementSchemaTypes>, index: number) => {
            const jsonString = JSON.stringify(element.properties);
            const propertiesObj = JSON.parse(jsonString);
            const value = element.getValue();
    
            if (propertiesObj.required === true && value === "") {
                setElementToComplete(element.properties.label);
                setShowAlertCompleteElements(true);
                hasRequiredEmptyElement = true; // Mark that a required empty element was found
            }
        });
    
        if (!hasRequiredEmptyElement) {
            enviar(); // Call enviar() only if there are no required empty elements
        }
    };

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
            //setFields(form.elements);
          }
      
          
        };
      
        fetchData();
      }, []); 


    const enviar = async () => {
        const elements_common: FieldsType = [];
        const hasArray = form.elements.some((element: ElementInstance<ElementSchemaTypes>, index: number) => {
          if (element.type === "FILE") {
            return true;
          }
          elements_common.push(element);
          return false;
        });
      
        const data = {
          procedure_data_id: Number(procedureData.getId()),
          form_unit_code: form.getCode(),
          form_data: JSON.stringify(elements_common),
          ...(hasArray && { attachments: fileArray }) // Agregar las attachments solo si hasArray es true
        };
      
        const response = await SaveForm(procedureData, data, setFormState);
        if (response) {
          setShowFormCorrectedUploaded(true);
        } else {
          setShowFormUploadError(true);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

    const initialValues = Object.entries(form.elements).reduce((acc, [key, obj]) => ({ ...acc, [key]: obj.value }), {});
    
    //Required to not render until it is form
    if (!form) {
        return null;
    }

    return (
        <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto", padding:"15px"}}>
            {showAlertCompleteElements && (<CitizenFormCompleteAllFiles element={elementToComplete!} close={setShowAlertCompleteElements}  />)}
            {showFormCorrectedUploaded && (<CitizeFormUploadedProps close={close} FormTitle={form.getTitle()} />)}
            { showFormUploadError && (<CitizenGenericAlertPopUp message={"Inconvenientes en la carga del formulario"} message2={"Disculpe las molestes. Intente más tarde."} close={setShowFormUploadError} />)}
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
                            {form.elements.map((element: ElementInstance<ElementSchemaTypes>, index: number) => (
                            <div key={element.name}  style={{display:"flex", flexDirection:"column", width:"auto", margin:"10px 0px 15px 0px"}}>
                                <Element instance={element} className="flex-2"/>
                            </div>
                            ))}  
                            <LayoutStackedPanel>
                                <LayoutSpacer/>
                            </LayoutStackedPanel>
                        </Form>
                    </Formik>
                </LayoutSection> 
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button style={{width:"50px"}} onClick={ () => close("home")} ><BiArrowBack/> VOLVER</Button>
                <Button style={{width:"50px"}} color={"secondary"} onClick={ () => checkValues()} >CARGAR<BiSend/> </Button>
            </div>
        </div>
    )


  }