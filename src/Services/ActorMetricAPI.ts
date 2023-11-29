import { axiosBase } from "../Config/Axios";

export class MetricAPI {

  private baseService;

  constructor(){
    this.baseService = axiosBase;
  }

  GetMetrics = async () => {
    return this.baseService.get('/v0/metrics/all')
  }

}