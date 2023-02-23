import { useContext, useRef, useState, useEffect } from 'react';
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { DivLabel, MainContainer, Sidebar, Spinner, DivSubtitle, DivTitle, ToDo, DivOutlined } from '../../Components/Elements/StyledComponents';
import { LogoCiudadanoDigital } from '../../Components/Images/LogoCiudadanoDigital';
import { Button } from '../../Components/Forms/Button';
import { Formik, Form } from 'formik';
import { FormikField } from '../../Components/Forms/FormikField';
import { AiOutlineLock } from 'react-icons/ai';
import { Descripcion } from '../../Components/Elements/Descripcion';
import { useNavigate } from 'react-router-dom';
import { GetParams } from '../../Utils/General';
import { AuthAPI } from '../../Services/AuthAPI';
import { LogoER } from '../../Components/Images/LogoEntreRios';
import { LayoutColumns, LayoutSidebar } from '../../Components/Layout/StyledComponents';
import { LayoutSidebarLogos } from '../../Components/Layout/LayoutSidebarLogos';
import { CountDown } from '../../Components/Elements/CountDown';
import moment from 'moment';

const FormRequiredFields = [
    'CUIL'
]

export const EmailReValidation = () => {

  const { EmailResend } = useContext(AuthContext);
  const [FormState, setFormState] = useState<FormStateProps>(FormStateDefault);
  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));

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
            setFormState(prev=>({...prev, loading:true}))
            const ResetPasswordResponse = await EmailResend({
              cuil: values.CUIL,
            })
            if(ResetPasswordResponse.status){
              setFormState(prev=>({...prev, error:'', finish: true}))
            } else{
              setFormState(prev=>({...prev, error:ResetPasswordResponse.message}))
            }
            setFormState(prev=>({...prev, loading:false}))
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
        {errors[0]}</>:FormState.error}
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