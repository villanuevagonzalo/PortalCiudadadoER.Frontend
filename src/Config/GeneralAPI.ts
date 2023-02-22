import axios from 'axios';
import { getLSData } from '../Utils/General';

const REACTENV = process.env

const axiosBase = axios.create({
    baseURL: REACTENV.REACT_APP_PROJECT_API,
    responseType: 'json',
    headers: {
        Authorization: 'Bearer '+getLSData('authToken')?.token
    }
})

export class GeneralAPI {

    private baseService;

    constructor(){
        this.baseService = axiosBase;
    }

    public Locations(){
        return this.baseService.get('/v0/er/locations')
    }

}