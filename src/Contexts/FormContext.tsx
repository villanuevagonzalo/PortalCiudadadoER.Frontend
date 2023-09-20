import { FC, SetStateAction, createContext, useEffect, useState } from "react";
import { ElementInstance, ElementSchema, FormInstance } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";
import { AxiosResponse } from "axios";
import { ResponseError, handleResponse } from "../Config/Axios";
import { FormAPI } from "../Services/ActorFormAPI";


export type FieldsType = ElementInstance<ElementSchemaTypes>[];


const ContextValues = () => {

  const AxiosFormAPI = new FormAPI();
  const [formularios, setFormularios] = useState<FormInstance<ElementSchemaTypes>[]>([]);
  const [publishedFormularios, setPublishedFormularios]= useState<FormInstance<ElementSchemaTypes>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");

  //create a form
  const SaveForm = async (newFormulario: FormInstance<ElementSchemaTypes>, setFormState: Function, code:string, title:string) => {
    setIsLoading(true)
    const response: AxiosResponse = await handleResponse(AxiosFormAPI.Create, newFormulario.getJSON(), setFormState);
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const responseData = JSON.parse(response.data.data);
      const codeResponse = responseData[0].CODE;
      const titleResponse = responseData[0].TITLE
      if (status && codeResponse == code && titleResponse == title) {
        setFormularios(prevState => ([...prevState, newFormulario]));
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
  const UpdateOneForm = async(updateFormulario: FormInstance<ElementSchemaTypes>, setFormState: Function, code:string) => {
    setIsLoading(true)
    const response: AxiosResponse = await handleResponse(AxiosFormAPI.Update, updateFormulario.getJSON(), setFormState);
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const responseData = JSON.parse(response.data.data);
      const codeResponse = responseData[0].CODE;
      
      if (status && codeResponse == code ) {
        setFormularios(prevFormularios => prevFormularios.filter(formulario =>formulario.getCode() !== code )); //delete the old form
     
        setFormularios(prevState => ([...prevState, updateFormulario])); //set the new form
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

  //delete a form
  const DeleteOneForm = async(code:string, setFormState: Function) => {
    setIsLoading(true);
    const jsonObject = {
      code: code
    };
    const response: AxiosResponse = await handleResponse(AxiosFormAPI.Delete, jsonObject, setFormState);
    setIsLoading(false);

    return response;
  }

  //get complete forms list
  const UpdateForms = async() => {
    setIsLoading(true)
    let responseAll:AxiosResponse | ResponseError | null = null;
    try { responseAll = await AxiosFormAPI.GetAll(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }

    if(responseAll && responseAll.status!==204) 
    {
      const Form_data = responseAll.data.data;
      const FormsObj = JSON.parse(Form_data);
      const formulariosAux: SetStateAction<FormInstance<ElementSchemaTypes>[]> = [];
      const mappedArray = FormsObj.map((formInstance: any) => {
        let fields: FieldsType = [];
        /*let componentes= JSON.parse(formInstance.STATUS)
        componentes.map((componente: any, index:number)=> {
          const aux= new ElementInstance((index+1).toString(), new ElementSchema(componente.type, { label: 'Ingresá el Título' }, ["isRequired"]));
          aux.update((componente.properties))
          fields.push(aux);
          });*/
          const Formulario = new FormInstance(
            formInstance.CODE,
            formInstance.TITLE,
            formInstance.SUBTITLE,
            formInstance.DESCRIPTION,
            formInstance.KEYWORDS,
            formInstance.STATUS,
        );
        formulariosAux.push(Formulario);
      });   
      setFormularios(formulariosAux);
    }
    setIsLoading(false); 
  }

  //get complete published forms
  const UpdatePublishedForms = async() => {
    setIsLoading(true)
    let responseAll:AxiosResponse | ResponseError | null = null;
    try { responseAll = await AxiosFormAPI.GetPublishedAll(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }
    if(responseAll && responseAll.status!==204) 
    {
      const Form_data = responseAll.data.data;
      const FormsObj = JSON.parse(Form_data);
      const formulariosAux: SetStateAction<FormInstance<ElementSchemaTypes>[]> = [];
      const mappedArray = FormsObj.map((formInstance: any) => {
        let fields: FieldsType = [];
        
          const Formulario = new FormInstance(
            formInstance.CODE,
            formInstance.TITLE,
            formInstance.SUBTITLE,
            formInstance.DESCRIPTION,
            formInstance.KEYWORDS,
            formInstance.STATUS,
        );
        formulariosAux.push(Formulario);
      });   
      setPublishedFormularios(formulariosAux);
    }
    setIsLoading(false); 
  }


  /////////////////////////////////////////////////////////

  const GetElementsByCode = async(code:string, setFormState: Function) => {
    setIsLoading(true);
    const jsonObject = {
      code: code
    };
    const response: AxiosResponse = await handleResponse(AxiosFormAPI.GetElements, jsonObject, setFormState);
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const formularioEncontrado = formularios.find(form => form.getCode() === code);

      if (status !==204 ){

        if (formularioEncontrado) {
          const componentesArray = JSON.parse(response.data.data.replace(/\\"/g, '"'));

          componentesArray.forEach((componente:any, index:number) => {
            const aux= new ElementInstance((index+1).toString(), new ElementSchema(componente.type, { label: 'Ingresá el Título' }, ["isRequired"]));
            aux.update((componente.properties))
            formularioEncontrado.addElement(aux)
          });
          setIsLoading(false);
          return true
  
        } else {
          console.log('Formulario no encontrado');
          setIsLoading(false);
          return false;
        }

      }else{

        setIsLoading(false);
        return false;

      }
      
    }
  }

  const GetFormByCode = async(code:string, setFormState: Function) => {
    setIsLoading(true);
    const jsonObject = {
      code: code
    };
    const response: AxiosResponse = await handleResponse(AxiosFormAPI.GetByCode, jsonObject, setFormState);
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const formularioEncontrado = formularios.find(form => form.getCode() === code);


      if (status !==204 ){

        if (formularioEncontrado) {
          
          const dato= JSON.parse(response.data.data)
         
          if (dato[0].DESCRIPTION!=undefined){
            formularioEncontrado.setDescription(dato[0].DESCRIPTION)
          }
          if (dato[0].SUBTITLE!=undefined){
            formularioEncontrado.setSubtitle(dato[0].SUBTITLE)
          }
          if (dato[0].CREATED_AT!=undefined){
            formularioEncontrado.setCreated_at(dato[0].CREATED_AT)
          }
          
          setIsLoading(false);
          return true
  
        } else {
          console.log('Formulario no encontrado');
          setIsLoading(false);
          return false;
        }

      }else{

        setIsLoading(false);
        return false;
        
      }
      
    }
  }
  /////////////////////////////////////////////////////////

  const UserClearData = () => {
    setFormularios([]);
  }

  return {
    isLoading,
    formularios,
    publishedFormularios,
    setFormularios,
    SaveForm, 
    UpdateOneForm,
    DeleteOneForm,
    UpdateForms,
    UpdatePublishedForms,
    GetElementsByCode,
    GetFormByCode
  }
}

export const FormContext = createContext({} as ReturnType<typeof ContextValues>);

const FormContextProvider: FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <FormContext.Provider value={ContextValues()}>
      {props.children}
    </FormContext.Provider>
  );
}

export default FormContextProvider;
  