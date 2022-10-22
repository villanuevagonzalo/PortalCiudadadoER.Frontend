import { createContext, FC, useState } from "react";

interface IAuth{
    token: string;
    expiration: Date | null;
}


const ContextValues = () => {

    const [auth, setAuth] = useState<IAuth>({
        token: '',
        expiration: null
    })

    return {
        auth, setAuth
    }
}


export const AuthContext = createContext({} as ReturnType<typeof ContextValues>);

const AuthContextProvider: FC<{}> = (props) => {
    return (<AuthContext.Provider value={ContextValues()}>
        {props.children}
    </AuthContext.Provider>);
}

 
export default AuthContextProvider;