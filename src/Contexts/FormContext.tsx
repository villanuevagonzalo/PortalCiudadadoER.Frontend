import { FC, SetStateAction, createContext, useEffect, useState } from "react";
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


  useEffect(() => {
    console.log("los formularios son: "+JSON.stringify(formularios))
  }, [formularios])
  
  const UpdateForms = async() => {

    setIsLoading(true)
    let responseAll:AxiosResponse | ResponseError | null = null;
    
    try { responseAll = await AxiosFormAPI.GetAll(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }
    let forms=responseAll!.data.data; 
   // response_without_backslashes = json.loads(response.replace('\\', ''))
    
   //let FormData = "[]";
   if(responseAll && responseAll.status!==204) 
   {
    const FormData = responseAll.data.data;
      
      console.log("esto llega: "+FormData)

      let str = '[ { "CODE": 25, "TITLE": "asdf", "SUBTITLE": "", "DESCRIPTION": "asdf", "KEYWORDS": "Borrador", "ELEMENTS": "asdf", "STATUS": "[{\\"type\\":\\"TEXT\\",\\"properties\\":{\\"label\\":\\"aaaaaaaaaaa\\",\\"required\\":false,\\"disabled\\":false},\\"aditionalValidations\\":[\\"isRequired\\"],\\"name\\":\\"0\\",\\"value\\":\\"\\"}]", "CREATED_AT": "2023-07-10 20:49:46", "UPDATED_AT": "2023-07-10 21:05:19", "CREATED_BY": 48, "UPDATED_BY": "" } ]';
      console.log("asi debería ser: "+str);

      const notificationsObj = JSON.parse(FormData);
      console.log("este es el status: "+JSON.stringify(notificationsObj[0]));
      const formulariosAux: SetStateAction<FormInstance<ElementSchemaTypes>[]> = [];

      notificationsObj.forEach((notification: { CODE: string; TITLE: string; SUBTITLE: string; DESCRIPTION: string; KEYWORDS: string; ELEMENTS: string; STATUS: ElementInstance<ElementSchemaTypes>[]; }) => {
        const Formulario = new FormInstance(
          notification.CODE,
          notification.TITLE,
          notification.SUBTITLE,
          notification.DESCRIPTION,
          notification.KEYWORDS,
          notification.ELEMENTS,
          notification.STATUS
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
  