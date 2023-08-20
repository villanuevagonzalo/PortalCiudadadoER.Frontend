import { FC, SetStateAction, createContext, useEffect, useState } from "react";
import { ElementInstance, ElementSchema, FormInstance, ProcedureData, ProcedureInstance } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";
import axios, { AxiosResponse } from "axios";
import { ResponseError, handleResponse } from "../Config/Axios";
import { CiudadanoProcedureAPI } from "../Services/CiudadanoProcedureAPI";


export type FieldsType = ProcedureInstance<ElementSchemaTypes>[];

export type FieldsElementType = ElementInstance<ElementSchemaTypes>[];

const ContextValues = () => {

  const AxiosCiudadanoProcedureAPI = new CiudadanoProcedureAPI();
  const [ciudadanoProcedures, setCiudadanoProcedures] = useState<ProcedureData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");

  useEffect(()=>{
    console.log("esto es lo que me da: "+JSON.stringify(ciudadanoProcedures))
},[ciudadanoProcedures])

  const CreateCiudadanoProcedure = async (procedure_id:number, setFormState: Function) => {
    
    const data = {procedure_unit_id:procedure_id}
    const response: AxiosResponse = await handleResponse(AxiosCiudadanoProcedureAPI.Create, data, setFormState);

    if (response.data !== undefined && response.data !== null && response.data.success !== undefined) {
      const status = response.data.success;
      const responseData = JSON.parse(response.data.data);
      console.log("estatus: "+status)
      if (status) {
        let parsedForms:any=[]
        let parsedAttachments=[]
        console.log("responseData"+JSON.stringify(responseData))

        console.log("responseData.FORMS"+(responseData.FORMS))

        if (responseData.FORMS!="" && responseData.FORMS!=undefined){
          parsedForms = responseData.FORMS.split(",");
        }
        if (responseData.ATTACHMENTS!=""&&responseData.ATTACHMENTS!=undefined){
          parsedAttachments = responseData.ATTACHMENTS.split(",");
        }

        const newProceduresData = new ProcedureData(
          responseData.ID,
          responseData.PROCEDURE_UNITS_ID,
          responseData.REASON,
          responseData.STATUS,
            parsedForms,
            parsedAttachments,
            responseData.CREATED_AT,
            responseData.UPDATED_AT,
            responseData.DATE_APPROVED
        );
        setCiudadanoProcedures(prevState => ([...prevState, newProceduresData]));
      /*if(ciudadanoProcedures.length==0){
        setCiudadanoProcedures([newProceduresData])
      }else{
        setCiudadanoProcedures(prevState => ([...prevState, newProceduresData]));
      }*/
        return true;
      }
      else{
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
    setIsLoading(true);

    try {
        const responseAll = await AxiosCiudadanoProcedureAPI.GetAll();

        if (responseAll && responseAll.status !== 204) {
            const FormData = responseAll.data.data;
            
            const procedureAux: SetStateAction<ProcedureData[]> = [];

            const FormsObj = JSON.parse(FormData);
            const mappedArray = FormsObj.map((procedureInstance: any) => {
                try {

                    let parsedForms:any=[]
                    let parsedAttachments=[]
                    if (procedureInstance.FORMS!=""){
                      parsedForms = procedureInstance.FORMS.split(",");

                    }
                    if (procedureInstance.ATTACHMENTS!=""){
                      parsedAttachments = procedureInstance.ATTACHMENTS.split(",");
                    }

                    const newProceduresData = new ProcedureData(
                        procedureInstance.ID,
                        procedureInstance.PROCEDURE_UNITS_ID,
                        procedureInstance.REASON,
                        procedureInstance.STATUS,
                        parsedForms,
                        parsedAttachments,
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

            setCiudadanoProcedures(procedureAux);
        }
    } catch (error) {
        setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.");
    }

    setIsLoading(false);
};



  const UserClearData = () => {
    setCiudadanoProcedures([]);
  }

  return {
    isLoading,
    ciudadanoProcedures,
    setCiudadanoProcedures,
    CreateCiudadanoProcedure, 
    UpdateOneCiudadanoProcedure,
    DeleteOneCiudadanoProcedure,
    UpdateCiudadanoProcedures
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
  