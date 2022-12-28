import { ButtonWrapper } from "../Elements/StyledComponents"

export const Button = (props: any) => {

    return (<>
        <ButtonWrapper color={props.color} fullwidth={props.fullwidth?props.fullwidth:true} {...props} >
            {props.children}
        </ButtonWrapper>
    </>
    )
}