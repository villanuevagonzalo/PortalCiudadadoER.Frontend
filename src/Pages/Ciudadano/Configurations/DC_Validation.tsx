import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../../../Components/Elements/StyledComponents"
import { Button } from "../../../Components/Forms/Button";
import { LayoutTitle, LayoutSection,  LayoutListItem } from "../../../Components/Layout/StyledComponents";
import { AuthContext } from "../../../Contexts/AuthContext";
import { IFormState } from "../../../Interfaces/Data";
import { DefaultFormState } from "../../../Data/DefaultValues";
import { BsBookmark, BsBookmarkCheck, BsBookmarkPlus, BsBookmarkStar, BsBookmarkX } from "react-icons/bs";
import { Pages } from "../../../Routes/Pages";
import { AxiosResponse } from "axios";
import logoAfip from "../../../Assets/LogoAfip.png"
import logoMiArgentina from "../../../Assets/LogoMiargentina.png"
import logoAnses from "../../../Assets/LogoAnses.png"
import logoRenaper from "../../../Assets/LogoRenaper.png"
import { LogoButton } from "../../../Components/Forms/LogoButton";

export const DC_Validation = () => {

  const { userData, userRol, AFIP_getURL, MIARGENTINA_getURL, ANSES_getURL, RENAPER_getURL } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
  const [ ValidationsTab, setValidationsTab ] = useState<boolean>(false);

  const handleValidationsTab = () => {
    setValidationsTab(!ValidationsTab)
  }

  async function getValidationLink( type = 'AFIP' ) {
    let response: AxiosResponse | null;
    if(type==='AFIP'){
      response = await AFIP_getURL({
        cuil: userData.cuil
      }, setFormState);
    } else if(type==='miargentina'){
      response = await MIARGENTINA_getURL({
        cuil: userData.cuil
      }, setFormState);
    } else if(type==='anses') {
      response = await ANSES_getURL({
        cuil: userData.cuil
      }, setFormState);
    } else {
      response = await RENAPER_getURL({
        cuil: userData.cuil
      }, setFormState);
    }
    if (response) {
      window.open(response.data.data, '_blank');
    }
  }

  return (<>
    <LayoutTitle>
      Niveles de Usuario
    </LayoutTitle>
    <LayoutSection>
      {/* <LayoutListItem color="gray" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkCheck/></div>
        <div className="flex-1">
          <h1><b className="mr-2 ">Nivel 1 </b> Básico</h1>
          <h2>Usted ha validado su cuenta por medio de su correo electrónico.</h2>
        </div>
      </LayoutListItem> */}
      {
      userRol[0].level>1?
      // <LayoutListItem color="gray" className="FlexSwitchMobile">
      //   <div className="ListItemIcon"><BsBookmarkPlus/></div>
      //   <div className="flex-1">
      //     <h1><b className="mr-2">Nivel 2</b> Intermedio</h1>
      //     <h2>Usted ha completado su información adicional.</h2>
      //   </div>
      // </LayoutListItem>
      <></>
      :
      <LayoutListItem color="error" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkX/></div>
        <div className="flex-1">
          <h1><b className="mr-2">Nivel 2</b> Datos Personales</h1>
          <h2>Usted no ha completado su información adicional.</h2>
        </div>
      </LayoutListItem>
      }
      {
      userRol[0].level>2?
      <LayoutListItem color="secondary" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkStar/></div>
        <div className="flex-1">
          <h1><b className="mr-2">Nivel 3</b> Por Aplicación</h1>
          <h2>Usted ha terminado de validar su indentidad.</h2>
        </div>
      </LayoutListItem>:(userRol[0].level>1 ? 
      <>
      <LayoutListItem color="error" className="flex-col">
        <div className="flex FlexSwitchMobile gap-6">
          <div className="ListItemIcon"><BsBookmarkX/></div>
          <div className="flex-1">
            <h1><b className="mr-2">Nivel 3</b> Por Aplicación</h1>
            <h2>Usted no ha terminado de validar su indentidad.</h2>
          </div>
          <div>
            <Button color="error" onClick={handleValidationsTab}>Validar</Button>
          </div>
        </div>
        {
        ValidationsTab?
        <>
        <hr/>
        <div className="flex FlexSwitchMobile gap-6">
          <LogoButton onClick={()=>getValidationLink('AFIP')} disabled={FormState.loading}>{FormState.loading ? <Spinner /> : <img src={logoAfip} alt="Logo Afip"/>}</LogoButton>
          <LogoButton onClick={()=>getValidationLink('miargentina')} disabled={FormState.loading}>{FormState.loading ? <Spinner /> : <img src={logoMiArgentina} alt="logo Mi Argentina"/>}</LogoButton>
          <LogoButton onClick={()=>getValidationLink('anses')} disabled={FormState.loading}>{FormState.loading ? <Spinner /> : <img src={logoAnses} alt="logo Anses"/>}</LogoButton>
          <LogoButton onClick={()=>getValidationLink('renaper')} disabled={FormState.loading}>{FormState.loading ? <Spinner /> : <img src={logoRenaper} alt="logo Renaper"/>}</LogoButton>
        </div>
        </>:
        <></>
        }
      </LayoutListItem>
      <LayoutListItem color="secondary" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkStar/></div>
        <div className="flex-1">
          <h1><b className="mr-2">Nivel 3</b> Por validación Presencial</h1>
          <h2>Usted puede validar su indentidad de manera presencial.</h2>
        </div>
      </LayoutListItem>
      </>
      :
      <></>
      // <LayoutListItem color="disabled">
      //   <div className="ListItemIcon"><BsBookmark/></div>
      //   <div className="flex-1">
      //     <h1><b className="mr-2">Nivel 3</b>. Por Aplicación</h1>
      //     <h2>Usted no ha completado su información adicional.</h2>
      //   </div>
      // </LayoutListItem>
      )
      }
      {/* <LayoutListItem color="secondary" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkStar/></div>
        <div className="flex-1">
          <h1><b className="mr-2">Nivel 3</b> Por validación Presencial</h1>
          <h2>Usted puede validar su indentidad de manera presencial.</h2>
        </div>
      </LayoutListItem> */}

    </LayoutSection>
  </>)
}