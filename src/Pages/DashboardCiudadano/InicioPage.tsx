
import { LayoutGrid, LayoutGridItem, LayoutTitle, LayoutSection, LayoutColumns } from "../../Components/Layout/StyledComponents";
import { CapitalizeWords } from '../../Utils/General';
import { RiToolsFill, RiWheelchairFill, RiHome4Fill, RiSeedlingFill} from "react-icons/ri";
import { NuevosTramites } from "../../Components/Elements/NuevosTramites";

const data = [
    {title: 'Discapacidad', icon: RiWheelchairFill, href: '', description: 'Certificado único de discapacidad CUD'},
    {title: 'Trabajo', icon: RiToolsFill, href: '', description: 'Requisitos para contrataciones de artistas'},
    {title: 'Vivienda', icon: RiHome4Fill, href: '', description: 'Solicitud certificado de vivienda de interés social'},
    {title: 'Medio Ambiente', icon: RiSeedlingFill, href: '', description: 'Solicitud de quema controlada'},
]

export const Dashboard_HomePage = () => {

  return(<>
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