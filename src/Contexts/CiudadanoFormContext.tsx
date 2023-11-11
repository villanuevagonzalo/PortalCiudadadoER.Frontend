import { FC, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { ElementInstance, ElementSchema, FormDataClass, FormInstance, ProcedureData } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";
import { AxiosResponse } from "axios";
import { ResponseError, handleResponse } from "../Config/Axios";
import { FormAPI } from "../Services/ActorFormAPI";
import { CiudadanoFormAPI } from "../Services/CiudadanoFormAPI";
import { AuthContext } from "./AuthContext";


export type FieldsType = ElementInstance<ElementSchemaTypes>[];

export type FormDataType = {
    procedure_data_id: number;
    form_unit_code: string;
    form_data: string;
    attachments?: File[];
};


const ContextValues = () => {

  const AxiosCiudadanoFormAPI = new CiudadanoFormAPI();
  const [ciudadanoFormularios, setCiudadanoFormularios] = useState<FormDataClass[]>([]);
  //const [publishedFormularios, setPublishedFormularios]= useState<FormInstance<ElementSchemaTypes>[]>([]);
  const [isLoadingFormCitizen, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");
  
  const [isUpdatingCitizenForms, setUpdatingCitizenForms] = useState<boolean>(true);

  const { isLogged } = useContext(AuthContext);
  useEffect(() => {

    if(!isLogged){
      setCiudadanoFormularios([])
      setIsLoading(false)
      setErrors("")
      setUpdatingCitizenForms(true)
    }
   
  }, [isLogged]);

  //create a form
  const SaveForm = async (procedureData:ProcedureData, newFormularioData: any, setFormState: Function) => {
    setIsLoading(true)
    const response: AxiosResponse = await handleResponse(AxiosCiudadanoFormAPI.Create, newFormularioData, setFormState);
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const responseData = JSON.parse(response.data.data);
      if (status) {
     
        let parsedAttachments=[]
        if (responseData[0].ATTACHMENTS!=""){
            parsedAttachments = responseData[0].ATTACHMENTS.split(",");
        }
        let parsedMultimediaID=[]
        if (responseData[0].MULTIMEDIA_ID!=""){
          parsedMultimediaID = responseData[0].ATTACHMENTS.split(",");
        }

        const newFormData = new FormDataClass(
          responseData[0].ID,
          responseData[0].FORM_UNIT,
          responseData[0].PROCEDURE_DATA_ID,
          responseData[0].STATUS,                        
          parsedAttachments,
          parsedMultimediaID,
          responseData[0].USER_ID,
          responseData[0].CREATED_AT,
          responseData[0].UPDATED_AT
      );
          
        setCiudadanoFormularios(prevState => ([...prevState, newFormData]));
        procedureData.setForms(newFormularioData.form_unit_code)
        setIsLoading(false)
        return true;
      }
      else{
        setIsLoading(false)
        return false;
      }
    }
    setIsLoading(false)
    return false;
  }

  //update a form
  const UpdateOneForm = async(procedureData:ProcedureData, newFormularioData: any, setFormState: Function) => {
    setIsLoading(true)
    const response: AxiosResponse = await handleResponse(AxiosCiudadanoFormAPI.Update, newFormularioData, setFormState);
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const responseData = JSON.parse(response.data.data);
      if (status  ) {
        const foundFormData = ciudadanoFormularios.find(formData => formData.getProcedureDataId() == procedureData.getId());
       
        if (foundFormData){
          let fields: ElementInstance<ElementSchemaTypes>[] = [];
          let componentes= responseData[0].ELEMENTS
          componentes.map((componente: any, index:number)=> {
                    const aux= new ElementInstance((index+1).toString(), new ElementSchema(componente.type, { label: 'Ingresá el Título' }, ["isRequired"]),componente.value);
                    aux.update((componente.properties))
                    fields.push(aux);
          });
          foundFormData.setElements(fields)
          setIsLoading(false)
          return true;
        }else{
          setIsLoading(false)
          return false;
        }
        
      }
      else{
        setIsLoading(false)
        return false;
      }
    }
    setIsLoading(false)
    return false;

  }

  //delete a form
  const DeleteOneForm = async(code:string, setFormState: Function) => {
    setIsLoading(true);
    const jsonObject = {
      code: code
    };
    const response: AxiosResponse = await handleResponse(AxiosCiudadanoFormAPI.Delete, jsonObject, setFormState);
    setIsLoading(false);

    return response;
  }

  //get complete forms list
  const UpdateCitizenForms = async() => {
    if (isUpdatingCitizenForms) {
      return;
    }
    setUpdatingCitizenForms(true)
    setIsLoading(true)
    let responseAll:AxiosResponse | ResponseError | null = null;
    try { responseAll = await AxiosCiudadanoFormAPI.GetAll(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }

    if(responseAll && responseAll.status!==204) 
    {
      const Form_data = responseAll.data.data;
      //const Size = responseAll.data.data.count;
      const responseData = JSON.parse(Form_data);
      const totalSize = responseData.count 

      if (Array.isArray(responseData.data) && responseData.data.length > 0) {
        let parsedAttachments=[]
        if (responseData.data[0].ATTACHMENTS !== undefined && responseData.data[0].ATTACHMENTS.trim() !== "") {
          parsedAttachments = responseData.data[0].ATTACHMENTS.split(",");
        }
        let parsedMultimediaID=[]
        if ( responseData.data[0].MULTIMEDIA_ID !== undefined && responseData.data[0].MULTIMEDIA_ID.trim() !== ""){
          parsedMultimediaID = responseData.data[0].ATTACHMENTS.split(",");
        }
        const newFormData = new FormDataClass(
          responseData[0].ID,
          responseData[0].FORM_UNIT,
          responseData[0].PROCEDURE_DATA_ID,
          responseData[0].STATUS,                        
          parsedAttachments,
          parsedMultimediaID,
          responseData[0].USER_ID,
          responseData[0].CREATED_AT,
          responseData[0].UPDATED_AT
       );
        setCiudadanoFormularios(prevState => ([...prevState, newFormData]));
      }
    }
    setUpdatingCitizenForms(false)
    setIsLoading(false); 
  }

  const UserClearData = () => {
    setCiudadanoFormularios([]);
  }

  /////////////////////////////////////////////////////////

  const GetCitizenElementsByCode = async(code:string, setFormState: Function) => {
    setIsLoading(true);
    const jsonObject = {
      form_code: code
    };
    const response: AxiosResponse = await handleResponse(AxiosCiudadanoFormAPI.GetElements, jsonObject, setFormState);
    
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;

      const formularioEncontrado = ciudadanoFormularios.find(form => form.getFormCode() === code);

      if (status !==204 ){

        if (formularioEncontrado) {
          const componentesArray = JSON.parse(response.data.data.replace(/\\"/g, '"'));
          componentesArray.forEach((componente:any, index:number) => {
            const aux= new ElementInstance(componente.properties.label,new ElementSchema(componente.type,componente.properties,componente.aditionalValidations), componente.value)
            aux.update((componente.properties))
            formularioEncontrado.addElement(aux)
          });
          setIsLoading(false);
          return true
  
        } else {
          
          setIsLoading(false);
          return false;
        }

      }else{
        setIsLoading(false);
        return false;
      }
    }
  }

  const GetCitizenFormByCode = async(code:string, setFormState: Function) => {
    setIsLoading(true);
    const jsonObject = {form_code: code};
    const response: AxiosResponse = await handleResponse(AxiosCiudadanoFormAPI.GetByCode, jsonObject, setFormState);
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      if (status){
        const responseData = JSON.parse(response.data.data);
          /*let fields: ElementInstance<ElementSchemaTypes>[] = [];
          let componentes= JSON.parse(responseData[0].ELEMENTS)
          componentes.map((componente: any, index:number)=> {
                    const aux= new ElementInstance((index+1).toString(), new ElementSchema(componente.type, { label: 'Ingresá el Título' }, ["isRequired"]));
                    aux.update((componente.properties))
                    fields.push(aux);
          });
          */

          let parsedAttachments=[]
          if (responseData[0].ATTACHMENTS!=""){
              parsedAttachments = responseData[0].ATTACHMENTS.split(",");
          }
          let parsedMultimediaID=[]
          if (responseData[0].MULTIMEDIA_ID!=""){
            parsedMultimediaID = responseData[0].ATTACHMENTS.split(",");
          }
  
          const newFormData = new FormDataClass(
            responseData[0].ID,
            responseData[0].FORM_UNIT,
            responseData[0].PROCEDURE_DATA_ID,
            responseData[0].STATUS,                        
            parsedAttachments,
            parsedMultimediaID,
            responseData[0].USER_ID,
            responseData[0].CREATED_AT,
            responseData[0].UPDATED_AT
        );

          setCiudadanoFormularios(prevState => ([...prevState, newFormData]));
          setIsLoading(false)
      }else{
        setIsLoading(false);
        return false;
      }
    }
  }

  /////////////////////////////////////////////////////////

  return {
    isLoadingFormCitizen,
    ciudadanoFormularios,
    //publishedFormularios,
    setCiudadanoFormularios,
    GetCitizenFormByCode,
    SaveForm, 
    UpdateOneForm,
    DeleteOneForm,
    UpdateCitizenForms,
    GetCitizenElementsByCode
  }
}

export const CiudadanoFormContext = createContext({} as ReturnType<typeof ContextValues>);

const CiudadanoFormContextProvider: FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <CiudadanoFormContext.Provider value={ContextValues()}>
      {props.children}
    </CiudadanoFormContext.Provider>
  );
}

export default CiudadanoFormContextProvider;
  