
import { LayoutGrid, LayoutGridItem, LayoutSection, LayoutTitle } from "../../Components/Elements/StyledComponents";
import { CapitalizeWords } from '../../Utils/GeneralFunctions';
import { RiToolsFill, RiWheelchairFill, RiHome4Fill, RiSeedlingFill} from "react-icons/ri";

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
    <LayoutGrid>
      {data.map((item, index) => <LayoutGridItem key={index}>
        <div className="text-6xl text-verde">
          <item.icon />
        </div>
        <div>
          <h1>{CapitalizeWords(item.title)}</h1>
          <h2>{item.description}</h2>
        </div>
      </LayoutGridItem>)}
    </LayoutGrid>
  </>);
}