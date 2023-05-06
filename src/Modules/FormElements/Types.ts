import { FormElementInitialValues, FormElementBases, FormElementMap, FormElementProps } from "./Props";



export class FormElement<T extends keyof FormElementMap> {
  id: string;
  type: T;
  properties: FormElementMap[T];
  properties_required: string[];
  properties_optional: string[];

  constructor(type: T, properties: FormElementMap[T]) {
    this.id = `${type}_${new Date().getTime()}`;
    this.type = type;
    this.properties = properties;
    this.properties_required = FormElementBases[type].properties.required.map((prop) => prop)
    this.properties_optional = FormElementBases[type].properties.optional.map((prop) => prop)
    if (!this.properties_required.every(prop => Object.keys(properties).includes(prop))) {
      this.properties_required.forEach((prop:string)=>{
        if(!Object.hasOwn(this.properties, prop)){
          Object.assign(this.properties, { [prop]: FormElementInitialValues[prop] });
        }
      })
    }
  }
  
  update(properties: Partial<FormElementMap[T]>): void {
    for (const prop in properties) {
      // Skip properties not found in the allowed properties
      if (![...this.properties_required, ...this.properties_optional].includes(prop)) {
        console.warn(`Invalid property "${prop}" for element type ${this.type}`);
        continue;
      }

      // Skip properties with a value that doesn't match the type defined in the interface
      const propType = typeof properties[prop];
      const expectedType = typeof (FormElementInitialValues as FormElementMap[T])[prop];
      if (propType !== expectedType) {
        console.warn(`Invalid type "${propType}" for property "${prop}" in element type ${this.type}. Expected type: "${expectedType}".`);
        continue;
      }
  
      // Apply the update
      Object.assign(this.properties, { [prop]: properties[prop] });
    }
  }
}

export class FormElementInstance<T extends keyof FormElementMap> extends FormElement<T> {
  value: any;

  constructor(type: T, properties: FormElementMap[T], value = '') {
    super(type, properties);
    this.value = value;
  }
  

  updateValue(value: string): void {
    this.value = value;
  }
/*
  update(properties: Pick<FormElementInstance<T>, 'value'>): void {
    for (const prop in properties) {
      if (prop === 'value') {
        this.updateValue(properties[prop] as string);
      }
    }
  }*/
}

export const GetJSONData = (elements: FormElement<keyof FormElementMap>[]) => {
  return elements.map(element=>[element.type, element.properties])
}