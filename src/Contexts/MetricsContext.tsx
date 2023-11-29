import { FC, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { ElementInstance, ElementSchema, FormDataClass, FormInstance, ProcedureData } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";
import { AxiosResponse } from "axios";
import { ResponseError, handleResponse } from "../Config/Axios";
import { FormAPI } from "../Services/ActorFormAPI";
import { CiudadanoFormAPI } from "../Services/CiudadanoFormAPI";
import { AuthContext } from "./AuthContext";
import { FileBlob } from "../Interfaces/Data";
import { getFileType } from "../Interfaces/FileTypes";
import { MetricAPI } from "../Services/ActorMetricAPI";


export type FieldsType = ElementInstance<ElementSchemaTypes>[];

export type FormDataType = {
    procedure_data_id: number;
    form_unit_code: string;
    form_data: string;
    attachments?: File[];
};


const ContextValues = () => {

  const AxiosMetricAPI = new MetricAPI();
  const [metrics, setMetrics] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");
  
 

  const GetMetrics = async () => {
    setIsLoading(true);
    let response: AxiosResponse | ResponseError | null = null;
  
    try {
      response = await AxiosMetricAPI.GetMetrics();
    } catch (error: any) {
      setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.");
    }
  
    setIsLoading(false); // Establecer isLoading a false al final de la función, independientemente de si hay un error o no
  
    if (response && response.status !== 204) {
      const Form_data = response.data.data;
      const responseData = JSON.parse(Form_data);
  
      setMetrics(responseData); // Asignar los datos al estado metrics
      return true;
    } else {
      return false;
    }
  };
  



  return {
    isLoading,
    metrics,
    errors,
    GetMetrics
  }
}

export const MetricsContext = createContext({} as ReturnType<typeof ContextValues>);

const MetricsContextProvider: FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <MetricsContext.Provider value={ContextValues()}>
      {props.children}
    </MetricsContext.Provider>
  );
}

export default MetricsContextProvider;