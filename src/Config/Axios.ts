import axios, { AxiosResponse } from 'axios';
import { GetMessage } from '../Interfaces/MessageHandler';
import { getLSData } from '../Utils/General';

const REACTENV = process.env

export const axiosBase = axios.create({
  baseURL: REACTENV.REACT_APP_PROJECT_API,
  responseType: 'json',
});

axiosBase.interceptors.request.use(
  (request:any) => {
    request.headers['Authorization'] = 'Bearer '+getLSData('authToken')?.token
    return request;
  },
  (err) => {
    return err
  }
);

export interface ResponseError {
  code: string;
  message: string;
  error: AxiosResponse<any>;
}

axiosBase.interceptors.response.use(
  (response: AxiosResponse) => {
    response.data = {
      success: response.data?.status || true,
      message: GetMessage(response.data?.message, response.status),
      data: response.data
    }
    delete response.data.data.message;
    delete response.data.data.status;

    return response;
},
  (err) => {
    throw {
      code: err.code || "Internal Error",
      message: GetMessage(err.response.data?.message || err.message, err.response?.status) || "Error",
      error: err
  }}
);

export const handleResponse = async (requestFn: any, data: any, setFormState: Function) => {
  setFormState((prev:any) => ({ ...prev, loading: true }));
  try { 
    const response:AxiosResponse = await requestFn(data);
    setFormState((prev:any) => ({ ...prev, loading: false, error: "", finish:true }));
    return response;
  } catch (	error:any ) {
    setFormState((prev:any) => ({ ...prev, loading: false, error: error.message }));
    return error;
  }
}