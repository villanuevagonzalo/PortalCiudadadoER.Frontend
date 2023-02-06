
import { AiOutlineAudit, AiOutlineFileProtect, AiOutlineAppstore, AiTwotoneBuild } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { ContainerItemOLD } from "../../Components/Elements/StyledComponents";

const data = [
    { name: 'Credencial 1', icon: AiTwotoneBuild, href: '', msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fringilla, urna at convallis tincidunt, neque mi consectetur mi, vel auctor neque risus id dolor.' },
    { name: 'Credencial 2', icon: AiOutlineFileProtect, href: '', msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fringilla, urna at convallis tincidunt, neque mi consectetur mi, vel auctor neque risus id dolor.' },
    { name: 'Credencial 3', icon: AiOutlineAudit, href: '', msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fringilla, urna at convallis tincidunt, neque mi consectetur mi, vel auctor neque risus id dolor.'  },
    { name: 'Credencial 4', icon: AiOutlineAppstore, href: '', msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fringilla, urna at convallis tincidunt, neque mi consectetur mi, vel auctor neque risus id dolor.'  },
    { name: 'Credencial 5', icon: BiMessage, href: '', msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fringilla, urna at convallis tincidunt, neque mi consectetur mi, vel auctor neque risus id dolor.' },
]

export const DashBoard_Credenciales = () => (<>
    {data.map((item, index) => (
        <ContainerItemOLD>
            <h1>
                <item.icon/>
                <label>{item.name}</label>
            </h1>
            <div>{item.msg}</div>
        </ContainerItemOLD>
    ))}
</>)