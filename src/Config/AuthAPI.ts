import axios from 'axios';

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

    public UserSignup(params: any){
        return this.baseService.post('/v0/user/signup', null, { params })
    }

    public UserLogin(params: any){
        return this.baseService.post('/v0/user/login', params )
    }

    public GetUserData(params: any){
        return this.baseService.get('/v0/user/check/cuil', { params: params })
    }

    public UserValidateEmail(params: any){
        return this.baseService.post('/v0/user/validate/email', params )
    }

}