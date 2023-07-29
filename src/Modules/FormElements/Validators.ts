import { CheckCUIL } from "../../Utils/General";
import { ElementInstance } from "./Class";
import { ElementPropsMap, ElementSchemaTypes, FormElementProps, HelpToken } from "./Types";

export const ValidationsMessages: {[key: string]: string} = {
  REQUIRED: 'El campo es obligatorio',
  MAIL_VALID: 'El campo debe ser un email válido',
  CHARACTERS_INVALID: 'El campo posee caracteres invalidos',
  CHARACTERS_MIN: 'El campo debe tener XX digitos',
  CHARACTERS_MAX: 'El campo debe tener XX digitos',
}

export const validationFunctions:any = {

  ERROR: (value: any): string => "Validation function not found",

  isRequired: (value: any): string | null => 
    (value === null || value === undefined || value === '')
    ? 'El campo es obligatorio'
    : null,

  // Check if the given value is a number
  isNumber: (value: any): string | null =>
    isNaN(value)
    ? 'El valor debe ser un número'
    : null,

  isCUIL: (value:number): string | null => 
    (!CheckCUIL(String(value)))
    ? 'Debe ser un CUIL válido'
    : null,

  isLowerThan: (valueMin: number) => (value:number): string | null => 
    (value<valueMin)
    ? 'El valor debe ser mayor que ' + valueMin
    : null,

  isGreaterThan: (valueMax: number) => (value:number): string | null => 
    (value>valueMax)
    ? 'El valor debe ser menor que ' + valueMax
    : null,
    
  isShoterThan: (valueMin: number) => (value:any): string | null => 
  (String(value).length<valueMin)
  ? 'El campo debe tener al menos ' + valueMin + ' caracteres'
  : null,

  isLongerThan: (valueMax: number) => (value:any): string | null => 
  (String(value).length>valueMax)
  ? 'El campo no debe exceder los ' + valueMax + ' caracteres'
  : null,

};

export const getValidationFunctions = <T extends ElementSchemaTypes>(
  type: T,
  properties: FormElementProps,
  aditionalValidations: string[] = []) => {
  const functionobjets: {[key: string]: (value: any) => string | null} = {}

  switch (type) {
    case 'NUMBER':
      functionobjets['isNumber'] = validationFunctions.isNumber
      break;
  }

  if (properties.value_min) functionobjets['isLowerThan'] = validationFunctions.isLowerThan(properties.value_min);
  if (properties.value_max) functionobjets['isGreaterThan'] = validationFunctions.isGreaterThan(properties.value_max);
  if (properties.length_min) functionobjets['isShoterThan'] = validationFunctions.isShoterThan(properties.length_min);
  if (properties.length_max) functionobjets['isLongerThan'] = validationFunctions.isLongerThan(properties.length_max);

  aditionalValidations.forEach((validationName) => {
    if(Object.keys(validationFunctions).includes(validationName)){
      functionobjets[validationName] = validationFunctions[validationName];
    }
  });

  return functionobjets;
}

export const ValidateForm = (values:any, fields: {[key: string]: ElementInstance<ElementSchemaTypes>}) => {

const errors: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(values)) {
    let newkey = key
    if (key.startsWith(HelpToken)) {
      newkey = key.substring(HelpToken.length, key.length)
    }
    //const newkey = fields[key].type=="FILE"?"HELP"+key:key;
    const validations = fields[newkey].validators();
    const required = !(!Object.keys(validations).includes("isRequired") && !!validationFunctions.isRequired(value))

    
    Object.values(validations).forEach(valid=>{
      const error = valid(value);
      if (error && required){  errors[key] = error }
    })

    //console.log(key,": ",validations, !required && !!validationFunctions.isRequired(value) )
  }

  return errors;
}