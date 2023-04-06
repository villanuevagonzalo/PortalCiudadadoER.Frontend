import { FormWrapper, FormWrapperInput } from "./StyledComponents";
import { FormFields } from "../../Interfaces/FormFields";

interface Props{
    name: string;
    value?: any;
    className?: string;
}

export const FormikFieldDummy = ({...props}: Props) => {

    const fieldprops = FormFields[props.name] ?? FormFields.Default
 
    return (
      <FormWrapper className={props.className} dummy={true}>
        <FormWrapperInput focus={true} dummy={true}>
            <input type={fieldprops.type} {...props} disabled/>
            <label>{fieldprops.label}</label>
        </FormWrapperInput>
      </FormWrapper>
    )
}