import { axiosBase } from "../Config/Axios";

export class AuthAPI {

  private baseService;
  constructor() {
    this.baseService = axiosBase;
  }

  UserRedirect = async (params: {
    dni: number;
    token: string;
  }) => {
    return this.baseService.get("/v0/authentication/actor/redirect", {params})
  }

  UserSignup = async (params: {
    cuil: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    prs_id: number | null;
    captcha: string;
  }) => {
    return this.baseService.post("/v0/user/signup", params);
  }

  UserLogin = async (params: {
    cuil: number;
    password: string;
    captcha: string;
  }) => {
    return this.baseService.post("/v0/user/login", params);
  }

  UserGetData = async (params: {
    cuil: number;
  }) => {
    return this.baseService.get("/v0/user/check/cuil", {params});
  }

  UserSaveData = async (params: {
    cuil: number;
    birthday: Date;
    cellphone_number: string;
    department_id: number;
    locality_id: number;
    address_street: string;
    address_number: string;
    apartment: string;
  }) => {
    return this.baseService.post("/v0/user/personal/contact/data", params);
  }

  UserNameChange = async (params: {
    cuil: number;
    name: string;
    last_name: string;
  }) => {
    return this.baseService.post("/v0/user/personal/names", params);
  }

  UserPasswordReset = async (params: {
    cuil: number;
    captcha: string;
  }) => {
    return this.baseService.get("/v0/user/password/reset/validation", { params });
  }

  UserPasswordSave = async (params: {
    token: string;
    new_password: string
  }) => {
    return this.baseService.post("/v0/user/password/reset", params);
  }

  UserEmailChange = async (params: {
    cuil: number;
    new_email: string;
  }) => {
    return this.baseService.post("/v0/user/change/email/level1", params);
  }

  EmailValidate = async (params: {
    token: string;
  }) => {
    return this.baseService.post("/v0/user/validate/email", params);
  }

  EmailResendVerification = async (params: { 
    cuil: number;
    captcha: string;
  }) => {
    return this.baseService.get("/v0/user/resend/email/verification", { params });
  }

  EmailChange = async (params: { 
    cuil: number;
    new_email: string;
  }) => {
    return this.baseService.get("/v0/user/change/email/validation", { params });
  }

  EmailChangeValidate = async (params: { 
    token: string;
  }) => {
    return this.baseService.post("/v0/user/change/email", params );
  }

  
  Autenticar_AFIP_getURL = async (params: {
    cuil: string;
  }) => {
    return this.baseService.get("/v0/authentication/afip/getUrl", { params });
  }

  Autenticar_MIARGENTINA_getURL = async (params: {
    cuil: string;
  }) => {
    return this.baseService.get("/v0/authentication/miargentina/getUrl", { params });
  }
  
  Autenticar_AFIP_checkToken = async (params: {
    cuil: string;
    code: string;
  }) => {
    return this.baseService.get("/v0/authentication/afip/getToken", { params });
  }
  
  Autenticar_MIARGENTINA_checkToken = async (params: {
    cuil: string;
    code: string;
  }) => {
    return this.baseService.get("/v0/authentication/miargentina/getToken", { params });
  }
}