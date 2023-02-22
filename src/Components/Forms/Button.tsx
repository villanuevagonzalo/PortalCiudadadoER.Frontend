import { FormWrapperButton } from "../Elements/StyledComponents"

export const Button = (props: any) => {

    return (<>
        <FormWrapperButton color={props.color} fullwidth={props.fullwidth?props.fullwidth:true} {...props} >
            {props.children}
        </FormWrapperButton>
    </>
    )
}