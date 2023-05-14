import { useState } from "react";
import { FormElement } from "../OLDTYPES";
import { ElementPropsMap, FormElementBases } from "../Types";
import { ElementWrapper } from "./StyledComponents";

interface Props{
  element: FormElement<keyof ElementPropsMap>;
}

export const BaseElementEditor: React.FC<Props> = ({ element }) => {

  const basetype = FormElementBases[element.type]
  
  return (<ElementWrapper>
    
    <label><basetype.icon/>{basetype.description}</label>
    <ul>
      <li>Propiedades: {JSON.stringify(element.properties)}</li>
      <li>Obligatorias: {JSON.stringify(element.properties_required)}</li>
      <li>Opcionales: {JSON.stringify(element.properties_optional)}</li>
    </ul>
    
  </ElementWrapper>)
}