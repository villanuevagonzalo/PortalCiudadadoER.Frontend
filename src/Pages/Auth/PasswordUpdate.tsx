import { useContext, useState } from 'react';
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { DivLabel, MainContainer, Spinner, DivSubtitle, DivTitle, DivOutlined } from '../../Components/Elements/StyledComponents';
import { Button } from '../../Components/Forms/Button';
import { Formik, Form } from 'formik';
import { FormikField } from '../../Components/Forms/FormikField';
import { AiOutlineLock } from 'react-icons/ai';
import { Descripcion } from '../../Components/Elements/Descripcion';
import { GetParams } from '../../Utils/General';
import { LayoutSidebar } from '../../Components/Layout/StyledComponents';
import { LayoutSidebarLogos } from '../../Components/Layout/LayoutSidebarLogos';

const FormRequiredFields = [
    'Password',
    'Password_Validation',
];

export const PasswordUpdate = () => {

  const SearchParams = GetParams(["token"]);

  const { userData, PasswordUpdate } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<FormStateProps>(FormStateDefault);
  const [ FieldValues, setFieldValues ] = useState(formGetInitialValues(FormRequiredFields));

  return (<>
  <LayoutSidebar>
    <LayoutSidebarLogos/>
    {FormState.finish ? <>
      <DivTitle className="mt-5">Restablecer Contraseña</DivTitle>
      <DivOutlined className="mt-4 flex-col" color="primary">
        <b className='mb-2'>Contraseña Actualizada</b>
        Se ha actualizado tu contraseña
      </DivOutlined>
      <br/>
      <DivLabel color="primary">
        Inicia Sesión con tu nueva contraseña
      </DivLabel>
      <Link to="/Ingresar"><Button disabled={FormState.loading}>
        Iniciar Sesión
      </Button></Link>
    </> : <>
      {(SearchParams.status && FormState.error==='') ? <>
        <DivTitle className="mt-5">Restablecer Contraseña</DivTitle>
        <DivSubtitle className="text-center pb-4">
          Ingresá tu nueva contraseña.
        </DivSubtitle>
        <Formik
          enableReinitialize={true}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={FieldValues}
          validationSchema={formGetValidations(FormRequiredFields)}
          onSubmit={async(values:any) => {
            setFormState(prev=>({...prev, loading:true}))
            const PasswordUpdateResponse = await PasswordUpdate({
              token: SearchParams.values.token,
              new_password: values.Password,
            })
            if(PasswordUpdateResponse.status){
              if(PasswordUpdateResponse.message==="Contraseña Actualizada"){
                setFormState(prev=>({...prev, error:'', finish:true }))
              } else{
                setFormState(prev=>({...prev, error:PasswordUpdateResponse.message, finish:false}))
              }
            } else{
              setFormState(prev=>({...prev, error:PasswordUpdateResponse.message}))
            }
            setFormState(prev=>({...prev, loading:false}))
          }}
        >
          <Form autoComplete="off">
            <FormikField name="Password" disabled={FormState.loading}/>
            <FormikField name="Password_Validation" disabled={FormState.loading}/>
            <Button disabled={FormState.loading} type="submit">
              {FormState.loading ? <Spinner/> : 'Cambiar contraseña'}                                
            </Button>
          </Form>
        </Formik>
      </> : <>
        <DivTitle className='mt-5' color="error">Restablecer Contraseña</DivTitle>
        {FormState.error?<>
          <DivSubtitle className='text-center'>Se produjo un error</DivSubtitle>
          <DivOutlined open={FormState.error?true:false} className="mt-4 flex-col">
            {FormState.error}
          </DivOutlined>
        </>:<>
          <DivSubtitle className='text-center'>Los siguientes campos presentan un error:</DivSubtitle>
          <DivOutlined color="error">{SearchParams.errors.map(e=><div>{e}</div>)}</DivOutlined>
        </>}
        <DivSubtitle className='mt-4 text-center'>
          ¡Por favor revisa el mail enviado! o bien, solicita un nuevo codigo de verificación.
        </DivSubtitle>
        <Link to="/RestaurarPassword"><Button color="secondary">
          Solicitar Nuevo Codigo <AiOutlineLock/>                        
        </Button></Link>
      </>}
      <br/>
      <DivLabel color="gray_tint">
        ¿No quieres cambiar tu contraseña?
      </DivLabel>
      {userData.cuil!==''?<Link to="/Dashboard/Config"><Button disabled={FormState.loading} color="gray">
        Volver al Dashboard
      </Button></Link>:<Link to="/Ingresar"><Button disabled={FormState.loading} color="gray">
        Iniciar Sesión
      </Button></Link>}
    </>}
  </LayoutSidebar>
  <MainContainer>
      <Descripcion />
  </MainContainer>
  </>)
}