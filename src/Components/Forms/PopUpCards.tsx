import { AiOutlineAlert, AiOutlineClose, AiOutlineNotification, AiOutlineStar, AiOutlineWarning } from "react-icons/ai"
import { NotificationFullSizeWrapper, Spinner } from "../Elements/StyledComponents"
import { LayoutSection, LayoutSpacer, LayoutStackedPanel, LayoutText } from "../Layout/StyledComponents"
import { Button } from "./Button"
import { ElementEditor } from "../../Modules/Actor/ElementEditor"
import { ElementInstance, FormInstance, ProcedureInstance } from "../../Modules/FormElements/Class"
import { ElementSchemaTypes } from "../../Modules/FormElements/Types"
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Pages } from "../../Routes/Pages"
import { BiArrowBack, BiSave } from "react-icons/bi"
import { InputWrapper } from "../../Modules/FormElements/Components/StyledComponents"
import { HiDocumentDuplicate } from "react-icons/hi2"
import { ProcedureContext } from "../../Contexts/ProcedureContext"
import { removeHTMLTags } from "../../Utils/General"

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
  
  const [spinner, setSpinner] = useState(false)
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
        {spinner&& <><br /><Spinner color='secondary' size="3rem" /><br /></>}
        <LayoutStackedPanel className="mt-2">
          <LayoutSpacer/>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Button onClick={()=>close()}><BiArrowBack/>Volver</Button>
            <Button onClick={()=>{create(); setSpinner(true)}}>Guardar <BiSave/></Button>
          </div>
        </LayoutStackedPanel>
      </LayoutSection>
      <LayoutSpacer/>
    </NotificationFullSizeWrapper>
}

export const UpdateFormPopUp: React.FC<createFormProps> = ({ formTitle, create, close})  => {
  
  const [spinner, setSpinner] = useState(false)
  return <NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close()}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <div style={{  display: "flex", flexDirection: "row", alignItems: "left", justifyContent: "left", textAlign:"left", margin:" 15px 0px 15px 0px" }}>
          <AiOutlineAlert fontSize={"2rem"} color="red" style={{margin:"0px 10px 0px 0px"}} />
          <h2 >¿Está seguro de modificar el formulario?</h2>
        </div>
        {spinner&& <><br /><Spinner color='secondary' size="3rem" /><br /></>}
        <LayoutStackedPanel className="mt-2">
          <LayoutSpacer/>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Button onClick={()=>close()}><BiArrowBack/>Volver</Button>
            <Button onClick={()=>{create(); setSpinner(true)}}>Guardar <BiSave/></Button>
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
            <Button onClick={()=>{handleDeleteForm(formToDelete.getCode()); close(false)}}>SI</Button>
          </div>
        </LayoutStackedPanel>
      </LayoutSection>
      <LayoutSpacer/>
    </NotificationFullSizeWrapper>
}


interface CopyFormProps{
  formToCopy: FormInstance<ElementSchemaTypes>,  
  handleCopyForm: Function, 
  close:Function
}
export const CopyFormPopUp: React.FC<CopyFormProps> = ({ formToCopy, handleCopyForm, close})  => {
  
  const [newCode, setNewCode]=useState("")
  const [focus, setFocus] = useState(false);
  const [empty, setEmpty] = useState(newCode=='');
  const [error , setError] = useState(false)

  const handleFocus = () => {
    setFocus(!focus)            
    setEmpty(newCode==='')
  }
  const copiar = () => {
    
    if (newCode!=""){
      handleCopyForm(newCode)
    }else{
      setError(true)
    }

  }
  return <NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close(false)}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <div style={{  display: "flex", flexDirection: "row" , margin:"15px 0px 0px 0px" }}>
          <HiDocumentDuplicate fontSize={"2rem"}  style={{ marginRight:"5px"}} />
          <h2 style={{margin:"5px 0px 15px 0px"}}>COPIA DE FORMULARIO</h2>
          </div>

          <InputWrapper error={error}  focus={focus || !empty}><div>
              <label className="text" >Ingrese nuevo código de referencia</label>
              <input 
                type="text" 
                onFocus={handleFocus} 
                onBlur={handleFocus}
                value={newCode}
                onInput={(e) => setNewCode((e.target as HTMLInputElement).value)} 
                />
            </div></InputWrapper>
        <LayoutStackedPanel className="mt-2">
          <LayoutSpacer/>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Button onClick={()=>close()}><BiArrowBack/>Volver</Button>
            <Button onClick={()=>copiar ()}>COPIAR</Button>
          </div>
        </LayoutStackedPanel>
      </LayoutSection>
      <LayoutSpacer/>
    </NotificationFullSizeWrapper>
}

export const LoadingFormPopUp: React.FC = ()  => {
             
  return <NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
        </div>
        <div style={{  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign:"center" }}>
        <><br /><Spinner color='secondary' size="3rem" /><br /><LayoutText className='text-center'>Cargando Información.<br />Por favor aguarde.</LayoutText></>
        </div>
      </LayoutSection>
      <LayoutSpacer/>
    </NotificationFullSizeWrapper>
}


interface GenericAlertProps{
  genericMessage: string,  
  close:Function
}
export const GenericAlertPopUp: React.FC<GenericAlertProps> = ({ genericMessage, close})  => {
    
  return <NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close()}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <div style={{  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign:"center" }}>
          <AiOutlineAlert fontSize={"2rem"} color="red" style={{marginBottom:"5px"}} />
          <p>{genericMessage}</p>
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

///////////////////////////////////////////////////////////////////////////////////////////////////////

interface createProcedureProps{
  procedureTitle: string,  
  create: Function, 
  close:Function
}
export const CreateProcedurePopUp: React.FC<createProcedureProps> = ({ procedureTitle, create, close})  => {
             
  return <NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close()}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <div style={{  display: "flex", flexDirection: "row", alignItems: "left", justifyContent: "left", textAlign:"left", margin:" 15px 0px 15px 0px" }}>
          <AiOutlineAlert fontSize={"2rem"} color="red" style={{margin:"0px 10px 0px 0px"}} />
          <h2 >¿Está seguro de crear el trámite?</h2>
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

export const UpdateProcedurePopUp: React.FC<createProcedureProps> = ({ procedureTitle, create, close})  => {
             
  return <NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close()}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <div style={{  display: "flex", flexDirection: "row", alignItems: "left", justifyContent: "left", textAlign:"left", margin:" 15px 0px 15px 0px" }}>
          <AiOutlineAlert fontSize={"2rem"} color="red" style={{margin:"0px 10px 0px 0px"}} />
          <h2 >¿Está seguro de modificar el trámite?</h2>
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

interface procedureCreateErrorProps{
  procedureTitle: string,  
  close:Function
}
export const ProcedureCreateErrorPopUp: React.FC<procedureCreateErrorProps> = ({ procedureTitle, close})  => {
             
  return <NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close(false)}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <div style={{  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign:"center" }}>
          <AiOutlineWarning fontSize={"2em"} color="red"/>
          <h4 style={{textAlign:"center", margin:"10px 0px 10px 0px"}}>Error en la carga del tramite {procedureTitle}</h4>      
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

interface deleteProcedureProps{
  procedureToDelete: ProcedureInstance<ElementSchemaTypes>,  
  handleDeleteForm: Function, 
  close:Function
}
export const DeleteProcedurePopUp: React.FC<deleteProcedureProps> = ({ procedureToDelete, handleDeleteForm, close})  => {
             
  return <NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close()}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <div style={{  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign:"center" }}>
          <AiOutlineAlert fontSize={"2rem"} color="red" style={{marginBottom:"5px"}} />
          <h1>Trámite: {procedureToDelete.getTitle()}</h1>
          <h2 >¿Está seguro de borrar el trámite?</h2>
        </div>
        <LayoutStackedPanel className="mt-2">
          <LayoutSpacer/>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Button onClick={()=>close()}><BiArrowBack/>Volver</Button>
            <Button onClick={()=>{handleDeleteForm(procedureToDelete.getId()); close(false)}}>SI</Button>
          </div>
        </LayoutStackedPanel>
      </LayoutSection>
      <LayoutSpacer/>
    </NotificationFullSizeWrapper>
}

interface ProcedureCreatedProps {
  title: string,
  close: Function, 
  link?:string,
}
export const ProcedureCreatedPopUp: React.FC<ProcedureCreatedProps> = ({ title, close, link }) => {
  
  return (<NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close(false)}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <div style={{  display: "flex", flexDirection: "row", alignItems: "left", justifyContent: "left", textAlign:"left", margin:" 15px 0px 15px 0px" }}>
          <AiOutlineStar fontSize={"2rem"} color="#efb810" style={{margin:"0px 10px 0px 0px"}}/>
          <h2>Trámite cargado correctamente</h2>      
        </div>

        <LayoutStackedPanel className="mt-2">
          <LayoutSpacer/>
          <Link to={Pages.DA_PROCEDURES_CONFIG} className="button notifications">
                <Button style={{ width: '150px', height: '40px' }} onClick={()=>close(false)} >OK</Button>
          </Link>
        </LayoutStackedPanel>
      </LayoutSection>
      <LayoutSpacer/>
    </NotificationFullSizeWrapper>);
};

interface CitizenFormCompleteAllFiles {
  element: string,
  close: Function, 

}
export const CitizenFormCompleteAllFiles: React.FC<CitizenFormCompleteAllFiles> = ({ element, close }) => {
  
  return (<NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close(false)}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <div style={{  display: "flex", flexDirection: "row", alignItems: "left", justifyContent: "left", textAlign:"left", margin:" 15px 0px 15px 0px" }}>
          <AiOutlineStar fontSize={"2rem"} color="#efb810" style={{margin:"0px 10px 0px 0px"}}/>
          <h2>Debe completar el campo {element} </h2>      
        </div>

        <LayoutStackedPanel className="mt-2">
          <LayoutSpacer/>
            <Button style={{ width: '150px', height: '40px' }} onClick={()=>close(false)} >OK</Button>
        </LayoutStackedPanel>
      </LayoutSection>
      <LayoutSpacer/>
    </NotificationFullSizeWrapper>);
};

interface ProcedureSelectedDataPopUp {
  procedure: ElementInstance<ElementSchemaTypes>,
  close: Function, 

}
export const ProcedureSelectedDataPopUp: React.FC<ProcedureSelectedDataPopUp> = ({ procedure, close }) => {
  
  const { proceduresByApi} = useContext(ProcedureContext);

  const selectedProcedure = proceduresByApi.find((procedures) => procedures.ID === procedure.getValue());

  return (<NotificationFullSizeWrapper>
      <LayoutSection className="content">
        <div className="header">
          <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
          <span className="flex-1"></span>
          <span className="close" onClick={()=>close(false)}><AiOutlineClose fontSize={"1rem"}/></span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
          <h1>Datos generales del trámite seleccionado</h1>      

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", textAlign: "left", margin: "15px 0px 15px 0px" }}>
            <h2>Título:</h2>
            <h3>{selectedProcedure?.Título}</h3>
            <h2>Categoría:</h2>
            <h3>{selectedProcedure?.Categoria}</h3> 
            <h2>Costo:</h2>
            <h3>{removeHTMLTags(selectedProcedure?.Costo!)} </h3>      
            <h2>Descripción:</h2>
            <h3>{removeHTMLTags(selectedProcedure?.Texto!)}</h3>      
        
          </div>
        </div>
        <LayoutStackedPanel className="mt-2">
          <LayoutSpacer/>
            <Button style={{ width: '150px', height: '40px' }} onClick={()=>close(false)} >OK</Button>
        </LayoutStackedPanel>
      </LayoutSection>
      <LayoutSpacer/>
    </NotificationFullSizeWrapper>);
};