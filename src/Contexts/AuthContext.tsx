import moment from 'moment'
import jwt_decode from "jwt-decode";
import { createContext, FC, useEffect, useState } from "react";

import { delLSData, getLSData, setLSData } from '../Utils/General';
import { GetLevels } from "../Interfaces/UserLevels";
import { AuthAPI } from "../Services/AuthAPI";

import { IResponse, IToken, IUserContact, IUserData, IUserRol } from "../Interfaces/Data";
import { DefaultToken, DefaultUserContact, DefaultUserData, DefaultUserRol  } from "../Data/DefaultValues";
import { AxiosResponse } from 'axios';
import { handleResponse, ResponseError } from '../Config/Axios';

const REACTENV = process.env

const ContextValues = () => {

  const AxiosAuthAPI = new AuthAPI();

  const [ContextLoaded, setContextLoaded] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const [authToken, setAuthToken] = useState<IToken>(DefaultToken);    
  const [userData, setUserData] = useState<IUserData>(DefaultUserData);
  const [userContact, setUserContact] = useState<IUserContact>(DefaultUserContact);
  const [userRol, setUserRol] = useState<IUserRol[]>(DefaultUserRol);
  const [actorActions, setActorActions] = useState<any[]>([]);
  const [secretaria, setSecretaria] = useState("")

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
    const CurrentActorActions:any[] = getLSData('ActorActions');
    //console.log('CHECKTOKEN ',CurrentToken)
    if(CurrentToken?.token){
      let remainingTime = (Date.parse(moment(CurrentToken.expiration).toString())- Date.now())/(1000*60*60*24)
      if( remainingTime > 0 ){
        setIsLogged(true);
        setAuthToken(CurrentToken);
        setUserData(CurrentUserData);
        setUserContact(CurrentUserContact);
        setUserRol(CurrentUserRol);
        setActorActions(CurrentActorActions);
      } else{
        Logout();
      }
    }
  }
  
  const Logout = () => {
    setIsLogged(false);
    setIsLoading(false);

    setAuthToken(DefaultToken);
    setUserData(DefaultUserData);
    setUserContact(DefaultUserContact);
    setUserRol(DefaultUserRol);
    setActorActions([]);
    
    delLSData("authToken");
    delLSData("UserData");
    delLSData("UserContact");
    delLSData("UserRol");
    delLSData("ActorActions");
    setSecretaria("")
  }

  const Logout2 = () => {
    setIsLogged(false);
    setIsLoading(false);

    setAuthToken(DefaultToken);
    setUserData(DefaultUserData);
    setUserContact(DefaultUserContact);
    setUserRol(DefaultUserRol);
    setActorActions([]);
    
    delLSData("authToken");
    delLSData("UserData");
    delLSData("UserContact");
    delLSData("UserRol");
    delLSData("ActorActions");

    const location = REACTENV.REACT_APP_PROJECT_ADMIN+"/" ;
    window.location.href = location;
  }

  const Signup = async (data:any, setFormState:Function) => await handleResponse(AxiosAuthAPI.UserSignup, data, setFormState);

  const Redirect = async (data: any, setFormState:Function) => {

    const response:AxiosResponse = await handleResponse(AxiosAuthAPI.UserRedirect, data, setFormState);
    if(response.data){
      console.log("ESTA DATA TENGO EL EN REDIRECT: "+JSON.stringify(data))
      const NewUserData = response.data.data.user_data.user;
      const NewUserContact = response.data.data.user_data.user_contact;

      setIsLogged(true);

      SaveToken(response.data.data.access_token,response.data.data.user_data.is_actor);

      setUserData(NewUserData);
      setUserContact(NewUserContact || DefaultUserContact);
      setActorActions(data.data || []);

      setLSData("UserData", NewUserData);
      setLSData("UserContact", NewUserContact || DefaultUserContact);
      setLSData("ActorActions", data.data || []);
      setSecretaria(data.data.data.secretaria)

    } else{ Logout2(); }
    return response;
  }

  const Login = async (data: any, setFormState:Function) => {

    const response:AxiosResponse = await handleResponse(AxiosAuthAPI.UserLogin, data, setFormState);

    if(response.data){
      const NewUserData = response.data.data.user_data.user;
      const NewUserContact = response.data.data.user_data.user_contact;

      setIsLogged(true);

      SaveToken(response.data.data.access_token,response.data.data.user_data.is_actor);

      setUserData(NewUserData);
      setUserContact(NewUserContact || DefaultUserContact);

      setLSData("UserData", NewUserData);
      setLSData("UserContact", NewUserContact || DefaultUserContact);

    } else{ Logout(); }
    return response;
  }

  const UserGetData = async (data:any, setFormState:Function) => {

    const response:AxiosResponse = await handleResponse(AxiosAuthAPI.UserGetData, data, setFormState);
    if(response.data){
      setUserData(prevState => ({...prevState, name: data.name, last_name: data.last_name}))
      setFormState((prev:any) => ({ ...prev, finish:false }));
    }
    return response;
  }

  const UserNameChange = async (data:any, setFormState:Function) => {

    const response:AxiosResponse = await handleResponse(AxiosAuthAPI.UserNameChange, data, setFormState);
    if(response.data) setUserData(prevState => ({...prevState, name: data.name, last_name: data.last_name}))
    return response;
  }

  const SaveData = async (data:any, setFormState:Function) => {

    const response:AxiosResponse = await handleResponse(AxiosAuthAPI.UserSaveData, data, setFormState);
    if(response.data){
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
    return response;
  }

  const PasswordReset = async (data: any, setFormState:Function) => await handleResponse(AxiosAuthAPI.UserPasswordReset, data, setFormState);
  const PasswordUpdate = async (data: any, setFormState:Function) => await handleResponse(AxiosAuthAPI.UserPasswordSave, data, setFormState);

  const EmailValidate = async (data: any, setFormState:Function) => await handleResponse(AxiosAuthAPI.EmailValidate, data, setFormState);
  const EmailResendVerification = async (data: any, setFormState:Function) => await handleResponse(AxiosAuthAPI.EmailResendVerification, data, setFormState);
  const EmailChange = async (data: any, setFormState:Function) => await handleResponse(AxiosAuthAPI.EmailChange, data, setFormState);
  const EmailChangeValidate = async (data: any, setFormState:Function) => await handleResponse(AxiosAuthAPI.EmailChangeValidate, data, setFormState);

  const AFIP_getURL = async (data: any, setFormState:Function) => await handleResponse(AxiosAuthAPI.Autenticar_AFIP_getURL, data, setFormState);
  const AFIP_checkToken = async (data: any, setFormState:Function) => await handleResponse(AxiosAuthAPI.Autenticar_AFIP_checkToken, data, setFormState);
  const MIARGENTINA_getURL = async (data: any, setFormState:Function) => await handleResponse(AxiosAuthAPI.Autenticar_MIARGENTINA_getURL, data, setFormState);
  const MIARGENTINA_checkToken = async (data: any, setFormState:Function) => await handleResponse(AxiosAuthAPI.Autenticar_MIARGENTINA_checkToken, data, setFormState);


  useEffect(() => {
    setContextLoaded(true)
  }, [])
  

  return {
    isLoading, isLogged, authToken, userData, userContact, userRol, secretaria,
    Signup, Login, Logout, CheckToken, SaveToken, Redirect, Logout2,
    UserGetData, SaveData, UserNameChange, actorActions,
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