import { useContext, useEffect, useRef, useState } from 'react';
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';

import { LabelDiv, MainContainer, Sidebar, Spinner, SubtitleDiv, Title2Div, TitleDiv, ToDo } from '../../Components/Elements/StyledComponents';
import { LogoCiudadanoDigital } from '../../Components/Images/LogoCiudadanoDigital';
import { Button } from '../../Components/Forms/Button';
import { Formik, Form } from 'formik';
import { FormikField } from '../../Components/Forms/FormikField';
import { AiFillHome, AiOutlineLock } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { Descripcion } from '../../Components/Elements/Descripcion';
import { GetParams, Sleep } from '../../Utils/generalFunctions';
import { ImagenMedalla } from '../../Components/Images/ImagenMedalla';
import { AuthAPI } from '../../Config/AuthAPI';



const AxiosAuthAPI = new AuthAPI();


export const ValidarCorreo = () =>{

    const SearchParams = GetParams(["code","cuil"]);
    
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSuccess, setIsSuccess] = useState<boolean>(true);

    const ValidateEmail = async () => {
        await AxiosAuthAPI.UserValidateEmail({'confirmation_code':SearchParams.values.code,'cuil':SearchParams.values.cuil}).then((response)=>{
            console.log('VALIDACIÓN COMPLETADA: ',response)
        }).catch((reason)=>{
            setIsSuccess(false)
            console.log('ERROR EN LA VALIDACIÓN: ',reason)
        })
        setIsLoading(false)
    }

    useEffect(() => {if(SearchParams.status){ ValidateEmail() }}, [])

    console.log(SearchParams)

    return(<>
        <Sidebar open={true}>
            <LogoCiudadanoDigital/>
            <br />
            {SearchParams.status?<>
                <TitleDiv>Validación de Correo<HiOutlineMail/></TitleDiv>
                {isLoading?<>            
                    <SubtitleDiv>Estamos validando tu correo. Por favor aguarde.</SubtitleDiv>
                    <br />
                    <Spinner color='primary' size="3rem"/>
                </>:<>
                    {isSuccess?<>            
                <SubtitleDiv>Validaste exitosamente tu cuenta</SubtitleDiv>
                <br />
                <ImagenMedalla width="100px"/>
                <br />
                <Title2Div>¡Felitaciones!</Title2Div>
                <SubtitleDiv>Alcanzaste el <strong>NIVEL 1</strong> de autenticación.</SubtitleDiv>
  
                <LabelDiv>Inicia Sesión para empezar a utilizar a Ciudadano Digital</LabelDiv>
            <Link to="/Ingresar" className="w-full"><Button>
                Iniciar Sesión
            </Button></Link>
                    </>:<>
                        <br />   
                        <div>Se produjo un error en la validación.</div>
                        <br />
                        <SubtitleDiv>¡Por favor revisa el mail enviado! o bien, solicita un nuevo codigo de verificación.</SubtitleDiv>
                        <Link to="/" className="w-full"><Button color="secondary">
                            Solicitar Nuevo Codigo
                            <AiOutlineLock/>                        
                        </Button></Link>
                        
            <Link to="/" className="w-full"><Button>
                <AiFillHome />
                Volver al Inicio
            </Button></Link>
                    </>}
                </>}
            
            
            </>:<>
                <TitleDiv>Validar Correo<AiOutlineLock/></TitleDiv>            
                <SubtitleDiv>Los siguientes campos presentan error</SubtitleDiv>
                {SearchParams.errors.map(e=><div>{e}</div>)}
                <br />
                <SubtitleDiv>¡Por favor revisa el mail enviado! o bien, solicita un nuevo codigo de verificación.</SubtitleDiv>
            
                <Link to="/" className="w-full"><Button color="secondary">
                    Solicitar Nuevo Codigo
                    <AiOutlineLock/>                        
                </Button></Link>
            </>}
            
        </Sidebar>
        <MainContainer>
            <Descripcion />
        </MainContainer>
    </>)
}