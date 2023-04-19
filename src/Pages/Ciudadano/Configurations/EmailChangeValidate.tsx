import { useContext, useEffect, useState } from 'react';
import { Link} from 'react-router-dom';

import { DivOutlined, Spinner, NavigatorSpacer, DivTitle } from '../../../Components/Elements/StyledComponents';
import { Button } from '../../../Components/Forms/Button';
import { AiOutlineArrowLeft, AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { GetParams } from '../../../Utils/General';
import { FieldGrid, LayoutSection, LayoutTitle } from '../../../Components/Layout/StyledComponents';
import { AuthContext } from '../../../Contexts/AuthContext';
import { IFormState } from '../../../Interfaces/Data';
import { DefaultFormState } from '../../../Data/DefaultValues';

export const DC_Configurations_EmailChangeValidate = () => {

  const SearchParams = GetParams(["token"]);

  const { EmailChangeValidate } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);

  const Validate = async () => {
    if(SearchParams.status){ 
      const response = await EmailChangeValidate({
        'token':SearchParams.values.token
      }, setFormState);
    }
  }
  
  useEffect(() => {Validate()}, [])

  return(<>
    <LayoutTitle>
      Mi Perfil
    </LayoutTitle>
    <LayoutSection>
      <h1><AiOutlineMail className='small'/>Cambiar Correo Electrónico</h1>
      {SearchParams.status?<>
          {FormState.loading?<>
              <Spinner color='primary' size="3rem"/>
              <br />
              <span className='text-center mt-2 mb-2'>Estamos validando tu nuevo correo. Por favor aguarde.</span>
          </>:<>
              {FormState.finish?<>
                <DivTitle className='mb-2' color="primary">¡Validación de nuevo mail realizada!</DivTitle>
          <span className='text-center mt-0 mb-2'>Regresa a la sección <strong>Mi Perfil</strong> para ver el cambio.</span>
              </>:<>
          <DivTitle className='text-center mb-2' color="error">¡Ha ocurrido un error!</DivTitle>
                  <DivOutlined color="error">{FormState.error}</DivOutlined>
          <span className='text-center mt-2 mb-2'>¡Por favor revisa el mail enviado! o bien, solicita un nuevo codigo de verificación.</span>
              </>}
          </>}
      </>:<>
          <DivTitle className='text-center mb-2' color="error">¡Ha ocurrido un error!</DivTitle>
          <DivOutlined color="error">{SearchParams.errors.map(e=><div key={e}>{e}</div>)}</DivOutlined>
          <span className='text-center mt-2 mb-2'>¡Por favor revisa el mail enviado! o bien, solicita un nuevo codigo de verificación.</span>
    </>}
    <hr className=''/>
    <FieldGrid className="FlexSwitchForms">
      <Link to="/../Dashboard/Config"><Button disabled={FormState.loading} color="gray">
            <AiOutlineArrowLeft/>Volver a <b className='-ml-1'>Mi Perfil</b>                                
        </Button></Link>
      <NavigatorSpacer/>
      {(FormState.error || !SearchParams.status)?<Link to="/../Dashboard/Config/EmailChange"><Button color="secondary" disabled={FormState.loading}>
            Solicitar Nuevo Codigo
            <AiOutlineLock/>                        
        </Button></Link>:<></>}
    </FieldGrid>
    </LayoutSection>
  </>)
}