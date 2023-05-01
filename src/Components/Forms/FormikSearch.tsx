import { ErrorMessage, getIn, useField, useFormikContext,  } from "formik";
import { Spinner } from "../Elements/StyledComponents";
import { FormFields } from "../../Interfaces/FormFields";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { CapitalizeWords } from "../../Utils/General";
import { FormError, FormWrapper, FormWrapperInput } from "./StyledComponents";

interface Props{
  name: string;
  autoFocus?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  component?: React.Component;
  label?: string;
  data?: any;
}

export const FormikSearch = ({...props}: Props) => {
  const [ field ] = useField(props.name)
  const { errors, setFieldValue } = useFormikContext();

  const fieldprops = FormFields[props.name] ?? FormFields.Default
  const thiserror = getIn(errors, props.name)
  
  const [focus, setFocus] = useState(false);
  const [empty, setEmpty] = useState(field.value==='');
  const [ListData, setListData] = useState([]);
  const [ListDataIndex, setListDataIndex] = useState(0);

  const parseItem = (item:string, word:string) => {
    return item.split(CapitalizeWords(word)).join("<b>"+CapitalizeWords(word)+"</b>");
  }

  const listMatch = (value:string) => {
    setListDataIndex(0);
    setListData(value===""?[]:props.data.filter((a:string) => a.toLocaleLowerCase().startsWith(value.toString().toLocaleLowerCase())));
  }

  const handleChange = (e:any) => {
    listMatch(e.target.value)
  }

  const handleClick = (item:string) => {
    setFieldValue(props.name, item)
    listMatch("");
  }

  const handleKeys = (e:any) => {
    if(e.key==="ArrowDown"){
      setListDataIndex(Math.min(ListDataIndex+1,ListData.length-1))
    }
    else if(e.key==="ArrowUp"){
      setListDataIndex(Math.max(ListDataIndex-1,0))
    }
    else if(e.key==="Enter"){
      setFieldValue(props.name, ListData[ListDataIndex]);
      e.preventDefault();
      listMatch("");
    }
  }

  const handleFocus = () => {
    listMatch(field.value)
    setFocus(true)            
    setEmpty(field.value==='')
  }

  const handleBlur = () => {
    listMatch("")
    setFocus(false)            
    setEmpty(field.value==='')
  }
  
  useEffect(() => {
    if(field.value!==''){
      setFocus(true);
    }
  }, [field.value])
  

  return (<FormWrapper {...props}>
    <FormWrapperInput error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty} >
      <div>
        <label>{props.label?props.label:fieldprops.placeholder}</label>
        <input type={fieldprops.type} autoFocus={props.autoFocus} {...field} onFocus={handleFocus} onBlurCapture={handleBlur} onChangeCapture={handleChange} onKeyDown={handleKeys}/>
        <div className="FormIcon">{props.disabled?<Spinner color="gray" />:<FaSearch className="w-4 mr-1"/>}</div>
      </div>
      {(ListData.length>0)?<div className="FormDropdown">
        {ListData.map((item:any, index:number) => (
          <div dangerouslySetInnerHTML={{__html:parseItem(item, field.value)}} onMouseDown={()=>handleClick(item)} key={index} className={ListDataIndex===index?'active':''}/>
        ))}
      </div>:<></>}
    </FormWrapperInput>
    <ErrorMessage name={props.name} component={FormError}/>
  </FormWrapper>)
}