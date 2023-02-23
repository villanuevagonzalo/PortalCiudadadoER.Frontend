import { ErrorMessage, getIn, useField, useFormikContext } from "formik";
import { FormWrapperInput, InputWrapper, InputWrapper2 } from "../Elements/StyledComponents";
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
    className?: string;
}

export const FormikField = ({...props}: Props) => {
    const [ field ] = useField(props.name)
    const { errors, setFieldValue } = useFormikContext();

    const fieldprops = FormFields[props.name] ?? FormFields.Default
    const thiserror = getIn(errors, props.name)
    
    const [passwordType, setPasswordType] = useState(true);
    const [focus, setFocus] = useState(false);
    const [empty, setEmpty] = useState(field.value==='');

    const handleClick = () => {
        if(fieldprops.type === 'password'){
            setPasswordType(!passwordType)
        }
    }

    const handleFocus = () => {
        setFocus(!focus)            
        setEmpty(field.value==='')
    }
    
    useEffect(() => {
        if(field.value!==''){
            setFocus(true);
        }
    }, [field.value])
    

    return (
        <FormWrapperInput error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty} className={props.className} largeerror={thiserror?.length>51?true:false}>
            <input type={fieldprops.type === 'password'?(passwordType?'password':'text'):fieldprops.type} autoFocus={props.autoFocus} {...field} {...props} onFocus={handleFocus} onBlur={handleFocus}/>
            <label htmlFor={props.name}>{props.label?props.label:fieldprops.placeholder}</label>
            <ErrorMessage name={props.name} component="span"/>
            {fieldprops.type === 'password'?<div onClick={handleClick}>{passwordType?<AiOutlineEye />:<AiOutlineEyeInvisible />}</div>:<></>}
        </FormWrapperInput>
    )
}