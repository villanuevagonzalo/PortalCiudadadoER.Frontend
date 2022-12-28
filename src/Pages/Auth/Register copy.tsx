import { useContext, useRef, useState } from 'react';
import { loginFields, signupFields } from "../../Interfaces/formFields";
import { Hero } from '../../Components/Elements/Hero';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthAPI } from '../../Config/AuthAPI';
import { AuthContext } from '../../Contexts/AuthContext';
import { LabelDiv, MainContainer, Sidebar, Spinner, SubtitleDiv, Title2Div, TitleDiv } from '../../Components/Elements/StyledComponents';
import { SidebarHideable } from '../../Components/NewLayout/SidebarHideable';
import { Navigator } from '../../Components/NewLayout/Navigator';
import { Button } from '../../Components/Forms/Button';
import { LogoCiudadanoDigital } from '../../Components/Elements/LogoCiudadanoDigital';
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

const InputBuild = (iid:number) => (<Input 
    key={fields[iid].id}
    value={undefined}
    labelFor={fields[iid].labelFor}
    id={fields[iid].id}
    name={fields[iid].name}
    type={fields[iid].type}
    placeholder={fields[iid].placeholder}
    customClass={"undefined"} 
    label={""}
/>)

export const RegisterPage = () =>{

    
    const ref:any = useRef(null);
    
    const AxiosAuthAPI = new AuthAPI();
    
    const { Signup, isLoading } = useContext(AuthContext);
    
    const [currentPage,setCurrentPage]=useState<number>(0);

    const pages = [{
        html: (<>
            <Title2Div>Paso 1</Title2Div>
            <SubtitleDiv>Verifica tu CUIL</SubtitleDiv>
            {InputBuild(0)}
            <Link to="/Ingresar" className="w-full"><LabelDiv>
                No lo recuerdo / no tengo mi CUIL
            </LabelDiv></Link>
        </>),
        afterfunction: async () =>{
            console.log()
            await AxiosAuthAPI.GetUserData({'cuil':ref.current.values.cuil}).then((response)=>{
                let userdata = JSON.parse(response.data.user)[0]
                fieldsState.nombre = userdata.NOMBRES
                fieldsState.apellido = userdata.APELLIDO
                console.log(userdata)
            })
        }
    },{
        html: (<>
            <Title2Div>Paso 2</Title2Div>
            <SubtitleDiv>Datos Personales</SubtitleDiv>
            {InputBuild(1)}
            {InputBuild(2)}
        </>)
    },{
        html: (<>
            <Title2Div>Paso 3</Title2Div>
            <SubtitleDiv>Datos de Contacto</SubtitleDiv>
            {InputBuild(3)}
            {InputBuild(4)}
        </>)
    },{
        html: (<>
            <Title2Div>Paso 4</Title2Div>
            <SubtitleDiv>Confirmación Final</SubtitleDiv>
            Al registrarme en la plataforma Gobierno Digital acepto los Términos y condiciones de uso del servicio.
        </>),
        afterfunction: async () =>{
            console.log('send')
        }
    }]

    /*const navigate = useNavigate();

    const [registerState,setRegisterState]=useState<any>(fieldsState);

    const handleChange=(e: any)=>{
        setRegisterState({...registerState,[e.target.id]:e.target.value})
    }

    const HandleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        Signup(registerState)
    };*/

    return(<>
        <Sidebar open={true}>
            <LogoCiudadanoDigital />
            <br />
            <TitleDiv>Crear una Cuenta</TitleDiv>
            <SubtitleDiv>Ingresá tus datos para registrarte en la plataforma.</SubtitleDiv>

            <Formik
                innerRef={ref}
                enableReinitialize={true}
                initialValues= {fieldsState}
                validationSchema={validationSchema}
                onSubmit={ (values) => {
                    console.log(values)
                    Signup(values)
                }}>{(formik) => (
                <Form noValidate className="w-full ">                   
                    <Navigator state={currentPage} setstate={setCurrentPage} pages={pages}/>
                </Form>
            )}</Formik>
            
            <br />
                               
            <LabelDiv>¿Ya te registraste?</LabelDiv>
            <Link to="/Ingresar" className="w-full"><Button disabled={isLoading}>
                Iniciar Sesión
            </Button></Link>
        </Sidebar>
        <MainContainer>
            <TitleDiv>Normativas</TitleDiv>
        </MainContainer>
    </>
    )
}


/*




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


<Hero classes="bg-gradient-to-r from-cyan-500 to-blue-500 text-white" tail={true}>
        <div className="container mx-auto flex content-center items-center justify-center h-full px-4">
              <div className="w-full lg:w-4/12">
              
                <div className="flex flex-wrap my-6 ">
                    <Link to="/Ingresar" className="text-white w-full text-right">
                        <small>¿Ya tenes una cuenta? <strong>¡Inicia Sesión!</strong></small>
                    </Link>
                </div>
            </div>
          </div></Hero>

*/