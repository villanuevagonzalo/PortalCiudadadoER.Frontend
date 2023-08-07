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
    this.value = value
  }

  getValue():any {

    return this.value
  }

}


export class FormInstance<T extends ElementSchemaTypes>  {

  elements: ElementInstance<ElementSchemaTypes>[];
  private title: string; 
  private subtitle: string; 
  private description: string; 
  private keywords: string; 
  private status:string;
  private code:string;
  private created_at:string;
  private created_by:string; 


  constructor(code:string, title:string, subtitle:string, description:string, keywords:string, status:string, elements:ElementInstance<T>[], created_at:string ="",created_by:string="" ) {
    this.title=title;
    this.subtitle=subtitle;
    this.description=description;
    this.keywords=keywords;
    this.status=status;
    this.elements = elements ;
    this.code=code;
    this.created_at = created_at ; // Asignar valor predeterminado en caso de que sea null
    this.created_by = created_by; // Asignar valor predeterminado en caso de que sea null
  }

  addElement(element: ElementInstance<T>) {
    this.elements.push(element);
  }

  addElements(elements: ElementInstance<T> []) {
    this.elements=elements;
  }

  getJSON (){
    const formData = {
      "code": this.code,
      "title": this.title,
      "subtitle": this.subtitle,
      "description": this.description,
      "keywords": this.keywords,
      "status": this.status,
      "elements": JSON.stringify(this.elements)
    };
    
    //const jsonData = JSON.stringify(formData);
    return formData;
  }

  setCode(code:string){
    this.code=code;
  }

  getCode(){
    return this.code;
  }

  getTitle(){
    return this.title;
  }

  getSubtitle(){
    return this.subtitle;
  }
  getDescription(){
    return this.description;
  }
  getKeywords(){
    return this.keywords;
  }
  getStatus(){
    return this.status;
  }
}


export class ProcedureInstance<T extends ElementSchemaTypes>  {
  
  private id?:number;
  private title:string;
  private description:string;
  private secretary:string;
  private state:string; //los estados pueden ser borrador, publicado, etc.
  private theme:string; //temática
  private forms: string [];
  private attachments:string [];
  private citizenLevel?: string;

  constructor(forms: string[], title: string, description: string, secretary:string, state: string, theme: string, attachments: string[], citizenLevel?: string, id?: number) {
    this.title = title;
    this.description = description;
    this.secretary = secretary;
    this.state = state;
    this.theme = theme;
    this.forms = forms;
    this.attachments = attachments;
  
    // Asignar el valor del parámetro id solo si se proporciona
    if (id !== undefined) {
      this.id = id;
    }
    if(citizenLevel !== undefined){
      this.citizenLevel=citizenLevel;
    }
  }

  addId(id:number){
    this.id=id;
  }
  addForm(form: string ) {
    this.forms.push(form);
  }
  addName(title:string){
    this.title=title;
  }
  addDescription(description:string){
    this.description=description;
  }
  addSecretary(secretary:string){
    this.secretary=secretary;
  }
  addState(state:string){
    this.state=state;
  }
  addTheme(theme:string){
    this.theme=theme;
  }
  addAttachments (attachments:string []){
    this.attachments=attachments
  }
  addCitizenLevel (citizenLevel:string){
    this.citizenLevel=citizenLevel;
  }
  getId(){
    return this.id;
  }
  getForms() {
    return this.forms;
  }
  getForm(index:number){
    if (this.forms.length>=index)
    return this.forms[index]
    else 
    return null
  }
  getTitle(){
    return this.title;
  }
  getDescription(){
    return this.description;
  }
  getSecretary(){
    return this.secretary;
  }
  getState(){
    return this.state;
  }
  getTheme(){
    return this.theme;
  }
  getAttachments (){
    return this.attachments;
  }
  getCitizenLevel(){
    return this.citizenLevel;
  }
  getJSON (){
    const ProcedureData = {
      "title": this.title,
      "description": this.description,
      "secretary": this.secretary,
      "state": this.state,
      "theme": this.theme,
      "forms": JSON.stringify(this.forms),
      "attachments": JSON.stringify(this.attachments),
      "citizen_level": this.citizenLevel,
      ...(this.id !== undefined && { "id": this.id })
    };
    
    return ProcedureData;
  }

}


/*
export class ProcedureInstance<T extends ElementSchemaTypes>  {
  
  private title:string;
  private description:string;
  private state:string; //los estados pueden ser borrador, publicado, etc.
  private theme:string; //temática
  private forms: FormInstance<ElementSchemaTypes>[];
  private attachments:string []

  constructor(forms:FormInstance<T>[], title:string, description:string, state:string, theme:string, atthacments:string [] ) {

    this.title=title;
    this.description=description;
    this.state=state; 
    this.theme=theme;
    this.forms=forms; 
    this.attachments=atthacments;

  }

  addForm(form: FormInstance<T>) {
    this.forms.push(form);
  }
  addName(title:string){
    this.title=title;
  }
  addDescription(description:string){
    this.description=description;
  }
  addState(state:string){
    this.state=state;
  }
  addTheme(theme:string){
    this.theme=theme;
  }
  addAttachments (attachments:string []){
    this.attachments=attachments
  }
  getForms() {
    return this.forms;
  }
  getForm(index:number){
    if (this.forms.length>=index)
    return this.forms[index]
    else 
    return null
  }
  getTitle(){
    return this.title;
  }
  getDescription(){
    return this.description;
  }
  getState(){
    return this.state;
  }
  getTheme(){
    return this.theme;
  }
  getAttachments (){
    return this.attachments;
  }
  getJSON (){
    const ProcedureData = {
      "title": this.title,
      "description": this.description,
      "state": this.state,
      "theme": this.theme,
      "forms": JSON.stringify(this.forms),
      "attachments": JSON.stringify(this.attachments)
    };
    
    return ProcedureData;
  }

}

*/