import { RiHome4Fill, RiSeedlingFill, RiToolsFill, RiWheelchairFill } from "react-icons/ri";
import { CapitalizeWords } from "../../Utils/General";
import { LayoutGridItem } from "../Layout/StyledComponents";

const data = [
    {title: 'Discapacidad', icon: RiWheelchairFill, href: '', description: 'Certificado único de discapacidad CUD'},
    {title: 'Trabajo', icon: RiToolsFill, href: '', description: 'Requisitos para contrataciones de artistas'},
    {title: 'Vivienda', icon: RiHome4Fill, href: '', description: 'Solicitud certificado de vivienda de interés social'},
    {title: 'Medio Ambiente', icon: RiSeedlingFill, href: '', description: 'Solicitud de quema controlada'},
]


export const NuevosTramites = (props: any) => {

    return (<>
    {data.map((item, index) => <LayoutGridItem key={index}>
      <div className="text-6xl text-verde">
        <item.icon />
      </div>
      <div>
        <h1>{CapitalizeWords(item.title)}</h1>
        <h2>{item.description}</h2>
      </div>
    </LayoutGridItem>)}</>);
}
