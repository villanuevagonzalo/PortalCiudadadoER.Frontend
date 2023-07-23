import { axiosBase } from "../Config/Axios";

export class ProcedureAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }


  GetAll = async () => {
    return this.baseService.get('/v0/admin/procedure-units')
  }
  

  public Create(params: {
    title: string;
  }){
    return this.baseService.post('/v0/admin/procedure-units/new', params)
  }

  Update = async (params: {
    data:string
  }) => {
    return this.baseService.post('/v0/admin/procedure-units/update', params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  Delete = async (params: {
    data:string
  }) => {
    return this.baseService.post('/v0/admin/procedure-units/delete', params)
  }

}