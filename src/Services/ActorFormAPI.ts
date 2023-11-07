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

  GetAll = async (params: {
    start_position: number;
    end_position: number;
  }) => {
    return this.baseService.get('/v0/backoffice/forms', {params})
  }
  
  GetPublishedAll = async (params: {
    start_position: number;
    end_position: number;
  }) => {
    return this.baseService.get('/v0/backoffice/forms/published', {params})
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


  GetElements = async (params: {
    code:number
  }) => {
    return this.baseService.get("/v0/backoffice/forms/elements", {params})
  }

  GetByCode = async (params: {
    code:number
  }) => {
    return this.baseService.get('/v0/backoffice/forms/getByPk',{params})
  }

  Delete = async (params: {
    data:string
  }) => {
    return this.baseService.post('/v0/backoffice/forms/delete', params)
  }
  
}