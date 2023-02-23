import { useContext, useState } from "react";
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { DivOutlined, DivLabel, MainContainer, Spinner, DivSubtitle, DivTitle } from "../../Components/Elements/StyledComponents";
import { Button } from "../../Components/Forms/Button";
import { Formik, Form } from "formik";
import { FormikField } from "../../Components/Forms/FormikField";
import { Descripcion } from "../../Components/Elements/Descripcion";
import { LayoutSidebar } from "../../Components/Layout/StyledComponents";
import { LayoutSidebarLogos } from "../../Components/Layout/LayoutSidebarLogos";
import { AiOutlineLock } from "react-icons/ai";

const FormRequiredFields = ["CUIL", "Password"];

export const LoginPage = () => {

  const { isLoading, Login } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<FormStateProps>(FormStateDefault);
  const [ FieldValues, setFieldValues ] = useState(formGetInitialValues(FormRequiredFields));

  return (<>
    <LayoutSidebar>
      <LayoutSidebarLogos/>
      <DivTitle className="mt-5">Iniciar Sesión</DivTitle>
      <DivSubtitle className="text-center pb-4">
        Ingresá tus datos para iniciar sesión en la plataforma
      </DivSubtitle>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        enableReinitialize={true}
        initialValues={FieldValues}
        validationSchema={formGetValidations(FormRequiredFields)}
        onSubmit={(values: any) => {
          Login({
            cuil: values.CUIL,
            password: values.Password,
          }, setFormState);
        }}
      >
        <Form autoComplete="off">
          <FormikField name="CUIL" autoFocus disabled={isLoading} />
          <FormikField name="Password" disabled={isLoading} />
          {/*<FormikCheckbox name="RememberMe"/>*/}
          <Button disabled={isLoading} type="submit">
            {isLoading ? <Spinner /> : "Iniciar Sesión"}
          </Button>
        </Form>
      </Formik>
      <form>
        <DivOutlined open={FormState.error ? true : false}>
          {FormState.error}
        </DivOutlined>
        <br />
        <DivLabel color="secondary">¿Sos nuevo en Ciudadano Digital?</DivLabel>
        <Link to="/Registro" className="mb-3"><Button disabled={isLoading} color="secondary">
            Crear una cuenta
        </Button></Link>
        <DivLabel color="gray_tint">
          ¿Tuviste algun problema al registrarte?
        </DivLabel>
        <Link to="/RestaurarPassword"><Button disabled={isLoading} color="gray">
            No recuerdo mi contraseña <AiOutlineLock />
        </Button></Link>
        <Link to="/EmailVerification"><Button disabled={isLoading} color="gray">
            No pude validar mi correo electrónico
        </Button></Link>
      </form>
    </LayoutSidebar>
    <MainContainer>
      <Descripcion />
    </MainContainer>
  </>);
};
