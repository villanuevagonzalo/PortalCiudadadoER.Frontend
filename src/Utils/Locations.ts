import moment from "moment";
import { ILocations } from "../Interfaces/Data";
import { GeneralAPI } from "../Services/GeneralAPI";
import { CapitalizeWords, getLSData, setLSData } from "./General";

const AxiosAPI = new GeneralAPI();

export const RawLocations = async () => {
  const CurrentLocations:{ Locations: ILocations[]; expiration: Date; } = getLSData('Locations');
  if(CurrentLocations){
    let remainingTime = (Date.parse(moment(CurrentLocations.expiration).toString())- Date.now())/(1000*60*60*24)
    if( remainingTime > 0 ){
        return CurrentLocations.Locations;
    }
  }
  const NewLocations = await AxiosAPI.Locations();
  setLSData('Locations',{Locations: NewLocations.data, expiration: moment(Date.now()).add(7, 'days').toDate()})

  return NewLocations.data;
}

export const LocationByID = (locations:ILocations[], localityID:number) => locations.filter((location:ILocations)=>location.ID==localityID)[0]
export const LocationFullPath = (location:ILocations) => CapitalizeWords(location.NOMBRE+', '+location.DEPARTAMENTO)
export const LocationsFullPath = (locations:ILocations[]) => locations.map((item:ILocations)=>LocationFullPath(item))
export const GetLocationByPath = (locations:ILocations[], localityPath:string) => locations.filter((location:ILocations)=>LocationFullPath(location)==localityPath)[0]