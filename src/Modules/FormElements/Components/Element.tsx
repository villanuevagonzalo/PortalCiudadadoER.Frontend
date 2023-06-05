import { ButtonHTMLAttributes, ChangeEvent, HTMLAttributes, useEffect, useState } from "react";
import { FormElement, FormElementInstance } from "../OLDTYPES";
import { ElementPropsMap, ElementSchemaTypes, FormElementBases, HelpToken } from "../Types";
import { ElementWrapper, BaseWrapperInfo, InputWrapper, ElementError, SelectWrapper, FileWrapper, CheckboxWrapper } from "./StyledComponents";
import { FormWrapperInput } from "../../../Components/Forms/StyledComponents";
import { AiOutlineCheckCircle, AiOutlineEyeInvisible } from "react-icons/ai";
import { ElementInstance, ElementSchema } from "../Class";
import { ErrorMessage, getIn, useField, useFormikContext } from "formik";
import { validationFunctions } from "../Validators";
import { MdRadioButtonUnchecked } from "react-icons/md";

interface Props extends HTMLAttributes<HTMLDivElement>{
  instance: ElementInstance<ElementSchemaTypes>;
  disabled?: boolean;
}

export const Element: React.FC<Props> = ({ instance, ...props }) => {

  const basetype = FormElementBases[instance.type]
  const [ field ] = useField(instance.name);
  const [ HelpField ] = useField(HelpToken+instance.name)



  const { errors, setFieldValue, values } = useFormikContext();
  const thiserror = getIn(errors, instance.name)
  
  const [focus, setFocus] = useState(false);
  const [empty, setEmpty] = useState(field.value==='');


  const handleFocus = () => {
    setFocus(!focus)            
    setEmpty(field.value==='')
  }

  const handleFileChange = (event: any) => {
    const file = Array.from(event.target.files)
    console.log(file)
    setFieldValue(HelpToken+instance.name,file)
  }
    
  useEffect(() => {
    if(field.value!==''){
      setFocus(true);
    }
  }, [field.value])
    
  useEffect(() => {
    if(HelpField.value!==undefined){
      setFocus(true);
    }
  }, [HelpField.value])

  const renderType = <T extends ElementSchemaTypes>(instance: ElementInstance<T>) => {
    let EI : any;

    switch (basetype.type) {
      case "input":
        switch (instance.type) {
          case "TEXT": EI = instance as ElementInstance<"TEXT">; break;
          case "NUMBER": EI = instance as ElementInstance<"NUMBER">; break;
          default: EI = instance as ElementInstance<"TEXT">; break;
        }

        return (<InputWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}><div>
          <label className="text" htmlFor={EI.name}>{EI.properties.label}</label>
          <input type={basetype.format === 'password'?(true?'password':'text'):basetype.format||""} autoFocus={props.autoFocus} {...field} onFocus={handleFocus} onBlur={handleFocus}/>
        </div></InputWrapper>);
      
      case "file": EI = instance as ElementInstance<"FILE">;
        return (<FileWrapper error={thiserror?true:false} focus={focus || !empty}><div>
          <label className="text" htmlFor={EI.name}>{EI.properties.label}</label>
          <input type="file" id={EI.name} hidden {...field} onChange={handleFileChange} onFocus={handleFocus} onBlur={handleFocus} multiple />
          <label className="uploader" htmlFor={EI.name}>
            <div className="FormIcon"><basetype.icon /></div>
            <span>{HelpField.value? JSON.stringify(HelpField.value.length) : EI.properties.label}</span>
          </label>
        </div></FileWrapper>);

      case 'textarea': EI = instance as ElementInstance<"TEXTAREA">;
        return (<InputWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}><div style={{height:'100px'}}>
          <label className="text" htmlFor={EI.name}>{EI.properties.label}</label>
          <textarea autoFocus={props.autoFocus} {...field} onFocus={handleFocus} onBlur={handleFocus}/>
          <div className="FormIcon"><basetype.icon /></div>
        </div></InputWrapper>);

      case "select": EI = instance as ElementInstance<"SELECT">;
        return (<SelectWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}><div>
          <label className="text" htmlFor={EI.name}>{EI.properties.label}</label>
          <select autoFocus={props.autoFocus} {...field} onFocus={handleFocus} onBlur={handleFocus}>
            {EI.properties.options.map((option:any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="select-arrow"></div>
        </div></SelectWrapper>);

      case "checkbox": EI = instance as ElementInstance<"CHECKBOX">;
        return (<CheckboxWrapper error={thiserror?true:false} focus={focus || !empty} checked={field.value}><div>
          <input type="checkbox" {...field} {...props} hidden/>
          <div className="CheckboxText" onClick={()=>setFieldValue(field.name,!field.value)}>
            <div>{field.value?<AiOutlineCheckCircle />:<MdRadioButtonUnchecked />}</div>
            <label>{EI.properties.label}</label>
          </div>
          </div></CheckboxWrapper>);
        
      default:
        return 'ERROR';

    }
  }




  /*


          <label className="helper">Caracteres {field.value.length}</label>


  const renderType = <T extends ElementSchemaTypes>(type: T, schema: ElementSchema<T>) => {

    const test = schema.properties as ElementPropsMap["SELECT"];

    switch (type) {
      case "TEXT":
        return <input type="text" />;
      case "SELECT":
        return <select>{JSON.stringify(test.options)}</select>;
      // Agrega más casos según los tipos que tengas definidos
      default:
        return null;
    }
  }

  /*
  const renderType = (instance:ElementInstance) => {
    switch(instance.schema.type) {
      case 'TEXT':
        return (<InputWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}><div>
          <label className="text" htmlFor={instance.name}>{'label' in instance.schema.properties?instance.schema.properties.label:"test"}</label>
          <input type={basetype.format === 'password'?(true?'password':'text'):basetype.format||""} autoFocus={props.autoFocus} {...field} onFocus={handleFocus} onBlur={handleFocus}/>
          <div className="FormIcon"><basetype.icon /></div>
        </div></InputWrapper>);
      case 'TEXTAREA':
        return (<InputWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}><div style={{height:'100px'}}>
          <label className="text" htmlFor={instance.name}>{'label' in instance.schema.properties?instance.schema.properties.label:"test"}</label>
          <textarea autoFocus={props.autoFocus} {...field} onFocus={handleFocus} onBlur={handleFocus}/>
          <div className="FormIcon"><basetype.icon /></div>
          <label className="helper">Caracteres {field.value.length}</label>
        </div></InputWrapper>);
      case 'SELECT':
        return (<InputWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}><div>
          
    <select autoFocus={props.autoFocus} {...field} onFocus={handleFocus} onBlur={handleFocus}>
      {instance.schema.properties.options}
    </select>
          <div className="FormIcon"><basetype.icon /></div>
          <label className="helper">Caracteres {field.value.length}</label>
        </div></InputWrapper>);
      default:
        return 'ERROR';
    }
  }


  const renderTypeOld = (type:string|null) => {
    switch(type) {
      case 'input':
        return (<InputWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}><div>
          <label className="text" htmlFor={instance.name}>{'label' in instance.schema.properties?instance.schema.properties.label:"test"}</label>
          <input type={basetype.format === 'password'?(true?'password':'text'):basetype.format||""} autoFocus={props.autoFocus} {...field} onFocus={handleFocus} onBlur={handleFocus}/>
          <div className="FormIcon"><basetype.icon /></div>
        </div></InputWrapper>);
      case 'textarea':
        return (<InputWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}><div style={{height:'100px'}}>
          <label className="text" htmlFor={instance.name}>{'label' in instance.schema.properties?instance.schema.properties.label:"test"}</label>
          <textarea autoFocus={props.autoFocus} {...field} onFocus={handleFocus} onBlur={handleFocus}/>
          <div className="FormIcon"><basetype.icon /></div>
          <label className="helper">Caracteres {field.value.length}</label>
        </div></InputWrapper>);
      case 'select':
        return (<InputWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}><div>
          
    <select autoFocus={props.autoFocus} {...field} onFocus={handleFocus} onBlur={handleFocus}>
      {/* Aquí debes agregar las opciones del select }
    </select>
          <div className="FormIcon"><basetype.icon /></div>
          <label className="helper">Caracteres {field.value.length}</label>
        </div></InputWrapper>);
      default:
        return 'ERROR';
    }
  }
*/

  useEffect(()=>{
    
  //console.log(basetype, instance)

  },[])

  return (<ElementWrapper {...props}>
    {renderType(instance)}
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