import { useState } from "react";
import { FormElement, FormElementInstance } from "../Types";
import { FormElementMap, FormElementBases } from "../Props";
import { BaseWrapper } from "./StyledComponents";

interface Props{
  element: FormElement<keyof FormElementMap>;
}

export const ElementInstance: React.FC<Props> = ({ element }) => {

  const basetype = FormElementBases[element.type]
  const instance = new FormElementInstance(element.type, element.properties)

  return (<BaseWrapper>
    {'label' in instance.properties?<>Label: {instance.properties.label}</>:<></>}
    <ul>
      <li>{instance.type}</li>
      <li>Properties: {JSON.stringify(instance.properties)}</li>
      <li>Properties: {JSON.stringify(instance)}</li>
    </ul>
  </BaseWrapper>)
}

//{'children' in instance.properties?instance.properties.children.map():<></>}