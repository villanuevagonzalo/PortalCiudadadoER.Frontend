import { createContext, FC, useState } from "react";
import { AuthAPI } from "../Services/AuthAPI";
import { getLSData, setLSData } from '../Utils/General';
import moment from 'moment'
import { GetMessage, GetMessage2 } from "../Interfaces/MessageHandler";
import jwt_decode from "jwt-decode";
import { GetLevels } from "../Interfaces/UserLevels";
import { IResponse, IToken, IUserContact, IUserData, IUserRol } from "../Interfaces/Data";
import { DefaultResponse, DefaultToken, DefaultUserContact, DefaultUserData, DefaultUserRol  } from "../Data/DefaultValues";

const ContextValues = () => {

  const AxiosAuthAPI = new AuthAPI();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const [authToken, setAuthToken] = useState<IToken>(DefaultToken);    
  const [userData, setUserData] = useState<IUserData>(DefaultUserData);
  const [userContact, setUserContact] = useState<IUserContact>(DefaultUserContact);
  const [userRol, setUserRol] = useState<IUserRol[]>(DefaultUserRol);



  const SaveToken = (token:string) => {

    const DecodeToken:any = jwt_decode(token);

    const NewToken:IToken = {
      token: token,
      expiration: new Date(DecodeToken.exp*1000)
    };
    const NewUserRol = GetLevels(DecodeToken.scopes);

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
    
    localStorage.removeItem("authToken");
    localStorage.removeItem("UserData");
    localStorage.removeItem("UserContact");
    localStorage.removeItem("UserRol");
  }

  const Signup = async (data:any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:IResponse | any = await AxiosAuthAPI.UserSignup(data);

    if(response.status){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const Login = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:IResponse | any = await AxiosAuthAPI.UserLogin(data);
    
    if(response.status){
      const NewUserData = response.response.data.user_data.user;
      const NewUserContact = response.response.data.user_data.user_contact;

      setIsLogged(true);

      SaveToken(response.response.data.access_token);

      setUserData(NewUserData);
      setUserContact(NewUserContact || DefaultUserContact);

      setLSData("UserData", NewUserData);
      setLSData("UserContact", NewUserContact || DefaultUserContact);

      setFormState((prev:any) => ({ ...prev, error: "", finish: true }));
    } else{
      setIsLogged(false);
      setIsLoading(false);
      setFormState((prev:any) => ({ ...prev, error: response.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const UserGetData = async (data:any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:IResponse | any = await AxiosAuthAPI.UserGetData(data);

    if(response.status){
      setFormState((prev:any) => ({ ...prev, error: "" }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }




    const SaveData = async (data: any, setFormState:Function) => {

      setFormState((prev:any) => ({ ...prev, loading: true }));
      const response:IResponse | any = await AxiosAuthAPI.UserSaveData(data);
  
      if(response.status){
        

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

      if(response.response.data.token){
          SaveToken(response.response.data.token)
      }
      }
  
      setFormState((prev:any) => ({ ...prev, loading: false }));
      return response;
    }



  const PasswordReset = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:IResponse | any = await AxiosAuthAPI.UserPasswordReset(data);

    if(response.status){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const PasswordUpdate = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:IResponse | any = await AxiosAuthAPI.UserPasswordSave(data);
    console.log(response)
    if(response.status){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const EmailValidate = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:IResponse | any = await AxiosAuthAPI.EmailValidate(data);

    if(response.status){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const EmailResendVerification = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:IResponse | any = await AxiosAuthAPI.EmailResendVerification(data);

    if(response.status){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const EmailChange = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:IResponse | any = await AxiosAuthAPI.EmailChange(data);

    if(response.status){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  const EmailChangeValidate = async (data: any, setFormState:Function) => {

    setFormState((prev:any) => ({ ...prev, loading: true }));
    const response:IResponse | any = await AxiosAuthAPI.EmailChangeValidate(data);

    if(response.status){
      setFormState((prev:any) => ({ ...prev, error: "", finish:true }));
    } else{
      setFormState((prev:any) => ({ ...prev, error: response.message }));
    }

    setFormState((prev:any) => ({ ...prev, loading: false }));
    return response;
  }

  return {
    isLoading, isLogged, authToken, userData, userContact, userRol, 
    Signup, Login, Logout, CheckToken, 
    UserGetData, SaveData,
    PasswordReset, PasswordUpdate,
    EmailValidate, EmailResendVerification, EmailChange, EmailChangeValidate
  }
}

export const AuthContext = createContext({} as ReturnType<typeof ContextValues>);

const AuthContextProvider: FC<{}> = (props) => {
  return (
    <AuthContext.Provider value={ContextValues()}>
      {props.children}
    </AuthContext.Provider>
  );
}


export default AuthContextProvider;