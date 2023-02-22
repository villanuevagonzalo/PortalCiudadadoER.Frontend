import { createContext, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../Config/AuthAPI";
import { CapitalizeWords, getLSData, setLSData } from '../Utils/GeneralFunctions';
import moment from 'moment'
import { GetMessage } from "../Interfaces/MessageHandler";
import jwt_decode from "jwt-decode";
import { GetLevel } from "../Interfaces/UserLevels";
import { DefaultResponse, DefaultToken, DefaultUserContact, DefaultUserData, DefaultUserRol, IResponse, IToken, IUserContact, IUserData, IUserRol } from "../Interfaces/Data";

const ContextValues = () => {

    const AxiosAuthAPI = new AuthAPI();
    
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [authToken, setAuthToken] = useState<IToken>(getLSData("authToken") || DefaultToken);
    
    const [userData, setUserData] = useState<IUserData>(DefaultUserData)
    const [userContact, setUserContact] = useState<IUserContact | null>(null)
    const [userRol, setUserRol] = useState<IUserRol[]>(DefaultUserRol)
  
    const Signup = async (data: any, setFormState:Function) => {


        setIsLoading(true)
        const response:IResponse = DefaultResponse;

        await AxiosAuthAPI.UserSignup(data).then((response)=>{
            console.log(response);
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


        setIsLoading(true)
        const response:IResponse = DefaultResponse;

        await AxiosAuthAPI.UserLogin(data).then((res:any)=>{


            response.code = res.status;
            response.message = GetMessage(res.data.message, res.status);
            response.response = res;

            const NewToken:IToken = {
                token: res.data.access_token,
                expiration: moment(res.data.expires_at,"MMM DD, YYYY LT").toDate()
            };
            const DecodeToken:any = jwt_decode(NewToken.token);

            const NewUserData = res.data.user_data.user;
            const NewUserContact = res.data.user_data.user_contact;
            const NewUserRol = GetLevel(DecodeToken.scopes);

            setIsLogged(true);

            setAuthToken(NewToken);
            setUserData(NewUserData);
            setUserContact(NewUserContact || DefaultUserContact);
            setUserRol(NewUserRol);

            setLSData("authToken", NewToken);
            setLSData("UserData", NewUserData);
            setLSData("UserContact", NewUserContact || DefaultUserContact);
            setLSData("UserRol", NewUserRol);

        }).catch((error:any)=>{


            response.status = false;
            response.code = error.response.status;
            response.message = GetMessage(error.response.data.message, error.response.status);
            response.response = error.response;


            setIsLogged(false);
            setIsLoading(false);

            setIsLoading(false);

        });


        setIsLoading(false);
        return response;
        return response;
    }

    const Logout = () => {
        setIsLogged(false);


        setAuthToken(DefaultToken);
        setUserData(DefaultUserData);
        setUserContact(DefaultUserContact);
        setUserRol(DefaultUserRol);
        
        setUserData(DefaultUserData);
        setUserContact(DefaultUserContact);
        setUserRol(DefaultUserRol);
        
        localStorage.removeItem("authToken");
        localStorage.removeItem("UserData");
        localStorage.removeItem("UserContact");
        localStorage.removeItem("UserRol");
    }

    const SaveData = () => {
        //setIsLoading(false);
        setIsLoading(!isLoading);
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
        setIsLoading(true)
        const response = {
            status: true,
            code: null,
            message: '',
            response: null
        }
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
        setIsLoading(true)
        debugger;
        const response = {
            status: true,
            code: null,
            message: '',
            response: null
        }
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
        setIsLoading(true)
        const response = {
            status: true,
            code: null,
            message: '',
            response: null
        }
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
    return (
        <AuthContext.Provider value={ContextValues()}>
            {props.children}
        </AuthContext.Provider>
    );
}


export default AuthContextProvider;