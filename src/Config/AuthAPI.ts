import axios from "axios";
import { getLSData } from "../Utils/General";

const REACTENV = process.env;

const axiosBase = axios.create({
  baseURL: REACTENV.REACT_APP_PROJECT_API,
  responseType: "json",
  headers: {
    Authorization: "Bearer " + getLSData("authToken")?.token,
  },
});

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
    return this.baseService.post("/v0/user/personal/data", params);
  }

  public UserValidateEmail(params: {
    token: string;
  }) {
    return this.baseService.post("/v0/user/validate/email", params);
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

  public ResendEmailVerification(params: { 
    cuil: number;
  }) {
    return this.baseService.get("/v0/user/resend/email/verification", { params });
  }
}