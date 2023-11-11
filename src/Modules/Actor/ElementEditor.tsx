import { useEffect, useState } from "react";
import { FormElement } from "../FormElements/OLDTYPES";
import { ElementPropsMap, ElementSchemaTypes, FormElementBases } from "../FormElements/Types";
import { CheckboxWrapper, ElementWrapper, InputWrapper } from "../FormElements/Components/StyledComponents";
import { ElementInstance } from "../FormElements/Class";
import { Button } from "../../Components/Forms/Button";
import { FormikField } from "../../Components/Forms/FormikField";

interface Props{
  instance: ElementInstance<ElementSchemaTypes>,
  setFields: Function, 
  index: number, 
  fields: ElementInstance<ElementSchemaTypes>[],
  setClose:Function
}

export const ElementEditor: React.FC<Props> = ({ instance, setFields, fields, index, setClose }) => {

  const basetype = FormElementBases[instance.type];
  const basetypeString = JSON.stringify(basetype);

  const [hasLabelCondition, setHasLabelCondition] = useState(false);
  const [hasRequiredCondition, setHasRequiredCondition] = useState(false);
  const [hasLengthMinCondition, setHasLengthMinCondition] = useState(false);
  const [hasLengthMaxCondition, setHasLengthMaxCondition] = useState(false);
  const [hasValueMin, setHasValueMin] = useState(false);
  const [hasValueMax, setHasValueMax] = useState(false);
  const [hasOptions, setHasOptions] = useState(false); 

  const [isRequired, setRequired] = useState(false);
  const [nombreCampo, setNombreCampo] = useState('');
  const [maxLength, setMaxLength] =  useState<number>();
  const [minLength, setMinLength] = useState<number>();
  const [valueMin, setValueMin] = useState<number>();
  const [valueMax, setValueMax] = useState<number>();
  const [lista, setLista] = useState('');

 
  const handleMinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setMinLength(parseInt(newValue));
  };

  const handleMaxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue2 = event.target.value;
    setMaxLength(parseInt(newValue2));
  };
  const handleValueMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValueMin(parseInt(newValue));
  };

  const handleValueMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue2 = event.target.value;
    setValueMax(parseInt(newValue2));
  };

  const handleNombreCampo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombreCampo(event.target.value);
  };


  const handleListValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLista(event.target.value);
  };


  useEffect(() => {

    const properties = basetype.properties;

    const EI = instance as ElementInstance<"TEXT">

    if (properties && Array.isArray(properties.required) && properties.required.includes("label")) {
      setHasLabelCondition(true);
      if (EI.properties.label!="Ingresá el Título"){
        setNombreCampo(EI.properties.label)
      }
    } else {
      setHasLabelCondition(false);
    }

    if (properties && Array.isArray(properties.optional) && properties.optional.includes("required")) {
      setHasRequiredCondition(true);
      if (instance.properties.hasOwnProperty("required")){
        setRequired(EI.properties.required ?? false);
      }
    } else {
      setHasRequiredCondition(false);
    }

    if (properties &&  Array.isArray(properties.optional) && properties.optional.includes("length_min")) {
      setHasLengthMinCondition(true);
      
      if (instance.properties.hasOwnProperty("length_min")){
        
         setMinLength(EI.properties.length_min)
      }
    } else {
      setHasLengthMinCondition(false);
    }
    if (properties &&  Array.isArray(properties.optional) && properties.optional.includes("length_max")) {
      setHasLengthMaxCondition(true);
      if (instance.properties.hasOwnProperty("length_max")){

        setMaxLength(EI.properties.length_max)
        
      }
    } else {
      setHasLengthMaxCondition(false);
    }

    if (properties &&  Array.isArray(properties.optional) && properties.optional.includes("value_min")) {
      setHasValueMin(true);
      if ("value_min" in EI.properties) {
        setValueMin(EI.properties.value_min as number | undefined);
      }
    } else {
      setHasValueMin(false);
    }

    if (properties &&  Array.isArray(properties.optional) && properties.optional.includes("value_max")) {
      setHasValueMax(true);
      if ("value_max" in EI.properties) {
        setValueMax(EI.properties.value_max as number | undefined);
      }
    } else {
      setHasValueMax(false);
    }

    if (properties &&  Array.isArray(properties.required) && properties.required.includes("options")) {
      setHasOptions(true);
      if ("options" in EI.properties) {

        let values =""

        const options = EI.properties.options as { label: string }[];

        options.forEach((option, index) => {
          // Realiza las acciones que necesitas con "option.label" aquí
          console.log("Etiqueta:", option.label);
        
          values += option.label;
        
          // Agregar punto y coma solo si no es el último elemento
          if (index < options.length - 1) {
            values += ";";
          }
        });
      
        setLista(values );
      }
    } else {
      setHasOptions(false);
    }

    
  }, []);



  const parseStringToList = (lista: string): { label: string }[] => {
    const values = lista.split(';'); // Dividir el string por punto y coma
    const parsedList = values.map((value) => ({ label: value.trim() })); // Mapear cada valor al objeto con la propiedad label
    return parsedList;
  };

  const Guardar = () => {
  
  /*const properties = {
    label: hasLabelCondition ? nombreCampo : "Prueba",
    required: isRequired,
    disabled: false,
    length_min: hasLengthMinCondition ? minLength : 0,
    length_max: hasLengthMaxCondition ? maxLength : 10,
    value_min: hasValueMin ? valueMin : 0,
    value_max: hasValueMax ? valueMax : 0,
    options: hasOptions ? parseStringToList(lista) : '',
    value_default: "",
    value_regex: "",
    childrens: ""
  };*/

  const properties = {
    label: hasLabelCondition ? nombreCampo : "Prueba",
    disabled: false,
    length_min: hasLengthMinCondition ? minLength : 0,
    length_max: hasLengthMaxCondition ? maxLength : 10,
    value_min: hasValueMin ? valueMin : 0,
    value_max: hasValueMax ? valueMax : 0,
    options: hasOptions ? parseStringToList(lista) : '',
    value_default: "",
    value_regex: "",
    childrens: ""
  };

  let aditionalValidation="";
  if(isRequired){
    instance.updateAditionalValidations(["isRequired"]);
  }



  const newProperties = JSON.stringify(properties);
  instance.update(JSON.parse(newProperties));
  const newFields = [...fields]; // Crear una copia del arreglo fields
  newFields[index] = instance; // Reemplazar el valor en la posición index con el valor de instance
  setFields(newFields); // Actualizar el estado con la nueva copia del arreglo newFields
  setClose(false);
  }


const [focusNombre, setFocusNombre] = useState(false);
const [focusMinLength, setFocusMinLength] = useState(false);
const [focusMaxLength, setFocusMaxLength] = useState(false);
const [focusValueMin, setFocusValueMin] = useState(false);
const [focusValueMax, setFocusValueMax] = useState(false);
const [focusLista, setFocusLista] = useState(false);

const handleFocus = (component:string) => {
  if (component=="nombreCampo")
    setFocusNombre(!focusNombre)            
  else if (component == "minLength")
    setFocusMinLength(!focusMinLength)
  else if (component=="maxLength")
    setFocusMaxLength(!focusMaxLength)
  else if (component =="valueMin")
    setFocusValueMin(!focusValueMin)
  else if (component=="valueMax")
    setFocusValueMax(!focusValueMax)
  else if (component=="lista")
    setFocusLista(!focusLista)
  
}

  return (
    <ElementWrapper>
      <label>
        <basetype.icon />
        {basetype.description}
      </label>
      <div style={{display:"flex", flexDirection:"column", margin:"15px 0px 20px 0px"}}>
      <hr></hr>
      </div>
      <ul>
      {hasRequiredCondition && (
          <><div style={{display:"flex", flexDirection:"column", margin:"15px 0px 20px 0px"}}>
            <CheckboxWrapper >
              <Checkbox label="Elemento obligatorio? " setCheck={setRequired} state={isRequired} />
              {isRequired ? 'Elemento obligatorio' : 'Elemento no obligatorio'} en el formulario

            </CheckboxWrapper>
            <div>
            </div>
          </div>
          
          </>
        )}
        {hasLabelCondition && (
          <div  style={{display:"flex", flexDirection:"column", margin:"15px 0px 15px 0px"}}>
          <InputWrapper focus={focusNombre || nombreCampo.length >0 } >
          <label className="text" htmlFor="nombre">Ingrese nombre del componente</label>
          <input
            type="text"
            value={nombreCampo}
            onChange={handleNombreCampo}
            onFocus={()=>handleFocus("nombreCampo")} 
            onBlur={()=>handleFocus("nombreCampo")}
          />
          </InputWrapper>
          

{  /*        <p>El nombre de este elemento es: {nombreCampo}</p> */}
        </div>
        )}
       {hasLengthMinCondition && (
          <div style={{ marginBottom: '15px' }}>
            <InputWrapper focus={focusMinLength || !isNaN(minLength!) } >
            <label className="text" htmlFor="nombre">Ingrese la mínima cantidad de caracteres del campo</label>

            <input
              type="number"
              value={minLength === 0 ? '' : minLength}
              onInput={handleMinValue} 
              onFocus={()=>handleFocus("minLength")} 
            onBlur={()=>handleFocus("minLength")}
            />
            </InputWrapper>

          </div>
        )}
        {hasLengthMaxCondition && (
          <div style={{ marginBottom: '15px' }}>
            <InputWrapper focus={focusMaxLength || !isNaN(maxLength!) } >
            <label className="text" htmlFor="nombre">Ingrese la máxima cantidad de caracteres del campo</label>
            <input
              type="number"
              value={maxLength}
              onInput={handleMaxValue}
              onFocus={()=>handleFocus("maxLength")} 
              onBlur={()=>handleFocus("maxLength")}
            />
            </InputWrapper>
          </div>
        )}

        {hasValueMin && (
          <div style={{ marginBottom: '15px' }}>
            <InputWrapper focus={focusValueMin || !isNaN(valueMin!) } >
            <label className="text" htmlFor="nombre">Ingrese  el valor mínimo del campo</label>

            <input
              type="number"
              value={valueMin === 0 ? '' : valueMin}
              onInput={handleValueMin}
              onFocus={()=>handleFocus("valueMin")} 
              onBlur={()=>handleFocus("valueMin")}
            />
          </InputWrapper >

          </div>
        )}
        {hasValueMax && (
          <div style={{ marginBottom: '15px' }}>
            <InputWrapper focus={focusValueMax || !isNaN(valueMax!)} >
            <label className="text" htmlFor="nombre">Ingrese  el valor máximo del campo</label>
            <input
              type="number"
              value={valueMax === 0 ? '' : valueMax}
              onInput={handleValueMax}
              onFocus={()=>handleFocus("valueMax")} 
              onBlur={()=>handleFocus("valueMax")}
            />
            </InputWrapper >

          </div>
        )}
        {hasOptions && (
          <div>
            <InputWrapper focus={focusLista || lista!=""} >
            <label className="text" htmlFor="nombre">Ingrese lista de valores separadas por ;</label>
            <input
              type="text"
              value={lista}
              onInput={handleListValue}
              onFocus={()=>handleFocus("lista")} 
              onBlur={()=>handleFocus("lista")}
            />
            </InputWrapper >
          </div>
        )}


      </ul>
      <Button style={{marginTop:"15px"}} onClick={()=>Guardar()}>Guardar datos de elemento</Button>

    </ElementWrapper>
  );
};


interface CheckboxProps {
  label: string;
  state: boolean,
  setCheck: Function
}

const Checkbox: React.FC<CheckboxProps> = ({ label, state, setCheck }) => {
  const [isChecked, setIsChecked] = useState(state);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setCheck(!isChecked)
  };

  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(!focus)            
  }

  return (
    <div>
      <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          onFocus={handleFocus} onBlur={handleFocus}
        />
      <label style={{ marginLeft: '8px' }}>{label} </label>
    </div>
  );
};