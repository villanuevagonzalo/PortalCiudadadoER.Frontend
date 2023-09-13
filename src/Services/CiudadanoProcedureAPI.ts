import { axiosBase } from "../Config/Axios";

export class CiudadanoProcedureAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }

   //Get published procedures
  GetPublished = async () => {
    return this.baseService.get('/v0/dashboard/procedures/published')
  }

  //get all user procedures, the procedures that are in process
  GetAll = async () => {
    return this.baseService.get('/v0/dashboard/procedures')
  }
  
  //create a new procedure
  Create = async (params: {
    procedure_unit_id:number
  }) => {
    return this.baseService.post('/v0/dashboard/procedures', params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  Update = async (params: {
    data:string
  }) => {
    return this.baseService.post('/v0/dashboard/procedures/update', params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  SendAttachments = async (params: {
    data:string
  }) => {
    return this.baseService.post('/v0/dashboard/procedures/attachments', params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  Delete = async (params: {
    data:string
  }) => {
    return this.baseService.post('/v0/dashboard/procedures/delete', params)
  }


}