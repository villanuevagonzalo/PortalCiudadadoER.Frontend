import { ButtonWrapper } from "../Elements/StyledComponents"

export const Button = (props: any) => {

    return (<>
        <ButtonWrapper type="button" color={props.color}>
            {props.children}
        </ButtonWrapper>
    </>
    )
}