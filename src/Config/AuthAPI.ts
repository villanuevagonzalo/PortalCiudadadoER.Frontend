import axios from 'axios';
import { number } from 'yup';

const REACTENV = process.env

const axiosBase = axios.create({
    baseURL: REACTENV.REACT_APP_PROJECT_API,
    responseType: 'json'
})


export class AuthAPI {

    private baseService;
    constructor(){
        this.baseService = axiosBase;
    }

    public UserSignup(params: {
        cuil: number;
        nombre: string;
        apellido: string;
        email: string;
        password: string;
        prs_id: number | null;
    }){
        return this.baseService.post('/v0/user/signup', null, { params })
    }

    public UserLogin(params: {
        cuil: number;
        password: string;
    }){
        return this.baseService.post('/v0/user/login', params )
    }

    public UserGetData(params: {
        cuil: number;
    }){
        return this.baseService.get('/v0/user/check/cuil', { params: params })
    }

    public UserValidateEmail(params: {
        token: string;
    }){
        return this.baseService.post('/v0/user/validate/email', params )
    }

    public UserPasswordReset(params: {
        cuil: number;
    }){
        return this.baseService.get('/v0/user/password/reset/validation', {params} )
    }

    public UserPasswordSave(params: {
        token: string;
        new_password: string;
    }){
        return this.baseService.post('/v0/user/password/reset', { params } )
    }

}