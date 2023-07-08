import { useEffect, useState } from "react";
import { FormElement } from "../OLDTYPES";
import { ElementPropsMap, ElementSchemaTypes, FormElementBases } from "../Types";
import { ElementWrapper } from "./StyledComponents";
import { ElementInstance } from "../Class";
import { Button } from "../../../Components/Forms/Button";
import { FormikField } from "../../../Components/Forms/FormikField";

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
    console.log("ESTO ES LO QUE TIENE: "+JSON.stringify(instance))

    if (properties && Array.isArray(properties.required) && properties.required.includes("label")) {
      setHasLabelCondition(true);
      setNombreCampo(instance.properties.label)

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
        setLista(EI.properties.options as string);
      }
    } else {
      setHasOptions(false);
    }

    
  }, []);


  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(!focus)            
  }

  const Guardar = () => {
  
  const properties = {
    label: hasLabelCondition ? nombreCampo : "Prueba",
    required: isRequired,
    disabled: false,
    length_min: hasLengthMinCondition ? minLength : 0,
    length_max: hasLengthMaxCondition ? maxLength : 10,
    value_min: hasValueMin ? valueMin : 0,
    value_max: hasValueMax ? valueMax : 0,
    options: hasOptions ? lista.split(";") : '',
    value_default: "",
    value_regex: "",
    childrens: ""
  };


  const newProperties = JSON.stringify(properties);
  console.log("se está guardando esto: "+newProperties)
  instance.update(JSON.parse(newProperties));
  const newFields = [...fields]; // Crear una copia del arreglo fields
  newFields[index] = instance; // Reemplazar el valor en la posición index con el valor de instance
  setFields(newFields); // Actualizar el estado con la nueva copia del arreglo newFields
  setClose(false);
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
            <Checkbox label="Elemento obligatorio? " setCheck={setRequired} state={isRequired} />
            <div>
              {isRequired ? 'Elemento obligatorio' : 'Elemento no obligatorio'} en el formulario
            </div>
          </div>
          
          </>
        )}
        {hasLabelCondition && (
          <div  style={{display:"flex", flexDirection:"column", margin:"15px 0px 15px 0px"}}>
          <h2>Ingrese el nombre del elemento</h2>
          <input
            type="text"
            value={nombreCampo}
            onChange={handleNombreCampo}
            style={{ border: '1px solid black', padding: '5px', marginBottom:"5px" }}
          />
          <p>El nombre de este elemento es: {nombreCampo}</p>
        </div>
        )}
       {hasLengthMinCondition && (
          <div>
            <h2>Ingrese la mínima cantidad de caracteres del campo</h2>
            <input
              type="number"
              value={minLength === 0 ? '' : minLength}
              onInput={handleMinValue}
              style={{ border: '1px solid black', padding: '5px', marginBottom: '5px' }}
            />
            <p>Mínima cantidad de caracteres es: {minLength !== 0 ? minLength : 'Vacío'}</p>
          </div>
        )}
        {hasLengthMaxCondition && (
          <div>
            <h2>Ingrese la máxima cantidad de caracteres del campo</h2>
            <input
              type="number"
              value={maxLength}
              onInput={handleMaxValue}
              style={{ border: '1px solid black', padding: '5px', marginBottom: '5px' }}
            />
            <p>Máxima cantidad de caracteres es: {maxLength !== 0 ? maxLength : 'Vacío'}</p>
          </div>
        )}

        {hasValueMin && (
          <div>
            <h2>Ingrese valor mínimo campo</h2>
            <input
              type="number"
              value={valueMin === 0 ? '' : valueMin}
              onInput={handleValueMin}
              style={{ border: '1px solid black', padding: '5px', marginBottom: '5px' }}
            />
            <p>Mínima cantidad de caracteres es: {valueMin !== 0 ? valueMin : 'Vacío'}</p>
          </div>
        )}
        {hasValueMax && (
          <div>
            <h2>Ingrese valor máximo del campo</h2>
            <input
              type="number"
              value={valueMax === 0 ? '' : valueMax}
              onInput={handleValueMax}
              style={{ border: '1px solid black', padding: '5px', marginBottom: '5px' }}
            />
            <p>Mínima cantidad de caracteres es: {valueMax !== 0 ? valueMax : 'Vacío'}</p>
          </div>
        )}
        {hasOptions && (
          <div>
            <h2>Ingrese lista de valores separados por ;</h2>
            <input
              type="text"
              value={lista}
              onInput={handleListValue}
              style={{ border: '1px solid black', padding: '5px', marginBottom: '5px' }}
            />
            <p>Lista de valores: {lista !== '' ? lista : 'Lista vacia'}</p>
          </div>
        )}


      </ul>
      <Button onClick={()=>Guardar()}>Guardar datos de elemento</Button>

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


