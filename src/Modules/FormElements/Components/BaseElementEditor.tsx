import { useState } from "react";
import { FormElement } from "../Types";
import { FormElementMap, FormElementBases } from "../Props";
import { BaseWrapper } from "./StyledComponents";

interface Props{
  element: FormElement<keyof FormElementMap>;
}

export const BaseElementEditor: React.FC<Props> = ({ element }) => {

  const basetype = FormElementBases[element.type]
  
  return (<BaseWrapper>
    
    <label><basetype.icon/>{basetype.description}</label>
    <ul>
      <li>Propiedades: {JSON.stringify(element.properties)}</li>
      <li>Obligatorias: {JSON.stringify(element.properties_required)}</li>
      <li>Opcionales: {JSON.stringify(element.properties_optional)}</li>
    </ul>
    
  </BaseWrapper>)
}