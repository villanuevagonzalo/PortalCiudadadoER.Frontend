import { FC, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { ElementInstance, ElementSchema, FormInstance, ProcedureInstance } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";
import axios, { AxiosResponse } from "axios";
import { ResponseError, handleResponse } from "../Config/Axios";
import { FormAPI } from "../Services/ActorFormAPI";
import { ProcedureAPI } from "../Services/ActorProcedureAPI";
import { removeHTMLTags } from "../Utils/General";
import { CiudadanoProcedureAPI } from "../Services/CiudadanoProcedureAPI";
import { AuthContext } from "./AuthContext";


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
  const AxiosCiudadanoProcedureAPI = new CiudadanoProcedureAPI();

  const [procedures, setProcedures] = useState<ProcedureInstance<ElementSchemaTypes>[]>([]);
  const [proceduresPublished, setProceduresPublished] = useState<ProcedureInstance<ElementSchemaTypes>[]>([]);

  const [isLoadingProcedure, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");
  const [proceduresByApi, setProceduresByApi]= useState<ProcedureByApiInterface []>([])

  const [categories, setCategories]= useState<string []>([])

  const [totalActorProceduresQueried, setTotalActorProceduresQueried] = useState <number> (0)
  const [totalActorProcedures, setTotalActorProcedures] = useState <number> (0) //total de tramites en la base de datos
  //const [gotAllActorProcedures, setGotAllActorProcedures] = useState <Boolean> (false) 
  const [totalActorProceduresReaded, setTotalActorProceduresReaded] = useState<boolean>(false)

  const [totalPublishedProceduresQueried, setTotalPublishedProceduresQueried] = useState <number> (0)
  //const [gotAllPublishedProcedures, setGotAllPublishedProcedures] = useState <Boolean> (false) 
  const [totalPublishedProcedures, setTotalPublishedProcedures] = useState <number> (0) //total de tramites publicados en la base de datos

  const [isUpdatingProcedureUnit, setUpdatingProcedureUnit] = useState <Boolean> (false) 
  const [isUpdatingPublishedProcedures, setUpdatingPublishedProcedures] = useState <Boolean> (false) 
  
  const { isLogged } = useContext(AuthContext);

  useEffect(() => {

    if(!isLogged){
      setProcedures([]);
      setProceduresPublished([]);
      setIsLoading(true);
      setErrors("");
      setProceduresByApi([]);
      setCategories([]);
      setTotalActorProceduresQueried(0);
      setTotalActorProcedures(0);
     // setGotAllActorProcedures(false);
      setTotalActorProceduresReaded(false);
      setTotalPublishedProceduresQueried(0);
      setTotalPublishedProcedures(0)
      //setGotAllPublishedProcedures(false);
      setUpdatingProcedureUnit(false);
      setUpdatingPublishedProcedures(false);
    }
   
  }, [isLogged]);
  
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

    if (isUpdatingProcedureUnit) {
      return;
    }
    setUpdatingProcedureUnit(true)
    setIsLoading(true)

    const jsonObject = {
      start_position: totalActorProceduresQueried,
      end_position: (totalActorProceduresQueried+20),
    };

    let responseAll:AxiosResponse | ResponseError | null = null;
    
    try { responseAll = await AxiosProcedureAPI.GetAll(jsonObject); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }
    //let forms=responseAll!.data.data; 
    //response_without_backslashes = json.loads(response.replace('\\', ''))
    
   //let FormData = "[]";
   if(responseAll && responseAll.status!==204) 
   {
    const FormData = JSON.parse(responseAll.data.data)
    
     // const jsonStringWithoutEscape =removeHTMLTags(FormData);
      try {
        //const FormsObj = JSON.parse(jsonStringWithoutEscape);
        const FormsObj = FormData.data
        setTotalActorProcedures(FormData.count)
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

            if (FormsObj.length===0){
              //setGotAllActorProcedures(true)
              
            }else{
              setTotalActorProceduresQueried(totalActorProceduresQueried+21)
              setProcedures(prevProcedures => [...prevProcedures, ...procedureAux]);
            }
      } catch (error) {
        // Maneja el error si no se puede analizar el JSON
        console.error('Error al analizar el JSON:', error);
      }
   }   
   setUpdatingProcedureUnit(false)
    setIsLoading(false); 
  }

  const UpdatePublishedProcedures = async() => {

    if (isUpdatingPublishedProcedures) {
      return;
    }
    setUpdatingPublishedProcedures(true)
    setIsLoading(true)

    const jsonObject = {
      start_position: totalPublishedProceduresQueried,
      end_position: (totalPublishedProceduresQueried+20),
    };

    let responseAll:AxiosResponse | ResponseError | null = null;
    
    try { responseAll = await AxiosCiudadanoProcedureAPI.GetPublished(jsonObject); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }
    //let forms=responseAll!.data.data; 
    //response_without_backslashes = json.loads(response.replace('\\', ''))
    //let FormData = "[]";
   if(responseAll && responseAll.status!==204) 
    {
      const FormData = JSON.parse(responseAll.data.data);
      //const jsonStringWithoutEscape =removeHTMLTags(FormData.data);
      const totalSize = FormData.count
        try {
          const FormsObj = FormData.data;
          setTotalPublishedProcedures(FormData.count)
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
              
              if (FormsObj.length===0){
                //setGotAllPublishedProcedures(true)
              }else{
                setTotalPublishedProceduresQueried(totalPublishedProceduresQueried+21)
                setProceduresPublished(prevProcedures => [...prevProcedures, ...procedureAux]);
              }
        } catch (error) {
          console.error('Error al analizar el JSON:', error);
        }      
    }
    setUpdatingPublishedProcedures(false)
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
    isLoadingProcedure,
    procedures,
    proceduresPublished,
    proceduresByApi,
    categories,
   // gotAllActorProcedures, 
    //gotAllPublishedProcedures,
    totalPublishedProcedures,
    totalActorProceduresReaded, setTotalActorProceduresReaded,
    totalActorProceduresQueried,
    totalActorProcedures,
    setProcedures,
    SaveProcedure, 
    UpdateOneProcedure,
    DeleteOneProcedure,
    UpdateProcedures,
    UpdatePublishedProcedures,
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