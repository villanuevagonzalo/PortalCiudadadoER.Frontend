import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

import { DivOutlined, DivLabel, Spinner, DivSubtitle, DivTitle2, ColoredLabel } from '../../Components/Elements/StyledComponents';
import { Button } from '../../Components/Forms/Button';
import { AiFillHome, AiOutlineArrowLeft, AiOutlineLock } from 'react-icons/ai';
import { GetParams, actionData } from '../../Utils/General';
import { AuthContext } from '../../Contexts/AuthContext';
import { IFormState } from '../../Interfaces/Data';
import { DefaultFormState } from '../../Data/DefaultValues';
import { Pages } from '../../Routes/Pages';
import { LogoCiudadanoDigital } from '../../Components/Images/LogoCiudadanoDigital';
import { LayoutSpacer } from '../../Components/Layout/StyledComponents';
import { LogoER } from '../../Components/Images/LogoEntreRios';

export const Auth_Redirect = () =>{

  const SearchParams = GetParams(["dni","token","redirect_path","data", "secretaria"]);
  const navigate = useNavigate();

  const { userData, userRol, Redirect, ContextLoaded } = useContext(AuthContext);

  const [ redirect, setRedirect] = useState<boolean>(false);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);

  const userActor:any = userRol.find((obj) => obj.type === "Actor")
  

  const continueLogin = () => {
    
    if(SearchParams.status){
      if(Pages[SearchParams.values.redirect_path]){
        navigate(Pages[SearchParams.values.redirect_path])
      } else{
        navigate(Pages.DA)
      }
    }
  }

  const forceLogin = async () => {
    setRedirect(true)
    if(SearchParams.status){ 
      const response = await Redirect({
        'dni': SearchParams.values.dni,
        'secretaria': SearchParams.values.secretaria,
        'token':SearchParams.values.token,
        'data': actionData(SearchParams.values.data)
      }, setFormState);

      if(response) continueLogin()
    }
  }  
  useEffect(()=>{if(ContextLoaded){
    //if(userData.cuil==''){
      forceLogin()

    //}

  }},[ContextLoaded])
  


  return(<>
    <div className="Content mb-4">
      
    <LogoER width="135px"/>
    </div>
    <hr className='mb-4'/>
    {ContextLoaded?
      SearchParams.status?(FormState.loading?<>
        <Spinner color='secondary' size="3rem"/><br/>
        <DivSubtitle className='text-center'>Estamos validando tu identidad.<br/>Por favor aguarde.</DivSubtitle>
      </>:(redirect?
        (FormState.finish?<>
          <DivSubtitle className='text-center'>Validación completada</DivSubtitle>
        </>:<>
          <DivSubtitle className='text-center'>Ha ocurrido el siguiente error:</DivSubtitle>
          <DivOutlined color="error" className='mb-4'>{FormState.error}</DivOutlined>
        <Link to={Pages.INDEX} className="w-full"><Button color="gray">
        <AiOutlineArrowLeft/>Volver al Administrador<LayoutSpacer/>
        </Button></Link>
        </>):<>
          <p className='mb-4 text-center'>Usted ya se encuentra logeado como:<br/><br/> <b>{userData.name} {userData.last_name}</b><br/><br/>¿Desea continuar?</p>
          <Button onClick={continueLogin} color="gray">Continuar con la Sesión Actual</Button>
          <Button onClick={forceLogin} color="secondary">Ingresar por Redireccionamiento</Button>
        </>
      )):<>
        <DivSubtitle className='text-center'>Los siguientes parametros presentan un error:</DivSubtitle>
        <DivOutlined color="error" className='flex-col mb-4' style={{justifyContent:'left'}}>{SearchParams.errors.map(e=><div>{e}</div>)}</DivOutlined>
        <Link to={Pages.INDEX} className="w-full"><Button color="gray">
        <AiOutlineArrowLeft/>Volver al Administrador<LayoutSpacer/>
        </Button></Link>
      </>
    :<><Spinner color='secondary' size="3rem"/></>}
  </>);
}



    /*


{SearchParams.status
      ?((redirect)
        ?<>
          <Spinner color='secondary' size="3rem"/><br/>
          <DivSubtitle className='text-center'>Estamos validando tu identidad.<br/>Por favor aguarde.</DivSubtitle>
        </>
        :(ContextLoaded?<>
          <p className='mb-4 text-center'>Usted ya se encuentra logeado como:<br/><br/> <b>{userData.name} {userData.last_name}</b><br/><br/>¿Desea continuar?</p>
          <Button onClick={continueLogin} color="gray">Continuar con la Sesión Actual</Button>
          <Button onClick={forceLogin} color="secondary">Ingresar por Redireccionamiento</Button>
        </>:<>Cargando</>)
        ):<>
        
      </>
    }
{FormState.loading?<>
                <DivTitle2 className='text-center mb-2'>Validación de Correo</DivTitle2>
                <DivSubtitle className='text-center'>Estamos validando tu correo. Por favor aguarde.</DivSubtitle>
                <br />
                <Spinner color='primary' size="3rem"/>
                <br />
                <br />
                <br />
                <br />
            </>:<>
                {FormState.finish?<>
                    <DivTitle2 className='text-center mb-2'>¡Validación realizada!</DivTitle2>
                    <DivSubtitle className='text-center'>Alcanzaste el <strong>NIVEL 1</strong> de autenticación.</DivSubtitle>
                    <br />
                    <DivLabel>Inicia Sesión para utilizar Ciudadano Digital</DivLabel>
                    <br />
                    <Link to={Pages.AUTH_LOGIN} className="w-full"><Button>
                    Iniciar Sesión
                    </Button></Link>
                </>:<>
                    <DivTitle2 className='text-center mb-2' color="error">Validación de Correo</DivTitle2>
                    <DivOutlined color="error">{FormState.error}</DivOutlined>
                    <br />
                    <DivSubtitle>¡Por favor revisa el mail enviado! o bien, solicite un nuevo codigo de verificación.</DivSubtitle>
                    <br />
                    <form>
                    <Link to={Pages.AUTH_EMAILRESENDVALIDATION} className="w-full"><Button color="secondary">
                        Solicitar Nuevo Codigo
                        <AiOutlineLock/>                        
                    </Button></Link>
                    <Link to={Pages.INDEX} className="w-full"><Button>
                        <AiFillHome />
                        Volver al Inicio
                    </Button></Link></form>
                </>}
            </>}



    const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
    
    useEffect(() => {if(SearchParams.status){ 
      const response = EmailValidate({
        'token':SearchParams.values.token
      }, setFormState);

    }}, [])

    return(<>
    </>)*/


/*


        {SearchParams.status?<>
            {FormState.loading?<>
                <DivTitle2 className='text-center mb-2'>Validación de Correo</DivTitle2>
                <DivSubtitle className='text-center'>Estamos validando tu correo. Por favor aguarde.</DivSubtitle>
                <br />
                <Spinner color='primary' size="3rem"/>
                <br />
                <br />
                <br />
                <br />
            </>:<>
                {FormState.finish?<>
                    <DivTitle2 className='text-center mb-2'>¡Validación realizada!</DivTitle2>
                    <DivSubtitle className='text-center'>Alcanzaste el <strong>NIVEL 1</strong> de autenticación.</DivSubtitle>
                    <br />
                    <DivLabel>Inicia Sesión para utilizar Ciudadano Digital</DivLabel>
                    <br />
                    <Link to={Pages.AUTH_LOGIN} className="w-full"><Button>
                    Iniciar Sesión
                    </Button></Link>
                </>:<>
                    <DivTitle2 className='text-center mb-2' color="error">Validación de Correo</DivTitle2>
                    <DivOutlined color="error">{FormState.error}</DivOutlined>
                    <br />
                    <DivSubtitle>¡Por favor revisa el mail enviado! o bien, solicite un nuevo codigo de verificación.</DivSubtitle>
                    <br />
                    <form>
                    <Link to={Pages.AUTH_EMAILRESENDVALIDATION} className="w-full"><Button color="secondary">
                        Solicitar Nuevo Codigo
                        <AiOutlineLock/>                        
                    </Button></Link>
                    <Link to={Pages.INDEX} className="w-full"><Button>
                        <AiFillHome />
                        Volver al Inicio
                    </Button></Link></form>
                </>}
            </>}
        </>:<>
            <DivTitle2 className='text-center mb-2' color="error">Validación de Correo</DivTitle2>
            <DivSubtitle className='text-center'>Los siguientes campos presentan un error:</DivSubtitle>
            <DivOutlined color="error">{SearchParams.errors.map(e=><div>{e}</div>)}</DivOutlined>
            <br />
            <DivSubtitle>¡Por favor revisa el mail enviado! o bien, solicita un nuevo codigo de verificación.</DivSubtitle>
            <br />
            <form><Link to={Pages.AUTH_EMAILRESENDVALIDATION} className="w-full mb-3"><Button color="secondary">
              Solicitar Nuevo Codigo
              <AiOutlineLock/>                        
          </Button></Link>
          <Link to={Pages.INDEX} className="w-full"><Button>
              <AiFillHome />
              Volver al Inicio
          </Button></Link></form>
      </>}

*/