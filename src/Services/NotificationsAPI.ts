import { axiosBase } from "../Config/Axios";

export class NotificationsAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }

  public Create(params: {
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
  }){
    return this.baseService.post('/v0/notification/new', params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }


  public GetAll(){
    return this.baseService.get('/v0/notification/get/actor/active/news')
  }
  
  public GetByUserNews(){
    return this.baseService.get('/v0/notification/get/user/news')
  }

  public GetByUserAll(){
    return this.baseService.get('/v0/notification/get/user/all')
  }

  public GetAttachment(params: {
    notification_id: number;
  }){
    return this.baseService.get('/v0/notification/get/user/attachments', { params })
  }

  public Read(params:{
    notification_id: number;
  }){
    return this.baseService.post('/v0/notification/get/user/read', params)
  }



  
}