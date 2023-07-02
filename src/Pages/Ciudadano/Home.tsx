
import { LayoutGrid, LayoutTitle, LayoutSection } from "../../Components/Layout/StyledComponents";
import { NuevosTramites } from "../../Components/Elements/NuevosTramites";
import { NotificationPopUp } from "../../Components/Notifications/NotificationModal";

export const DC_Home = () => {

  return(<>
    <NotificationPopUp />     {/* Muestro las notificaciones al estilo pushup al inicio. This is new feature! */}
    <LayoutTitle>
      Bienvenido
    </LayoutTitle>
    <LayoutSection className="text-xl" >
      <p>Ciudadano digital es una plataforma donde cualquier ciudadano puede realizar algún trámite ante organismos públicos provinciales desde su casa, oficina y/o dispositivo móvil.</p>
      <br />
      <p>Los trámites que se encuentran aquí son 100% digitales sin necesidad de papel ni acudir a un organismo público, permitiendo ahorrar tiempo.</p>
    </LayoutSection>
    <LayoutTitle>
      Nuevos Trámites
    </LayoutTitle>
    <LayoutGrid><NuevosTramites /></LayoutGrid>
  </>);
}