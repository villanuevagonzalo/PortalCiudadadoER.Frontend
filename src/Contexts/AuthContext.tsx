import { createContext, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../Config/AuthAPI";
import { CapitalizeWords } from '../Utils/generalFunctions';
import moment from 'moment'
import { GetMessage } from "../Interfaces/MessageHandler";

interface IAuth{
    token: string;
    expiration: Date | null;
}

interface IUser{
    cuil: number;
    name: string;
    lastname: string;
    email: string;
    roles: string[][]
}

const DefaultToken:IAuth = {
    token: '',
    expiration: null
}

const DefaultValues:IUser = {
    cuil: 0,
    name: '',
    lastname: '',
    email: '',
    roles: [['Ciudadano','Nivel 1']]
}

const TestValues:IUser = {
    cuil: 20390317213,
    name: 'Gonzalo Eduardo',
    lastname: 'Villanueva',
    email: 'gonzalo_villanueva@outlook.com',
    roles: [['Ciudadano','Nivel 3']]
}

const getLSData = (item:string) => {
    const data:any = localStorage.getItem(item);
    return JSON.parse(data);
}

const setLSData = (item:string, data:any) => {
    localStorage.setItem(item, JSON.stringify(data));
    return data;
}

const ContextValues = () => {

    const AxiosAuthAPI = new AuthAPI();
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [authToken, setAuthToken] = useState<IAuth>(getLSData("authToken") || DefaultToken);
    const [userData, setUserData] = useState<IUser>(DefaultValues)

    useEffect(() => {
      console.log(userData)
    
    }, [userData])
    

    const Signup = async (data: any, setFormState:Function) => {
        setIsLoading(true)
        await AxiosAuthAPI.UserSignup(data).then((response)=>{
            console.log(response);
            if (response.data.success === false) {
                setFormState((prev:any)=>({...prev, error:''}))
                
                
            } else {
                //navigate("/Ingresar");
            }

        })
        .catch((error)=>{
            console.log(error);
            setFormState((prev:any)=>({...prev, error:'El proceso de Registro fallo.'}))
        });
        setIsLoading(false)
    }

    const Login = async (data: any, setError?:Function) => {
        setIsLoading(true)
        const response = {
            status: true,
            code: null,
            message: '',
            response: null
        }
        await AxiosAuthAPI.UserLogin(data).then((res:any)=>{
            response.code = res.status;
            response.message = GetMessage(res.data.message, res.status);
            response.response = res;
            const newuserdata = res.data.user_data;
            const newtoken:IAuth = {
                token: res.data.access_token,
                expiration: moment(res.data.expires_at,"MMM DD, YYYY LT").toDate()
            };
            const newdata = {
                cuil: newuserdata.user.cuil,
                name: CapitalizeWords(newuserdata.user.name),
                lastname: CapitalizeWords(newuserdata.user.last_name),
                email: newuserdata.user.email,
                roles: [['Ciudadano','Nivel 1']]
            }
            setIsLogged(true);
            setAuthToken(newtoken);
            setUserData(newdata)
            setLSData("authToken", newtoken);
            setLSData("userData", newdata);
        }).catch((error:any)=>{
            response.status = false;
            response.code = error.response.status;
            response.message = GetMessage(error.response.data.message, error.response.status);
            response.response = error.response;
            setIsLogged(false);
        });
        setIsLoading(false);
        return response
    }

/*
    const Login = async (data: any, setError?:Function) => {
        setIsLoading(true)
        await AxiosAuthAPI.UserLogin(data).then((response)=>{
            let responsedata = response.data
            if(responsedata.status){
                const newuserdata = responsedata.user_data;
                const newtoken:IAuth = {
                    token: responsedata.access_token,
                    expiration: moment(responsedata.expires_at,"MMM DD, YYYY LT").toDate()
                };
                const newdata = {
                    cuil: newuserdata.user.cuil,
                    name: CapitalizeWords(newuserdata.user.name),
                    lastname: CapitalizeWords(newuserdata.user.last_name),
                    email: newuserdata.user.email,
                    roles: [['Ciudadano','Nivel 1']]
                }
                setIsLogged(true);
                setAuthToken(newtoken);
                setUserData(newdata)
                setLSData("authToken", newtoken);
                setLSData("userData", newdata);
                navigate("/");
            }
        })
        .catch(async (error)=>{
            let responsedata = error.response.data;
            switch(responsedata.message){
                case 'test': 'hola'
            };
            //setIsLoading(false)
            console.log("FALLO ALGO 2: ",);
/*
            await AxiosAuthAPI.GetUserData({'cuil':data.cuil}).then((response)=>{
                let userdata = response.data.user
                console.log(response)
                setUserData({
                    cuil: data.cuil,
                    name: CapitalizeWords(userdata.Nombres),
                    lastname: CapitalizeWords(userdata.Apellido),
                    email: 'gonzalo_villanueva@outlook.com',
                    roles: [['Ciudadano','Nivel 1']]
                })
            })
            
            setIsLogged(true);
            navigate("/");
        });
        setIsLoading(false)
    }*/


    const Logout = () => {
        setIsLogged(false);
        setAuthToken(DefaultToken);
        setUserData(DefaultValues);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
    }

    const CheckToken = () => {
        const currentToken:IAuth = getLSData('authToken');
        if(currentToken?.token){
            let remainingTime = (Date.parse(moment(currentToken.expiration).toString())- Date.now())/(1000*60*60*24)
            if( remainingTime > 0 ){
                const currentData:IUser= getLSData('userData');
                setIsLogged(true);
                setAuthToken(currentToken);
                setUserData(currentData);
            } else{
                Logout()
            }
        }
        setIsLoading(false)
    }

    return {
        isLoading, isLogged, authToken, userData, Signup, Login, Logout, CheckToken
    }
}


export const AuthContext = createContext({} as ReturnType<typeof ContextValues>);

const AuthContextProvider: FC<{}> = (props) => {
    return (<AuthContext.Provider value={ContextValues()}>
        {props.children}
    </AuthContext.Provider>);
}

 
export default AuthContextProvider;