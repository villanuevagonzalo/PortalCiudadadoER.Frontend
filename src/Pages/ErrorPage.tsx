import { Link } from "react-router-dom";
import { FormikError, LabelDiv, MainContainer, NavigatorSpacer, NavigatorWrapper, Sidebar, SubtitleDiv, Title2Div, TitleDiv } from "../Components/Elements/StyledComponents";
import { LogoCiudadanoDigital } from "../Components/Images/LogoCiudadanoDigital";
import { Button } from "../Components/Forms/Button";
import { AiOutlineLeft } from 'react-icons/ai'
import { Descripcion } from "../Components/Elements/Descripcion";

export const ErrorPage = () => {
  return(<>
    <Sidebar open={true}>
      <LogoCiudadanoDigital/>
        <br />
        <br />
        <div className="flex gap-4 justify-center">
        </div>
        <div className="flex gap-4 justify-center">
        <TitleDiv>¡Error!</TitleDiv>
        </div>
        <div className="flex gap-4 justify-center">
        <TitleDiv>La pagina solicitada no existe</TitleDiv>
        </div>
        <br />
        <Link to="/" className="w-full">
        <Button color="gray" className="w-full">
        <AiOutlineLeft aria-hidden="true" className="h-6 w-auto mr-2"/> 
            Volver al Inicio                            
        </Button>
        </Link>
    </Sidebar>
    <MainContainer>
      <Descripcion />
    </MainContainer>
  </>)
};
