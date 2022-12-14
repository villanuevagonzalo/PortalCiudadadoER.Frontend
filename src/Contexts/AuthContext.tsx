import { createContext, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../Config/AuthAPI";

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



const ContextValues = () => {

    const AxiosAuthAPI = new AuthAPI();
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [authToken, setAuthToken] = useState<string>(localStorage.getItem("authToken") || '');
    const [userData, setUserData] = useState<IUser>(DefaultValues)

    const Signup = (data: any) => {
        setIsLoading(true)
        AxiosAuthAPI.UserSignup(data).then((response)=>{
            setIsLoading(false)
            if (response.data.success === false) {
                console.log(response.data)
                
                
            } else {
                navigate("/Ingresar");
            }

        })
        .catch((error)=>{
            console.log('Entro al catch');
            setIsLoading(false)
            console.log(error);
        });
    }

    const Login = (data: any) => {
        setIsLoading(true)
        AxiosAuthAPI.UserLogin(data).then((response)=>{
            setIsLoading(false)
            if (response.data.success === false) {
              
                //mensaje de cuil o contraseña incorrecta
                //utilizar un toast o algo por el estilo
                console.log(response.data)
                
            } else {
                const newtoken = response.data.access_token
                setIsLogged(true);
                setAuthToken(newtoken);
                setUserData(TestValues)
                //setUserData(data)
                localStorage.setItem("authToken", newtoken);
                localStorage.setItem("userData", JSON.stringify(data));
                navigate("/");
            }
        })
        .catch((error)=>{
            setIsLoading(false)
            console.log(error);
        });
    }

    const Logout = () => {
        setIsLogged(false);
        setAuthToken('');
        setUserData(DefaultValues)
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
    }

    const CheckToken = () => {
        const currentToken = localStorage.getItem('authToken');
        const currentData:any = localStorage.getItem('userData');
        if(currentToken){
            console.log(TestValues)
            const newdata = JSON.parse(currentData)
            setIsLogged(true);
            setAuthToken(currentToken);
            setUserData(TestValues)
            //setUserData(newdata)

        /*let remainingTime = (Date.parse(newdata.expirationDate) - Date.now())/(1000*60*60);
        if( remainingTime > 0 ){
            setAuth(prev => ({ ...prev, token: newdata.token, viewerToken: newdata.token,expirationDate: newdata.expirationDate }));
            setIsLogged(true)
        } else{
            Logout()
        }*/
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