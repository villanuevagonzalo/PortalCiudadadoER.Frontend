import { useState } from "react";
import { AiOutlineAudit, AiOutlineFileProtect, AiOutlineAppstore } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { Link } from "react-router-dom";
import { DashBoard_Aplicaciones } from "../../Components/DashboardCiudadano/Aplicaciones";
import { DashBoard_Credenciales } from "../../Components/DashboardCiudadano/Credenciales";
import { DashBoard_Default } from "../../Components/DashboardCiudadano/Default";
import { DashBoard_Mensajes } from "../../Components/DashboardCiudadano/Mensajes";
import { DashBoard_Tramites } from "../../Components/DashboardCiudadano/Tramites";
import { Hero } from "../../Components/Elements/Hero";
import { Container, IconContainer, IconBox, Title, Box, NavigationBar, ContainerBody, ContainerCard, Sidebar, TitleDiv, MainContainer } from "../../Components/Elements/StyledComponents";
import { LogoCiudadanoDigital } from "../../Components/Images/LogoCiudadanoDigital";
import { Descripcion } from "../../Components/Elements/Descripcion";

const navigation = [
  { name: 'Default', icon: AiOutlineFileProtect, href: '', current: true, component: DashBoard_Default },
  { name: 'Credenciales', icon: AiOutlineFileProtect, href: '', current: false, component: DashBoard_Credenciales },
  { name: 'Tramites', icon: AiOutlineAudit, href: '', current: false, component: DashBoard_Tramites  },
  { name: 'Aplicaciones', icon: AiOutlineAppstore, href: '', current: false, component: DashBoard_Aplicaciones  },
  { name: 'Mensajes', icon: BiMessage, href: '', current: false, component: DashBoard_Mensajes },
]

export const DashboardCiudadanoPage = () => {
  
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlePage = (index:number) =>{
    setCurrentPage(index)
  }

  return(<>
    <Sidebar open={true}>
      <LogoCiudadanoDigital/>
        <br />
        <TitleDiv>¡Bienvenido!</TitleDiv>
        <div className="flex gap-4 justify-center">
        <Container>
      <NavigationBar>
        {navigation.map((item, index) => {
          if(index==0){ return (<></>) }
          return (<IconBox onClick={()=>handlePage(index)} color={currentPage==index?"primary":""}>
            <h1>
              <item.icon/>
              <label>{item.name}</label>
            </h1>
          </IconBox>)
        })}
      </NavigationBar>
      <ContainerBody>
      {navigation.map((item, index) => {
          if(currentPage==index){ return (<item.component/>) }
          return (<></>)
        })}
      </ContainerBody>
    </Container>
        </div>
    </Sidebar>
    <MainContainer>
      <Descripcion />
    </MainContainer>
  </>)
};

/*

    <Container color="disabled">
      <Box>
      <IconContainer>{navigation.map((item) => (
        <IconBox>
          <h1>
            <item.icon size={48}/>
            <label>{item.name}</label>
          </h1>
        </IconBox>
      ))}</IconContainer>
      <div>
        empty
      </div>
      </Box>
    </Container>
    
*/