import { ElementPropsMap, ElementSchemaTypes, FormElementBases, FormElementInitialValues, FormElementProps } from "./Types";
import { getValidationFunctions } from "./Validators";

export class ElementSchema<T extends ElementSchemaTypes> {
  
  public type: T;
  public properties: ElementPropsMap[T];
  public aditionalValidations: string[];

  constructor(type: T, properties: ElementPropsMap[T], aditionalValidations: string[] = []){
    this.type = type;
    this.properties = properties;
    this.aditionalValidations = aditionalValidations
  }
  
  validators = () => getValidationFunctions(this.type, this.properties as FormElementProps, this.aditionalValidations)
  
  update(properties: Partial<ElementPropsMap[T]>): void {

    for (const prop in properties) {
      
      // Skip properties not found in the allowed properties
      if (!Object.values(FormElementBases[this.type].properties).flat().includes(prop)) {
        console.warn(`Invalid property "${prop}" for element type ${this.type}`);
        continue;
      }

      // Skip properties with a value that doesn't match the type defined in the interface
      const propType = typeof properties[prop];
      const expectedType = typeof (FormElementInitialValues as ElementPropsMap[T])[prop];
      if (propType !== expectedType) {
        console.warn(`Invalid type "${propType}" for property "${prop}" in element type ${this.type}. Expected type: "${expectedType}".`);
        continue;
      }
  
      // Apply the update
      Object.assign(this.properties, { [prop]: properties[prop] });
    }
  }

}




export class ElementInstance<T extends ElementSchemaTypes> extends ElementSchema<T> {
  public name: string;
  public value: any;

  constructor(name: string, schema: ElementSchema<T>, defaultValue: any = "") {
    super(schema.type, schema.properties, schema.aditionalValidations);
    this.name = name;
    this.value = defaultValue;
  } 
  setValue(value:any): void {
    console.log("VEAMOS LO QUE SE GUARDA: "+value)
    this.value = value
  }

  getValue():any {

    return this.value
  }

}



export class FormInstance<T extends ElementSchemaTypes> {

  private elements: ElementInstance<T>[];
  private title: string; 
  private subtitle: string; 
  private description: string; 
  private keywords: string; 
  private status:string;


  constructor(title:string, subtitle:string, description:string, keywords:string, status:string, elements:ElementInstance<T>[]) {
    this.title=title;
    this.subtitle=subtitle;
    this.description=description;
    this.keywords=keywords;
    this.status=status;
    this.elements = elements ;
  }

  addElement(element: ElementInstance<T>) {
    this.elements.push(element);
  }

  addElements(elements: ElementInstance<T> []) {
    this.elements=elements;
  }


  getElements(): ElementInstance<T>[] {
    return this.elements;
  }

  getJSON (): string{
    const formData = {
      title: this.title,
      subtitle: this.subtitle,
      description: this.description,
      keywords: this.keywords,
      status: this.status,
      elements: this.elements
    };
    
    const jsonData = JSON.stringify(formData);
    return jsonData;
  }

}

/*
export class ElementData<T extends ElementSchemaTypes> extends ElementInstance<T> {
  public instance: ElementInstance<T>;
  public data: string | undefined;
  
  constructor(elementInstance: ElementInstance<T>) {
    super(elementInstance.name, elementInstance, elementInstance.value);
    this.instance = elementInstance;
    this.data = "";
  }

  update(properties: Partial<ElementPropsMap[T]>): void {

    for (const prop in properties) {
      
      // Skip properties not found in the allowed properties
      if (!Object.values(FormElementBases[this.type].properties).flat().includes(prop)) {
        console.warn(`Invalid property "${prop}" for element type ${this.type}`);
        continue;
      }

      // Skip properties with a value that doesn't match the type defined in the interface
      const propType = typeof properties[prop];
      const expectedType = typeof (FormElementInitialValues as ElementPropsMap[T])[prop];
      if (propType !== expectedType) {
        console.warn(`Invalid type "${propType}" for property "${prop}" in element type ${this.type}. Expected type: "${expectedType}".`);
        continue;
      }
  
      // Apply the update
      Object.assign(this.properties, { [prop]: properties[prop] });
    }
}

}
*/

/*export class ElementInstance {
  public name: string;
  public schema: ElementSchema<ElementSchemaTypes>;
  public value: any;

  constructor(name:string, schema:ElementSchema<any>, defaultvalue: any = ""){
    this.name = name;
    this.schema = schema;
    this.value = defaultvalue;
  }
}*/