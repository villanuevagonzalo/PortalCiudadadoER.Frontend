import { axiosBase } from "../Config/Axios";

export class FormAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }

  Create = async (params: {
    data:string
  }) => {
    return this.baseService.post('/v0/backoffice/forms', params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  GetAll = async () => {
    return this.baseService.get('/v0/backoffice/forms')
  }
  
  GetPublishedAll = async () => {
    return this.baseService.get('/v0/backoffice/forms/published')
  }

  Update = async (params: {
    data:string
  }) => {
    return this.baseService.post('/v0/backoffice/forms/update', params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  Delete = async (params: {
    data:string
  }) => {
    return this.baseService.post('/v0/backoffice/forms/delete', params)
  }
  
}