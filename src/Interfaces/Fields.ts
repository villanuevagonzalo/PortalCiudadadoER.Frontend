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

interface BaseFieldProps {
  BaseType: string;
  BaseLabel: string;
  BaseValidations: yup.AnySchema;
  BaseOptions?: {
    editable?: boolean
    required?: boolean;
    min?: number;
    max?: number;
    [key: string]: any;
  };
}

export const DefaultValidations = (validation: any, options: Partial<BaseFieldProps['BaseOptions']>) => {
  if(options?.required){ validation = validation.required(ValidationsMessages.REQUIRED); }
  if(options?.min){ validation = validation.min(options.min, ValidationsMessages.CHARACTERS_MIN.replace('XX',options.min.toString())); }
  if(options?.max){ validation = validation.max(options.max, ValidationsMessages.CHARACTERS_MAX.replace('XX',options.max.toString())); }
  return validation;
}

class BaseFields {

  _BaseFields: {[key: string]: BaseFieldProps}

  constructor(basefields: {[key: string]: BaseFieldProps}) {
    this._BaseFields = basefields;
  }

  createField(
    BaseField: string,
    Label: string,
    Options?: Partial<BaseFieldProps["BaseOptions"]>
  ) {
    let CustomOptions = { 
      DefaultValue: '',
      PlaceHolder: Label,
      ...this._BaseFields[BaseField].BaseOptions,
      ...Options, 
    };
    return {
      Type: this._BaseFields[BaseField].BaseType,
      BaseField,
      Label,
      ...CustomOptions,
      Validations: DefaultValidations(this._BaseFields[BaseField].BaseValidations, CustomOptions)
    };
  }
}

export const BaseFieldsDefinition:{[key: string]: BaseFieldProps} = {

  TITLE: {
    BaseType: 'html',
    BaseLabel: 'Rotulo',
    BaseValidations: yup.string().test('',ValidationsMessages.CHARACTERS_INVALID, (value:any)=>!/[^a-zA-Z\u00C0-\u017F ']/g.test(value)),
    BaseOptions:{
      editable: false
    }
  },

  TEXT: {
    BaseType: 'string',
    BaseLabel: 'Texto',
    BaseValidations: yup.string().test('',ValidationsMessages.CHARACTERS_INVALID, (value:any)=>!/[^a-zA-Z\u00C0-\u017F ']/g.test(value))
  },

  MAIL: {
    BaseType: 'email',
    BaseLabel: 'Correo',
    BaseValidations: yup.string().email(ValidationsMessages.MAIL_VALID)
  },

  NUMBER:{
    BaseType: 'number',
    BaseLabel: 'Numero',
    BaseValidations: yup.number(),
    BaseOptions:{
      DefaultValue: 0
    }
  }

}

export const fields = new BaseFields(BaseFieldsDefinition);

interface FieldProps {
  [key: string]: {
    [key: string]: any;
  }
}

export const FormFields:FieldProps = {
  Default2:{
    type: 'string',
    defaultvalue: '',
    label:'Invalido',
    placeholder: 'Input no encontrado - Revisar atributo Name',
    validations: yup.string()
  },

  Default: fields.createField('TEXT','Invalido',{
    PlaceHolder: 'Input no encontrado - Revisar atributo Name'
  }),

  CUIL: fields.createField('TEXT','N° de CUIL',{
    min: 11,
    max: 11,
    required: true,
    PlaceHolder: 'Ingresa tu CUIL (sin guiones)'
  }),

  CUIL2:{
    type: 'number',
    defaultvalue: '', // '20390317213',//'27271187179',
    label: 'N° de CUIL',
    placeholder: 'Ingresa tu CUIL (sin guiones)',
    validations: yup.string()
                    .required('El campo es obligatorio')
                    .min(11, 'El CUIL debe tener 11 digitos')
                    .max(11, 'El CUIL debe tener 11 digitos')
                    .test('','El CUIL es invalido', (value:any)=>CheckCUIL(value))    
},
}