import { ErrorMessage, getIn, useField, useFormikContext,  } from "formik";
import { Spinner } from "../Elements/StyledComponents";
import { FormFields } from "../../Interfaces/FormFields";
import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { CapitalizeWords } from "../../Utils/General";
import { FormError, FormWrapper, FormWrapperInput } from "./StyledComponents";

interface Props {
  name: string;
  autoFocus?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  component?: React.Component;
  label?: string;
  data?: any;
  setValue?: any;
  disableAutocomplete?: boolean; // Nuevo campo para deshabilitar el autocompletar
}

export const FormikSearch = ({ ...props }: Props) => {
  const [field] = useField(props.name);
  const { errors, setFieldValue } = useFormikContext();

  const fieldprops = FormFields[props.name] ?? FormFields.Default;
  const thiserror = getIn(errors, props.name);

  const [focus, setFocus] = useState(false);
  const [empty, setEmpty] = useState(field.value === '');
  const [ListData, setListData] = useState([]);
  const [ListDataIndex, setListDataIndex] = useState(0);

  const parseItem = (item: string, word: string) => {
    return item.split(CapitalizeWords(word)).join("<b>" + CapitalizeWords(word) + "</b>");
  };

  const listMatch = (value: string) => {
    if (value != undefined) {
      setListDataIndex(0);
      setListData(value === "" ? [] : props.data.filter((a: string) => a.toLocaleLowerCase().startsWith(value.toString().toLocaleLowerCase())));
    }
  };

  const handleChange = (e: any) => {
    listMatch(e.target.value);
  };

  const handleClick = (item: string) => {
    setFieldValue(props.name, item);
    listMatch("");
    if (props.setValue) {
      props.setValue(item);
    }
  };

  const handleKeys = (e: any) => {
    if (e.key === "ArrowDown") {
      setListDataIndex(Math.min(ListDataIndex + 1, ListData.length - 1));
    } else if (e.key === "ArrowUp") {
      setListDataIndex(Math.max(ListDataIndex - 1, 0));
    } else if (e.key === "Enter") {
      setFieldValue(props.name, ListData[ListDataIndex]);
      props.setValue(ListData[ListDataIndex]); // this is the last added and can generate erros
      e.preventDefault();
      listMatch("");
    }
  };

  const handleFocus = () => {
    listMatch(field.value);
    setFocus(true);
    setEmpty(field.value === "");
  };

  const handleBlur = () => {
    listMatch("");
    setFocus(false);
    setEmpty(field.value === "");
  };

  useEffect(() => {
    if (field.value !== "") {
      setFocus(true);
    } else {
      props.setValue("");
    }
  }, [field.value]);

  const seleccionar = (value: string) => {};

  const handleClearInput = () => {
    setListData([]);
  };

  return (
    <FormWrapper {...props}>
      <FormWrapperInput error={thiserror ? true : false} disabled={props.disabled} focus={focus || !empty}>
        <div>
          <label style={{ color: 'your-label-color' }}>{props.label ? props.label : fieldprops.placeholder}</label>
          <input
            type={fieldprops.type}
            autoFocus={props.autoFocus}
            {...field}
            onFocus={handleFocus}
            onBlurCapture={handleBlur}
            onChangeCapture={handleChange}
            onKeyDown={handleKeys}
            autoComplete={props.disableAutocomplete !== undefined && props.disableAutocomplete ? 'new-password' : 'on'} // Nuevo: Verifica disableAutocomplete
            style={{ width: '100%', padding: '5px' }} // Agrega los estilos que desees aquí
          />
          <div className="FormIcon">
            {ListData.length > 0 ? (
              <FaTimes className="w-4 mr-1" onClick={handleClearInput} style={{ cursor: 'pointer' }} />
            ) : props.disabled ? (
              <Spinner color="gray" />
            ) : (
              <FaSearch className="w-4 mr-1" />
            )}
          </div>
        </div>
        {ListData.length > 0 ? (
          <div className="FormDropdownContainer" style={{ position: 'relative' }}>
            <div className="FormDropdown" style={{ position: 'absolute', top: '100%', left: '0', background: '#ffff' , zIndex: 100}}>
              {ListData.map((item: any, index: number) => (
                <div
                  dangerouslySetInnerHTML={{ __html: parseItem(item, field.value) }}
                  onMouseDown={() => handleClick(item)}
                  key={index}
                  className={ListDataIndex === index ? 'active' : ''}
                  onClick={() => seleccionar(item)}
                />
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </FormWrapperInput>
      <ErrorMessage name={props.name} component={FormError} />
    </FormWrapper>
  );
};

/*
interface Props{
  name: string;
  autoFocus?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  component?: React.Component;
  label?: string;
  data?: any;
  setValue?:any
}
/*
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
    if (value!=undefined){
      setListDataIndex(0);
      setListData(value===""?[]:props.data.filter((a:string) => a.toLocaleLowerCase().startsWith(value.toString().toLocaleLowerCase())));
    }
    
  }

  const handleChange = (e:any) => {
      listMatch(e.target.value)
  }

  const handleClick = (item:string) => {
    setFieldValue(props.name, item)
    listMatch("");
    if (props.setValue){
        props.setValue(item);
    }

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
      props.setValue(ListData[ListDataIndex]); //this is the last added and can generate erros
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
    }else{
      props.setValue("");
    }
  }, [field.value])
  
  const seleccionar = (value:string) => {
  }

  const handleClearInput = () =>{
    setListData([])
  }

  return (
    <FormWrapper {...props}>
      <FormWrapperInput error={thiserror ? true : false} disabled={props.disabled} focus={focus || !empty}>
        <div>
          <label style={{ color: 'your-label-color' }}>{props.label ? props.label : fieldprops.placeholder}</label>
          <input
            type={fieldprops.type}
            autoFocus={props.autoFocus}
            {...field}
            onFocus={handleFocus}
            onBlurCapture={handleBlur}
            onChangeCapture={handleChange}
            onKeyDown={handleKeys}
            style={{ width: '100%', padding: '5px' }} // Agrega los estilos que desees aquí
          />
          <div className="FormIcon">
            {ListData.length > 0 ? <FaTimes className="w-4 mr-1" onClick={handleClearInput} style={{ cursor: 'pointer' }} /> : (props.disabled ? <Spinner color="gray" /> : <FaSearch className="w-4 mr-1" />) }
            
          </div>
        </div>
        {ListData.length > 0 ? (
          <div className="FormDropdownContainer" style={{ position: 'relative' }}>
            <div className="FormDropdown" style={{ position: 'absolute', top: '100%', left: '0', background: '#ffff' }}>
              {ListData.map((item: any, index: number) => (
                <div
                  dangerouslySetInnerHTML={{ __html: parseItem(item, field.value) }}
                  onMouseDown={() => handleClick(item)}
                  key={index}
                  className={ListDataIndex === index ? 'active' : ''}
                  onClick={() => seleccionar(item)}
                />
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </FormWrapperInput>
      <ErrorMessage name={props.name} component={FormError} />
    </FormWrapper>
  );
  
}
*/