import * as yup from 'yup';
import YupPassword from 'yup-password'
import { CheckCUIL } from '../Utils/General';
YupPassword(yup) // extend yup

export const ValidationsMessages: {[key: string]: string} = {
  REQUIRED: 'El campo es obligatorio',
  MAIL_VALID: 'El campo debe ser un email válido',
  CHARACTERS_INVALID: 'El campo posee caracteres invalidos',
  CHARACTERS_MIN: 'El campo debe tener XX digitos',
  CHARACTERS_MAX: 'El campo debe tener XX digitos',
}

abstract class Field {

  type: string;
  options?: {
    required?: boolean;
    min?: number;
    max?: number;
    [key: string]: any;
  };
  abstract get validations(): yup.AnySchema;

  // Constructor que recibe el tipo y las opciones del campo
  constructor(type: string, options?: BaseFieldProps["options"]) {
    this.type = type;
    this.options = options;
  }

  // Método estático que aplica las validaciones por defecto a un esquema yup
  static defaultValidations(
    validation: any,
    options: Partial<BaseFieldProps["options"]>
  ) {
    if (options?.required) {
      validation = validation.required(ValidationsMessages.REQUIRED);
    }
    if (options?.min) {
      validation = validation.min(
        options.min,
        ValidationsMessages.CHARACTERS_MIN.replace(
          "XX",
          options.min.toString()
        )
      );
    }
    if (options?.max) {
      validation = validation.max(
        options.max,
        ValidationsMessages.CHARACTERS_MAX.replace(
          "XX",
          options.max.toString()
        )
      );
    }
    return validation;
  }

  // Método que crea un objeto con el tipo y la etiqueta del campo
  createField(label: string) {
    return {
      type: this.type,
      label,
    };
  }
}



class Field2 {

  public type: string;

  constructor(){
    this.type = 'test';
  }

  get validations(): yup.AnySchema {
    return yup.string()
  }

}










interface BaseFieldProps {
  type: string;
  options?: {
    required?: boolean;
    min?: number;
    max?: number;
    [key: string]: any
  };
  validations: yup.AnySchema;
}

export const DefaultValidations = (validation: any, options: Partial<BaseFieldProps['options']>) => {
  if(options?.required){ validation = validation.required(ValidationsMessages.REQUIRED); }
  if(options?.min){ validation = validation.min(options.min, ValidationsMessages.CHARACTERS_MIN.replace('XX',options.min.toString())); }
  if(options?.max){ validation = validation.max(options.max, ValidationsMessages.CHARACTERS_MAX.replace('XX',options.max.toString())); }
  return validation;
}

export const BaseFields:{[key: string]: BaseFieldProps} = {

  TEXT: {
    type: 'string',
    options: {
      required: true,
    },
    get validations() {
      let validation = DefaultValidations(yup.string(), this.options)
                       .test('',ValidationsMessages.CHARACTERS_INVALID, (value:any)=>!/[^a-zA-Z\u00C0-\u017F ']/g.test(value))
      return validation;
    }
  },

  MAIL: {
    type: 'email',
    options: {
      required: true
    },
    get validations() {
      let validation = DefaultValidations(yup.string(), this.options)
                       .email(ValidationsMessages.MAIL_VALID)
      return validation;
    }
  }

}

export const CreateField = (
  base:BaseFieldProps,
  label:string,
  options?: Partial<BaseFieldProps['options']>
) => {
  return {
    type: base.type,
    label,


  }
}


interface FieldProps {
  [key: string]: {
      type: string;
      defaultvalue?: any;
      label?: string;
      placeholder: string;
      validations: any;
  }
}

export const FormFields:FieldProps = {

}
