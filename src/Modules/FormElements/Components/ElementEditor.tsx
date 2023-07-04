import { useState } from "react";
import { FormElement } from "../OLDTYPES";
import { ElementPropsMap, ElementSchemaTypes, FormElementBases } from "../Types";
import { ElementWrapper } from "./StyledComponents";
import { ElementInstance } from "../Class";

interface Props{
  instance: ElementInstance<ElementSchemaTypes>;
}

export const ElementEditor: React.FC<Props> = ({ instance }) => {

  const basetype = FormElementBases[instance.type]
  
  return (<ElementWrapper>
    
    <label><basetype.icon/>{basetype.description}</label>
    <ul>
      <li>Propiedades: {JSON.stringify(instance.properties)}</li>
    </ul>
    
  </ElementWrapper>)
}