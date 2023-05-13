import { axiosBase } from "../Config/Axios";

export class NotificationsAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }

  public Create(params: {
    recipients: string;
    age_from: number;
    age_to: number;
    department_id: number;
    locality_id: number;
    message_title: string;
    message_body: string;
    attachment_type: string;
    attachment: File;
    notification_date_from: Date;
    notification_date_to: Date;
    send_by_email: string;
  }){
    return this.baseService.post('/v0/notification/new', params,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  public Get(params: {
  }){
    return this.baseService.get('/v0/notification/get/user/news', { params })
  }

  public GetAttachment(params: {
    message_title: string;
  }){
    return this.baseService.get('/v0/notification/get/user/attachments', { params })
  }


  
}