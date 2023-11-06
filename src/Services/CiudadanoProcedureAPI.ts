import { axiosBase } from "../Config/Axios";

export class CiudadanoProcedureAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }

   //Get published procedures
  GetPublished = async (params: {
    start_position: number;
    end_position: number;
  }) => {
    return this.baseService.get('/v0/dashboard/procedures/published',{params})
  }

  //get all user procedures, the procedures that are in process
  GetAll = async (params: {
    start_position: number;
    end_position: number;
  }) => {
    return this.baseService.get('/v0/dashboard/procedures',{params})
  }

  GetByProcedureUnitId = async (params: {
    id:number
  }) => {
    return this.baseService.post('/v0/dashboard/getByProcedureUnitId', params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
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
    return this.baseService.post('/v0/dashboard/procedures/updateById', params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  SearchByKeyword = async (params: {
    keyword: string;
    start_position: number;
    end_position: number;
  }) => {
    return this.baseService.get('/v0/dashboard/procedures/search', { params})
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

  GetAttachment = async (params: {
    attachmentId: number;
  }) => {
    return this.baseService.get('/v0/dashboard/procedures/attachments', { params, responseType: 'blob' })
  }

  GetAttachmentName = async (params: {
    attachmentId: number;
  }) => {
    return this.baseService.get('/v0/dashboard/procedures/attachments/name', { params })
  }

  DeleteAttachment = async (params: {
    procedure_data_id:number,
    multimedia_id:number
  }) => {
    return this.baseService.post('/v0/dashboard/procedures/attachments/delete', params)
  }

}