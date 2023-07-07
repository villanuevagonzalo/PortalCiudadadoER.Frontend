import { FC, createContext, useState } from "react";
import { ElementInstance } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";


interface Formularios{
    name: string,
    subtitle: string,
    description: string,
    keywords: string,
    fields: ElementInstance<ElementSchemaTypes>[]
    setFields?:Function
  }


const ContextValues = () => {
   
    const [formularios, setFormularios] = useState<Formularios[]>([]);
    return(
        null
    )

    
    const UserClearData = () => {
        setFormularios([]);
      
    }
  
    return {
        formularios
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

  