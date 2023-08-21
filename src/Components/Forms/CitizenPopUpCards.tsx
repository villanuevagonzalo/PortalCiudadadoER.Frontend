
import { AiFillSignal, AiOutlineAlert, AiOutlineClose, AiOutlineNotification, AiOutlineStar, AiOutlineUser, AiOutlineWarning } from "react-icons/ai"
import { NotificationFullSizeWrapper, Spinner } from "../Elements/StyledComponents"
import { LayoutSection, LayoutSpacer, LayoutStackedPanel, LayoutText } from "../Layout/StyledComponents"
import { Button } from "./Button"
import { BiArrowBack, BiSave } from "react-icons/bi"
import { useState } from "react"
import { Pages } from "../../Routes/Pages"
import { Link } from "react-router-dom"


interface createCitizenProcedureLevelProps{
    procedureTitle: string,  
    userLevel: string,
    close:Function
  }
  export const CitizenProcedureLevelError: React.FC<createCitizenProcedureLevelProps> = ({ procedureTitle, userLevel, close})  => {
    
    return <NotificationFullSizeWrapper>
        <LayoutSection className="content">
          <div className="header">
            <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
            <span className="flex-1"></span>
            <span className="close" onClick={()=>close()}><AiOutlineClose fontSize={"1rem"}/></span>
          </div>
          <div style={{display: "flex", flexDirection:"column", justifyContent: "center", textAlign:"center", margin:" 15px 0px 15px 0px" }}>
            <h1 >El trámite {procedureTitle} requiere nivel de usuario {userLevel}!</h1>
          </div>
          <LayoutStackedPanel className="mt-2">
            <LayoutSpacer/>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
              <Button onClick={()=>close()}><BiArrowBack/>Volver</Button>
              <Link to={Pages.DC_CONFIGURATIONS} className="button notifications">
                <Button color="secondary" style={{ width: '150px', height: '40px' }} onClick={()=>close(false)} >SUBIR NIVEL</Button>
            </Link>    
            </div>
          </LayoutStackedPanel>
        </LayoutSection>
        <LayoutSpacer/>
      </NotificationFullSizeWrapper>
  }



interface NetworkAlertProps{
    close:Function
  }
  export const NetworkAlertPopUp: React.FC<NetworkAlertProps> = ({ close})  => {
      
    return <NotificationFullSizeWrapper>
        <LayoutSection className="content">
          <div className="header">
            <span className="title"><AiFillSignal />Servicios - Gobierno de Entre Ríos</span>
            <span className="flex-1"></span>
            <span className="close" onClick={()=>close()}><AiOutlineClose fontSize={"1rem"}/></span>
          </div>
          
          <div style={{display: "flex", flexDirection:"column", justifyContent: "center", textAlign:"center", margin:" 15px 0px 15px 0px" }}>
            
          <h1 style={{ color: "primary" }}>Inconvenientes en el servicio</h1>
          <h2>Disculpe las molestias</h2>
          </div>
          <LayoutStackedPanel className="mt-2">
            <LayoutSpacer/>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
              <Button onClick={()=>close()}>OK</Button>
            </div>
          </LayoutStackedPanel>
        </LayoutSection>
        <LayoutSpacer/>
      </NotificationFullSizeWrapper>
  };