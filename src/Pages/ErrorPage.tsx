import { Link } from "react-router-dom";
import { DivTitle2, DivOutlined } from "../Components/Elements/StyledComponents";
import { Button } from "../Components/Forms/Button";

export const ErrorPage = () => {
  return(<>
      <br />
      <DivTitle2 className='text-center mb-2' color="error">¡Error!</DivTitle2>
      <DivOutlined color="error">La pagina solicitada no existe</DivOutlined>
      <br />
      <Link to="/" className="w-full">
      <Button color="gray" className="w-full">
        « Volver al Inicio                            
      </Button>
      </Link>
  </>)
};
