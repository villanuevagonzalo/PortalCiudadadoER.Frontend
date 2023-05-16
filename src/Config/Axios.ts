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
    console.log(response)
    response.data = {
      success: response.data?.status || true,
      message: GetMessage(response.data?.message, response.status),
      data: response.data
    }
    delete response.data.data.message;
    delete response.data.data.status;
    console.log(response.data)

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