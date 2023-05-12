import { useState } from "react";
import { FormElement, FormElementInstance } from "../Types";
import { FormElementMap, FormElementBases } from "../Props";
import { BaseWrapper } from "./StyledComponents";
import { FormWrapperInput } from "../../../Components/Forms/StyledComponents";
import { AiOutlineEyeInvisible } from "react-icons/ai";

interface Props{
  element: FormElement<keyof FormElementMap>;
}

export const ElementInstance: React.FC<Props> = ({ element }) => {

  const basetype = FormElementBases[element.type]
  const instance = new FormElementInstance(element.type, element.properties)

  //const test = basetype.

  //console.log((Object.hasOwn(basetype,"format")?basetype.format:null))

  /*<label htmlFor={'test'}>{'label' in instance.properties?instance.properties.label:"test"}</label>*/
  return (<>
  
  <FormWrapperInput>
        <div>
          
          <input type="text"/>
          <div className="FormIcon"><basetype.icon /></div>
        </div>
      </FormWrapperInput>
      <BaseWrapper>
    {'label' in instance.properties?<>Label: {instance.properties.label}</>:<></>}
    <ul>
      <li>{instance.type}</li>
      <li>Properties: {JSON.stringify(instance.properties)}</li>
      <li>Properties: {JSON.stringify(instance)}</li>
    </ul>
  </BaseWrapper></>)
}

//{'children' in instance.properties?instance.properties.children.map():<></>}

/*


    <FormWrapper className={props.className}>
      <FormWrapperInput error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}>
        <div>
          <label htmlFor={props.name}>{props.label?props.label:fieldprops.placeholder}</label>
          <input type={fieldprops.type === 'password'?(passwordType?'password':'text'):fieldprops.type} autoFocus={props.autoFocus} {...field} {...props} onFocus={handleFocus} onBlur={handleFocus}/>
          {fieldprops.type === 'password'?<div onClick={handleClick} className="FormIcon">{passwordType?<AiOutlineEye />:<AiOutlineEyeInvisible />}</div>:<></>}
        </div>
      </FormWrapperInput>
      <ErrorMessage name={props.name} component={FormError}/>
    </FormWrapper>
*/