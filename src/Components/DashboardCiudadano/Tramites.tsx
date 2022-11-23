import { AiOutlineAudit, AiOutlineFileProtect, AiOutlineAppstore, AiTwotoneBuild } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { ContainerItem } from "../Elements/StyledComponents";

const data = [
    { name: 'Tramite 1', icon: AiTwotoneBuild, href: '', msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fringilla, urna at convallis tincidunt, neque mi consectetur mi, vel auctor neque risus id dolor.' },
    { name: 'Tramite 2', icon: AiOutlineFileProtect, href: '', msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fringilla, urna at convallis tincidunt, neque mi consectetur mi, vel auctor neque risus id dolor.' },
    { name: 'Tramite 3', icon: AiOutlineAudit, href: '', msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fringilla, urna at convallis tincidunt, neque mi consectetur mi, vel auctor neque risus id dolor.'  },
    { name: 'Tramite 4', icon: AiOutlineAppstore, href: '', msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fringilla, urna at convallis tincidunt, neque mi consectetur mi, vel auctor neque risus id dolor.'  },
    { name: 'Tramite 5', icon: BiMessage, href: '', msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fringilla, urna at convallis tincidunt, neque mi consectetur mi, vel auctor neque risus id dolor.' },
]

export const DashBoard_Tramites = () => (<>
    {data.map((item, index) => (
        <ContainerItem>
            <h1>
                <item.icon/>
                <label>{item.name}</label>
            </h1>
            <div>{item.msg}</div>
            <div className="text-celeste text-right"><a href="#">Leer Mas »</a></div>
        </ContainerItem>
    ))}
</>)