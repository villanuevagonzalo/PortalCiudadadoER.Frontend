import { useContext, useEffect, useState } from 'react';
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { DivLabel, MainContainer, Sidebar, Spinner, DivSubtitle, DivTitle, ToDo } from '../../Components/Elements/StyledComponents';
import { LogoCiudadanoDigital } from '../../Components/Images/LogoCiudadanoDigital';
import { Button } from '../../Components/Forms/Button';
import { Formik, Form } from 'formik';
import { FormikField } from '../../Components/Forms/FormikField';
import { AiOutlineLock } from 'react-icons/ai';
import { Descripcion } from '../../Components/Elements/Descripcion';
import { useNavigate } from 'react-router-dom';
import { LogoER } from '../../Components/Images/LogoEntreRios';
import { LayoutCenterBox, LayoutColumns, LayoutSidebar } from '../../Components/Layout/StyledComponents';

const FormRequiredFields = [
  'CUIL'
]  

export const RestaurarPassword = () => {

    const navigate = useNavigate();

    const { userData, PasswordReset } = useContext(AuthContext);
    const [formState, setFormState] = useState<FormStateProps>(FormStateDefault);

    const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));

    useEffect(() => {
      if(userData.cuil!==''){
      setFieldValues({...FieldValues, 
        CUIL: userData.cuil
      });}
    }, [])
    
    
    return (<>
      <LayoutSidebar>
        <LayoutColumns className="mb-8">
          <LogoER width="150px" />
        </LayoutColumns>
      <LayoutCenterBox maxwidth="400px">
        <LogoCiudadanoDigital/>
      </LayoutCenterBox>
        <DivTitle className="mt-5">Restablecer Contraseña</DivTitle>
        <DivSubtitle className="text-center pb-4">
          Ingresá tu cuil para restablecer tu contraseña de la <br/>plataforma.
        </DivSubtitle>
        <Formik enableReinitialize={true} validateOnChange={false} validateOnBlur={false}
          initialValues={FieldValues}
          validationSchema={formGetValidations(FormRequiredFields)}
          onSubmit={async(values:any) => {
              setFormState(prev=>({...prev, loading:true}))
              console.log(values)
              const ResetPasswordResponse = await PasswordReset({
                  cuil: values.CUIL,
              })
              console.log(ResetPasswordResponse)
              if(ResetPasswordResponse.status){
                  await setFormState(prev=>({...prev, error:''}))
                  navigate("/passwordreset");
              } else{
                  setFormState(prev=>({...prev, error:ResetPasswordResponse.message}))
                  navigate("/ErrorEmailSent");
              }
              setFormState(prev=>({...prev, loading:false}))
          }}
        ><Form autoComplete="off">
            <FormikField name="CUIL" disabled={formState.loading} autoFocus/>
            <Button disabled={formState.loading} type="submit">
                {formState.loading ? <Spinner/> : 'Restablecer contraseña'}                                
            </Button>
        </Form></Formik> 
        <br/>
      <DivLabel color="gray_tint">
        ¿No quieres cambiar tu contraseña?
      </DivLabel>
      {userData.cuil!==''?
      <Link to="/Dashboard/Config" className="w-full">
        <Button disabled={formState.loading} color="gray" className="w-full">
          Volver al Dashboard
        </Button>
      </Link>:<Link to="/Ingresar" className="w-full">
        <Button disabled={formState.loading} color="gray" className="w-full">
          Iniciar Sesión
        </Button>
      </Link>}
        </LayoutSidebar>
        <MainContainer>
            <Descripcion />
        </MainContainer>
    </>)
};