import { useContext, useState } from "react";
import { IFormState } from "../../Interfaces/Data";
import { DefaultFormState } from "../../Data/DefaultValues";
import { formGetInitialValues, formGetValidations } from "../../Interfaces/FormFields";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { DivOutlined, DivLabel, Spinner, DivSubtitle, DivTitle, DivOutlined2 } from "../../Components/Elements/StyledComponents";
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
  const [cuilValue, setCuilValue] = useState('');

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
      onSubmit={async (values: any) => {
        await Login({
          cuil: values.CUIL,
          password: values.Password,
          captcha: values.Captcha,
        }, setFormState);
        setCuilValue(values.CUIL);
      }}
    >
      <Form autoComplete="off">
        <FormikField name="CUIL" autoFocus disabled={FormState.loading} />
        <FormikField name="Password" disabled={FormState.loading} />
        <FormikCaptcha name="Captcha" state={FormState}/>
        <Button disabled={FormState.loading} type="submit">
          {FormState.loading ? <Spinner /> : "Iniciar Sesión"}
        </Button>
      </Form>
    </Formik>
    <form className="mt-4 flex flex-col gap-2">
      <DivOutlined open={FormState.error ? true : false}>
        {FormState.error}
      </DivOutlined>
      <DivOutlined2 open={FormState.error ? true : false}>
        <Link to={`${Pages.AUTH_EMAILMODIFY}?cuil=${cuilValue}`}><Button disabled={FormState.loading} color="gray">
            Modificar mi correo electrónico
        </Button></Link>
      </DivOutlined2>
      <DivLabel color="secondary" className="mt-2">¿Sos nuevo en Ciudadano Digital?</DivLabel>
      <Link to={Pages.AUTH_SIGNUP}><Button disabled={FormState.loading} color="secondary">
          Crear una cuenta
      </Button></Link>
      <DivLabel color="gray_tint" className="mt-2">
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
