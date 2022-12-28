import { useContext, useState } from 'react';
import { loginFields } from "../../Interfaces/formFields";
import { Hero } from '../../Components/Elements/Hero';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvira } from 'react-icons/fa';
import { AuthAPI } from '../../Config/AuthAPI';
import { AuthContext } from '../../Contexts/AuthContext';

import { LabelDiv, MainContainer, Sidebar, Spinner, TitleDiv } from '../../Components/Elements/StyledComponents';
import { SidebarHideable } from '../../Components/NewLayout/SidebarHideable';
import { LogoCiudadanoDigital } from '../../Components/Elements/LogoCiudadanoDigital';
import { Button } from '../../Components/Forms/Button';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../Components/Forms/Input';


const fields = loginFields;
const fieldsState: {[key: string]: any} = {};
const requiredFields: {[key: string]: any}= {};

for(const input of fields){
    fieldsState[input.name] = input.value;
    if( !input.validations ) continue; 

    let schema = Yup.string();
    // let schema2 = Yup.number();

    for(const rule of input.validations){
        if(rule.type === 'required'){
            schema = schema.required('Requerido');
        }

        if(rule.type === 'minLength'){
            schema = schema.min((rule as any).value, `Debe tener al menos ${rule.value} caracteres`);
        }

        if(rule.type === 'maxLength'){
            schema = schema.max((rule as any).value, `Debe tener como máximo ${rule.value} caracteres`);
        }

    }

    requiredFields[input.name] = schema;
}

const validationSchema = Yup.object({...requiredFields});

export const LoginPage = () =>{

    const { Login, isLoading } = useContext(AuthContext);
    
    /*const [loginState,setLoginState]=useState (fieldsState);
    
    const handleChange=(e: any)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const HandleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        Login(loginState)
    };*/

    return(<>
        <Sidebar open={true}>
            <LogoCiudadanoDigital />
            <br />
            <TitleDiv>Iniciar Sesión</TitleDiv>
            <Formik
                initialValues= {fieldsState}
                validationSchema={validationSchema}
                onSubmit={ (values) => {
                    console.log(values)
                    Login(values)
                }}
            >
                {(formik) => (
                    <Form noValidate className="flex-auto mt-2 relative flex flex-col min-w-0 break-words w-full ">
                        {
                            fields.map(
                                field => <Input
                                key={field.name} 
                                value={undefined}
                                label={undefined} 
                                labelFor={field.labelFor} 
                                id={field.id} 
                                name={field.name} 
                                type={field.type} 
                                placeholder={field.placeholder} 
                                customClass={undefined} />
                            )
                        }
                        <div className="inline-flex items-center cursor-pointer mt-2">
                        <input id="customCheckLogin"type="checkbox" className="form-checkbox border-0 rounded text-gray-800 ml-1 w-4 h-4" style={{ transition: "all .15s ease" }}/>
                        <span className="ml-2 text-sm font-semibold text-gray-500">Recordarme</span>
                    </div>
                    <div className="text-center mt-6">
                        <Button disabled={isLoading} type="submit">
                            {isLoading ? <Spinner/> : 'Iniciar Sesión'}                                
                        </Button>
                        <br />
                        <br />
                        <LabelDiv>¿Sos nuevo en Ciudadano Digital?</LabelDiv>
                        <Link to="/Registro"><Button disabled={isLoading} color="secondary">
                            Crear una cuenta                               
                        </Button></Link>
                        <br />
                        <LabelDiv>¿Tuviste algun problema al registrarte?</LabelDiv>
                        <Link to="/RestaurarPassword"><Button disabled={isLoading} color="disabled_tint">
                            No recuerdo mi contraseña                              
                        </Button></Link>
                        <Button disabled={isLoading} color="disabled_tint">
                            No pude validar mi correo electrónico                            
                        </Button>   
                    </div>
                    </Form>
                )}
            </Formik>
        </Sidebar>
        <MainContainer>
            <TitleDiv>Normativas</TitleDiv>
        </MainContainer>
    </>)
}

/*
<Hero classes="bg-gradient-to-r from-emerald-500 to-lime-600 text-white" tail={true}>
            <div className="container mx-auto flex content-center items-center justify-center h-full px-4">
                <div className="w-full lg:w-4/12">

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
                            <Button onClick={HandleLogin} disabled={isLoading}>
                                {isLoading ? <Spinner/> : 'Iniciar Sesión'}                                
                            </Button>
                            <br />
                            <br />
                            <LabelDiv>¿Sos nuevo en Ciudadano Digital?</LabelDiv>
                            <Link to="/Registro"><Button disabled={isLoading} color="secondary">
                                Crear una cuenta                               
                            </Button></Link>
                            <br />
                            <br />
                            <Link to="/RestaurarPassword"><Button disabled={isLoading} color="disabled_tint">
                                No recuerdo mi contraseña                              
                            </Button></Link>
                            <Button disabled={isLoading} color="disabled_tint">
                                No pude validar mi correo electrónico                            
                            </Button>
                        </div>
                    </form>
        </Sidebar>
        <MainContainer>
            <TitleDiv>Normativas</TitleDiv>
        </MainContainer>
    </>)
}

/*
<Hero classes="bg-gradient-to-r from-emerald-500 to-lime-600 text-white" tail={true}>
            <div className="container mx-auto flex content-center items-center justify-center h-full px-4">
                <div className="w-full lg:w-4/12">

                    <Formik
                    initialValues= {fieldsState}
                    validationSchema={validationSchema}
                    onSubmit={ (values) => {
                        console.log(values)
                        Login(values)
                    }}>
                        {
                            (formik) => (
                                <Form noValidate className="flex-auto px-4 lg:px-10 py-8 relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
                                    {
                                        fields.map(
                                            field => <Input
                                            key={field.name} 
                                            value={undefined}
                                            label={undefined} 
                                            labelFor={field.labelFor} 
                                            id={field.id} 
                                            name={field.name} 
                                            type={field.type} 
                                            placeholder={field.placeholder} 
                                            customClass={undefined} />
                                        )
                                    }
                                    <div className="inline-flex items-center cursor-pointer mt-2">
                                    <input id="customCheckLogin"type="checkbox" className="form-checkbox border-0 rounded text-gray-800 ml-1 w-4 h-4" style={{ transition: "all .15s ease" }}/>
                                    <span className="ml-2 text-sm font-semibold text-gray-500">Recordarme</span>
                                </div>
                                <div className="text-center mt-6">
                                <button className="bg-gradient-to-r from-emerald-500 to-lime-600 text-white text-center active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="submit" style={{ transition: "all .15s ease" }} disabled={isLoading}>
                                {isLoading ? <Spinner/> : 'Iniciar Sesión'}                                
                                </button>
                                </div>
                                </Form>
                            )
                        }
                        
                    </Formik>
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
        </Hero>*/