import { useContext, useState } from 'react';
import { formGetValidations, formGetInitialValues } from "../../Interfaces/FormFields";
import { IFormState } from "../../Interfaces/Data";
import { DefaultFormState } from "../../Data/DefaultValues";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { DivLabel, MainContainer, Spinner, DivSubtitle, DivTitle, DivOutlined } from '../../Components/Elements/StyledComponents';
import { Button } from '../../Components/Forms/Button';
import { Formik, Form } from 'formik';
import { FormikField } from '../../Components/Forms/FormikField';
import { Descripcion } from '../../Components/Elements/Descripcion';
import { LayoutSidebar } from '../../Components/Layout/StyledComponents';
import { LayoutSidebarLogos } from '../../Components/Layout/LayoutSidebarLogos';
import { CountDown } from '../../Components/Elements/CountDown';
import moment from 'moment';

const FormRequiredFields = [
    'CUIL'
]

export const EmailReValidation = () => {

  const { EmailResendVerification } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
  const [ FieldValues, setFieldValues ] = useState(formGetInitialValues(FormRequiredFields));

  let errors = FormState.error.split(' | ');

  return (<>
    <LayoutSidebar>
      <LayoutSidebarLogos/>
      <DivTitle className="mt-5">Validación de Correo</DivTitle>
      {FormState.finish?<>
        <DivOutlined className="mt-4 flex-col" color="secondary">
          <b className='mb-2'>¡Se ha reenviado el mail de validación a su casilla de correo!</b>
          <span className='block'>Por favor aguarda <CountDown time={300} onFinish={()=>setFormState(prev=>({...prev, finish:false}))}/> minutos antes de solicitar otro codigo.</span>
        </DivOutlined>
      </>:<>
        <DivSubtitle className="text-center pb-4">
          Ingresa tu CUIL para reenviar el correo de verificación.
        </DivSubtitle>
        <Formik
          enableReinitialize={true}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={FieldValues}
          validationSchema={formGetValidations(FormRequiredFields)}
          onSubmit={async(values:any) => {
            const response = await EmailResendVerification({
              cuil: values.CUIL,
            }, setFormState);
          }}
        ><Form autoComplete="off">
          <FormikField name="CUIL" disabled={FormState.loading || errors.length>1} autoFocus/>
          <Button disabled={FormState.loading || errors.length>1} type="submit">
              {FormState.loading ? <Spinner/> : 'Reenviar Email'}                                
          </Button>
        </Form></Formik>
        {FormState.error?<><DivOutlined open={FormState.error?true:false} className="mt-4 flex-col">
          {errors.length>1?<>
        <b className='mb-2'>{errors[1]} <CountDown time={moment.duration('00:'+errors[2]).asSeconds()} onFinish={()=>setFormState(prev=>({...prev, error:''}))}/> minutos</b>
        Ya se te ha enviado un mail para validar tu correo electrónico
        </>:FormState.error}
        </DivOutlined></>:<></>}
      </>}
      <br/>
      <DivLabel color="gray_tint">
        ¿Ya validaste tu correo electrónico?
      </DivLabel>
      <Link to="/Ingresar">
        <Button disabled={FormState.loading} color="gray">
          Iniciar Sesión
        </Button>
      </Link>
    </LayoutSidebar>
    <MainContainer>
        <Descripcion />
    </MainContainer>
  </>);
}