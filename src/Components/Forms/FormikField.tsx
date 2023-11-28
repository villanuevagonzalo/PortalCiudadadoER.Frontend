import { ErrorMessage, getIn, useField, useFormikContext } from "formik";
import { FormFields } from "../../Interfaces/FormFields";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FormError, FormWrapper, FormWrapperInput } from "./StyledComponents";


interface Props {
  name: string;
  autoFocus?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  component?: React.Component;
  label?: string;
  className?: string;
  disableAutocomplete?: boolean; // Nuevo campo para deshabilitar el autocompletar
}

export const FormikField = ({ ...props }: Props) => {
  const [field] = useField(props.name);
  const { errors, setFieldValue } = useFormikContext();

  const fieldprops = FormFields[props.name] ?? FormFields.Default;
  const thiserror = getIn(errors, props.name);

  const [passwordType, setPasswordType] = useState(true);
  const [focus, setFocus] = useState(false);
  const [empty, setEmpty] = useState(field.value === '');

  const handleClick = () => {
    if (fieldprops.type === 'password') {
      setPasswordType(!passwordType);
    }
  };

  const handleFocus = () => {
    setFocus(!focus);
    setEmpty(field.value === '');
  };

  useEffect(() => {
    if (field.value !== '') {
      setFocus(true);
    }
  }, [field.value]);

  return (
    <FormWrapper className={props.className}>
      <FormWrapperInput error={thiserror ? true : false} disabled={props.disabled} focus={focus || !empty}>
        <div>
          <label htmlFor={props.name}>{props.label ? props.label : fieldprops.placeholder}</label>
          <input
            type={fieldprops.type === 'password' ? (passwordType ? 'password' : 'text') : fieldprops.type}
            autoFocus={props.autoFocus}
            {...field}
            {...props}
            onFocus={handleFocus}
            onBlur={handleFocus}
            autoComplete={props.disableAutocomplete !== undefined && props.disableAutocomplete ? 'new-password' : 'on'} // Nuevo: Verifica disableAutocomplete
          />
          {fieldprops.type === 'password' ? (
            <div onClick={handleClick} className="FormIcon">
              {passwordType ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          ) : (
            <></>
          )}
        </div>
      </FormWrapperInput>
      <ErrorMessage name={props.name} component={FormError} />
    </FormWrapper>
  );
};

/*
interface Props {
  name: string;
  autoFocus?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  component?: React.Component;
  label?: string;
  className?: string;
  disableAutocomplete?: boolean; // Nuevo campo para deshabilitar el autocompletar
}
export const FormikField = ({ ...props }: Props) => {
  const [field, meta, helpers] = useField(props.name);
  const { errors, setFieldValue } = useFormikContext();

  const fieldprops = FormFields[props.name] ?? FormFields.Default;
  const thiserror = getIn(errors, props.name);

  const [passwordType, setPasswordType] = useState(true);
  const [focus, setFocus] = useState(false);
  const [empty, setEmpty] = useState(field.value === '');

  const handleClick = () => {
    if (fieldprops.type === 'password') {
      setPasswordType(!passwordType);
    }
  };

  const handleFocus = () => {
    setFocus(!focus);
    setEmpty(field.value === '');
  };

  useEffect(() => {
    if (field.value !== '') {
      setFocus(true);
    }
  }, [field.value]);

  return (
    <FormWrapper className={props.className}>
      <FormWrapperInput error={thiserror ? true : false} disabled={props.disabled} focus={focus || !empty}>
        <div>
          <label htmlFor={props.name}>{props.label ? props.label : fieldprops.placeholder}</label>
          <input
            type={fieldprops.type === 'password' ? (passwordType ? 'password' : 'text') : fieldprops.type}
            autoFocus={props.autoFocus}
            {...field}
            {...props}
            onChange={(e) => {
              if (fieldprops.type === 'date') {
                  helpers.setValue(e.target.valueAsDate)
                  return
              }

              field.onChange(e)
            }}
            onFocus={handleFocus}
            onBlur={handleFocus}
            autoComplete={props.disableAutocomplete !== undefined && props.disableAutocomplete ? 'new-password' : 'on'} 
          />
          {fieldprops.type === 'password' ? (
            <div onClick={handleClick} className="FormIcon">
              {passwordType ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          ) : (
            <></>
          )}
        </div>
      </FormWrapperInput>
      <ErrorMessage name={props.name} component={FormError} />
    </FormWrapper>
  );
};*/