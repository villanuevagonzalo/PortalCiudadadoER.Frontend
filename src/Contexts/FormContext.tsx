import { FC, createContext, useState } from "react";
import { ElementInstance, FormInstance } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";
import axios, { AxiosResponse } from "axios";
import { ResponseError, handleResponse } from "../Config/Axios";
import { FormAPI } from "../Services/FormAPI";


const ContextValues = () => {
   
  const AxiosFormAPI = new FormAPI();
  const [formularios, setFormularios] = useState<FormInstance<ElementSchemaTypes>[]>([]);
    

    const CreateaForms = async (formularios:any, setFormState:Function) => {

      const response:AxiosResponse = await handleResponse(AxiosFormAPI.Create, formularios,setFormState  );
      if(response.data) setFormularios(prevState => ([...prevState, formularios]));
      return response;
  
    }
    
    const UserClearData = () => {
        setFormularios([]);
        interface Formularios{
          name: string,
          subtitle: string,
          description: string,
          keywords: string,
          fields: ElementInstance<ElementSchemaTypes>[]
          setFields?:Function
        }
      
      
    }
  
    return {
        formularios, CreateaForms
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

  