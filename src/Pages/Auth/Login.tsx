import { useContext, useState } from 'react';
import { loginFields } from "../../Interfaces/formFields";
import { Hero } from '../../Components/Elements/Hero';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvira } from 'react-icons/fa';
import { AuthAPI } from '../../Config/AuthAPI';
import { AuthContext } from '../../Contexts/AuthContext';
import { Spinner } from '../../Components/Elements/StyledComponents';
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

        // if(rule.type === 'number'){
        //     schema2 = schema2.integer('Debe ser un número');
        // }
    }

    requiredFields[input.name] = schema;
}

const validationSchema = Yup.object({...requiredFields});

export const LoginPage = () =>{

    const { Login, isLoading } = useContext(AuthContext);

    return(
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
        </Hero>
    )
}