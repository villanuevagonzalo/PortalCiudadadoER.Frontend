import { FC, SetStateAction, createContext, useEffect, useState } from "react";
import { ElementInstance, ElementSchema, FormInstance, ProcedureInstance } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";
import axios, { AxiosResponse } from "axios";
import { ResponseError, handleResponse } from "../Config/Axios";
import { FormAPI } from "../Services/FormAPI";
import { ProcedureAPI } from "../Services/ProcedureAPI";


export type FieldsType = ProcedureInstance<ElementSchemaTypes>[];

export type FieldsElementType = ElementInstance<ElementSchemaTypes>[];

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
      const FormsObj = JSON.parse(FormData);
      const procedureAux: SetStateAction<ProcedureInstance<ElementSchemaTypes>[]> = [];

      const mappedArray = FormsObj.map((procedureInstance: any) => {
    /*    const FormsObj = JSON.parse(procedureInstance.FORMS )
        //const formulariosAux: SetStateAction<FormInstance<ElementSchemaTypes>[]> = [];

        const mappedArray = FormsObj.map((formInstance: any) => {

          let fields: FieldsElementType = [];
          //console.log("veamos el por que: "+formInstance.elements)
          //let componentes= JSON.parse(formInstance.elements)
          formInstance.elements.map((componente: any, index:number)=> {

            const aux= new ElementInstance((index+1).toString(), new ElementSchema(componente.type, { label: 'Ingresá el Título' }, ["isRequired"]));
            aux.update((componente.properties))
            fields.push(aux);


          });

          const Formulario = new FormInstance(
            formInstance.code,
            formInstance.title,
            formInstance.subtitle,
            formInstance.description,
            formInstance.keywords,
            formInstance.status,
            fields
          );
          formulariosAux.push(Formulario);

        });  */

        console.log("attachments: "+procedureInstance.ATTACHMENTS)
        const newProcedures = new ProcedureInstance(
          JSON.parse(procedureInstance.FORMS),
          procedureInstance.TITLE,
          procedureInstance.DESCRIPTION,
          procedureInstance.STATE,
          procedureInstance.THEME,
          JSON.parse(procedureInstance.ATTACHMENTS),
          procedureInstance.ID
        );
       
        procedureAux.push(newProcedures);

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
  