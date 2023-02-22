import { useContext, useRef, useState } from "react";
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

import { DivOutlined, DivLabel, MainContainer, Sidebar, Spinner, DivSubtitle, DivTitle } from "../../Components/Elements/StyledComponents";
import { LogoCiudadanoDigital } from "../../Components/Images/LogoCiudadanoDigital";
import { Button } from "../../Components/Forms/Button";
import { Formik, Form } from "formik";
import { FormikField } from "../../Components/Forms/FormikField";
import { AiOutlineLock } from "react-icons/ai";
import { Descripcion } from "../../Components/Elements/Descripcion";
import { LogoER } from "../../Components/Images/LogoEntreRios";
import { FormikCheckbox } from "../../Components/Forms/FormikCheckbox";
import { LayoutCenterBox, LayoutColumns, LayoutSidebar } from "../../Components/Layout/StyledComponents";

const FormRequiredFields = ["CUIL", "Password"];

export const LoginPage = () => {
  const navigate = useNavigate();

  const ref: any = useRef(null);
  const { Login } = useContext(AuthContext);
  const [formState, setFormState] = useState<FormStateProps>(FormStateDefault);

  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));

  return (<>
    <LayoutSidebar>
      <LayoutColumns className="mb-8">
        <LogoER width="150px" />
      </LayoutColumns>
      <LayoutCenterBox maxwidth="400px">
        <LogoCiudadanoDigital/>
      </LayoutCenterBox>
      <DivTitle className="mt-5">Iniciar Sesión</DivTitle>
      <DivSubtitle className="text-center pb-4">
        Ingresá tus datos para iniciar sesión en la plataforma
      </DivSubtitle>
      <Formik
        innerRef={ref}
        initialValues={FieldValues}
        validationSchema={formGetValidations(FormRequiredFields)}
        onSubmit={async (values: any) => {
          setFormState((prev) => ({ ...prev, loading: true }));
          const LoginResponse = await Login({
            cuil: values.CUIL,
            password: values.Password,
          });
          if (LoginResponse.status) {
            await setFormState((prev) => ({ ...prev, error: "" }));
            navigate("/");
          } else {
            setFormState((prev) => ({ ...prev, error: LoginResponse.message }));
          }
          setFormState((prev) => ({ ...prev, loading: false }));
        }}
        enableReinitialize={true}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form autoComplete="off">
          <FormikField name="CUIL" autoFocus disabled={formState.loading} />
          <FormikField name="Password" disabled={formState.loading} />
          <FormikCheckbox name="RememberMe"/>
          <Button disabled={formState.loading} type="submit">
            {formState.loading ? <Spinner /> : "Iniciar Sesión"}
          </Button>
        </Form>
      </Formik>
      <form>
      <DivOutlined open={formState.error ? true : false}>
        {formState.error}
      </DivOutlined>
      <br />
      <DivLabel color="secondary">¿Sos nuevo en Ciudadano Digital?</DivLabel>
      <Link to="/Registro" className="w-full mb-3">
        <Button disabled={formState.loading} color="secondary">
          Crear una cuenta
        </Button>
      </Link>
      <DivLabel color="gray_tint">
        ¿Tuviste algun problema al registrarte?
      </DivLabel>
      <Link to="/RestaurarPassword" className="w-full">
        <Button disabled={formState.loading} color="gray">
          No recuerdo mi contraseña
          <AiOutlineLock />
        </Button>
      </Link>
      <Link to="/EmailVerification" className="w-full">
        <Button disabled={formState.loading} color="gray" className="w-full">
          No pude validar mi correo electrónico
        </Button>
      </Link>
      </form>
    </LayoutSidebar>
    <MainContainer>
      <Descripcion />
    </MainContainer>
  </>);
};
