import { FormWrapperButton } from "../Elements/StyledComponents"

export const Button = (props: any) => {

    return (<>
        <FormWrapperButton size={props.size} color={props.color} fullwidth={props.fullwidth?props.fullwidth:true} {...props} >
            {props.children}
        </FormWrapperButton>
    </>
    )
}