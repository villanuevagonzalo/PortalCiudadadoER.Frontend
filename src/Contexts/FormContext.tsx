import { FC, createContext, useState } from "react";
import { ElementInstance, FormInstance } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";
import axios, { AxiosResponse } from "axios";
import { ResponseError, handleResponse } from "../Config/Axios";
import { FormAPI } from "../Services/FormAPI";


const ContextValues = () => {

  const AxiosFormAPI = new FormAPI();
  const [formularios, setFormularios] = useState<FormInstance<ElementSchemaTypes>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");

  const SaveForm = async (formularios: any, setFormState: Function) => {
    const response: AxiosResponse = await handleResponse(AxiosFormAPI.Create, formularios, setFormState);
    if (response.data) 
      {
        setFormularios(prevState => ([...prevState, formularios]));
      }
    return response;
  }
  
  const UpdateForms = async() => {

    setIsLoading(true)
    let responseAll:AxiosResponse | ResponseError | null = null;
    
    try { responseAll = await AxiosFormAPI.GetAll(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }
    console.log("respuesta completa: "+JSON.stringify(responseAll));
    
    setIsLoading(false); 
  }

  const UserClearData = () => {
    setFormularios([]);
  }

  return {
    formularios,
    SaveForm, 
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
  