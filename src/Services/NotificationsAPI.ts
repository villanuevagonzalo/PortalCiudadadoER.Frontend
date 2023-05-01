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
    attachment: string;
    notification_date_from: Date;
    notification_date_to: Date;
    send_by_email: string;
  }){
    return this.baseService.post('/v0/notification/new', params)
  }

  public Get(params: {
  }){
    return this.baseService.get('/v0/notification/get/user/news', { params })
  }

}