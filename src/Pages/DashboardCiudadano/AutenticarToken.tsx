import { useContext, useEffect, useState } from 'react';
import { Link} from 'react-router-dom';

import { DivOutlined, DivLabel, MainContainer, Spinner, DivSubtitle, DivTitle2 } from '../../Components/Elements/StyledComponents';
import { Button } from '../../Components/Forms/Button';
import { AiFillHome, AiOutlineLock } from 'react-icons/ai';
import { Descripcion } from '../../Components/Elements/Descripcion';
import { GetParams } from '../../Utils/General';
import { LayoutSidebar } from '../../Components/Layout/StyledComponents';
import { LayoutSidebarLogos } from '../../Components/Layout/LayoutSidebarLogos';
import { AuthContext } from '../../Contexts/AuthContext';
import { IFormState } from '../../Interfaces/Data';
import { DefaultFormState } from '../../Data/DefaultValues';

export const AutenticarToken = () =>{

    const SearchParams = GetParams(["code"]);

    const { userData, AFIP_getToken } = useContext(AuthContext);
    const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
    
    useEffect(() => {if(SearchParams.status){ 
      const response = AFIP_getToken({
        'cuil':userData.cuil,
        'code':SearchParams.values.code
      }, setFormState);

      console.log(response)

    }}, [userData])

    return(<>
      <LayoutSidebar>
        <LayoutSidebarLogos/>
        <br/><br/>
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
                    <Link to="/Ingresar" className="w-full"><Button>
                    Iniciar Sesión
                    </Button></Link>
                </>:<>
                    <DivTitle2 className='text-center mb-2' color="error">Validación Autenticar</DivTitle2>
                    <DivOutlined color="error">{FormState.error}</DivOutlined>
                    <br />
                    <DivSubtitle>¡Por favor revisa el mail enviado! o bien, solicite un nuevo codigo de verificación.</DivSubtitle>
                    <br />
                    <form>
                    <Link to="/ReenviarCodigo" className="w-full"><Button color="secondary">
                        Solicitar Nuevo Codigo
                        <AiOutlineLock/>                        
                    </Button></Link>
                    <Link to="/" className="w-full"><Button>
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
            <form><Link to="/ReenviarCodigo" className="w-full mb-3"><Button color="secondary">
              Solicitar Nuevo Codigo
              <AiOutlineLock/>                        
          </Button></Link>
          <Link to="/" className="w-full"><Button>
              <AiFillHome />
              Volver al Inicio
          </Button></Link></form>
      </>}
      </LayoutSidebar>
      <MainContainer>
        <Descripcion />
      </MainContainer>
    </>)
}