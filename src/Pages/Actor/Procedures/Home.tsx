import { Link } from "react-router-dom";
import { Button } from "../../../Components/Forms/Button";
import { LayoutSection, LayoutSectionCentered } from "../../../Components/Layout/StyledComponents";
import { Pages } from "../../../Routes/Pages";


export const DA_Procedures_Home = () => {

  return(<>
    <LayoutSectionCentered  >
    <h1>GESTOR DE TRÁMITES</h1>
    <p>El actor tiene la capacidad de diseñar formularios que más tarde podrá vincular a los trámites, permitiendo a los ciudadanos visualizarlos y completarlos.</p>
    </LayoutSectionCentered>
    <LayoutSection>
    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Link to={Pages.DA_PROCEDURES_LIST} style={{ textDecoration: 'none' }}>
          <Button color="primary" style={{width:"300px"}}  > GESTOR TRÁMITES</Button>
        </ Link>

        <Link to={Pages.DA_PROCEDURES_FORMS} style={{ textDecoration: 'none' }}>
          <Button color="primary" style={{width:"300px"}} > GESTOR FORMULARIOS</Button>
        </ Link>
      </div>
    </LayoutSection>
  </>);
}