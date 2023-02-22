import { ErrorMessage, getIn, useField, useFormikContext } from "formik";
import { FormWrapperInput, InputWrapper, InputWrapper2 } from "../Elements/StyledComponents";
import { FormFields } from "../../Interfaces/FormFields";
import { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdRadioButtonUnchecked } from "react-icons/md";

interface Props{
    name: string;
    value?: any;
}

export const FormikFieldDummy = ({...props}: Props) => {

    const fieldprops = FormFields[props.name] ?? FormFields.Default
 
    return (
        <FormWrapperInput focus={true} dummy={true}>
            <input type={fieldprops.type} {...props} disabled/>
            <label>{fieldprops.label}</label>
        </FormWrapperInput>
    )
}