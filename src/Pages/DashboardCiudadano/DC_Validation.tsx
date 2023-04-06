import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../../Components/Elements/StyledComponents"
import { Button } from "../../Components/Forms/Button";
import { LayoutTitle, LayoutSection,  LayoutListItem } from "../../Components/Layout/StyledComponents";
import { AuthContext } from "../../Contexts/AuthContext";
import { IFormState } from "../../Interfaces/Data";
import { DefaultFormState } from "../../Data/DefaultValues";
import { BsBookmark, BsBookmarkCheck, BsBookmarkPlus, BsBookmarkStar, BsBookmarkX } from "react-icons/bs";

export const DC_Validation = () => {

  const { userData, userRol, AFIP_getURL } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);

  const handleValidation3 = async () => {
    const Response = await AFIP_getURL({
      cuil: userData.cuil
    }, setFormState);

    if(Response.status){
      window.open(Response.response.data, '_blank');
      //window.location = Response.response.data;
    }
  }

  return (<>
    <LayoutTitle>
      Niveles de Usuario
    </LayoutTitle>
    <LayoutSection>
      <LayoutListItem color="gray" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkCheck/></div>
        <div className="flex-1">
          <h1><b className="mr-2 ">Nivel 1 </b> Básico</h1>
          <h2>Usted ha validado su cuenta por medio de su correo electrónico.</h2>
        </div>
      </LayoutListItem>
      {userRol[0].level>1?<LayoutListItem color="primary" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkPlus/></div>
        <div className="flex-1">
          <h1><b className="mr-2">Nivel 2</b> Intermedio</h1>
          <h2>Usted ha completado su información adicional.</h2>
        </div>
      </LayoutListItem>:<LayoutListItem color="error" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkX/></div>
        <div className="flex-1">
          <h1><b className="mr-2">Nivel 2</b> Datos Personales</h1>
          <h2>Usted no ha completado su información adicional.</h2>
        </div>
        <div>
        <Link to="/Dashboard/Config"><Button color="error">Completar<br/>Información</Button></Link>
        </div>
      </LayoutListItem>}
      {userRol[0].level>2?
      <LayoutListItem color="secondary" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkStar/></div>
        <div className="flex-1">
          <h1><b className="mr-2">Nivel 3</b> Por Aplicación</h1>
          <h2>Usted ha terminado de validar su indentidad.</h2>
        </div>
      </LayoutListItem>:(userRol[0].level>1? <LayoutListItem color="error" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkX/></div>
        <div className="flex-1">
          <h1><b className="mr-2">Nivel 3</b> Por Aplicación</h1>
          <h2>Usted no ha terminado de validar su indentidad.</h2>
        </div>

        <div>
          <Button color="error" onClick={handleValidation3} disabled={FormState.loading}>{FormState.loading ? <Spinner /> : "Validar por AFIP"}</Button>
        </div>
      </LayoutListItem>:<LayoutListItem color="disabled">
        <div className="ListItemIcon"><BsBookmark/></div>
        <div className="flex-1">
          <h1><b className="mr-2">Nivel 3</b>. Por Aplicación</h1>
          <h2>Usted no ha completado su información adicional.</h2>
        </div>
      </LayoutListItem>)}
    </LayoutSection>
  </>)
}