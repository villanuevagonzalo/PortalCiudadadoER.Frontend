import { ErrorMessage, useField, useFormikContext } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { CaptchaWrapper, FormError } from "./StyledComponents";
import { useEffect, useRef } from "react";
import { IFormState } from "../../Interfaces/Data";

interface Props{
  name: string;
  autoFocus?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  component?: React.Component;
  state: IFormState;
}


export const FormikCaptcha = ({...props}: Props) => {

  const captchaRef:any = useRef(null);

  const [ field ] = useField(props.name)
  
  const { setFieldValue } = useFormikContext();

  function onChange(value:any) {
    if(value){
      setFieldValue(field.name,value)
    } else{
      setFieldValue(field.name,'')
    }
  }

  useEffect(()=>{
    if(captchaRef && props.state.error!==""){
      captchaRef.current.reset();
    }
  },[props.state])

  return (<CaptchaWrapper>
    <ReCAPTCHA
      sitekey="6LdH_s8jAAAAAPEKd0RT6f9Mz3KBau0h0Rg7Ky1p"
      onChange={onChange}
      ref={captchaRef}
    />
    <ErrorMessage name={props.name} component={FormError}/>
  </CaptchaWrapper>)
}