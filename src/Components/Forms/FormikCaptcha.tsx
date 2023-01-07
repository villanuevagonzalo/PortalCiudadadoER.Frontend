import { useField, useFormikContext } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { CaptchaWrapper } from "../Elements/StyledComponents";

interface Props{
  name: string;
  autoFocus?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  component?: React.Component;
}


export const FormikCaptcha = ({...props}: Props) => {


  const [ field ] = useField(props.name)
  
  const { setFieldValue } = useFormikContext();

  function onChange(value:any) {
    console.log("Captcha value:", value);
    setFieldValue(field.name,true)
  }

  return (<CaptchaWrapper>
    <ReCAPTCHA
      sitekey="6LdH_s8jAAAAAPEKd0RT6f9Mz3KBau0h0Rg7Ky1p"
      onChange={onChange}
    />
  </CaptchaWrapper>)
}