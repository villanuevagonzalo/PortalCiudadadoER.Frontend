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
  setFunction?: Function;
  value: any, 
  disabled?: boolean;
}

export const ElementAplication: React.FC<Props> = ({ instance, setFunction, value, ...props }) => {

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
        console.log("BASE TYPE: "+basetype.type) //ACA ES INPUT
        console.log("INSTANCE TYPE: "+instance.type) //ACA ES RADIO
        switch (instance.type) {
          case "TEXT": EI = instance as ElementInstance<"TEXT">; break;
          case "NUMBER": EI = instance as ElementInstance<"NUMBER">; break;
          default: EI = instance as ElementInstance<"TEXT">; break;
        }

        switch(instance.type){
          case "RADIO":
            return (<div>
              <input type={basetype.format === 'password'?(true?'password':'text'):basetype.format||""} autoFocus={props.autoFocus} {...field} onFocus={handleFocus} onBlur={handleFocus}/>
              <label style={{ marginLeft: '8px' }} className="text" htmlFor={EI.name}>{EI.properties.label}</label>
            </div>);
          
          default:
            return (<InputWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}><div>
              <label className="text" htmlFor={EI.name}>{EI.properties.label}</label>
              <input type={basetype.format === 'password'?(true?'password':'text'):basetype.format||""} autoFocus={props.autoFocus} {...field} onFocus={handleFocus} onBlur={handleFocus}/>
            </div></InputWrapper>);
        }
        
      
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
            {EI.properties.options&& EI.properties.options.map((option:any) => (
              <option key={option.value} value={option.value} > 
                {option}
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

      case "section": EI = instance as ElementInstance<"SECTION">;
      return (<div>
          <label>{EI.properties.label}</label>
          <hr />
          </div>
        );
      
      case "title": EI = instance as ElementInstance<"TITLE">;
        return(
          <div>
          <h2>{EI.properties.label}</h2>
          </div>
        )
      case "input-radio-lista": EI = instance as ElementInstance<"RADIO-LISTA">;
          return(
                <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto",   margin:"-0.25rem 0 0rem 0"}}>
                <label className="text" htmlFor={EI.name}>{EI.properties.label}</label>
                <div style={{ display: 'flex', flexDirection:"column", gap: '8px', marginTop:"8px" }}>
                {EI.properties.options&& EI.properties.options.map((option:any) => (
                  <div style={{display:"flex", flexDirection:"row"}}>
                    <input type="radio" autoFocus={props.autoFocus} {...field} onFocus={handleFocus} onBlur={handleFocus} />
                    <label style={{ marginLeft: '8px'}} className="text">{option}</label>
                  </div>
                ))} 
                </div>
            </div>

          )
        
      default:
        console.log(basetype.type)
        return "TYPE IS NOT DEFINED";

    }
  }

  useEffect(()=>{
    
    //console.log(basetype, instance)
  
    },[])
  
    return (<ElementWrapper {...props}>
      {renderType(instance)}
      <ErrorMessage name={instance.name} component={ElementError}/>
    </ElementWrapper>)
  }

