import { ButtonWrapper } from "../Elements/StyledComponents"

export const Button = (props: any) => {

    return (<>
        <ButtonWrapper type="button" color={props.color} fullwidth={props.fullwidth?props.fullwidth:true} {...props} >
            {props.children}
        </ButtonWrapper>
    </>
    )
}