import { CheckCUIL } from "../../Utils/General";
import { ElementPropsMap, ElementSchemaTypes, FormElementProps } from "./Types";

export const validationFunctions:any = {

  ERROR: (value: any): string => "Validation function not found",

  isRequired: (value: any): string | null => 
    (value === null || value === undefined || value === '')
    ? 'El campo es obligatorio'
    : null,

  // Check if the given value is a number
  isNumber: (value: any): string | null =>
    isNaN(value)
    ? 'Value must be a number'
    : null,

  isCUIL: (value:number): string | null => 
    (!CheckCUIL(String(value)))
    ? 'Debe ser un CUIL válido'
    : null,

  isGreaterThan: (valueMax: number) => (value:number): string | null => 
    (value>valueMax)
    ? 'El campo es muy grande'
    : null,
  
  isLongerThan: (valueMax: number) => (value:any): string | null => 
  (String(value).length>valueMax)
  ? 'El campo es muy largo'
  : null,
  
};

export const getValidationFunctions = <T extends ElementSchemaTypes>(
  type: T,
  properties: FormElementProps,
  aditionalValidations: string[] = []) => {
  const functionsarray: ((value: any) => string | null)[] = [];

  switch (type) {
    case 'NUMBER':
      functionsarray.push(validationFunctions.isNumber);
      break;
  }

  if (properties.value_max) functionsarray.push(validationFunctions.isGreaterThan(properties.value_max));
  if (properties.length_max) functionsarray.push(validationFunctions.isLongerThan(properties.length_max));

  aditionalValidations.forEach((validationName) => {
    if(Object.keys(validationFunctions).includes(validationName)){
      functionsarray.push(validationFunctions[validationName]);
    }
  });

  return functionsarray;
}