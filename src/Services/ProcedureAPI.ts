import { axiosBase } from "../Config/Axios";

export class ProcedureAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }

  public Create(params: {
    title: string;
  }){
    return this.baseService.post('/v0/procedure/new', params)
  }

}