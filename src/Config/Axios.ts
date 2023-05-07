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

axiosBase.interceptors.response.use(
  (response: AxiosResponse) => {
    response.data = {
      status: response.data?.status || true,
      code: response.status,
      message: GetMessage(response.data.message, response.status),
      response: response.data
    }
    console.log(response)

    return response;
},
  (err) => {
    return {
    status: false,
    code: err.response.status,
    message: GetMessage(err.response.data?.message || err.message, err.response?.status),
    response: err
  }}
);