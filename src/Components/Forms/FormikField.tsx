import { ErrorMessage, getIn, useField, useFormikContext } from "formik";
import { InputWrapper, InputWrapper2 } from "../Elements/StyledComponents";
import { FormFields } from "../../Interfaces/FormFields";
import { useState } from "react";
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

export const FormikField = ({...props}: Props) => {
    const [ field ] = useField(props.name)
    const { errors, setFieldValue } = useFormikContext();

    const fieldprops = FormFields[props.name] ?? FormFields.Default
    const thiserror = getIn(errors, props.name)
    
    const [passwordType, setPasswordType] = useState(true);
    const [focus, setFocus] = useState(false);
    const [empty, setEmpty] = useState(field.value==='');
    
    const handleCheckbox = (e:any) => {
        setFieldValue(field.name,!field.value)
    }

    const handleClick = () => {
        if(fieldprops.type === 'password'){
            setPasswordType(!passwordType)
        }
    }

    const handleFocus = (e:any) => {
        setFocus(!focus)            
        setEmpty(field.value==='')
    }
    
    return (
        (fieldprops.type === 'checkbox')?
        <InputWrapper2 error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty} checked={field.value}>
            <input type={fieldprops.type} id={props.name}{...field} {...props} hidden/>
            {props.hidden?<></>:<>
                <div onClick={handleCheckbox} className="CheckboxText">
                    <div>{field.value?<AiOutlineCheckCircle />:<MdRadioButtonUnchecked />}</div>
                    <label dangerouslySetInnerHTML={{__html: fieldprops.placeholder}} />
                </div>
            </>}
            <ErrorMessage name={props.name} component="span"/>
        </InputWrapper2>
        :
        <InputWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty} >
            <input type={fieldprops.type === 'password'?(passwordType?'password':'text'):fieldprops.type} autoFocus={props.autoFocus} {...field} {...props} onFocus={handleFocus} onBlur={handleFocus}/>
            <label>{props.label?props.label:fieldprops.placeholder}</label>
            <ErrorMessage name={props.name} component="span"/>
            {fieldprops.type === 'password'?<div onClick={handleClick}>{passwordType?<AiOutlineEye />:<AiOutlineEyeInvisible />}</div>:<></>}
        </InputWrapper>
    )
}