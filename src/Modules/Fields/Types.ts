import { ElementBases, ElementMap } from "./Props";

// Definimos la clase FormElement
export class FormElement<T extends keyof ElementMap> {
  type: T;
  properties: Partial<ElementMap[T]>;
  options: string[];

  constructor(type: T, properties: Partial<ElementMap[T]> = {}) {
    this.type = type;
    this.properties = properties;
    this.options = ElementBases[type].properties.map((prop) => prop)
  }
  
  update(properties: Partial<ElementMap[T]>): void {
    this.properties = { ...this.properties, ...properties };
  }
}






/*



export class FormElement {
  id: string;
  type: string;
  properties: { [key: string]: any } = {};

  constructor(type: string, properties?: { [key: string]: any }) {
    this.id = `${type}_${new Date().getTime()}`;
    this.type = type;

    if(properties){

    const allowedProperties = BaseElements[type]?.properties || [];
    const propertiesMap: PropertiesMap = {
      label: { type: 'string', required: true },
      required: { type: 'boolean', required: true },
      disabled: { type: 'boolean' },
      valuedefault: { type: 'string' },
      charmin: { type: 'number' },
      charmax: { type: 'number' },
      valuemin: { type: 'number' },
      valuemax: { type: 'number' },
    };

    for (const property of allowedProperties) {
      if (properties[property] !== undefined) {
        this.properties[property] = properties[property];
      } else if (propertiesMap[property]) {
        const { type, required } = propertiesMap[property];
        if (required && !this.properties[property]) {
          throw new Error(`Missing required property: ${property}`);
        }
        this.properties[property] = this.properties[property] || null;
      } else {
        throw new Error(`Unknown property: ${property}`);
      }
    }
  }
  }
}

type PropertyType = 'string' | 'number' | 'boolean';

type FormElementType = 'TEXT' | 'NUMBER';

interface Property {
  type: PropertyType;
  required: boolean;
}

interface Properties {
  [key: string]: Property;
}

const properties: Properties = {
  required: { type: 'boolean', required: false },
  placeholder: { type: 'string', required: false },
  min: { type: 'number', required: false },
  max: { type: 'number', required: false },
};

type FormElementProperties<T extends FormElementType> = {
  [K in T]: {
    type: 'string' | 'number' | 'boolean'; // los tipos permitidos aquí
    required: boolean;
  }
};

type FormElementProperties<T extends FormElementType> = Pick<{
  [K in keyof properties as T extends K ? K : never]: Properties[K]['type']
}, keyof properties[T]>;


 // Agrega aquí los demás tipos

interface BaseFormElement {
  type: FormElementType;
  label: string;
  description: string;
}
/*
const properties = {
  required: { type: 'boolean', required: false },
  placeholder: { type: 'string', required: false },
  min: { type: 'number', required: false },
  max: { type: 'number', required: false },
}

interface AllFormElementProperties {
  TEXT: Pick<typeof properties, 'required' | 'placeholder'>;
  NUMBER: Pick<typeof properties, 'required' | 'min' | 'max'>;
  // Agrega aquí las demás propiedades de los demás tipos
}

type FormElementProperties<T extends FormElementType> = AllFormElementProperties[T];

export class FormElement<T extends FormElementType> implements BaseFormElement {
  id: string;
  type: T;
  label: string;
  description: string;
  properties: Partial<FormElementProperties<T>>;
  test:any;

  constructor(type: T, properties: Partial<FormElementProperties<T>> = {}) {
    this.id = `${type}_${new Date().getTime()}`;
    this.type = type;
    this.label = 'label';
    this.description = 'description';
    this.properties = properties;
    this.test = 'prueba';
  }

  update(properties: Partial<FormElementProperties<T>>): void {
    this.properties = { ...this.properties, ...properties };
  }
}



/*import { boolean } from "yup";

type FormElementType = 'SECTION' | 'TITLE' | 'PARAGRAPH' | 'SPACER' | 'TEXT' | 'TEXTAREA' | 'NUMBER' | 'PASSWORD' | 'MAIL' | 'DATE' | 'HOUR' | 'CHECKBOX' | 'RADIO' | 'SELECT' | 'FILE' | 'CAPTCHA' | 'RANGE';

type BaseElement = {
  type_name: FormElementType;
  type_label: string;
}

// Defining Non-Editable Fields Base
type BaseStatic = BaseElement & {}

type ElementSECTION = BaseStatic & {
  type_name: 'SECTION';
  type_label: 'Sección';
}

const TypeDefinitions = {
  SingleField: {
    label: String,
    required: Boolean,
    disabled: Boolean
  }
}


export const ElementDefinition = {
  SECTION: {
    type_label: 'Sección',
    type_value: String
  },
  TITLE: {
    type_label: 'Título',
    type_value: String
  },
  TEXT: {
    type_label: 'Campo de Texto',
    type_value: String,
    ...TypeDefinitions.SingleField
  },
}




export const test = ElementDefinition

console.log(test)



type BaseDynamic = BaseElement & {
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

type ElementTEXT = BaseDynamic & {

}

interface TextFormElement extends BaseDynamic {
  type: 'TEXT';
  type_label: 'Campo de Texto'
}






/*
interface NumberFormElement extends BaseFormElement {
  type: 'NUMBER';
  min?: number;
  max?: number;
  required?: boolean;
}











enum BaseElement {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
}

interface FormElement {
  type: BaseElement;
  label: string;
  [key: string]: any;
}

interface FormElementInstance extends FormElement {
  value: any;
  errors: string[];
  validations: ((value: any) => string)[];
}

const validators = {
  isNumber: (value: any): string | null =>
    isNaN(value) ? 'Value must be a number' : null,
  isRequired: (value: any): string | null =>
    value === null || value === undefined || value === '' ? 'Value is required' : null,
  isGreaterThanMin: (value: any, min: number): string | null =>
    value < min ? `Value must be greater than ${min}` : null,
  isSmallerThanMax: (value: any, max: number): string | null =>
    value > max ? `Value must be smaller than ${max}` : null,
};








class FormElement<T extends FormElementType, P extends BaseElementProperties> {
  id: string;
  type: T;
  properties: P;
  validators: {
    [K in keyof typeof validators]?: (value: any) => boolean;
  };

  constructor(type: T, properties: P) {
    this.id = `${type}_${new Date().getTime()}`;
    this.type = type;
    this.properties = properties;
    this.validators = {};
  }

  update(properties: Partial<P>) {
    this.properties = { ...this.properties, ...properties };
  }

  addValidator<K extends keyof typeof validators>(
    validator: K,
    ...args: Parameters<typeof validators[K]>
  ) {
    this.validators[validator] = validators[validator].bind(null, ...args);
  }
}

function createFormElement<T extends FormElementType, P extends BaseElementProperties>(
  type: T,
  properties: P
): FormElement<T, P> {
  return new FormElement(type, properties);
}








/*

type BaseElement = {
  name: string;
  label: string;
  attributes: any;
}

type StaticElement = BaseElement & {
  value: string | null;
}

type DynamicElement = BaseElement & {
  label: string;
  required: boolean;
  disabled: boolean;
}

export const SECTION:StaticElement = {
  type_name: 'SECTION',
  type_label: 'Sección'  
}*/