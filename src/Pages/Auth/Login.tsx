import { useContext, useState } from 'react';
import { loginFields } from "../../Interfaces/formFields";
import Input from '../../Components/Forms/Input';
import { Hero } from '../../Components/Elements/Hero';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvira } from 'react-icons/fa';
import { AuthAPI } from '../../Config/AuthAPI';
import { AuthContext } from '../../Contexts/AuthContext';
import { Spinner } from '../../Components/Elements/StyledComponents';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => (fieldsState as any)[field.id] = '');

export const LoginPage = () =>{

    const { Login, isLoading } = useContext(AuthContext);
    
    const [loginState,setLoginState]=useState (fieldsState);
    
    const handleChange=(e: any)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const HandleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        Login(loginState)
    };

    return(
        <Hero classes="bg-gradient-to-r from-emerald-500 to-lime-600 text-white" tail={true}>
            <div className="container mx-auto flex content-center items-center justify-center h-full px-4">
                <div className="w-full lg:w-4/12">
                    <form className="flex-auto px-4 lg:px-10 py-8 relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">

                        {fields.map(field=><Input
                            key={field.id}
                            handleChange={handleChange}
                            value={(loginState as any)[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            autoFocus={field.autofocus}
                            placeholder={field.placeholder}
                        />)}

                        <div className="inline-flex items-center cursor-pointer mt-2">
                            <input id="customCheckLogin"type="checkbox" className="form-checkbox border-0 rounded text-gray-800 ml-1 w-4 h-4" style={{ transition: "all .15s ease" }}/>
                            <span className="ml-2 text-sm font-semibold text-gray-500">Recordarme</span>
                        </div>
                        <div className="text-center mt-6">
                            <button className="bg-gradient-to-r from-emerald-500 to-lime-600 text-white text-center active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="button" style={{ transition: "all .15s ease" }} onClick={HandleLogin} disabled={isLoading}>
                                {isLoading ? <Spinner/> : 'Iniciar Sesión'}                                
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-wrap my-6">
                        <Link to="/RestaurarPassword" className="text-white w-1/2 text-left">
                            <small>¿Olvidaste tu contraseña?</small>
                        </Link>
                        <Link to="/Registro" className="text-white w-1/2 text-right">
                            <small>Crea una nueva cuenta</small>
                        </Link>
                    </div>
                </div>
            </div>
        </Hero>
    )
}