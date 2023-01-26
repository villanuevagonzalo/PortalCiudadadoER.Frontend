import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';

import { DivOutlined, DivLabel, MainContainer, Sidebar, Spinner, DivSubtitle, DivTitle2 } from '../../Components/Elements/StyledComponents';
import { LogoCiudadanoDigital } from '../../Components/Images/LogoCiudadanoDigital';
import { Button } from '../../Components/Forms/Button';
import { AiFillHome, AiOutlineLock } from 'react-icons/ai';
import { Descripcion } from '../../Components/Elements/Descripcion';
import { GetParams } from '../../Utils/GeneralFunctions';
import { AuthAPI } from '../../Config/AuthAPI';

const AxiosAuthAPI = new AuthAPI();

export const ValidarCorreo = () =>{

    const SearchParams = GetParams(["token"]);
    
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const ValidateEmail = async () => {
        await AxiosAuthAPI.UserValidateEmail({'token':SearchParams.values.token}).then((response)=>{
            setIsSuccess((response.statusText == "OK"))
            console.log(response)
        }).catch((reason)=>{
            console.log(reason)
            setIsSuccess(!(reason.response.data.code == 0))
        })
        setIsLoading(false)
    }

    useEffect(() => {if(SearchParams.status){ ValidateEmail() }}, [])

    return(<>
        <Sidebar>
            <LogoCiudadanoDigital/>
            <br />
            <br />
            <br />
            <br />
            {SearchParams.status?<>
                {isLoading?<>
                    <DivTitle2 className='text-center mb-2'>Validación de Correo</DivTitle2>
                    <DivSubtitle className='text-center'>Estamos validando tu correo. Por favor aguarde.</DivSubtitle>
                    <br />
                    <Spinner color='primary' size="3rem"/>
                    <br />
                    <br />
                    <br />
                    <br />
                </>:<>
                    {isSuccess?<>
                        <DivTitle2 className='text-center mb-2'>¡Validación de usuario realizada!</DivTitle2>
                        <DivSubtitle className='text-center'>Alcanzaste el <strong>NIVEL 1</strong> de autenticación.</DivSubtitle>
                        <br />
                        <br />
                        <br />
                        <DivLabel>Inicia Sesión para empezar a utilizar a Ciudadano Digital</DivLabel>
                        <Link to="/Ingresar" className="w-full"><Button>
                        Iniciar Sesión
                        </Button></Link>
                    </>:<>
                        <DivTitle2 className='text-center mb-2' color="error">Validación de Correo</DivTitle2>
                        <DivOutlined color="error">Se produjo un error en la validación</DivOutlined>
                        <br />
                        <DivSubtitle>¡Por favor revisa el mail enviado! o bien, solicite un nuevo codigo de verificación.</DivSubtitle>
                        <br />
                        <Link to="/ReenviarCodigo" className="w-full"><Button color="secondary">
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
                <DivTitle2 className='text-center mb-2' color="error">Validación de Correo</DivTitle2>
                <DivSubtitle className='text-center'>Los siguientes campos presentan un error:</DivSubtitle>
                <DivOutlined color="error">{SearchParams.errors.map(e=><div>{e}</div>)}</DivOutlined>
                <br />
                <DivSubtitle>¡Por favor revisa el mail enviado! o bien, solicita un nuevo codigo de verificación.</DivSubtitle>
                <br />
                <Link to="/ReenviarCodigo" className="w-full"><Button color="secondary">
                    Solicitar Nuevo Codigo
                    <AiOutlineLock/>                        
                </Button></Link>
                <Link to="/" className="w-full"><Button>
                    <AiFillHome />
                    Volver al Inicio
                </Button></Link>
            </>}
        </Sidebar>
        <MainContainer>
            <Descripcion />
        </MainContainer>
    </>)
}