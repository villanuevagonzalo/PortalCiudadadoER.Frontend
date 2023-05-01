import axios, { AxiosResponse } from 'axios';
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
interface CustomResponse {
  status: any;
  code: number;
  message: string;
  response: AxiosResponse<any>;
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
    return {
      data:{
        status: false,
        code: err.response.status,
        message: GetMessage(err.response.data?.message || err.message, err.response?.status),
        response: err
      }
    }
  }
);