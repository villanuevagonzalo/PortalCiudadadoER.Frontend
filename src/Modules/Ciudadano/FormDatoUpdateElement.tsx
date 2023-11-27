import { MdOutlineDataset, MdOutlineNewLabel } from "react-icons/md";
import { LayoutSection, LayoutSpacer, LayoutStackedPanel, LayoutText } from "../../Components/Layout/StyledComponents";
import { ElementInstance, FormDataClass, FormInstance, ProcedureData } from "../FormElements/Class";
import { ElementSchemaTypes } from "../FormElements/Types";
import { Form, Formik } from "formik";
import {Element} from '../FormElements/Components/Element';
import { Button } from "../../Components/Forms/Button";
import { CitizenFormCompleteAllFiles } from "../../Components/Forms/PopUpCards";
import { useContext, useEffect, useState } from "react";
import { BiArrowBack, BiSend, BiTrash } from "react-icons/bi";
import { CiudadanoFormContext } from "../../Contexts/CiudadanoFormContext";
import { IFormState } from "../../Interfaces/Data";
import { DefaultFormState } from "../../Data/DefaultValues";
import { CitizeFormUploadedProps, CitizenGenericAlertPopUp } from "../../Components/Forms/CitizenPopUpCards";
import { FilesContext } from "../../Contexts/FilesContext";
import { FormContext } from "../../Contexts/FormContext";
import { Spinner } from "../../Components/Elements/StyledComponents";
import { ValidateForm2 } from "../FormElements/Validators";
import { fromPairs } from "lodash";
import { HiArrowDownTray, HiOutlineEnvelope } from "react-icons/hi2";

interface Arguments {
    procedureData:ProcedureData,
    form:FormInstance<ElementSchemaTypes>;
    setFormToCheck:Function,
    close:Function
  }

  type FieldsType = ElementInstance<ElementSchemaTypes>[];

  export const CiudadanoFormToCheckElement: React.FC<Arguments> = ({procedureData, form, setFormToCheck, close}) => {
    
    const { GetCitizenFormByCode, UpdateCitizenForms, UpdateOneForm, GetCitizenElementsByCode, ciudadanoFormularios, isLoadingFormCitizen, GetCiudadanoFormAttachment, DeleteCiudadanoFormAttachment, loadingFormAttachment } = useContext(CiudadanoFormContext);
    const { GetFormByCode, isLoading} = useContext(FormContext);
    
    const [citizenForm, setCitizenForm] = useState<FormDataClass>();
    const [formTemplate, setFormTemplate] = useState<ElementInstance<ElementSchemaTypes>[]>([]); //elements from form template or form instance if you want

    const [fields, setFields ] = useState<ElementInstance<ElementSchemaTypes>[]>([]); //elements with data from citizen data form

    const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
    const {fileArray} = useContext(FilesContext)

    const [showAlertCompleteElements, setShowAlertCompleteElements] = useState(false); 
    const [elementToComplete, setElementToComplete] = useState <string> ()
    const [showFormCorrectedUploaded, setShowFormCorrectedUploaded] = useState(false)
    const [showFormUploadError, setShowFormUploadError] = useState(false)

    const [showProcedureCorrectedUploaded, setShowProcedureCorrectedUploaded] = useState<boolean>(false) 
    const [showAttachmentMessage, setShowAttachmentMessage] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>("")
    const [alertMessage2, setAlertMessage2] = useState<string>("")

    useEffect(() => {
      const fetchData = async () => {
        const elementoBuscado = ciudadanoFormularios.find((elemento) => {
          return elemento.getFormCode() == form.getCode();
        });
        if (elementoBuscado){
          if (form.description === undefined && form.subtitle === undefined) {
            await GetFormByCode(form.getCode(), setFormState);
          }
          if (elementoBuscado.elements!=undefined && elementoBuscado.elements.length == 0){
            await GetCitizenElementsByCode(form.getCode(), setFormState);
          }
        }else{
          GetCitizenFormByCode(form.getCode(), setFormState)
        }
      }
      fetchData()
    }, []); 


    useEffect(()=>{
      const fetchData = async () => {
        const elementoBuscado = ciudadanoFormularios.find((elemento) => {
          return elemento.getFormCode() == form.getCode();
        });
        if (elementoBuscado){
          setCitizenForm(elementoBuscado)
         if (elementoBuscado.elements.length === 0) {
            await GetCitizenElementsByCode(form.getCode(), setFormState);
          } else {
            setFields(elementoBuscado.elements);
          }
        }
        
      };
      fetchData()

    },[ciudadanoFormularios])


    useEffect(()=>{
      const elementoBuscado = ciudadanoFormularios.find((elemento) => {
        return elemento.getFormCode() == form.getCode();
      });
      if (elementoBuscado) {
        setFields(elementoBuscado.elements);
      }
    },[citizenForm?.elements])


    const enviar = async () => {
      const elements_common: FieldsType = [];
      const hasArray = citizenForm!.elements.some((element: ElementInstance<ElementSchemaTypes>, index: number) => {
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
      
      const response = await UpdateOneForm(procedureData, data, setFormState);
      if (response) {
        setShowFormCorrectedUploaded(true);
      } else {
        setShowFormUploadError(true);
      }
     window.scrollTo({ top: 0, behavior: 'smooth' });
   };

 
   const AttachmentSection = () => {
    let elementoName = "";
    const fileNames: string[] = [];
    const attachments: string[] = citizenForm?.getAttachments() || [];
  
    if (attachments && typeof attachments[Symbol.iterator] === 'function') {
      for (const element of attachments) {
        console.log(element);
        fileNames.push(element);
      }
    }

    if (fileNames.length > 0) {
      return (
        <div>
          <h2><MdOutlineDataset />Adjuntos</h2>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize={true}
            initialValues={[]}
            onSubmit={(e: any) => {
              ///sendFile(procedureData, elementoName)
            }}
          >
            <Form autoComplete="off">
              {fileNames && fileNames.map((element: string, index: number) => (
                <div key={index} style={{ display: "flex", flexDirection: "column", width: "auto", margin: "30px 0px 15px 0px" }}>
                  <LayoutSection>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <h1><HiOutlineEnvelope />Archivo {element.split(".")[0]} cargado</h1>
                      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop:"15px" }}>
                        <Button fullwidth={false}  onClick={() => downloadAttachment(element)}  ><HiArrowDownTray/>{loadingFormAttachment ? <Spinner /> : <><p>Descargar</p></>} </Button>
                        <Button color="secondary" fullwidth={false}  onClick={() => deleteAttachment(element)}><BiTrash />{loadingFormAttachment ? <Spinner /> : <><p>Eliminar</p></>}</Button>
                      </div>
                    </div>
                  </LayoutSection>
                </div>
              ))}
            </Form>
          </Formik>
        </div>
      );
    } else {
      return (<></>);
    }
  };

  const downloadAttachment = async (attachmentName:string) => {


    const attachmentsAux = citizenForm?.getAttachments()
    const AttachmentWithoutExtensions: string[] = [];
            // Iterar sobre los archivos y obtener las extensiones
    attachmentsAux!.forEach(attachment => {
        const fileExtension = attachment.split('.')[0];   
        // Asegurarse de que haya una extensión antes de agregarla al array
        if (fileExtension) {
            AttachmentWithoutExtensions.push(fileExtension);
        }
    });
    const attachments = AttachmentWithoutExtensions
    const multimediaId = citizenForm?.getMultimediaId()

    let position = -1; 
    if (attachments && attachmentName) {
        for (let i = 0; i < attachments.length; i++) {
          if (attachments[i] == attachmentName.split(".")[0]) {
            position = i; // Guardamos la posición cuando encontramos el elemento
            break; // Salimos del bucle una vez que lo encontramos
          }
        }
      }

    if (position !== -1 && multimediaId) {
        const multimediaIdAtIndex = multimediaId[position];
        const response = await GetCiudadanoFormAttachment(multimediaIdAtIndex, attachmentName, setFormState);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setShowAttachmentMessage(true)
        setAlertMessage ("Error en la visualización del documento")
        setAlertMessage2 ("Intente más tarde.")
    }
}

const deleteAttachment = async (attachmentName:string) => {
    const attachmentsAux = citizenForm?.getAttachments()
    const AttachmentWithoutExtensions: string[] = [];
    // Iterar sobre los archivos y obtener las extensiones
    attachmentsAux!.forEach(attachment => {
        const fileExtension = attachment.split('.')[0];    
        // Asegurarse de que haya una extensión antes de agregarla al array
        if (fileExtension) {
            AttachmentWithoutExtensions.push(fileExtension);
        }
    });
    const attachments = AttachmentWithoutExtensions
    const multimediaId = citizenForm?.getMultimediaId()
    let position = -1; 

    if (attachments && attachmentName) {
        for (let i = 0; i < attachments.length; i++) {
          if (attachments[i] == attachmentName.split(".")[0]) {
            position = i; // Guardamos la posición cuando encontramos el elemento
                break; // Salimos del bucle una vez que lo encontramos
            }
        }
    }
    console.log("lest see position and multimedia id: "+position +" - "+multimediaId)
    if (position !== -1 && multimediaId) {

        const multimediaIdAtIndex = multimediaId[position];
        const response = await DeleteCiudadanoFormAttachment( citizenForm?.getFormDataId()!, multimediaIdAtIndex, setFormState);
        if (response){
            window.scrollTo({ top: 0, behavior: 'smooth' });
           // setProcedureDataAttachments((prevState) => prevState.filter((element) => element !== attachmentName));
            setAlertMessage ("Documento adjunto eliminado")
            setAlertMessage2 ("")
            setShowAttachmentMessage(true)

        }
        // Ahora "multimediaIdAtIndex" contiene el elemento en la posición "position"
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setAlertMessage ("Error")
        setAlertMessage2 ("Intente más tarde.")
        setShowAttachmentMessage(true)
    }
}
  
    const initialValues = Object.entries(form.elements).reduce((acc, [key, obj]) => ({ ...acc, [key]: obj.value }), {});
    
    //Required to not render until it is form
    if (!form) {
        return null;
    }

    return (
      (isLoading || isLoadingFormCitizen) ? 
      (<>
          <LayoutSection style={{margin:"5px 0px 15px 0px"}}>
            <Spinner color='secondary' size="3rem" /><br /><LayoutText className='text-center'>Cargando Información.<br />Por favor aguarde.</LayoutText>
          </LayoutSection>
      </>)
      :
       ( <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto", padding:"15px"}}>
            {showAlertCompleteElements && (<CitizenFormCompleteAllFiles element={elementToComplete!} close={setShowAlertCompleteElements}  />)}
            {showFormCorrectedUploaded && (<CitizeFormUploadedProps close={close} FormTitle={form.getTitle()} setFormToCheck={setFormToCheck} />)}
            {showFormUploadError && (<CitizenGenericAlertPopUp message={"Inconvenientes en la carga del formulario"} message2={"Disculpe las molestes. Intente más tarde."} close={setShowFormUploadError} />)}
            { showAttachmentMessage && (<CitizenGenericAlertPopUp message={alertMessage} message2={alertMessage2} close={setShowAttachmentMessage} />)}
            
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
                    <h1>Ha completado el formulario con la siguiente información</h1>
                    <Formik
                        validateOnBlur={false}
                        validateOnChange={false}
                        enableReinitialize={true}
                        initialValues={initialValues}
                        onSubmit={async(values:any)=>{
                          enviar()
                      }}
                      validate={(values: any) => ValidateForm2(values, fields)}
                    >
                      <Form autoComplete="off">
                        {fields.map((element: ElementInstance<ElementSchemaTypes>, index: number) => (
                          <div key={index}  style={{display:"flex", flexDirection:"column", width:"auto", margin:"10px 0px 15px 0px"}}>
                            <Element instance={element} className="flex-2"/>
                          </div>
                        ))}
                         <AttachmentSection  />
                        <LayoutStackedPanel>
                          <LayoutSpacer/>
                        </LayoutStackedPanel>

                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <Button style={{width:"50px"}} onClick={ () => {close("home"); setFormToCheck(undefined)}} ><BiArrowBack/> VOLVER</Button>
                          {procedureData.getStatus() === "INICIADO" &&(
                            <Button disabled={false} color="secondary" type="submit">MODIFICAR<BiSend/></Button>
                          )}
                        </div>
                      </Form>
                    </Formik>
                </LayoutSection> 
            </div>
        </div>)
    )

  }