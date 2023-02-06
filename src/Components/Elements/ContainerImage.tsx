import { ContainerImageWrapper } from "./StyledComponents";

import Imagen from '../../Assets/imagenilustrativa.png'

export const ContainerImage = (props: any) => {


    return (<ContainerImageWrapper>
        <img src={Imagen}/>
    </ContainerImageWrapper>);
}
