import { axiosBase } from "../Config/Axios";

export class NotificationsAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }

  Create = async (params: {
    message_title: string;
    message_body: string;
    recipients: string;
    notification_date_from: Date;
    notification_date_to: Date;
    send_by_email: string;
    attachment?: File;
    age_from?: number;
    age_to?: number;
    department_id?: number;
    locality_id?: number;
  }) => {
    return this.baseService.post('/v0/notification/new', params,{
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

  Read = async (params:{
    notification_id: number;
  }) => {
    return this.baseService.post('/v0/notification/get/user/read', params)
  }



  
}