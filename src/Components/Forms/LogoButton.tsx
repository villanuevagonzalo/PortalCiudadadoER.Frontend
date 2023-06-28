import { LogoWrapperButton } from "./StyledComponents"

export const LogoButton = (props: any) => {

    return (<>
        <LogoWrapperButton size={props.size} color={props.color} fullwidth={props.fullwidth?props.fullwidth:true} {...props} >
            {props.children}
        </LogoWrapperButton>
    </>
    )
}