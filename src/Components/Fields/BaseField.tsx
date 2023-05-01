import { ErrorMessage, getIn, useField, useFormikContext } from "formik";
import { FormError, FormWrapper, FormWrapperInput } from "../Forms/StyledComponents"
import { FormFields } from "../../Interfaces/Fields";
import { useEffect, useState } from "react";

interface Props{
  name: string;
  autoFocus?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  component?: React.Component;
  label?: string;
  className?: string;
}

export const BaseField = ({...props}: Props) => {
  
  //const [ field ] = useField(props.name)
  const { errors, setFieldValue } = useFormikContext();

  const fieldprops = FormFields[props.name] ?? FormFields.Default
  //const thiserror = getIn(errors, props.name)
  
  const [focus, setFocus] = useState(false);
  const [empty, setEmpty] = useState('');

  const handleFocus = () => {
    setFocus(!focus)            
    setEmpty('')
  }

    return (<>
      <FormWrapper className={props.className}>
        <FormWrapperInput error={false} disabled={props.disabled} focus={focus || !empty}>
          <div>
            <label htmlFor={props.name}>{props.label?props.label:fieldprops.placeholder}</label>
            <input type={fieldprops.type} autoFocus={props.autoFocus} {...props} onFocus={handleFocus} onBlur={handleFocus}/>
          </div>
        </FormWrapperInput>
        <ErrorMessage name={props.name} component={FormError}/>
      </FormWrapper>
    </>
    )
}