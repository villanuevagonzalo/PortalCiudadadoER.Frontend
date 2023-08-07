import { axiosBase } from "../Config/Axios";

export class ProcedureAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }


  GetAll = async () => {
    return this.baseService.get('/v0/backoffice/procedures')
  }
  

  Create = async (params: {
    data:string
  }) => {
    return this.baseService.post('/v0/backoffice/procedures', params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  Update = async (params: {
    data:string
  }) => {
    return this.baseService.post('/v0/backoffice/procedures/update', params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  Delete = async (params: {
    data:string
  }) => {
    return this.baseService.post('/v0/backoffice/procedures/delete', params)
  }

  GetCategories = async () => {
    return this.baseService.get('/v0/backoffice/procedures/categories')
  }

}