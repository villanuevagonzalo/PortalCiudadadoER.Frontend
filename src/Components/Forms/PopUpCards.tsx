import { AiOutlineClose, AiOutlineNotification } from "react-icons/ai"
import { NotificationFullSizeWrapper } from "../Elements/StyledComponents"
import { LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../Layout/StyledComponents"
import { Button } from "./Button"
import { ElementEditor } from "../../Modules/FormElements/Components/ElementEditor"
import { ElementInstance } from "../../Modules/FormElements/Class"
import { ElementSchemaTypes } from "../../Modules/FormElements/Types"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Pages } from "../../Routes/Pages"

interface Props{
    instance: ElementInstance<ElementSchemaTypes>,  
    setField: Function, 
    index: number, 
    fields: ElementInstance<ElementSchemaTypes>[],
    setClose:Function
  }
  
export const FormFieldsPropertiesPopUp: React.FC<Props> = ({ instance, setField , index, fields, setClose,...props})  => {
             
    return <NotificationFullSizeWrapper>
        <LayoutSection className="content">
          <div className="header">
            <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
            <span className="flex-1"></span>
            <span className="close" onClick={()=>setClose()}><AiOutlineClose fontSize={"1rem"}/></span>
          </div>

          <ElementEditor instance={instance} setFields={setField} index={index} fields={fields} setClose={setClose} />
        
          <LayoutStackedPanel className="mt-2">
            <LayoutSpacer/>
            {/*<Button onClick={()=>func()}>Cerrar</Button>*/}
          </LayoutStackedPanel>
        </LayoutSection>
        <LayoutSpacer/>
      </NotificationFullSizeWrapper>
}

interface createFormProps{
  formTitle: string,  
  create: Function, 
  close:Function
}
export const CreateFormPopUp: React.FC<createFormProps> = ({ formTitle, create, close})  => {
             
  return <NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close()}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <h2> {formTitle} </h2>
        <h3>¿Está seguro de crear el formulario?</h3>      
        <LayoutStackedPanel className="mt-2">
          <LayoutSpacer/>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Button onClick={()=>close()}>Volver</Button>
            <Button onClick={()=>create()}>Guardar</Button>
          </div>
        </LayoutStackedPanel>
      </LayoutSection>
      <LayoutSpacer/>
    </NotificationFullSizeWrapper>
}

interface FormCreatedProps {
  formTitle: string,
  close: Function
}


export const FormCreatedPopUp: React.FC<FormCreatedProps> = ({ formTitle, close }) => {
  
  return (<NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close(false)}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <h2> {formTitle} </h2>
        <h3>Formulario cargado correctamente</h3>      
        <LayoutStackedPanel className="mt-2">
          <LayoutSpacer/>
          <Link to={Pages.DA_PROCEDURES_FORMS} className="button notifications">
                <Button style={{ width: '150px', height: '40px' }} onClick={()=>close(false)} >OK</Button>
          </Link>
        </LayoutStackedPanel>
      </LayoutSection>
      <LayoutSpacer/>
    </NotificationFullSizeWrapper>);
};

interface formCreateErrorProps{
  formTitle: string,  
  close:Function
}
export const FormCreateErrorPopUp: React.FC<formCreateErrorProps> = ({ formTitle, close})  => {
             
  return <NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close(false)}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <h2> {formTitle} </h2>
        <h3>Error en la carga del formulario</h3>      
        <p>Intente nuevamente más tarde o contacte con suporte</p>      
        <LayoutStackedPanel className="mt-2">
          <LayoutSpacer/>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <Button onClick={()=>close(false)}>Volver</Button>
          </div>
        </LayoutStackedPanel>
      </LayoutSection>
      <LayoutSpacer/>
    </NotificationFullSizeWrapper>
};