import { AiOutlineAudit, AiOutlineFileProtect, AiOutlineAppstore } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Hero } from "../../Components/Elements/Hero";
import { IconContainer, IconBox } from "../../Components/Elements/StyledComponents";

const navigation = [
  { name: 'Credenciales', icon: AiOutlineFileProtect, href: '', current: true },
  { name: 'Tramites', icon: AiOutlineAudit, href: '', current: false },
  { name: 'Aplicaciones', icon: AiOutlineAppstore, href: '', current: false }
]

export const DashboardCiudadanoPage = () => {
  return (<IconContainer>
    {navigation.map((item) => (
    <IconBox>
      {<item.icon  className="h-12 w-12 mr-2" />}
      <span>{item.name}</span>
    </IconBox>
    ))
    }</IconContainer>
  );
};
