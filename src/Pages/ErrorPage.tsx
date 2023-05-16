import { Link } from "react-router-dom";
import { DivTitle2, DivOutlined, ColoredLabel } from "../Components/Elements/StyledComponents";
import { Button } from "../Components/Forms/Button";
import { Pages } from "../Routes/Pages";
import { LogoCiudadanoDigital } from "../Components/Images/LogoCiudadanoDigital";

export const ErrorPage = () => {
  return(<>
    <div className="Content mt-4 mb-2">
      <ColoredLabel color="error" className="mb-2">ERROR</ColoredLabel>
      <LogoCiudadanoDigital color="var(--error)"/>
    </div>
    <hr className='mb-4'/>
      <DivOutlined color="error">La pagina solicitada no existe</DivOutlined>
      <br />
      <Link to={Pages.INDEX} className="w-full">
      <Button color="gray" className="w-full">
        « Volver al Inicio                            
      </Button>
      </Link>
  </>)
};
