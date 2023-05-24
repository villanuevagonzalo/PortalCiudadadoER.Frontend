import moment from "moment";
import { ILocation, IResponse } from "../Interfaces/Data";
import { GeneralAPI } from "../Services/GeneralAPI";
import { CapitalizeWords, getLSData, setLSData } from "./General";
import { AxiosResponse } from "axios";

const AxiosAPI = new GeneralAPI();

export const RawLocations = async () => {
  const CurrentLocations:{ Locations: ILocation[]; expiration: Date; } = getLSData('Locations');
  if(CurrentLocations){
    let remainingTime = (Date.parse(moment(CurrentLocations.expiration).toString())- Date.now())/(1000*60*60*24)
    if( remainingTime > 0 ){
      return CurrentLocations.Locations;
    }
  }
  const NewLocations:AxiosResponse = await AxiosAPI.Locations();
  setLSData('Locations',{Locations: NewLocations.data.data, expiration: moment(Date.now()).add(7, 'days').toDate()})
  return NewLocations.data.data;
}

export const GetDepartments = (locations: ILocation[]): { value: number; label: string }[] => {
  const uniqueDepartments: { value: number; label: string }[] = [{value:0, label:"Ninguno"}];

  locations.forEach((location: ILocation) => {
    const { DEP_ID, DEPARTAMENTO } = location;
    const existingDepartment = uniqueDepartments.find(
      (department) => department.value === DEP_ID
    );
    if (!existingDepartment) {
      uniqueDepartments.push({ value: DEP_ID, label: CapitalizeWords(DEPARTAMENTO) });
    }
  });

  return uniqueDepartments;
};

export const GetLocalitysByDeparment = (locations: ILocation[], deparmentId: number): { value: number; label: string }[] => 
[{value:0, label:"Ninguna"},...locations.filter((location:ILocation) => location.DEP_ID === deparmentId)
.map(({ ID, NOMBRE }) => ({ value: ID, label: CapitalizeWords(NOMBRE) }))];

export const DeparmentByID = (locations:ILocation[], deparmentID:number) => locations.filter((location:ILocation)=>location.DEP_ID===deparmentID)[0];
export const LocationByID = (locations:ILocation[], localityID:number) => locations.filter((location:ILocation)=>location.ID===localityID)[0];


export const LocationFullPath = (location:ILocation) => location?CapitalizeWords(location.NOMBRE+', '+location.DEPARTAMENTO):''
export const LocationsFullPath = (locations:ILocation[]) => locations.map((item:ILocation)=>LocationFullPath(item))
export const GetLocationByPath = (locations:ILocation[], localityPath:string) => locations.filter((location:ILocation)=>LocationFullPath(location)===localityPath)[0]