import { ButtonHTMLAttributes, HTMLAttributes, useEffect, useState } from "react";
import { FormElement, FormElementInstance } from "../OLDTYPES";
import { ElementPropsMap, ElementSchemaTypes, FormElementBases } from "../Types";
import { ElementWrapper, BaseWrapperInfo, InputWrapper, ElementError } from "./StyledComponents";
import { FormWrapperInput } from "../../../Components/Forms/StyledComponents";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { ElementInstance, ElementSchema } from "../Class";
import { ErrorMessage, getIn, useField, useFormikContext } from "formik";
import { validationFunctions } from "../Validators";

interface Props extends HTMLAttributes<HTMLDivElement>{
  instance: ElementInstance;
  disabled?: boolean;
}

export const Element: React.FC<Props> = ({ instance, ...props }) => {

  const basetype = FormElementBases[instance.schema.type]
  const [ field ] = useField(instance.name)
  const { errors, setFieldValue } = useFormikContext();
  const thiserror = getIn(errors, instance.name)
  
  const [passwordType, setPasswordType] = useState(true);
  const [focus, setFocus] = useState(false);
  const [empty, setEmpty] = useState(field.value==='');

  const handleClick = () => {
    if(basetype.format === 'password'){
      setPasswordType(!passwordType)
    }
  }

  const handleFocus = () => {
    setFocus(!focus)            
    setEmpty(field.value==='')
  }
    
  useEffect(() => {
    if(field.value!==''){
      setFocus(true);
    }
  }, [field.value])

  const renderType = (type:string|null) => {
    switch(type) {
      case 'input':
        return (<InputWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}><div>
          <label htmlFor={instance.name}>{'label' in instance.schema.properties?instance.schema.properties.label:"test"}</label>
          <input type={basetype.format === 'password'?(true?'password':'text'):basetype.format||""} autoFocus={props.autoFocus} {...field} {...props} onFocus={handleFocus} onBlur={handleFocus}/>
          <div className="FormIcon"><basetype.icon /></div>
        </div></InputWrapper>);
      case 'textarea':
        return (<InputWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}><div style={{height:'100px'}}>
          <label htmlFor={instance.name}>{'label' in instance.schema.properties?instance.schema.properties.label:"test"}</label>
          <input type={basetype.format === 'password'?(true?'password':'text'):basetype.format||""} autoFocus={props.autoFocus} {...field} {...props} onFocus={handleFocus} onBlur={handleFocus}/>
          <div className="FormIcon"><basetype.icon /></div>
        </div></InputWrapper>);
      default:
        return 'ERROR';
    }
  }


  useEffect(()=>{
    
  console.log(basetype, instance.schema)

  },[])

  return (<ElementWrapper {...props}>
    {renderType(basetype.type)}
    <ErrorMessage name={instance.name} component={ElementError}/>
  </ElementWrapper>)
}

//{'children' in instance.properties?instance.properties.children.map():<></>}

/*

    <BaseWrapperInfo>
      <label>{instance.name}</label>
        <ul>
          <li>Properties: {JSON.stringify(basetype)}</li>
          <hr/>
          <li>Schema: {JSON.stringify(instance.schema)}</li>
        </ul>
    </BaseWrapperInfo>
    ---------<br/><br/>

    

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