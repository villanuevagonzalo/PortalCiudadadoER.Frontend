import { FC, createContext, useState } from "react";
import { DefaultUserContact, DefaultUserData, DefaultUserRol } from "../Data/DefaultValues";
import { IUserContact, IUserData, IUserRol } from "../Interfaces/Data";
import { delLSData } from "../Utils/General";



const ContextValues = () => {
   
  const [userData, setUserData] = useState<IUserData>(DefaultUserData);
  const [userContact, setUserContact] = useState<IUserContact>(DefaultUserContact);
  const [userRol, setUserRol] = useState<IUserRol[]>(DefaultUserRol);
  
  const UserClearData = () => {
    setUserData(DefaultUserData);
    setUserContact(DefaultUserContact);
    setUserRol(DefaultUserRol);
    delLSData("UserData");
    delLSData("UserContact");
    delLSData("UserRol");
  }


  
/*
  const UserGetData = async (data:any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.UserGetData(data);

    if(response.data.success){
      setFormState((prev:any) => ({ ...prev, error: "" }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const UserNameChange = async (data:any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.UserNameChange(data);
    if(response.data.success){
      setUserData(prevState => ({...prevState, name: data.name, last_name: data.last_name}))
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const SaveData = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.UserSaveData(data);

    if(response.data.success){
      

      let NewUserContact = {...userContact,
        BIRTHDAY: moment(data.birthday,"DD/MM/YYYY").toDate(),
        CELLPHONE_NUMBER: data.cellphone_number,
        DEPARTMENT_ID: data.department_id,
        LOCALITY_ID: data.locality_id,
        ADDRESS_STREET: data.address_street,
        ADDRESS_NUMBER: data.address_number,
        APARTMENT: data.apartment
    }

    setUserContact(NewUserContact);
    setLSData("UserContact", NewUserContact);

    if(response.data.data.token){
        SaveToken(response.data.data.token)
    }
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  return {
    userData, userContact, userRol, 
    UserGetData, SaveData, UserNameChange,
  }*/
  return {
    userData, userContact, userRol,
    setUserData, setUserContact, setUserRol
  }
}

export const UserContext = createContext({} as ReturnType<typeof ContextValues>);

const UserContextProvider: FC<React.PropsWithChildren<{}>> = (props) => {
const UserContextProvider: FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <UserContext.Provider value={ContextValues()}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;