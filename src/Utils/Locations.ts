import moment from "moment";
import { ILocation } from "../Interfaces/Data";
import { GeneralAPI } from "../Services/GeneralAPI";
import { CapitalizeWords, getLSData, setLSData } from "./General";

const AxiosAPI = new GeneralAPI();

export const RawLocations = async () => {
  const CurrentLocations:{ Locations: ILocation[]; expiration: Date; } = getLSData('Locations');
  if(CurrentLocations){
    let remainingTime = (Date.parse(moment(CurrentLocations.expiration).toString())- Date.now())/(1000*60*60*24)
    if( remainingTime > 0 ){
      return CurrentLocations.Locations;
    }
  }
  const NewLocations:any = await AxiosAPI.Locations();
  setLSData('Locations',{Locations: NewLocations.response.data, expiration: moment(Date.now()).add(7, 'days').toDate()})

  return NewLocations.response.data;
}

export const LocationByID = (locations:ILocation[], localityID:number) => locations.filter((location:ILocation)=>location.ID==localityID)[0]
export const LocationFullPath = (location:ILocation) => CapitalizeWords(location.NOMBRE+', '+location.DEPARTAMENTO)
export const LocationsFullPath = (locations:ILocation[]) => locations.map((item:ILocation)=>LocationFullPath(item))
export const GetLocationByPath = (locations:ILocation[], localityPath:string) => locations.filter((location:ILocation)=>LocationFullPath(location)==localityPath)[0]