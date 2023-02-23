import { axiosBase } from "../Config/Axios";

export class GeneralAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }

  public Locations(){
    return this.baseService.get('/v0/er/locations')
  }

}