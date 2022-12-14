import { useContext, useState } from 'react';
import { loginFields, signupFields } from "../../Interfaces/formFields";
import Input from '../../Components/Forms/Input';
import { Hero } from '../../Components/Elements/Hero';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthAPI } from '../../Config/AuthAPI';
import { AuthContext } from '../../Contexts/AuthContext';
import { Spinner } from '../../Components/Elements/StyledComponents';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { MyTextIntput } from '../../Components/Forms/MyTextIntput';

const fields = signupFields;
const fieldsState: {[key: string]: any} = {};
const requiredFields: {[key: string]: any}= {};

for(const input of fields){
    fieldsState[input.name] = input.value;
    if( !input.validations ) continue;    //revisar si el campo tiene validaciones(opcional)

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
                                        return <MyTextIntput 
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