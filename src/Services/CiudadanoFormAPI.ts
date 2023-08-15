import { axiosBase } from "../Config/Axios";

export class CiudadanoFormAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }

  
  //create a new procedure
  Create = async (params: {
    procedure_data_id: number,
    form_unit_code:string,
    form_data: string,
    attachments?: File
  }) => {
    return this.baseService.post('dashboard/procedures/forms', params,{
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

  Delete = async (params: {
    data:string
  }) => {
    return this.baseService.post('/v0/dashboard/procedures/delete', params)
  }


}