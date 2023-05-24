import { axiosBase } from "../Config/Axios";

export class GeneralAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }

  Locations = () => {
    return this.baseService.get('/v0/er/locations')
  }

}