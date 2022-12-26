import { useContext, useState } from 'react';
import { loginFields, signupFields } from "../../Interfaces/formFields";
import { Hero } from '../../Components/Elements/Hero';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthAPI } from '../../Config/AuthAPI';
import { AuthContext } from '../../Contexts/AuthContext';
import { Spinner } from '../../Components/Elements/StyledComponents';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Input } from '../../Components/Forms/Input';

const fields = signupFields;
const fieldsState: {[key: string]: any} = {};
const requiredFields: {[key: string]: any}= {};

for(const input of fields){
    fieldsState[input.name] = input.value;
    if( !input.validations ) continue; 

    let schema = Yup.string();

    for(const rule of input.validations){
        if(rule.type === 'required'){
            schema = schema.required('Requerido');
        }

        if(rule.type === 'email'){
            schema = schema.email('Debe ser un email válido');
        }

        if(rule.type === 'confirmEmail'){
            schema = schema.oneOf([Yup.ref('email')],'Los emails no coinciden');
        }

        if(rule.type === 'confirmPassword'){
            schema = schema.oneOf([Yup.ref('password')],'Las contraseñas no coinciden');
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

export const RegisterPage = () =>{
    
    const { Signup, isLoading } = useContext(AuthContext);

    return(
    <Hero classes="bg-gradient-to-r from-cyan-500 to-blue-500 text-white" tail={true}>
        <div className="container mx-auto flex content-center items-center justify-center h-full px-4">
              <div className="w-full lg:w-4/12">
              <Formik
                initialValues= {fieldsState}
                validationSchema={validationSchema}
                onSubmit={ (values) => {
                    console.log(values)
                    Signup(values)
                }}>
                    {
                        (formik) => (
                            <Form noValidate className="flex-auto px-4 lg:px-10 py-8 relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-100 border-0">
                                {
                                    fields.map( (field) => {
                                        return <Input 
                                            key={field.id}
                                            value={undefined}
                                            labelFor={field.labelFor}
                                            id={field.id}
                                            name={field.name}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            customClass={"undefined"} 
                                            label={""}/>
                                    })
                                }
                            <div className="text-center mt-6">
                                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="submit" style={{ transition: "all .15s ease" }}>
                                {isLoading ? <Spinner/> : 'Crear Cuenta'} 
                                </button>
                            </div>
                            </Form>
                        )
                    }            
                </Formik>
                <div className="flex flex-wrap my-6 ">
                    <Link to="/Ingresar" className="text-white w-full text-right">
                        <small>¿Ya tenes una cuenta? <strong>¡Inicia Sesión!</strong></small>
                    </Link>
                </div>
            </div>
          </div></Hero>
    )
}