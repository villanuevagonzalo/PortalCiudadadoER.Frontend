import { FC, SetStateAction, createContext, useEffect, useState } from "react";
import { ElementInstance, ElementSchema, FormInstance } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";
import { AxiosResponse } from "axios";
import { ResponseError, handleResponse } from "../Config/Axios";
import { FormAPI } from "../Services/ActorFormAPI";
import { CiudadanoFormAPI } from "../Services/CiudadanoFormAPI";


export type FieldsType = ElementInstance<ElementSchemaTypes>[];

export type FormData = {
    procedure_data_id: number;
    form_unit_code: string;
    form_data: string;
    attachments?: File[];
};


const ContextValues = () => {

  const AxiosCiudadanoFormAPI = new CiudadanoFormAPI();
  const [ciudadanoFormularios, setCiudadanoFormularios] = useState<FormInstance<ElementSchemaTypes>[]>([]);
  const [publishedFormularios, setPublishedFormularios]= useState<FormInstance<ElementSchemaTypes>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");

  //create a form
  const SaveForm = async (newFormularioData: any, setFormState: Function) => {
    setIsLoading(true)
    const response: AxiosResponse = await handleResponse(AxiosCiudadanoFormAPI.Create, newFormularioData, setFormState);
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const responseData = JSON.parse(response.data.data);
      if (status) {
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
    const response: AxiosResponse = await handleResponse(AxiosCiudadanoFormAPI.Update, updateFormulario.getJSON(), setFormState);
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const responseData = JSON.parse(response.data.data);
      const codeResponse = responseData[0].CODE;
      if (status && codeResponse == code ) {
        setCiudadanoFormularios(prevFormularios => prevFormularios.filter(formulario =>formulario.getCode() !== code )); //delete the old form
        setCiudadanoFormularios(prevState => ([...prevState, updateFormulario])); //set the new form
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
    const response: AxiosResponse = await handleResponse(AxiosCiudadanoFormAPI.Delete, jsonObject, setFormState);
    setIsLoading(false);

    return response;
  }

  //get complete forms list
  const UpdateForms = async() => {
    setIsLoading(true)
    let responseAll:AxiosResponse | ResponseError | null = null;
    try { responseAll = await AxiosCiudadanoFormAPI.GetAll(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }

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
      setCiudadanoFormularios(formulariosAux);
    }
    setIsLoading(false); 
  }

  const UserClearData = () => {
    setCiudadanoFormularios([]);
  }

  return {
    isLoading,
    ciudadanoFormularios,
    publishedFormularios,
    setCiudadanoFormularios,
    SaveForm, 
    UpdateOneForm,
    DeleteOneForm,
    UpdateForms
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
  