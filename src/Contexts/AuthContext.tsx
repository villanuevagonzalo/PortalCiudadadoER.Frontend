import moment from 'moment'
import jwt_decode from "jwt-decode";
import { createContext, FC, useEffect, useState } from "react";

import { delLSData, getLSData, setLSData } from '../Utils/General';
import { GetLevels } from "../Interfaces/UserLevels";
import { AuthAPI } from "../Services/AuthAPI";

import { IResponse, IToken, IUserContact, IUserData, IUserRol } from "../Interfaces/Data";
import { DefaultToken, DefaultUserContact, DefaultUserData, DefaultUserRol  } from "../Data/DefaultValues";
import { AxiosResponse } from 'axios';

const ContextValues = () => {

  const AxiosAuthAPI = new AuthAPI();

  const [ContextLoaded, setContextLoaded] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const [authToken, setAuthToken] = useState<IToken>(DefaultToken);    
  const [userData, setUserData] = useState<IUserData>(DefaultUserData);
  const [userContact, setUserContact] = useState<IUserContact>(DefaultUserContact);
  const [userRol, setUserRol] = useState<IUserRol[]>(DefaultUserRol);


  const SaveToken = (token:string, isactor?:boolean) => {

    const DecodeToken:any = jwt_decode(token);

    const NewToken:IToken = {
      token: token,
      expiration: new Date(DecodeToken.exp*1000)
    };
    const NewUserRol = GetLevels(isactor?[...DecodeToken.scopes,"actor_1"]:DecodeToken.scopes);
    console.log(NewUserRol)

    setAuthToken(NewToken);
    setUserRol(NewUserRol);

    setLSData("authToken", NewToken);
    setLSData("UserRol", NewUserRol);
  }

  const CheckToken = () => {
    const CurrentToken:IToken = getLSData('authToken');
    const CurrentUserData:IUserData = getLSData('UserData');
    const CurrentUserContact:IUserContact = getLSData('UserContact');
    const CurrentUserRol:IUserRol[] = getLSData('UserRol');
    //console.log('CHECKTOKEN ',CurrentToken)
    if(CurrentToken?.token){
      let remainingTime = (Date.parse(moment(CurrentToken.expiration).toString())- Date.now())/(1000*60*60*24)
      if( remainingTime > 0 ){
        setIsLogged(true);
        setAuthToken(CurrentToken);
        setUserData(CurrentUserData);
        setUserContact(CurrentUserContact);
        setUserRol(CurrentUserRol);
      } else{
        Logout();
      }
    }
  }
  
  const Logout = () => {
    setIsLogged(false);

    setAuthToken(DefaultToken);
    setUserData(DefaultUserData);
    setUserContact(DefaultUserContact);
    setUserRol(DefaultUserRol);
    
    delLSData("authToken");
    delLSData("UserData");
    delLSData("UserContact");
    delLSData("UserRol");
  }

  const Signup = async (data:any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.UserSignup(data);

    if(response.data.success){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const Redirect = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.UserRedirect(data);
    
    if(response.data.success){
      const NewUserData = response.data.data.user_data.user;
      const NewUserContact = response.data.data.user_data.user_contact;

      setIsLogged(true);

      SaveToken(response.data.data.access_token,response.data.data.user_data.is_actor);

      setUserData(NewUserData);
      setUserContact(NewUserContact || DefaultUserContact);

      setLSData("UserData", NewUserData);
      setLSData("UserContact", NewUserContact || DefaultUserContact);

      setFormState((prev:any) => ({ ...prev, error: "", finish: true }));
    } else{
      setIsLogged(false);
      setIsLoading(false);
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const Login = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.UserLogin(data);
    
    if(response.data.success){
      const NewUserData = response.data.data.user_data.user;
      const NewUserContact = response.data.data.user_data.user_contact;

      setIsLogged(true);

      SaveToken(response.data.data.access_token,response.data.data.user_data.is_actor);

      setUserData(NewUserData);
      setUserContact(NewUserContact || DefaultUserContact);

      setLSData("UserData", NewUserData);
      setLSData("UserContact", NewUserContact || DefaultUserContact);

      setFormState((prev:any) => ({ ...prev, error: "", finish: true }));
    } else{
      setIsLogged(false);
      setIsLoading(false);
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

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

  const PasswordReset = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.UserPasswordReset(data);

    if(response.data.success){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const PasswordUpdate = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.UserPasswordSave(data);
    console.log(response)
    if(response.data.success){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const EmailValidate = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.EmailValidate(data);

    if(response.data.success){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const EmailResendVerification = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.EmailResendVerification(data);

    if(response.data.success){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const EmailChange = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.EmailChange(data);

    if(response.data.success){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const EmailChangeValidate = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.EmailChangeValidate(data);

    if(response.data.success){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const AFIP_getURL = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.Autenticar_AFIP_getURL(data);

    if(response.data.success){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const AFIP_checkToken = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.Autenticar_AFIP_checkToken(data);

    console.log(response)

    if(response.data.success){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const MIARGENTINA_getURL = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.Autenticar_MIARGENTINA_getURL(data);

    if(response.data.success){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const MIARGENTINA_checkToken = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:AxiosResponse = await AxiosAuthAPI.Autenticar_MIARGENTINA_checkToken(data);

    if(response.data.success){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
      setFormState((prev:any) => ({ ...prev, error: response.data.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }


  useEffect(() => {
    setContextLoaded(true)
  }, [])
  

  return {
    isLoading, isLogged, authToken, userData, userContact, userRol, 
    Signup, Login, Logout, CheckToken, SaveToken, Redirect,
    UserGetData, SaveData, UserNameChange,
    PasswordReset, PasswordUpdate,
    EmailValidate, EmailResendVerification, EmailChange, EmailChangeValidate,
    AFIP_getURL, AFIP_checkToken,
    MIARGENTINA_getURL, MIARGENTINA_checkToken,
    ContextLoaded
  }
}

export const AuthContext = createContext({} as ReturnType<typeof ContextValues>);

const AuthContextProvider: FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <AuthContext.Provider value={ContextValues()}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;