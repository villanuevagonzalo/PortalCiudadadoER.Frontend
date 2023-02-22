import { ErrorMessage, getIn, useField, useFormikContext } from "formik";
import { InputWrapper, FormWrapperCheckbox } from "../Elements/StyledComponents";
import { FormFields } from "../../Interfaces/FormFields";
import { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdRadioButtonUnchecked } from "react-icons/md";

interface Props{
  name: string;
  autoFocus?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  component?: React.Component;
  label?: string;
}

export const FormikCheckbox = ({...props}: Props) => {
  const [ field ] = useField(props.name)
  const { errors, setFieldValue } = useFormikContext();

  const fieldprops = FormFields[props.name] ?? FormFields.Default
  const thiserror = getIn(errors, props.name)
    
  const handleCheckbox = (e:any) => {
    setFieldValue(field.name,!field.value)
  }

  return (
    <FormWrapperCheckbox error={thiserror?true:false} disabled={props.disabled} checked={field.value}>
      <input type="checkbox" id={props.name} {...field} {...props} hidden/>
      {props.hidden?<></>:<>
        <div onClick={handleCheckbox} className="CheckboxText">
          <div>{field.value?<AiOutlineCheckCircle />:<MdRadioButtonUnchecked />}</div>
          <label dangerouslySetInnerHTML={{__html: fieldprops.placeholder}} />
        </div>
      </>}
      <ErrorMessage name={props.name} component="span"/>
    </FormWrapperCheckbox>
  )
}