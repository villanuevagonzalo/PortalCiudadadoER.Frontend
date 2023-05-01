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
    const invalidKeys = Object.keys(properties).filter((key:string) => !this.options.includes(key));
    if (invalidKeys.length > 0) {
      console.log(`Invalid properties ${invalidKeys} for element type ${this.type}`);
    } else{
      this.properties = { ...this.properties, ...properties };      
    }
  }
}

//  export class FormElementInstance