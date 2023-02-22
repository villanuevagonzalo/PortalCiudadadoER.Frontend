import { ErrorMessage, getIn, useField, useFormikContext,  } from "formik";
import { FormWrapperInput, FormWrapperUL, InputWrapper, InputWrapper2, Spinner } from "../Elements/StyledComponents";
import { FormFields } from "../../Interfaces/FormFields";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { CapitalizeWords } from "../../Utils/GeneralFunctions";

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

    //console.log( props.data)
    const parseItem = (item:string, word:string) => {
        return item.split(CapitalizeWords(word)).join("<b>"+CapitalizeWords(word)+"</b>");
    }

    const listMatch = (value:string) => {
        setListDataIndex(0);
        setListData(value==""?[]:props.data.filter((a:string) => a.toLocaleLowerCase().startsWith(value.toString().toLocaleLowerCase())));
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
    

    return (<>
        <FormWrapperInput error={thiserror?true:false} disabled={props.disabled} focus={focus || !empty} >
            <input type={fieldprops.type} autoFocus={props.autoFocus} {...field} {...props} onFocus={handleFocus} onBlurCapture={handleBlur} onChangeCapture={handleChange} onKeyDown={handleKeys}/>
            <label>{props.label?props.label:fieldprops.placeholder}</label>
            <ErrorMessage name={props.name} component="span"/>
            <div>{props.disabled?<Spinner color="gray" />:<FaSearch className="w-4 mr-1"/>}</div>
            
        </FormWrapperInput>
        {(ListData.length>0)?<FormWrapperUL><div>
            {ListData.map((item:any, index:number) => (
                <li dangerouslySetInnerHTML={{__html:parseItem(item, field.value)}} onMouseDown={()=>handleClick(item)} key={index} className={ListDataIndex==index?'active':''}/>
            ))}
        </div></FormWrapperUL>:<></>}
    </>)
}