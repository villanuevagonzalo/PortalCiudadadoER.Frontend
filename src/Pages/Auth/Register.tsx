import { useContext, useRef, useState } from 'react';
import { formFields } from "../../Interfaces/formFields";
import { Link } from 'react-router-dom';
import { AuthAPI } from '../../Config/AuthAPI';
import { AuthContext } from '../../Contexts/AuthContext';
import { LabelDiv, MainContainer, Sidebar, Spinner, SubtitleDiv, Title2Div, TitleDiv } from '../../Components/Elements/StyledComponents';
import { Navigator } from '../../Components/NewLayout/Navigator';
import { Button } from '../../Components/Forms/Button';
import { LogoCiudadanoDigital } from '../../Components/Elements/LogoCiudadanoDigital';
import * as Yup from 'yup';
import { InputField } from '../../Components/Forms/InputField';



const InputFields = formFields;

const InputBuild = (iid:string) => (<InputField
    value={undefined}
    name={iid}
    type={InputFields[iid].type}
    placeholder={InputFields[iid].placeholder}
    autoFocus={true}
    validations={InputFields[iid].validations}
/>)

export const RegisterPage = () =>{

    const AxiosAuthAPI = new AuthAPI();
    
    const { Signup, isLoading } = useContext(AuthContext);
    
    const [currentPage,setCurrentPage]=useState<number>(0);

    const pages = [{
        html: (<>
            <Title2Div>Paso 1</Title2Div>
            <SubtitleDiv>Verifica tu CUIL</SubtitleDiv>
            <InputField />
            <Link to="/Ingresar" className="w-full"><LabelDiv>
                No lo recuerdo / no tengo mi CUIL
            </LabelDiv></Link>
        </>),
        afterfunction: async () =>{
            /*await AxiosAuthAPI.GetUserData({'cuil':ref.current.values.cuil}).then((response)=>{
                let userdata = JSON.parse(response.data.user)[0]
                fieldsState.nombre = userdata.NOMBRES
                fieldsState.apellido = userdata.APELLIDO
                console.log(userdata)
            })*/
        }
    },{
        html: (<>
            <Title2Div>Paso 2</Title2Div>
            <SubtitleDiv>Datos Personales</SubtitleDiv>
            {InputBuild('Name')}
            {InputBuild('LastName')}
        </>)
    },{
        html: (<>
            <Title2Div>Paso 3</Title2Div>
            <SubtitleDiv>Datos de Contacto</SubtitleDiv>
            {InputBuild('Email')}
        </>)
    },{
        html: (<>
            <Title2Div>Paso 4</Title2Div>
            <SubtitleDiv>Contraseña</SubtitleDiv>
        </>)
    },{
        html: (<>
            <Title2Div>Paso 4</Title2Div>
            <SubtitleDiv>Confirmación Final</SubtitleDiv>
            Al registrarme en la plataforma Gobierno Digital acepto los Términos y condiciones de uso del servicio.
        </>),
        afterfunction: async () =>{
            //console.log(ref.current.values)
            //Signup(ref.current.values)
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

            <Navigator state={currentPage} setstate={setCurrentPage} pages={pages}/>
            
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