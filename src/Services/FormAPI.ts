import { axiosBase } from "../Config/Axios";
import { ElementInstance } from "../Modules/FormElements/Class";

export class FormAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }

  Create = async (params: {

    data:string

  }) => {
    return this.baseService.post('/v0/forms/new', params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  GetAll = async () => {
    return this.baseService.get('/v0/notification/get/actor/active/news')
  }
  
  GetByUserNews = async () => {
    return this.baseService.get('/v0/notification/get/user/news')
  }

  GetByUserAll = async () => {
    return this.baseService.get('/v0/notification/get/user/all')
  }

  GetAttachment = async (params: {
    multimedia_id: number;
  }) => {
    return this.baseService.get('/v0/notification/get/user/attachments', { params, responseType: 'blob' })
  }
  GetAttachmentName = async (params: {
    multimedia_id: number;
  }) => {
    return this.baseService.get('/v0/notification/get/attachment/name', { params })
  }

  GetScope = async (params:{
  }) => {
    return this.baseService.get('/v0/notification/new/scope', { params })
  }

  GetScopeByID = async (params:{
    notification_id: number;
  }) => {
    return this.baseService.get('/v0/notification/notification/number-reached', {params})
  }

  Read = async (params:{
    notification_id: number;
  }) => {
    return this.baseService.post('/v0/notification/get/user/read', params)
  }

  Delete = async (params:{
    notification_id: number;
  }) => {
    return this.baseService.post('/v0/notification/notification/soft-delete', params)
  }
  
}