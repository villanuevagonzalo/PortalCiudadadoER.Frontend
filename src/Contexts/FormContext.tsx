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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");

  const SaveForm = async (formulario: any, setFormState: Function, code:string, title:string) => {
    const response: AxiosResponse = await handleResponse(AxiosFormAPI.Create, formulario, setFormState);
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const responseData = JSON.parse(response.data.data);
      const codeResponse = responseData[0].CODE;
      const titleResponse = responseData[0].TITLE
      if (status && codeResponse == code && titleResponse == title) {
        const elements=JSON.parse(formulario.elements)
        let newFields: FieldsType = [];
        elements.map((componente: any, index: number) => {
          const aux = new ElementInstance((index + 1).toString(), new ElementSchema(componente.type, { label: 'Ingresá el Título' }, ["isRequired"]));
          aux.update((componente.properties))
          newFields.push(aux);
        });
        const nuevoFormulario = new FormInstance(formulario.code, formulario.title,formulario.subtitle, formulario.description, formulario.keywords, formulario.status, newFields)
        setFormularios(prevState => ([...prevState, nuevoFormulario]));
        return true;
      }
      else{
        return false;
      }
    }
    return false;
  }

  const UpdateOneForm = async(formulario: any, setFormState: Function, code:string) => {
    const response: AxiosResponse = await handleResponse(AxiosFormAPI.Update, formulario, setFormState);
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const responseData = JSON.parse(response.data.data);
      const codeResponse = responseData[0].CODE;
      if (status && codeResponse == code ) {
        setFormularios(prevFormularios => prevFormularios.filter(formulario =>formulario.getCode() !== code )); //delete the old form
        const elements=JSON.parse(formulario.elements)
        let newFields: FieldsType = [];
        elements.map((componente: any, index: number) => {
          const aux = new ElementInstance((index + 1).toString(), new ElementSchema(componente.type, { label: 'Ingresá el Título' }, ["isRequired"]));
          aux.update((componente.properties))
          newFields.push(aux);
        });
        const nuevoFormulario = new FormInstance(formulario.code, formulario.title,formulario.subtitle, formulario.description, formulario.keywords, formulario.status, newFields)
        setFormularios(prevState => ([...prevState, nuevoFormulario])); //set the new form
        return true;
      }
      else{
        return false;
      }
    }
    return false;

  }

  const DeleteOneForm = async(code:string, setFormState: Function) => {
    const response: AxiosResponse = await handleResponse(AxiosFormAPI.Delete, code, setFormState);
    console.log("esto devuelve"+response)

  }


  const UpdateForms = async() => {

    setIsLoading(true)
    let responseAll:AxiosResponse | ResponseError | null = null;
    
    try { responseAll = await AxiosFormAPI.GetAll(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }
    //let forms=responseAll!.data.data; 
   // response_without_backslashes = json.loads(response.replace('\\', ''))
    
   //let FormData = "[]";
   if(responseAll && responseAll.status!==204) 
   {
    const FormData = responseAll.data.data;
      const FormsObj = JSON.parse(FormData);
      const formulariosAux: SetStateAction<FormInstance<ElementSchemaTypes>[]> = [];

      const mappedArray = FormsObj.map((formInstance: any) => {
        // Procesar cada elemento del arreglo aquí y retornar el resultado
        // Puedes hacer cualquier operación o transformación en formInstance

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

  const UserClearData = () => {
    setFormularios([]);
  }

  return {
    isLoading,
    formularios,
    setFormularios,
    SaveForm, 
    UpdateOneForm,
    DeleteOneForm,
    UpdateForms
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
  