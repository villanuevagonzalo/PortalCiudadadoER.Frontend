import { FC, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { ElementInstance, ElementSchema, FormInstance, ProcedureData, ProcedureInstance } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";
import axios, { AxiosResponse } from "axios";
import { ResponseError, handleResponse } from "../Config/Axios";
import { CiudadanoProcedureAPI } from "../Services/CiudadanoProcedureAPI";
import { FileBlob } from "../Interfaces/Data";
import { getFileType } from "../Interfaces/FileTypes";
import { AuthContext } from "./AuthContext";


export type FieldsType = ProcedureInstance<ElementSchemaTypes>[];

export type FieldsElementType = ElementInstance<ElementSchemaTypes>[];

const ContextValues = () => {

  const AxiosCiudadanoProcedureAPI = new CiudadanoProcedureAPI();
  const [ciudadanoProcedures, setCiudadanoProcedures] = useState<ProcedureData[]>([]);
  const [isLoadingProcedureCitizen, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");

  const [totalCitizenProceduresQueried, setTotalCitizenProceduresQueried] = useState <number> (0)
  const [totalCitizenProceduresInDB, setTotalCitizenProceduresInDB] = useState <number> (0) //cantidad de procedimientos del ciudadano en la base de datos

  const [isUpdatingCiudadanoProcedures, setUpdatingCiudadanoProcedures]= useState <Boolean> (false) 

  const { isLogged } = useContext(AuthContext);

  useEffect(() => {
    if(!isLogged){
      setCiudadanoProcedures([])
      setTotalCitizenProceduresQueried(0)
      //setGotAllCitizenProcedures(false)
      setTotalCitizenProceduresInDB(0)
      setUpdatingCiudadanoProcedures(false)
    }
   
  }, [isLogged]);
  
  //RECURSIVITY
  useEffect(() => {
    if (totalCitizenProceduresInDB > totalCitizenProceduresQueried ) {
      UpdateCiudadanoProcedures();
    }
  }, [ciudadanoProcedures && totalCitizenProceduresQueried && totalCitizenProceduresInDB]);

  const CreateCiudadanoProcedure = async (procedure_id:number, setFormState: Function) => {
    
    const data = { procedure_unit_id: procedure_id }
    const response: AxiosResponse = await handleResponse(AxiosCiudadanoProcedureAPI.Create, data, setFormState);

    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;

      if (status) {
        const responseDataArray = JSON.parse(response.data.data); // Parse as an array
        if (responseDataArray.length > 0) {
          const firstResponseData = responseDataArray[0]; // Get the first object in the array

          if (firstResponseData.ID !== undefined && firstResponseData.ID !== "") {
            // Process the data and setCiudadanoProcedures here
            let parsedForms:any=[]
            let parsedAttachments=[]
            let parsedMultimedia = []

            if (firstResponseData.FORMS !== "" && firstResponseData.FORMS !== undefined) {
              parsedForms = firstResponseData.FORMS.split(",");
            }
            if (firstResponseData.ATTACHMENTS !== "" && firstResponseData.ATTACHMENTS !== undefined) {
              parsedAttachments = firstResponseData.ATTACHMENTS.split(",");
            }
            if (firstResponseData.MULTIMEDIA_ID !== "" && firstResponseData.MULTIMEDIA_ID !== undefined) {
              parsedMultimedia = firstResponseData.MULTIMEDIA_ID.split(",");
            }

            const newProceduresData = new ProcedureData(
              firstResponseData.ID,
              firstResponseData.PROCEDURE_UNITS_ID,
              firstResponseData.REASON,
              firstResponseData.STATUS,
              parsedForms,
              parsedAttachments,
              parsedMultimedia,
              firstResponseData.CREATED_AT,
              firstResponseData.UPDATED_AT,
              firstResponseData.DATE_APPROVED
            );

            setCiudadanoProcedures(prevState => ([...prevState, newProceduresData]));
            setTotalCitizenProceduresQueried(totalCitizenProceduresQueried+1)

            return true;
          }
        }
      } else {
        return false;
      }
    }
    return false;
  }
  

  const  UpdateOneCiudadanoProcedure = async(procedure: ProcedureData, setFormState: Function, procedure_data_id:number) => {
    const response: AxiosResponse = await handleResponse(AxiosCiudadanoProcedureAPI.Update, procedure.getJSON(), setFormState);
    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const responseData = JSON.parse(response.data.data);
      const id = responseData[0].ID;
      if (status && procedure_data_id == id ) {
        setCiudadanoProcedures(prevProcedure => prevProcedure.filter(procedure =>procedure.getId() !== id )); //delete the old form
        setCiudadanoProcedures (prevState => ([...prevState, procedure])); //set the new form
        return true;
      }
      else{
        return false;
      }
    }
    return false;

  }

  const DeleteOneCiudadanoProcedure = async(id:number, setFormState: Function) => {
    setIsLoading(true);
    const jsonObject = {
      id: id
    };
    const response: AxiosResponse = await handleResponse(AxiosCiudadanoProcedureAPI.Delete, jsonObject, setFormState);
    setIsLoading(false);

    return response;
  }


  const UpdateCiudadanoProcedures = async () => {

    if (isUpdatingCiudadanoProcedures) {
      return;
    }
    setUpdatingCiudadanoProcedures(true)
    setIsLoading(true);

    const jsonObject = {
      start_position: totalCitizenProceduresQueried,
      end_position: (totalCitizenProceduresQueried+20),
    };

    try {
        const responseAll = await AxiosCiudadanoProcedureAPI.GetAll(jsonObject);

        if (responseAll && responseAll.status !== 204) {
            const FormData = responseAll.data.data;
            
            const procedureAux: SetStateAction<ProcedureData[]> = [];

            const FormsObj = JSON.parse(FormData);
            setTotalCitizenProceduresInDB(FormsObj.count)
            const totalCitizenProceduresGot = FormsObj.rows;
            const mappedArray = FormsObj.data.map((procedureInstance: any) => {
                try {

                    let parsedForms:any=[]
                    let parsedAttachments=[]
                    let parsedMultimedia=[]
                    if (procedureInstance.FORMS!=""){
                      parsedForms = procedureInstance.FORMS.split(",");

                    }
                    if (procedureInstance.ATTACHMENTS!=""){
                      parsedAttachments = procedureInstance.ATTACHMENTS.split(",");
                    }
                    if (procedureInstance.MULTIMEDIA_ID!=""&&procedureInstance.MULTIMEDIA_ID!=undefined){
                      parsedMultimedia = procedureInstance.MULTIMEDIA_ID.split(",");
                    }

                    const newProceduresData = new ProcedureData(
                        procedureInstance.ID,
                        procedureInstance.PROCEDURE_UNITS_ID,
                        procedureInstance.REASON,
                        procedureInstance.STATUS,
                        parsedForms,
                        parsedAttachments,
                        parsedMultimedia,
                        procedureInstance.CREATED_AT,
                        procedureInstance.UPDATED_AT,
                        procedureInstance.DATE_APPROVED
                    );

                    procedureAux.push(newProceduresData);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    // Handle the error, such as logging it or setting default values
                }
            });

            if (FormsObj.length===0){
              //setGotAllCitizenProcedures(true)
            }else{

              setTotalCitizenProceduresQueried(totalCitizenProceduresQueried+totalCitizenProceduresGot+1)
              setCiudadanoProcedures(prevProcedures => [...prevProcedures, ...procedureAux]);
            }

        }
    } catch (error) {
        setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.");
    }
    setUpdatingCiudadanoProcedures(false)
    setIsLoading(false);
};


  const UserClearData = () => {
    setCiudadanoProcedures([]);
  }

  const sendProcedureAttachment = async (procedure_data_id: number, newAttachment:any,  setFormState: Function) => {

    setIsLoading(true)
    const elementoEncontrado = ciudadanoProcedures.find(elemento => elemento.getId() === procedure_data_id);
    if (elementoEncontrado){

      try {
        const response = await handleResponse(AxiosCiudadanoProcedureAPI.SendAttachments, newAttachment, setFormState);
        
        if (response && response.data){
          if (response.data.success) {

            const names = newAttachment.attachments.map((file: { name: any; }) => file.name);

            elementoEncontrado.setAttachments(names[0]);
            response.data.data.map((multimediaId: number) => {
              elementoEncontrado.setMultimediaId(multimediaId);
            });
            setIsLoading(false);
            return true;
          } else {
            setIsLoading(false);
            return false;
          }
        }else{
          setIsLoading(false);
            return false;
        }
        
      } catch (error) {
        console.error("Error al enviar adjunto:", error);
        setIsLoading(false);
        return false; 
      }

    }else{
      setIsLoading(false);
      return false; 
    }
    
  }
  
  const GetCiudadanoProcedureAttachment = async  (attachmentId: number, Filename: string, setFormState: Function) => {
    setIsLoading(true);
    setFormState(true);
  
    try {
      const response = await AxiosCiudadanoProcedureAPI.GetAttachment({ attachmentId });
      const response2 = await AxiosCiudadanoProcedureAPI.GetAttachmentName({ attachmentId });
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const imageDataURL = reader.result as string;
        const filefile = response2.data.data.attachment_name;
        const filext = filefile.split(".");
        const data: FileBlob = {
          name: filefile,
          type: filext[1],
          data: imageDataURL.replace('text/html', getFileType(filext[1]).fulltype),
        };

        ///////////////////////////////////////////////////////////////////
        //this is for dowload the file 

        const a = document.createElement('a');
        a.href = data.data;
        a.download = data.name;
  
        // Programmatically trigger a click event on the anchor
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        a.dispatchEvent(clickEvent);
        ///////////////////////////////////////////////////////////////////

        // Instead of wrapping in an array and Promise.all, directly resolve with data
        setFormState(false);
        setIsLoading(false);
        // Trigger file download here
       // downloadFile(data);
      };
  
      reader.onerror = (error) => {
        setFormState(false);
        setIsLoading(false);
        console.error('Error al obtener los datos:', error);
        throw error;
      };
  
      // Start loading the file
      reader.readAsDataURL(response.data.data);
      console.log(reader)
      return reader;

    } catch (error) {
      setFormState(false);
      setIsLoading(false);
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  };

  
  const DeleteCiudadanoProcedureAttachment = async(procedure_data_id:number, multimedia_id:number, setFormState: Function) => {
    setIsLoading(true);
    const jsonObject = {
      procedure_data_id: procedure_data_id,
      multimedia_id:multimedia_id
    };
    const response: AxiosResponse = await handleResponse(AxiosCiudadanoProcedureAPI.DeleteAttachment, jsonObject, setFormState);
    
    if (response.data){
      if (response.data.data == multimedia_id){
        const targetProcedure = ciudadanoProcedures.find((element) => element.getId() === procedure_data_id);
        if (targetProcedure){
          const multimediaId = targetProcedure.getMultimediaId(); // Supongamos que esto es una cadena
          const posicion = multimediaId!.indexOf(multimedia_id);
          const multimediaIdArray = multimediaId!.filter((element) => element !== multimedia_id);
          const attachmentArray= targetProcedure.getAttachments()
          
          attachmentArray!.splice(posicion, 1); // Elimina 1 elemento en la posición especificada
  
          targetProcedure.setAttachmentsArray(attachmentArray!)
          targetProcedure.setMultimediaIdArray(multimediaIdArray!)
  
          setIsLoading(false);
          return true;
        }else{
          setIsLoading(false);
          return false;
        }
        
      }else{
        setIsLoading(false);
        return false;
      }
    }else{
      setIsLoading(false);
      return false;
    }
    
    
  }

  return {
    isLoadingProcedureCitizen,
    ciudadanoProcedures,
    totalCitizenProceduresInDB,
    totalCitizenProceduresQueried,
    setCiudadanoProcedures,
    CreateCiudadanoProcedure, 
    UpdateOneCiudadanoProcedure,
    DeleteOneCiudadanoProcedure,
    UpdateCiudadanoProcedures, 
    sendProcedureAttachment,
    GetCiudadanoProcedureAttachment,
    DeleteCiudadanoProcedureAttachment

  }
}

export const CiudadanoProcedureContext = createContext({} as ReturnType<typeof ContextValues>);

const CiudadanoProcedureContextProvider: FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <CiudadanoProcedureContext.Provider value={ContextValues()}>
      {props.children}
    </CiudadanoProcedureContext.Provider>
  );
}

export default CiudadanoProcedureContextProvider;
  