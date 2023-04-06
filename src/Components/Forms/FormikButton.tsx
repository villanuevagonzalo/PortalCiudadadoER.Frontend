import { FormWrapper, FormWrapperButton } from "./StyledComponents"

export const FormikButton = (props: any) => {

    return (
      <FormWrapper className={props.className}>
        <FormWrapperButton size={props.size} color={props.color} fullwidth={props.fullwidth?props.fullwidth:true} {...props} >
            {props.children}
        </FormWrapperButton>
    </FormWrapper>
    )
}