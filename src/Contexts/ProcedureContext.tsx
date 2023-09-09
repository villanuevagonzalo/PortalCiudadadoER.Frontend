import { FC, SetStateAction, createContext, useEffect, useState } from "react";
import { ElementInstance, ElementSchema, FormInstance, ProcedureInstance } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";
import axios, { AxiosResponse } from "axios";
import { ResponseError, handleResponse } from "../Config/Axios";
import { FormAPI } from "../Services/ActorFormAPI";
import { ProcedureAPI } from "../Services/ActorProcedureAPI";
import { removeHTMLTags } from "../Utils/General";


export type FieldsType = ProcedureInstance<ElementSchemaTypes>[];

export type FieldsElementType = ElementInstance<ElementSchemaTypes>[];

interface ProcedureByApiInterface {
  ID: string;
  Título: string;
  Texto: string;
  Costo: string;
  C: string;
  Contenido_ID: string;
  ORF_ID: string;
  Organismo: string;
  URL_TRAMITE: string;
  Categoria:string;
  Icono:string;
}

const ContextValues = () => {

  const AxiosProcedureAPI = new ProcedureAPI();
  const [procedures, setProcedures] = useState<ProcedureInstance<ElementSchemaTypes>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");
  const [proceduresByApi, setProceduresByApi]= useState<ProcedureByApiInterface []>([])

  const [categories, setCategories]= useState<string []>([])

  const SaveProcedure = async (procedure: ProcedureInstance<ElementSchemaTypes>, setFormState: Function, title:string) => {
    const response: AxiosResponse = await handleResponse(AxiosProcedureAPI.Create, procedure.getJSON(), setFormState);

    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const responseData = JSON.parse(response.data.data);
      const titleResponse = responseData[0].TITLE

      //aca comparo titilos pero tengo que comparar sys_exp_id
      const cleanedTitleResponse = titleResponse.replace(/\s+/g, ''); // Elimina los espacios en blanco
      const cleanedTitle = title.replace(/\s+/g, ''); // Elimina los espacios en blanco


      if (status && cleanedTitleResponse == cleanedTitle) {

        const newProcedure = new ProcedureInstance(procedure.getTitle(), procedure.getDescription(), procedure.getSecretary(), procedure.getState(),procedure.getForms(), procedure.getAttachments(), procedure.getCitizenLevel(), procedure.getPrice(), procedure.getTheme(),procedure.getUrl(), undefined, procedure.getC(), procedure.getContentId(),procedure.getOrfId(), undefined)
        setProcedures(prevState => ([...prevState, newProcedure]));
        return true;
      }
      else{
        return false;
      }
    }
    return false;
  }

  const  UpdateOneProcedure = async(procedure: ProcedureInstance<ElementSchemaTypes>, setFormState: Function, title:string) => {
    const response: AxiosResponse = await handleResponse(AxiosProcedureAPI.Update, procedure.getJSON(), setFormState);
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

  const DeleteOneProcedure = async(id:number, setFormState: Function) => {
    setIsLoading(true);

    const jsonObject = {
      id: id
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
      
      const jsonStringWithoutEscape =removeHTMLTags(FormData);

      try {
        const FormsObj = JSON.parse(jsonStringWithoutEscape);
        const procedureAux: SetStateAction<ProcedureInstance<ElementSchemaTypes>[]> = [];
      
            const mappedArray = FormsObj.map((procedureInstance: any) => {
              const newProcedures = new ProcedureInstance(
                procedureInstance.TITLE,
                procedureInstance.DESCRIPTION,
                procedureInstance.SECRETARY,
                procedureInstance.STATE,
                JSON.parse(procedureInstance.FORMS),
                JSON.parse(procedureInstance.ATTACHMENTS),
                procedureInstance.CITIZEN_LEVEL,
                procedureInstance.PRICE,
                procedureInstance.THEME,
                procedureInstance.URL_TRAMITE,
                procedureInstance.ICON,
                procedureInstance.C,
                procedureInstance.CONTENT_ID,
                procedureInstance.ORF_ID,
                procedureInstance.ID
              );
             
              procedureAux.push(newProcedures);
      
            });   
            setProcedures(procedureAux);
      
      } catch (error) {
        // Maneja el error si no se puede analizar el JSON
        console.error('Error al analizar el JSON:', error);
        
      }
      
   }
   
    setIsLoading(false); 
  }


  
  //get procedures title, description and deparment
  const GetProceduresDataFromAPI = async() => {
    setIsLoading(true)
    let responseAll:AxiosResponse | ResponseError | null = null;
    
    try { responseAll = await AxiosProcedureAPI.GetProcedureFromAPI(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }
    if(responseAll && responseAll.status==200) {

      const responseAllData = responseAll.data.data;
      const regex = /\{[^}]*\}/g;
      const jsonDataArray = responseAllData.match(regex);
    
      if (jsonDataArray) {
        const parsedItems = jsonDataArray.map((jsonData: string) => JSON.parse(jsonData));
        setProceduresByApi(parsedItems);
      }
    }else{
      setIsLoading(false)

    }
  }


  const GetProcedureCategories = async() => {

    setIsLoading(true)
    let responseAll:AxiosResponse | ResponseError | null = null;
    
    try { responseAll = await AxiosProcedureAPI.GetCategories(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }
    if(responseAll && responseAll.status==200) {
      const dataArray = JSON.parse(responseAll.data.data);
      const descriptions = dataArray.map((item: any) => item.Descripción);
      setCategories(descriptions)
    }else{
      setIsLoading(false)

    }
  }

  const UserClearData = () => {
    setProcedures([]);
  }

  return {
    isLoading,
    procedures,
    proceduresByApi,
    categories,
    setProcedures,
    SaveProcedure, 
    UpdateOneProcedure,
    DeleteOneProcedure,
    UpdateProcedures,
    GetProceduresDataFromAPI,
    GetProcedureCategories
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
  