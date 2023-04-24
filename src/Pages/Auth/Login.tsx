import { useContext, useState } from "react";
import { IFormState } from "../../Interfaces/Data";
import { DefaultFormState } from "../../Data/DefaultValues";
import { formGetInitialValues, formGetValidations } from "../../Interfaces/FormFields";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { DivOutlined, DivLabel, Spinner, DivSubtitle, DivTitle } from "../../Components/Elements/StyledComponents";
import { Button } from "../../Components/Forms/Button";
import { Formik, Form } from "formik";
import { FormikField } from "../../Components/Forms/FormikField";
import { AiOutlineLock } from "react-icons/ai";
import { FormikCaptcha } from "../../Components/Forms/FormikCaptcha";
import { Pages } from "../../Routes/Pages";

const FormRequiredFields = ["CUIL", "Password","Captcha"];

export const Auth_Login = () => {

  const { Login } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
  const [ FieldValues, setFieldValues ] = useState(formGetInitialValues(FormRequiredFields));

  return (<>
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
          captcha: values.Captcha,
        }, setFormState);
      }}
    >
      <Form autoComplete="off">
        <FormikField name="CUIL" autoFocus disabled={FormState.loading} />
        <FormikField name="Password" disabled={FormState.loading} />
        <FormikCaptcha name="Captcha"/>
        <Button disabled={FormState.loading} type="submit">
          {FormState.loading ? <Spinner /> : "Iniciar Sesión"}
        </Button>
      </Form>
    </Formik>
    <form>
      <DivOutlined open={FormState.error ? true : false}>
        {FormState.error}
      </DivOutlined>
      <br />
      <DivLabel color="secondary">¿Sos nuevo en Ciudadano Digital?</DivLabel>
      <Link to={Pages.AUTH_SIGNUP} className="mb-3"><Button disabled={FormState.loading} color="secondary">
          Crear una cuenta
      </Button></Link>
      <DivLabel color="gray_tint">
        ¿Tuviste algun problema al registrarte?
      </DivLabel>
      <Link to={Pages.AUTH_PASSWORDRESET}><Button disabled={FormState.loading} color="gray">
          No recuerdo mi contraseña <AiOutlineLock />
      </Button></Link>
      <Link to={Pages.AUTH_EMAILRESENDVALIDATION}><Button disabled={FormState.loading} color="gray">
          No pude validar mi correo electrónico
      </Button></Link>
    </form>
  </>);
};
