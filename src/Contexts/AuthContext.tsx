import { createContext, FC, useState } from "react";
import { AuthAPI } from "../Config/AuthAPI";
import { getLSData, setLSData } from '../Utils/General';
import moment from 'moment'
import { GetMessage } from "../Interfaces/MessageHandler";
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
  
    const Signup = async (data: any, setFormState:Function) => {

        setIsLoading(true)
        const response:IResponse = DefaultResponse;

        await AxiosAuthAPI.UserSignup(data).then((response)=>{
            if (response.data.success === false) {
                setFormState((prev:any)=>({...prev, error:''}))
            } else {
                //navigate("/Ingresar");
            }

        })
        .catch((error)=>{
            setFormState((prev:any)=>({...prev, error:'El proceso de Registro fallo.'}));

        });

        setIsLoading(false);
        return response;
    }

    const Login = async (data: any) => {

        setIsLoading(true);
        const response:IResponse = DefaultResponse;

        await AxiosAuthAPI.UserLogin(data).then((res:any)=>{

            response.code = res.status;
            response.message = GetMessage(res.data.message, res.status);
            response.response = res;

            const NewUserData = res.data.user_data.user;
            const NewUserContact = res.data.user_data.user_contact;

            setIsLogged(true);

            SaveToken(res.data.access_token);

            setUserData(NewUserData);
            setUserContact(NewUserContact || DefaultUserContact);

            setLSData("UserData", NewUserData);
            setLSData("UserContact", NewUserContact || DefaultUserContact);

        }).catch((error:any)=>{

            response.status = false;
            response.code = error.response.status;
            response.message = GetMessage(error.response.data.message, error.response.status);
            response.response = error.response;

            setIsLogged(false);
            setIsLoading(false);
        });


        setIsLoading(false);
        return response;
    }

    const Logout = () => {
        setIsLoading(false);
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

    const SaveData = async (data: any) => {
        setIsLoading(true);
        const response:IResponse = DefaultResponse;
        
        await AxiosAuthAPI.UserSaveData(data).then((res:any)=>{

            response.code = res.status;
            response.message = GetMessage(res.data.message, res.status);
            response.response = res;

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

            if(res.data.token){
                SaveToken(res.data.token)
            }

        }).catch((error:any)=>{

            response.status = false;
            response.code = error.response.status;
            response.message = GetMessage(error.response.data.message, error.response.status);
            response.response = error.response;

            setIsLogged(false);
            setIsLoading(false);
        });
        setIsLoading(false);
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
                Logout()
            }
        }
        setIsLoading(false)
    }

    const PasswordReset = async (data: any) => {

        setIsLoading(true);
        const response:IResponse = DefaultResponse;

        await AxiosAuthAPI.UserPasswordReset(data).then((res:any) =>{
            response.code = res.status;
            response.message = GetMessage(res.data.message, res.status);
            response.response = res;
        }).catch ((error:any) => {
            response.status = false;
            response.code = error.response.status;
            response.message = GetMessage(error.response.data.message, error.response.status);
            response.response = error.response;
        });
        setIsLoading(false);
        return response
    }

    const UpdatePassword = async (data: any) => {

        setIsLoading(true);
        const response:IResponse = DefaultResponse;

        await AxiosAuthAPI.UserPasswordSave(data).then((res:any) =>{
            response.code = res.status;
            response.message = GetMessage(res.data.message, res.status);
            response.response = res;
            debugger;

        }).catch ((error:any) => {
            response.status = false;
            response.code = error.response.status;
            response.message = GetMessage(error.response.data.message, error.response.status);
            response.response = error.response;
        });
        setIsLoading(false);
        return response
    }

    const ResendEmail = async (data: any) => {

        setIsLoading(true);
        const response:IResponse = DefaultResponse;

        await AxiosAuthAPI.ResendEmailVerification(data).then((res:any) =>{
            response.code = res.status;
            response.message = GetMessage(res.data.message, res.status);
            response.response = res;

        }).catch ((error:any) => {
            response.status = false;
            response.code = error.response.status;
            response.message = GetMessage(error.response.data.message, error.response.status);
            response.response = error.response;
        });
        setIsLoading(false);
        return response
    }

    return {
        isLoading, isLogged, authToken, userData, userContact, userRol, 
        Signup, Login, Logout, CheckToken, SaveData, PasswordReset, UpdatePassword, ResendEmail
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