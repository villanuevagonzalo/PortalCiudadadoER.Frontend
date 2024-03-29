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
import { AxiosResponse } from 'axios';


export const DC_UserValidate : React.FC<{ type?: string; }>  = ({type='AFIP'}) =>{

  const SearchParams = GetParams(["code"]);

  const { userData, userRol, SaveToken, AFIP_checkToken, AFIP_getURL, MIARGENTINA_checkToken, MIARGENTINA_getURL, ANSES_checkToken, ANSES_getURL, RENAPER_checkToken, RENAPER_getURL  } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
  
  async function getValidationLink( type = 'AFIP' ) {
    console.log("this is the type: "+type)
    let response: AxiosResponse | null;
    if(type==='AFIP'){
      response = await AFIP_getURL({
        cuil: userData.cuil
      }, setFormState);
    } else if(type==='Mi Argentina'){
      response = await MIARGENTINA_getURL({
        cuil: userData.cuil
      }, setFormState);
    } else if(type==='ANSES') {
      response = await ANSES_getURL({
        cuil: userData.cuil
      }, setFormState);
    } else {
      response = await RENAPER_getURL({
        cuil: userData.cuil
      }, setFormState);
    }
    if (response) {
      window.location = response.data.data
    }
  }

  async function checkValidation() {
    let response: AxiosResponse | null;
    if(type==='AFIP'){
      response = await AFIP_checkToken({
        'cuil':userData.cuil,
        'code':SearchParams.values.code
      }, setFormState);
    } else if(type==='Mi Argentina'){
      response = await MIARGENTINA_checkToken({
        'cuil':userData.cuil,
        'code':SearchParams.values.code
      }, setFormState);
    } else if(type==='ANSES'){
      response = await ANSES_checkToken({
        'cuil':userData.cuil,
        'code':SearchParams.values.code
      }, setFormState);
    } else {
      response = await RENAPER_checkToken({
        'cuil':userData.cuil,
        'code':SearchParams.values.code
      }, setFormState);
    }
    if(response){
      SaveToken(response.data.data.token)
    } else{
      setFormState((prev:any) => ({ ...prev, finish: false, error: 'Invalid Token' }));
    }
  }

  useEffect(() => {
    if(SearchParams.status && userData.cuil!==''){ 
        checkValidation()
    }
  }, [userData])


  return(<>
    <LayoutSection>
      <h1><BiUserCircle className='small'/>Validación de Identidad por Aplicación</h1>
      {(userRol[0].level==3 && !FormState.finish)?<>
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