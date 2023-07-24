import { FC, SetStateAction, createContext, useEffect, useState } from "react";
import { ElementInstance, ElementSchema, FormInstance, ProcedureInstance } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";
import axios, { AxiosResponse } from "axios";
import { ResponseError, handleResponse } from "../Config/Axios";
import { FormAPI } from "../Services/FormAPI";
import { ProcedureAPI } from "../Services/ProcedureAPI";


export type FieldsType = ProcedureInstance<ElementSchemaTypes>[];


const ContextValues = () => {

  const AxiosProcedureAPI = new ProcedureAPI();
  const [procedures, setProcedures] = useState<ProcedureInstance<ElementSchemaTypes>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");

  const SaveProcedure = async (procedure: any, setFormState: Function, title:string) => {
    const response: AxiosResponse = await handleResponse(AxiosProcedureAPI.Create, procedure, setFormState);
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const responseData = JSON.parse(response.data.data);
      const titleResponse = responseData[0].TITLE
      if (status && titleResponse == title) {
        setProcedures(prevState => ([...prevState, procedure]));
        return true;
      }
      else{
        return false;
      }
    }
    return false;
  }

  const  UpdateOneProcedure = async(procedure: any, setFormState: Function, title:string) => {
    const response: AxiosResponse = await handleResponse(AxiosProcedureAPI.Update, procedure, setFormState);
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const responseData = JSON.parse(response.data.data);
      const titleResponse = responseData[0].TITLE;
      if (status && titleResponse == title ) {
        setProcedures(prevProcedure => prevProcedure.filter(procedure =>procedure.getTitle() !== title )); //delete the old form
        
        setProcedures (prevState => ([...prevState, procedure])); //set the new form
        return true;
      }
      else{
        return false;
      }
    }
    return false;

  }

  const DeleteOneProcedure = async(title:string, setFormState: Function) => {
    setIsLoading(true);

    const jsonObject = {
      title: title
    };
    const response: AxiosResponse = await handleResponse(AxiosProcedureAPI.Delete, jsonObject, setFormState);
    setIsLoading(false);

    return response;
  }


  const UpdateProcedures = async() => {

    setIsLoading(true)
    let responseAll:AxiosResponse | ResponseError | null = null;
    
    try { responseAll = await AxiosProcedureAPI.GetAll(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }
    //let forms=responseAll!.data.data; 
   // response_without_backslashes = json.loads(response.replace('\\', ''))
    
   //let FormData = "[]";
   if(responseAll && responseAll.status!==204) 
   {
    const FormData = responseAll.data.data;
      console.log("aca puede estar el problema: "+FormData)
      const FormsObj = JSON.parse(FormData);
      const procedureAux: SetStateAction<ProcedureInstance<ElementSchemaTypes>[]> = [];

      const mappedArray = FormsObj.map((procedureInstance: any) => {

        const Formulario = new ProcedureInstance(
          procedureInstance.forms,
          procedureInstance.title,
          procedureInstance.description,
          procedureInstance.state,
          procedureInstance.theme,
          procedureInstance.atthacments
        );
        procedureAux.push(Formulario);

      });   
      setProcedures(procedureAux);
   }
   
    setIsLoading(false); 
  }

  const UserClearData = () => {
    setProcedures([]);
  }

  return {
    isLoading,
    procedures,
    setProcedures,
    SaveProcedure, 
    UpdateOneProcedure,
    DeleteOneProcedure,
    UpdateProcedures
  }
}

export const ProcedureContext = createContext({} as ReturnType<typeof ContextValues>);

const ProcedureContextProvider: FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <ProcedureContext.Provider value={ContextValues()}>
      {props.children}
    </ProcedureContext.Provider>
  );
}

export default ProcedureContextProvider;
  