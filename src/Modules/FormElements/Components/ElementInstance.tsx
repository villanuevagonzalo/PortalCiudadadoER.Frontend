import { useState } from "react";
import { FormElement, FormElementInstance } from "../OLDTYPES";
import { ElementPropsMap, FormElementBases } from "../Types";
import { ElementWrapper } from "./StyledComponents";
import { FormWrapperInput } from "../../../Components/Forms/StyledComponents";
import { AiOutlineEyeInvisible } from "react-icons/ai";

interface Props{
  element: FormElement<keyof ElementPropsMap>;
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
      <ElementWrapper>
    {'label' in instance.properties?<>Label: {instance.properties.label}</>:<></>}
    <ul>
      <li>{instance.type}</li>
      <li>Properties: {JSON.stringify(instance.properties)}</li>
      <li>Properties: {JSON.stringify(instance)}</li>
    </ul>
  </ElementWrapper></>)
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