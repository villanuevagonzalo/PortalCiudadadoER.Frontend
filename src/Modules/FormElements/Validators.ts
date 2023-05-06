import { FormElementMap, FormElementTypes } from "./Props";

export const ValidationsMessages: {[key: string]: string} = {
  REQUIRED: 'El campo es obligatorio',
  MAIL_VALID: 'El campo debe ser un email válido',
  CHARACTERS_INVALID: 'El campo posee caracteres invalidos',
  CHARACTERS_MIN: 'El campo debe tener XX digitos',
  CHARACTERS_MAX: 'El campo debe tener XX digitos',
}

export const validators = {
  isNumber: (value: any): string | null =>
    isNaN(value) ? 'Value must be a number' : null,
  isRequired: (value: any): string | null =>
    value === null || value === undefined || value === '' ? ValidationsMessages.REQUIRED : null,
  isGreaterThanMin: (value: any, min: number): string | null =>
    value < min ? `Value must be greater than ${min}` : null,
  isSmallerThanMax: (value: any, max: number): string | null =>
    value > max ? `Value must be smaller than ${max}` : null,
};

export const getValidations = (type: FormElementTypes, properties: Partial<FormElementMap[FormElementTypes]> = {}) => {
  const validations = {};

}