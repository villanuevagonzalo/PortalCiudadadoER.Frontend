import axios from 'axios';
import { getLSData } from '../Utils/General';

const REACTENV = process.env

console.log(getLSData('authToken'))

export const axiosBase = axios.create({
    baseURL: REACTENV.REACT_APP_PROJECT_API,
    responseType: 'json',
});

axiosBase.interceptors.request.use(
  (request:any) => {
    request.headers['Authorization'] = 'Bearer '+getLSData('authToken')?.token
    return request;
  },
  (err) => err
);