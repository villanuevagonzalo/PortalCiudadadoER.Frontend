import { useContext, useEffect, useState } from 'react';
import { Link} from 'react-router-dom';

import { DivOutlined, DivLabel, MainContainer, Spinner, DivSubtitle, DivTitle2, NavigatorSpacer } from '../../../Components/Elements/StyledComponents';
import { Button } from '../../../Components/Forms/Button';
import { AiFillHome, AiOutlineArrowLeft, AiOutlineLock } from 'react-icons/ai';
import { Descripcion } from '../../../Components/Elements/Descripcion';
import { GetParams } from '../../../Utils/General';
import { FieldGrid, LayoutSection, LayoutSidebar, LayoutTitle } from '../../../Components/Layout/StyledComponents';
import { LayoutSidebarLogos } from '../../../Components/Layout/LayoutSidebarLogos';
import { AuthContext } from '../../../Contexts/AuthContext';
import { IFormState } from '../../../Interfaces/Data';
import { DefaultFormState } from '../../../Data/DefaultValues';
import { Pages } from '../../../Routes/Pages';
import { BiUserCircle } from 'react-icons/bi';


export const DC_UserValidate : React.FC<{ type?: string; }>  = ({type='AFIP'}) =>{

  const SearchParams = GetParams(["code"]);

  const { userData, userRol, AFIP_checkToken, AFIP_getURL, MIARGENTINA_checkToken, MIARGENTINA_getURL  } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
  
  async function getValidationLink( type = 'AFIP' ) {
    let Response;
    if(type==='AFIP'){
      Response = await AFIP_getURL({
        cuil: userData.cuil
      }, setFormState);
    } else if(type==='Mi Argentina'){
      Response = await MIARGENTINA_getURL({
        cuil: userData.cuil
      }, setFormState);
    }
    if (Response?.status) {
      //window.location = Response.data.response
      console.log(Response.data.response)
    }
  }

  async function checkValidation() {
    let Response;
    if(type==='AFIP'){
      Response = await AFIP_checkToken({
        'cuil':userData.cuil,
        'code':SearchParams.values.code
      }, setFormState);
    } else if(type==='Mi Argentina'){
      Response = await MIARGENTINA_checkToken({
        'cuil':userData.cuil,
        'code':SearchParams.values.code
      }, setFormState);
    }
    console.log(Response)
  }

  useEffect(() => {
    if(SearchParams.status && userData.cuil!==''){ 
        checkValidation()
    }
  }, [userData])


  return(<>
    <LayoutSection>
      <h1><BiUserCircle className='small'/>Validación de Identidad por Aplicación</h1>
      {userRol[0].level==3?<>
        <DivOutlined className="flex-col">
          <b>Tu identidad ya ha sido validada.</b>
        </DivOutlined>
      </>:<>
        {SearchParams.status?<>
          {FormState.loading?<>
            Estamos validando tu identidad.
            <br />
            <br />
            <Spinner color='primary' size="3rem"/>
            <br />
          </>:<>
            {FormState.finish?<>
              <DivOutlined className="mt-0 flex-col" color="primary">
                <b className='mb-2'>¡Validación Exitosa!</b>
                <p>Alcanzaste el <strong>NIVEL 3</strong> de autenticación.</p>
              </DivOutlined>
            </>:<>
              <DivOutlined className="mt-0 flex-col" color="error">
                <b className='mb-2'>¡Ha habido un error!</b>
                {FormState.error}
              </DivOutlined>
              <br/>
              Por favor solicite un nuevo codigo de verificación:
              <br />
              <Button onClick={()=>getValidationLink(type)} disabled={FormState.loading}>Solicitar nuevo codigo <b>{FormState.loading ? <Spinner /> : type}</b></Button>
            </>}
          </>}
        </>:<>
          <DivOutlined className="mt-0 flex-col" color="error">
            <b className='mb-2'>¡Ha habido un error!</b>
            {SearchParams.errors.map(e=><div key={e}>{e}</div>)}
          </DivOutlined>
          <br/>
          Por favor solicite un nuevo codigo de verificación:
          <br />
          <Button onClick={()=>getValidationLink(type)} disabled={FormState.loading}>Solicitar nuevo codigo <b>{FormState.loading ? <Spinner /> : type}</b></Button>
          <br />
        </>}
      </>}
      <hr className=''/>
      <FieldGrid className="FlexSwitchForms">
        <Link to={Pages.DC_CONFIGURATIONS}><Button disabled={FormState.loading} color="gray">
              <AiOutlineArrowLeft/>Volver a <b className='-ml-1'>Mi Perfil</b>                                
          </Button></Link>
        <NavigatorSpacer/>
      </FieldGrid>
    </LayoutSection>
  </>)
}


/*


      {SearchParams.status?<>
          {FormState.loading?<>
              <DivTitle2 className='text-center mb-2'>Validación Autenticar</DivTitle2>
              <DivSubtitle className='text-center'>Estamos validando tu nivel de usuario.</DivSubtitle>
              <br />
              <Spinner color='primary' size="3rem"/>
              <br />
              <br />
              <br />
              <br />
          </>:<>
              {FormState.finish?<>
                  <DivTitle2 className='text-center mb-2'>¡Validación realizada!</DivTitle2>
                  <DivSubtitle className='text-center'>Alcanzaste el <strong>NIVEL 3</strong> de autenticación.</DivSubtitle>
                  <br />
                  <DivLabel>Inicia Sesión para utilizar Ciudadano Digital</DivLabel>
                  <br />
                  <Link to={Pages.AUTH_LOGIN} className="w-full"><Button>
                  Iniciar Sesión
                  </Button></Link>
              </>:<>
                  <DivTitle2 className='text-center mb-2' color="error">Validación Autenticar</DivTitle2>
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