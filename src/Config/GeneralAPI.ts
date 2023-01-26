import axios from 'axios';
import { number } from 'yup';

const REACTENV = process.env

const axiosBase = axios.create({
    baseURL: REACTENV.REACT_APP_PROJECT_API,
    responseType: 'json'
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