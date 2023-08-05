import { FC, SetStateAction, createContext, useEffect, useState } from "react";
import { ElementInstance, ElementSchema, FormInstance } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";
import axios, { AxiosResponse } from "axios";
import { ResponseError, handleResponse } from "../Config/Axios";
import { FormAPI } from "../Services/FormAPI";


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
       /* const elements=JSON.parse(formulario.elements)
        let newFields: FieldsType = [];
        elements.map((componente: any, index: number) => {
          const aux = new ElementInstance((index + 1).toString(), new ElementSchema(componente.type, { label: 'Ingresá el Título' }, ["isRequired"]));
          aux.update((componente.properties))
          newFields.push(aux);
        });
        const nuevoFormulario = new FormInstance(formulario.code, formulario.title,formulario.subtitle, formulario.description, formulario.keywords, formulario.status, newFields)*/
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
      const FormData = responseAll.data.data;
      const FormsObj = JSON.parse(FormData);
      const formulariosAux: SetStateAction<FormInstance<ElementSchemaTypes>[]> = [];
      const mappedArray = FormsObj.map((formInstance: any) => {
        let fields: FieldsType = [];
        let componentes= JSON.parse(formInstance.STATUS)
        componentes.map((componente: any, index:number)=> {
          const aux= new ElementInstance((index+1).toString(), new ElementSchema(componente.type, { label: 'Ingresá el Título' }, ["isRequired"]));
          aux.update((componente.properties))
          fields.push(aux);
          });
        const Formulario = new FormInstance(
            formInstance.CODE,
            formInstance.TITLE,
            formInstance.SUBTITLE,
            formInstance.DESCRIPTION,
            formInstance.ELEMENTS,
            formInstance.KEYWORDS,
            fields
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
      const FormData = responseAll.data.data;
      const FormsObj = JSON.parse(FormData);
      const formulariosAux: SetStateAction<FormInstance<ElementSchemaTypes>[]> = [];
      const mappedArray = FormsObj.map((formInstance: any) => {
        let fields: FieldsType = [];
        let componentes= JSON.parse(formInstance.STATUS)
        componentes.map((componente: any, index:number)=> {
          const aux= new ElementInstance((index+1).toString(), new ElementSchema(componente.type, { label: 'Ingresá el Título' }, ["isRequired"]));
          aux.update((componente.properties))
          fields.push(aux);
          });
        const Formulario = new FormInstance(
            formInstance.CODE,
            formInstance.TITLE,
            formInstance.SUBTITLE,
            formInstance.DESCRIPTION,
            formInstance.ELEMENTS,
            formInstance.KEYWORDS,
            fields
        );
        formulariosAux.push(Formulario);
      });   
      setPublishedFormularios(formulariosAux);
    }
    setIsLoading(false); 
  }

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
    UpdatePublishedForms
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
  