import { ErrorMessage, useField, useFormikContext } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { CaptchaWrapper, FormError } from "./StyledComponents";

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
    if(value){
      setFieldValue(field.name,value)
    } else{
      setFieldValue(field.name,'')
    }
    console.log("Captcha value:", value);
  }

  return (<CaptchaWrapper>
    <ReCAPTCHA
      sitekey="6LdH_s8jAAAAAPEKd0RT6f9Mz3KBau0h0Rg7Ky1p"
      onChange={onChange}
    />
    <ErrorMessage name={props.name} component={FormError}/>
  </CaptchaWrapper>)
}