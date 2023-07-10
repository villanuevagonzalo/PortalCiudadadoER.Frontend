import { axiosBase } from "../Config/Axios";

export class FormAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }

  Create = async (params: {

    data:string
  }) => {
    return this.baseService.post('/v0/admin/form-units', params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  GetAll = async () => {
    return this.baseService.get('/v0/admin/form-units')
  }
  
  
}