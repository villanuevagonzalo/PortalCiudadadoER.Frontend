import { AiOutlineClose, AiOutlineNotification } from "react-icons/ai"
import { NotificationFullSizeWrapper } from "../Elements/StyledComponents"
import { LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../Layout/StyledComponents"
import { Button } from "./Button"
import { ElementEditor } from "../../Modules/FormElements/Components/ElementEditor"
import { ElementInstance } from "../../Modules/FormElements/Class"
import { ElementSchemaTypes } from "../../Modules/FormElements/Types"
import { useEffect } from "react"

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