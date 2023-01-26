import { Link } from "react-router-dom";
import { DivLabel, MainContainer, NavigatorSpacer, NavigatorWrapper, Sidebar, DivSubtitle, DivTitle2, DivTitle, DivOutlined } from "../Components/Elements/StyledComponents";
import { LogoCiudadanoDigital } from "../Components/Images/LogoCiudadanoDigital";
import { Button } from "../Components/Forms/Button";
import { AiOutlineLeft } from 'react-icons/ai'
import { Descripcion } from "../Components/Elements/Descripcion";

export const ErrorPage = () => {
  return(<>
    <Sidebar>
      <LogoCiudadanoDigital/>
        <br />
        <br />
        <DivTitle2 className='text-center mb-2' color="error">¡Error!</DivTitle2>
        <DivOutlined color="error">La pagina solicitada no existe</DivOutlined>
        <br />
        <Link to="/" className="w-full">
        <Button color="gray" className="w-full">
          « Volver al Inicio                            
        </Button>
        </Link>
    </Sidebar>
    <MainContainer>
      <Descripcion />
    </MainContainer>
  </>)
};
