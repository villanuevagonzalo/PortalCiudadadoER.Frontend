import { useEffect, useState } from "react";
import { FormElement } from "../OLDTYPES";
import { ElementPropsMap, ElementSchemaTypes, FormElementBases } from "../Types";
import { ElementWrapper } from "./StyledComponents";
import { ElementInstance } from "../Class";

interface Props{
  instance: ElementInstance<ElementSchemaTypes>;
}

export const ElementEditor: React.FC<Props> = ({ instance }) => {

  const basetype = FormElementBases[instance.type];
  console.log("BASE TYPE: " + JSON.stringify(basetype));

  const [hasLabelCondition, setHasLabelCondition] = useState(false);
  const [hasRequiredCondition, setHasRequiredCondition] = useState(false);
  const [hasLengthMinCondition, setHasLengthMinCondition] = useState(false);
  const [hasLengthMaxCondition, setHasLengthMaxCondition] = useState(false);
  const [hasValueMin, setHasValueMin] = useState(false);
  const [hasValueMax, setHasValueMax] = useState(false);

  const [isRequired, setRequired] = useState(false);
  const [nombreCampo, setNombreCampo] = useState('');
  const [maxLength, setMaxLength] =  useState<string | number>('');
  const [minLength, setMinLength] = useState<string | number>('');
  const [valueMin, setValueMin] = useState<string | number>('');
  const [valueMax, setValueMax] = useState<string | number>('');


  const handleMinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setMinLength((newValue));
  };

  const handleMaxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue2 = event.target.value;
    setMaxLength((newValue2));
  };
  const handleValueMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValueMin((newValue));
  };

  const handleValueMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue2 = event.target.value;
    setValueMax((newValue2));
  };

  const handleNombreCampo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombreCampo(event.target.value);
  };
  const handleCheckboxChange = () => {
    setRequired(!isRequired);
  };


  useEffect(() => {
    const properties = basetype.properties;

    if (properties && Array.isArray(properties.required) && properties.required.includes("label")) {
      setHasLabelCondition(true);
    } else {
      setHasLabelCondition(false);
    }

    if (properties && Array.isArray(properties.optional) && properties.optional.includes("required")) {
      setHasRequiredCondition(true);
    } else {
      setHasRequiredCondition(false);
    }

    if (properties &&  Array.isArray(properties.optional) && properties.optional.includes("length_min")) {
      setHasLengthMinCondition(true);
    } else {
      setHasLengthMinCondition(false);
    }
    if (properties &&  Array.isArray(properties.optional) && properties.optional.includes("length_max")) {
      setHasLengthMaxCondition(true);
    } else {
      setHasLengthMaxCondition(false);
    }

    if (properties &&  Array.isArray(properties.optional) && properties.optional.includes("value_min")) {
      setHasValueMin(true);
    } else {
      setHasValueMin(false);
    }

    if (properties &&  Array.isArray(properties.optional) && properties.optional.includes("value_max")) {
      setHasValueMax(true);
    } else {
      setHasValueMax(false);
    }

  }, []);


  console.log("ASDF: "+hasLengthMinCondition)
  return (
    <ElementWrapper>
      <label>
        <basetype.icon />
        {basetype.description}
      </label>
      <ul>
        {hasLabelCondition && (
          <div  style={{display:"flex", flexDirection:"column", margin:"15px 0px 15px 0px"}}>
          <input
            type="text"
            value={nombreCampo}
            onChange={handleNombreCampo}
            style={{ border: '1px solid black', padding: '5px', marginBottom:"5px" }}
          />
          <p>El nombre de este campo es: {nombreCampo}</p>
        </div>
        )}
        {hasRequiredCondition && (
          <><div style={{display:"flex", flexDirection:"column", margin:"15px 0px 15px 0px"}}>
            <Checkbox label="¿Campo requerido? " />
            <div>
              El campo es: {isRequired ? 'requerido en el formulario' : 'no requerido en el formulario'}
            </div>
          </div></>
        )}
       {hasLengthMinCondition && (
          <div>
            <input
              type="number"
              value={minLength === 0 ? '' : minLength}
              onInput={handleMinValue}
              style={{ border: '1px solid black', padding: '5px', marginBottom: '5px' }}
            />
            <p>Mínima cantidad de caracteres es: {minLength !== '' ? minLength : 'Vacío'}</p>
          </div>
        )}
        {hasLengthMaxCondition && (
          <div>
            <input
              type="number"
              value={maxLength}
              onInput={handleMaxValue}
              style={{ border: '1px solid black', padding: '5px', marginBottom: '5px' }}
            />
            <p>Máxima cantidad de caracteres es: {maxLength !== '' ? maxLength : 'Vacío'}</p>
          </div>
        )}

        {hasValueMin && (
          <div>
            <input
              type="number"
              value={valueMin === 0 ? '' : valueMin}
              onInput={handleValueMin}
              style={{ border: '1px solid black', padding: '5px', marginBottom: '5px' }}
            />
            <p>Mínima cantidad de caracteres es: {valueMin !== '' ? valueMin : 'Vacío'}</p>
          </div>
        )}
        {hasValueMax && (
          <div>
            <input
              type="number"
              value={valueMax === 0 ? '' : valueMax}
              onInput={handleValueMax}
              style={{ border: '1px solid black', padding: '5px', marginBottom: '5px' }}
            />
            <p>Mínima cantidad de caracteres es: {valueMax !== '' ? valueMax : 'Vacío'}</p>
          </div>
        )}
      </ul>
    </ElementWrapper>
  );
};


interface CheckboxProps {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {label}
      </label>
    </div>
  );
};