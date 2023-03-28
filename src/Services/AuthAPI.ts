import { axiosBase } from "../Config/Axios";

export class AuthAPI {

  private baseService;
  constructor() {
    this.baseService = axiosBase;
  }

  public UserSignup(params: {
    cuil: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    prs_id: number | null;
  }) {
    return this.baseService.post("/v0/user/signup", params);
  }

  public UserLogin(params: {
    cuil: number;
    password: string;
  }) {
    return this.baseService.post("/v0/user/login", params);
  }

  public UserGetData(params: {
    cuil: number;
  }) {
    return this.baseService.get("/v0/user/check/cuil", {params});
  }

  public UserSaveData(params: {
    cuil: number;
    birthday: Date;
    cellphone_number: string;
    department_id: number;
    locality_id: number;
    address_street: string;
    address_number: string;
    apartment: string;
  }) {
    return this.baseService.post("/v0/user/personal/contact/data", params);
  }

  public UserNameChange(params: {
    cuil: number;
    name: string;
    last_name: string;
  }) {
    return this.baseService.post("/v0/user/personal/names", params);
  }

  public UserPasswordReset(params: {
    cuil: number;
  }) {
    return this.baseService.get("/v0/user/password/reset/validation", { params });
  }

  public UserPasswordSave(params: {
    token: string;
    new_password: string
  }) {
    return this.baseService.post("/v0/user/password/reset", params);
  }

  public EmailValidate(params: {
    token: string;
  }) {
    return this.baseService.post("/v0/user/validate/email", params);
  }

  public EmailResendVerification(params: { 
    cuil: number;
  }) {
    return this.baseService.get("/v0/user/resend/email/verification", { params });
  }

  public EmailChange(params: { 
    cuil: number;
    new_email: string;
  }) {
    return this.baseService.get("/v0/user/change/email/validation", { params });
  }

  public EmailChangeValidate(params: { 
    token: string;
  }) {
    return this.baseService.post("/v0/user/change/email/", params );
  }

  
  public Autenticar_AFIP_getURL(params: {
    cuil: string;
  }) {
    return this.baseService.get("/v0/authentication/afip/getUrl", { params });
  }
  
  public Autenticar_AFIP_getToken(params: {
    cuil: string;
    code: string;
  }) {
    return this.baseService.get("/v0/authentication/afip/getToken", { params });
  }
}