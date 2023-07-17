import { AiOutlineAlert, AiOutlineClose, AiOutlineNotification, AiOutlineStar, AiOutlineWarning } from "react-icons/ai"
import { NotificationFullSizeWrapper } from "../Elements/StyledComponents"
import { LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../Layout/StyledComponents"
import { Button } from "./Button"
import { ElementEditor } from "../../Modules/FormElements/Components/ElementEditor"
import { ElementInstance, FormInstance } from "../../Modules/FormElements/Class"
import { ElementSchemaTypes } from "../../Modules/FormElements/Types"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Pages } from "../../Routes/Pages"
import { BiArrowBack, BiSave, BiTrash } from "react-icons/bi"

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
        <div style={{  display: "flex", flexDirection: "row", alignItems: "left", justifyContent: "left", textAlign:"left", margin:" 15px 0px 15px 0px" }}>
          <AiOutlineAlert fontSize={"2rem"} color="red" style={{margin:"0px 10px 0px 0px"}} />
          <h2 >¿Está seguro de crear el formulario?</h2>
        </div>
        <LayoutStackedPanel className="mt-2">
          <LayoutSpacer/>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Button onClick={()=>close()}><BiArrowBack/>Volver</Button>
            <Button onClick={()=>create()}>Guardar <BiSave/></Button>
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
        <div style={{  display: "flex", flexDirection: "row", alignItems: "left", justifyContent: "left", textAlign:"left", margin:" 15px 0px 15px 0px" }}>
          <AiOutlineStar fontSize={"2rem"} color="#efb810" style={{margin:"0px 10px 0px 0px"}}/>
          <h2>Formulario cargado correctamente</h2>      
        </div>

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
        <div style={{  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign:"center" }}>
          <AiOutlineWarning fontSize={"2em"} color="red"/>
          <h4 style={{textAlign:"center", margin:"10px 0px 10px 0px"}}>Error en la carga del formulario {formTitle}</h4>      
          <p>Intente nuevamente más tarde o contacte con soporte</p>      
        </div>
        <LayoutStackedPanel className="mt-2">
          <LayoutSpacer/>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <Button onClick={()=>close(false)}><BiArrowBack/>Volver</Button>
          </div>
        </LayoutStackedPanel>
      </LayoutSection>
      <LayoutSpacer/>
    </NotificationFullSizeWrapper>
};

interface formCreateCompleteFieldsProps{
  close:Function,
  crear:Function
}
export const FormCreateCompleteFieldsPopUp: React.FC<formCreateCompleteFieldsProps> = ({ close, crear})  => {
  
  useEffect(() => {
    crear(false);
  }, []);

  return <NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close(false)}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <div style={{  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign:"center" }}>
          <AiOutlineWarning fontSize={"2rem"} color="red" />
          <h2> Debe completar todos los campos de la sección Datos generales del formulario </h2>
        </div> 
        <LayoutStackedPanel className="mt-2">
          <LayoutSpacer/>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <Button onClick={()=>close(false)}><BiArrowBack/>Volver</Button>
          </div>
        </LayoutStackedPanel>
      </LayoutSection>
      <LayoutSpacer/>
    </NotificationFullSizeWrapper>
};


interface deleteFormProps{
  formToDelete: FormInstance<ElementSchemaTypes>,  
  handleDeleteForm: Function, 
  close:Function
}
export const DeleteFormPopUp: React.FC<deleteFormProps> = ({ formToDelete, handleDeleteForm, close})  => {
             
  return <NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close()}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <div style={{  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign:"center" }}>
          <AiOutlineAlert fontSize={"2rem"} color="red" style={{marginBottom:"5px"}} />
          <h1>Formulario: {formToDelete.getTitle()}</h1>
          <h2 >¿Está seguro de borrar el formulario?</h2>
        </div>
        <LayoutStackedPanel className="mt-2">
          <LayoutSpacer/>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Button onClick={()=>close()}><BiArrowBack/>Volver</Button>
            <Button onClick={()=>{handleDeleteForm(formToDelete.getCode()); close(false)}}>SI <BiTrash/></Button>
          </div>
        </LayoutStackedPanel>
      </LayoutSection>
      <LayoutSpacer/>
    </NotificationFullSizeWrapper>
}
