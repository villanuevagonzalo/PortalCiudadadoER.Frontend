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
  subtitle: string; 
  description: string; 
  private keywords: string; 
  private status:string;
  private code:string;
  created_at:string;
  private created_by:string; 


  constructor(code:string, title:string, subtitle:string, description:string, keywords:string, status:string, elements:ElementInstance<T>[] = [], created_at:string ="",created_by:string="" ) {
    this.title=title;
    this.subtitle=subtitle;
    this.description=description;
    this.keywords=keywords;
    this.status=status;
    this.elements = elements;
   
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
    
    return formData;
  }

  setDescription (description:string){
    this.description=description;
  }

  setSubtitle (subtitle:string){
    this.subtitle=subtitle;
  }

  setCreated_at (created_at:string){
    this.created_at=created_at;
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
  private forms: string [];
  private attachments:string [];
  private citizenLevel?: string;
  private theme?:string; //temática
  private price?:string;
  private c?:string;
  private content_id?:string;
  private orf_id?:string;
  private url?:string;
  private icon?:string;
  private sys_exp_id?:string; //id from sistema de expendiente's table

  constructor( title: string, description: string, secretary:string, state: string, forms: string[], attachments: string[], citizenLevel?: string, price?:string, theme?: string, url?:string, icon?:string, c?:string, content_id?:string, orf_id?:string,  id?: number , sys_exp_id?:string) {        
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
    if (price!==undefined){
      this.price=price
    }else{
      this.price=""

    }
    if (c!==undefined){
      this.c=c
    }else{
      this.c=""

    }
    if (content_id!==undefined){
      this.content_id=content_id

    }else{
      this.content_id=""

    } 
    if (orf_id!==undefined){
      this.orf_id=orf_id
    }else{
      this.orf_id=""

    }
    if (url!==undefined){
      this.url=url
    }else{
      this.url=""

    }
    if (icon!==undefined){
      this.icon=icon
    }else{
      this.icon=""
    }
    if (sys_exp_id!==undefined){
      this.sys_exp_id=sys_exp_id
    }else{
      this.sys_exp_id=""

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
  getId():number{
    return this.id!;
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
  setPrice(price: string | undefined) {
    this.price = price;
  }

  // Getter para 'price'
  getPrice() {
    return this.price;
  }

  // Setter para 'c'
  setC(c: string | undefined) {
    this.c = c;
  }

  // Getter para 'c'
  getC() {
    return this.c;
  }

  // Setter para 'content_id'
  setContentId(contentId: string | undefined) {
    this.content_id = contentId;
  }

  // Getter para 'content_id'
  getContentId() {
    return this.content_id;
  }

  // Setter para 'orf_id'
  setOrfId(orfId: string | undefined) {
    this.orf_id = orfId;
  }

  // Getter para 'orf_id'
  getOrfId() {
    return this.orf_id;
  }
  getSistExpId(){
    return this.sys_exp_id;
  }

  getIcon(){
    return this.icon;
  }

  // Setter para 'url'
  setUrl(url: string | undefined) {
    this.url = url;
  }

  // Getter para 'url'
  getUrl() {
    return this.url;
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
      ...(this.id !== undefined && { "id": this.id }),
      "price":this.price,
      "c" :this.c,
      "content_id":this.content_id,
      "orf_id" :this.orf_id,
      "url":this.url,
      "icon":this.icon,
      "sys_exp_id":this.sys_exp_id
     
    };
    
    return ProcedureData;
  }

}

export class FormDataClass   {

  private form_data_id: number;
  private form_code:string; 
  private procedure_data_id:number;
  private user_id?:number;
  elements: ElementInstance<ElementSchemaTypes>[];
  private attachments?: string [];
  private multimedia_id?: string [];
  private status:string;
  created_at?:string;
  private updated_at?:string; 

  constructor(
    form_data_id: number,
    form_code: string,
    procedure_data_id: number,
    status: string,
    attachments?: string[],
    multimedia_id?: string[],
    user_id?: number,
    created_at?: string,
    updated_at?: string,
    elements: ElementInstance<ElementSchemaTypes>[]= [],

  ) {
    this.form_data_id = form_data_id;
    this.form_code = form_code;
    this.procedure_data_id = procedure_data_id;
        
    this.elements = elements;
    this.status = status;
    this.attachments = attachments || [];
    this.multimedia_id = multimedia_id || [];
    
    if (user_id !== undefined){
      this.user_id = user_id;
    }
    if (created_at !==undefined) {
      this.created_at = created_at
    }
    if (updated_at !== undefined){
      this.updated_at = updated_at
    }
  }

  // Funciones getter para cada atributo

  getFormDataId(): number {
    return this.form_data_id;
  }

  getFormCode(): string {
    return this.form_code;
  }

  getProcedureDataId(): number {
    return this.procedure_data_id;
  }

  getUserId(): number | undefined {
    return this.user_id;
  }

  getElements(): ElementInstance<ElementSchemaTypes>[] {
    return this.elements;
  }

  getAttachments(): string[] | undefined {
    return this.attachments;
  }

  getMultimediaId(): string[] | undefined {
    return this.multimedia_id;
  }

  getStatus(): string {
    return this.status;
  }

  getCreatedAt(): string | undefined {
    return this.created_at;
  }

  getUpdatedAt(): string | undefined {
    return this.updated_at;
  }

  // Funciones setter para cada atributo

  setFormDataId(form_data_id: number): void {
    this.form_data_id = form_data_id;
  }

  setFormCode(form_code: string): void {
    this.form_code = form_code;
  }

  setProcedureDataId(procedure_data_id: number): void {
    this.procedure_data_id = procedure_data_id;
  }

  setUserId(user_id?: number): void {
    this.user_id = user_id;
  }

  setElements(elements: ElementInstance<ElementSchemaTypes>[]): void {
    this.elements = elements;
  }

  setAttachments(attachments?: string[]): void {
    this.attachments = attachments || [];
  }

  setMultimediaId(multimedia_id?: string[]): void {
    this.multimedia_id = multimedia_id || [];
  }

  setStatus(status: string): void {
    this.status = status;
  }

  setCreatedAt(created_at?: string): void {
    this.created_at = created_at;
  }

  setUpdatedAt(updated_at?: string): void {
    this.updated_at = updated_at;
  }

  addElement(element: ElementInstance<ElementSchemaTypes>) {
    this.elements.push(element);
  }

  getJSON (){
    const FormData = {
      "form_data_id": this.form_data_id,
      "form_code": this.form_code,
      "procedure_data_id": this.procedure_data_id,
      "elements": JSON.stringify(this.elements),
      "status": this.status,
      "attachments": JSON.stringify(this.attachments),
      "multimedia_id": JSON.stringify(this.multimedia_id),
     
    };
    
    return ProcedureData;
  }

}

export class ProcedureData {

  private procedure_data_id:number; 
  private procedure_unit_id:number;
  private reason:string;
  private forms: string [];
  private attachments?: string [];
  private multimedia_id?: number [];
  private status:string;
  private created_at?:string;
  private updated_at?:string;
  private date_approved?:string;

  constructor(procedure_data_id: number, procedure_unit_id: number, reason: string, status: string, forms:string [], attachments?: string[], multimedia_id?: number[],  created_at?: string, updated_at?:string,date_approved?:string ) {

    this.procedure_data_id=procedure_data_id;
    this.procedure_unit_id=procedure_unit_id;
    this.reason=reason;
    this.forms=forms;
    this.attachments = attachments || []; // Initialize as an empty array if not provided
    this.multimedia_id = multimedia_id || []; // Initialize as an empty array if not provided
  
    this.status=status;
    this.created_at=created_at;
    this.updated_at=updated_at;
    this.date_approved=date_approved;

  }

  getId(){
    return this.procedure_data_id;
  }
  
  getProcedureUnitId():number{
    return this.procedure_unit_id;
  }

  getForms (){

    return this.forms;
  }

  getStatus(){
    return this.status;
  }

  setForms(form: string) {
    // Verificar si 'forms' es undefined o null y crear un nuevo arreglo si es necesario
    if (!this.forms) {
      this.forms = [];
    }
  
    // Agregar el nuevo 'form' al arreglo 'forms'
    this.forms.push(form);
  }

  getAttachments(){
    return this.attachments;
  }

  getMultimediaId(){
    return this.multimedia_id;
  }


  setAttachments(attachmentName: string) {
    // Verificar si 'multimedia_id' es undefined o null y crear un nuevo arreglo si es necesario
    if (!this.attachments) {
      this.attachments = [];
    }
    
    this.attachments = [...this.attachments, attachmentName];
  }

  setAttachmentsArray(attachments: string[]) {
    // Verificar si 'attachments' es undefined o null y crear un nuevo arreglo si es necesario
    if (!this.attachments) {
      this.attachments = [];
    }
  
    // Agregar los nuevos 'attachments' al arreglo 'attachments'
    this.attachments.push(...attachments);
  }

  setMultimediaId(multimediaId: number) {
    // Verificar si 'multimedia_id' es undefined o null y crear un nuevo arreglo si es necesario
    if (!this.multimedia_id) {
      this.multimedia_id = [];
    }
    
    this.multimedia_id = [...this.multimedia_id, multimediaId];
  }

  setMultimediaIdArray(multimediaId: number[]) {
    // Verificar si 'attachments' es undefined o null y crear un nuevo arreglo si es necesario
    if (!this.multimedia_id) {
      this.multimedia_id = [];
    }
  
    // Agregar los nuevos 'attachments' al arreglo 'attachments'
    this.multimedia_id.push(...multimediaId);
  }
  getJSON (){

    const ProcedureData = {
      "procedure_data_id": this.procedure_data_id,
      "procedure_unit_id": this.procedure_unit_id,
      "reason": this.reason,
      "forms": JSON.stringify(this.forms),
      "attachments":JSON.stringify(this.attachments),
      "multimedia_id":JSON.stringify(this.multimedia_id),
      "status": this.status,
      "created_at": this.created_at,
      "updated_at": this.updated_at,
      "date_approved": this.date_approved,
    }
    return ProcedureData;

  }
}