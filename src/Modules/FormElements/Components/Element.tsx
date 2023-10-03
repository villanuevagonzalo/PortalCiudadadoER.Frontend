import { ButtonHTMLAttributes, ChangeEvent, HTMLAttributes, SetStateAction, useContext, useEffect, useState } from "react";
import { FormElement, FormElementInstance } from "../OLDTYPES";
import { ElementPropsMap, ElementSchemaTypes, FormElementBases, HelpToken } from "../Types";
import { ElementWrapper, BaseWrapperInfo, InputWrapper, ElementError, SelectWrapper, FileWrapper, CheckboxWrapper } from "./StyledComponents";
import { FormWrapperInput } from "../../../Components/Forms/StyledComponents";
import { AiOutlineCheckCircle, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ElementInstance, ElementSchema } from "../Class";
import { ErrorMessage, getIn, useField, useFormikContext } from "formik";
import { validationFunctions } from "../Validators";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { IndexKind } from "typescript";
import { FilesContext } from "../../../Contexts/FilesContext";

interface Props extends HTMLAttributes<HTMLDivElement>{
  instance: ElementInstance<ElementSchemaTypes>;
  disabled?: boolean;
}

export const Element: React.FC<Props> = ({ instance, ...props }) => {


  const basetype = FormElementBases[instance.type]
  const [ field ] = useField(instance.name);
  const [ HelpField ] = useField(HelpToken+instance.name)

  const { errors, setFieldValue, values } = useFormikContext();
  const {addFilesToContext, setFileArray} = useContext(FilesContext)
  
  const thiserror = getIn(errors, instance.name)
  
  const [focus, setFocus] = useState(false);
  const [empty, setEmpty] = useState(field.value==='');

  const [instanceValue, setInstanceValue] = useState<any> (instance.getValue())

  const handleFocus = () => {
    setFocus(!focus)            
    setEmpty(field.value==='')
  }

  const [passwordType, setPasswordType] = useState(true);

  const handleClick = () => {
    if(basetype.format === 'password'){
      setPasswordType(!passwordType)
    }
  }

  /*
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files; // Obtener la lista de archivos

    if (fileList) {
      const fileArray = Array.from(fileList); // Convertir la lista en un array

      console.log("Selected files:", fileArray);

      // Usar las funciones del contexto
      setFieldValue(HelpToken + instance.name, fileArray);
      addFilesToContext(fileArray);
      instance.setValue(fileArray);

    } else {
      console.log("No files selected.");
    }
  };*/

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files; // Obtener la lista de archivos
  
    if (fileList) {
      const fileArray = Array.from(fileList); // Convertir la lista en un array
  
      // Obtén el nombre deseado del archivo
      const EI = instance as ElementInstance<"FILE">
      const fileName = EI.properties.label;
  
      // Agrega el nombre a cada archivo en el array
      const filesWithNames = fileArray.map(file => {
        const newFile = new File([file], fileName, { type: file.type });
        return newFile;
      });
    
      // Usar las funciones del contexto
      setFieldValue(HelpToken + instance.name, filesWithNames);
      addFilesToContext(filesWithNames);
      instance.setValue(filesWithNames);
  
    } else {
      console.log("No files selected.");
    }
  };


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

  const changeValue = (value:any) => {
    instance.setValue(value);
    setInstanceValue(value)
  }

  const setSelectValue = (value:any) => {
    instance.setValue(value);
    setInstanceValue(value)
  } 

  //this is just to radio or radio-list
  const [selectedValue, setSelectedValue] = useState(instance.value);
  const handleRadioChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedValue(e.target.value);
    instance.setValue(e.target.value);
    setInstanceValue(e.target.value)

  };

  const handleSliderChange= (e: { target: { value: SetStateAction<string>; }; })=> {
      instance.setValue(e.target.value);
      setSelectedValue(e.target.value);
      setInstanceValue(e.target.value)

  }

  const renderType = <T extends ElementSchemaTypes>(instance: ElementInstance<T>) => {
    let EI : any;

    switch (basetype.type) {
      case "input":
        switch (instance.type) {
          case "TEXT": EI = instance as ElementInstance<"TEXT">; break;
          case "NUMBER": EI = instance as ElementInstance<"NUMBER">; break;
          case "MAIL": EI = instance as ElementInstance<"MAIL">; break;

          default: EI = instance as ElementInstance<"TEXT">; break;
        }

        switch(instance.type){
          case "RADIO":
            
            return (<div>
              <input 
                type={basetype.format === 'password' ? (true ? 'password' : 'text') : basetype.format || ""} 
                autoFocus={props.autoFocus} 
                {...field} 
                onFocus={handleFocus} 
                value="true"
                onBlur={handleFocus}
                checked={selectedValue === "true"}
                onChange={handleRadioChange}
              />
              <label style={{ marginLeft: '8px' }} className="text" htmlFor={EI.name}>{EI.properties.label}</label>
            </div>);
          
          default:
            return (
            <InputWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}>
              <div>
                <label className="text" htmlFor={EI.name}>{EI.properties.label}</label>
                <input 
                  type={basetype.format === 'password'?(passwordType?'password':'text'):basetype.format||""} 
                  autoFocus={props.autoFocus} 
                  {...field} 
                  onFocus={handleFocus} 
                  onBlur={handleFocus}
                  value={EI.value}
                  onInput={(e) => changeValue((e.target as HTMLInputElement).value)} 
                  />
                  {basetype.format === 'password'?<div onClick={handleClick} className="FormIcon">{passwordType?<AiOutlineEye />:<AiOutlineEyeInvisible />}</div>:<></>}
              </div>
            </InputWrapper>);
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
          <textarea 
            autoFocus={props.autoFocus} 
            {...field} 
            onFocus={handleFocus} 
            onBlur={handleFocus}
            value={EI.value}
            onInput={(e) => changeValue((e.target as HTMLInputElement).value)} 
            />
          <div className="FormIcon"><basetype.icon /></div>
        </div></InputWrapper>);

      case "select": EI = instance as ElementInstance<"SELECT">;

      return (
        <SelectWrapper error={thiserror ? true : false} disabled={props.disabled} focus={focus || !empty}>
        <div>
          <label className="text" htmlFor={EI.name}>{EI.properties.label}</label>
          <select autoFocus={props.autoFocus} {...field} onFocus={handleFocus} onBlur={handleFocus}
          onChange={e => setSelectValue(e.currentTarget.value)}
          value={instanceValue}
                >
             <option value="" disabled>
                {EI.properties.label}
              </option>
              {EI.properties.options && EI.properties.options.map((option: any, index: number) => (
              <option key={`${option.label}_${option.value}_${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="select-arrow"></div>
        </div>
      </SelectWrapper>
      );
      
      case "checkbox": EI = instance as ElementInstance<"CHECKBOX">;
        return (<CheckboxWrapper error={thiserror?true:false} focus={focus || !empty} checked={field.value}><div>
          <input 
            type="checkbox" 
            {...field} 
            {...props} 
            hidden  
            value={EI.value !== "" ? EI.value : false}
            onChange={(e) => changeValue(e.target.checked)} 
          />
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
      case "Separador": EI = instance as ElementInstance<"SPACER">;
        return (<div>
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
                {
                  EI.properties.options &&
                  EI.properties.options.map((option: any) => (
                    <div key={option.label} style={{ display: "flex", flexDirection: "row" }}>
                      <input
                        type="radio"
                        autoFocus={props.autoFocus}
                        {...field}
                        onFocus={handleFocus}
                        onBlur={handleFocus}
                        value={option.label} // Aquí debes usar option.label en lugar de option.lable
                        checked={selectedValue === option.label}
                        onChange={handleRadioChange}
                      />

                      <label style={{ marginLeft: '8px' }} className="text">{option.label}</label> {/* Aquí también debes usar option.label */}
                    </div>
                  ))
                }
                </div>
            </div>

          )
      case "slider":  EI = instance as ElementInstance<"RANGE">;
      return ( 
        <InputWrapper error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty}><div style={{height:'100px'}}>
            <label className="text" htmlFor={EI.name}>{EI.properties.label}</label>
            <input 
              type="range" 
              min={EI.properties.value_min || 1}
              max={EI.properties.value_max|| 10}
              step={1}
              value={selectedValue}
              onChange={handleSliderChange}
            />
            <div className="FormIcon"><basetype.icon /></div>
            <p>{EI.value}</p>

          </div></InputWrapper>
        )              
      default:
        return "TYPE IS NOT DEFINED";

    }
  }

  useEffect(()=>{
    
    //console.log(basetype, instance)
    setFocus(false)
    },[])
  
    return (<ElementWrapper {...props}>
      {renderType(instance)}
      <ErrorMessage name={instance.name} component={ElementError}/>
    </ElementWrapper>)
  }
