import { BsSliders, BsTextParagraph } from "react-icons/bs";
import { MdTitle, MdShortText, MdDateRange, MdRadioButtonChecked } from "react-icons/md";
import { RxTextAlignLeft, RxSection } from "react-icons/rx";
import { TbClockHour4, TbNumber } from "react-icons/tb";
import { ImPageBreak } from "react-icons/im";
import { CgPassword, CgSelectR } from "react-icons/cg";
import { FiMail } from "react-icons/fi"
import { BiCheckSquare } from "react-icons/bi";
import { AiOutlineCloudUpload, AiOutlineQrcode } from "react-icons/ai";
import { FormElement } from "./OLDTYPES";

// Defining all props in the project
export type ElementSchemaTypes = 'SECTION' | 'TITLE' | 'PARAGRAPH' | 'SPACER' | 'TEXT' | 'TEXTAREA' | 'NUMBER' | 'PASSWORD' | 'MAIL' | 'DATE' | 'HOUR' | 'CHECKBOX' | 'RADIO' | 'SELECT' | 'FILE' | 'CAPTCHA' | 'RANGE';

export const HelpToken:string = "HELP";

export interface FormElementProps {
  type: ElementSchemaTypes;
  label: string;
  required: boolean;
  disabled: boolean;
  length_min: number;
  length_max: number;
  value_min: number;
  value_max: number;
  value_default: any;
  value_regex: any,
  childrens: FormElement<keyof ElementPropsMap>[];
  options: {value: any, label:string}[] | {};
}
//config por defecto de la interface
export const FormElementInitialValues: Record<string, any> = {
  label: "Ingrese un Nombre/Texto",
  required: false,
  disabled: false,
  length_min: 0,
  length_max: 10,
  value_min: 0,
  value_max: 100,
  value_default: "",
  value_regex: "",
  childrens: [],
  options: {}
}

export const FormElementBases = {

  // Non-editable Elements
  "SECTION": {
    description: "Sección",
    properties:{
      required: ["label","childrens"] as const,
      optional: [] as const,
    },
    type: null,
    format: null,
    icon: RxSection
  },
  "TITLE": {
    description: "Título",
    properties:{
      required: ["label"] as const,
      optional: [] as const,
    },
    type: null,
    format: null,
    icon: MdTitle
  },
  "PARAGRAPH": {
    description: "Párrafo",
    properties:{
      required: ["label"] as const,
      optional: [] as const,
    },
    type: null,
    format: null,
    icon: BsTextParagraph
  },
  "SPACER": {
    description: "Separador",
    properties:{
      required: ["label"] as const,  //no tiene parametro
      optional: [] as const,
    },
    type: null,
    format: null,
    icon: ImPageBreak
  },

  // Singles Elements
  "NUMBER": {
    description: "Campo Numérico",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled","length_min","length_max","value_min","value_max"] as const,
    },
    type: "input",
    format: "number",
    aditionalValidations: ["isCUIL"],
    icon: TbNumber
  },
  "TEXT": {
    description: "Campo de Texto",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled","length_min","length_max"] as const,
    },
    type: "input",
    format: "string",
    aditionalValidations: ["character_invalid"],
    icon: MdShortText
  },
  "TEXTAREA": {
    description: "Campo de Texto Multilínea",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled","length_min","length_max"] as const,
    },
    type: "textarea",
    format: null,
    icon: RxTextAlignLeft
  },
  "PASSWORD": {
    description: "Campo de Contraseña",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    type: "input",
    format: "password",
    aditionalValidations: ["isSecure"],
    icon: CgPassword
  },
  "MAIL": {
    description: "Campo de Correo Electrónico",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    type: "input",
    format: "email",
    icon: FiMail
  },
  "DATE": {
    description: "Campo de Fecha",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    type: "input",
    format: "date",
    icon: MdDateRange
  },
  "HOUR": {
    description: "Campo de Hora",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    type: "input",
    format: "time",
    icon: TbClockHour4
  },

  // Multiple Elements
  "CHECKBOX": {
    description: "Chequeo de Valores",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    type: "checkbox",
    format: null,
    icon: BiCheckSquare
  },
  "RADIO": {
    description: "Radio de Valores",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    type: "input",
    format: "radio",
    icon: MdRadioButtonChecked
  },
  "SELECT": {
    description: "Lista de Valores",
    properties:{
      required: ["label","options"] as const,
      optional: ["required","disabled"] as const,
    },
    type: "select",
    format: null,
    icon: CgSelectR
  },
  "RANGE": {
    description: "Rango de Valores",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled","value_min","value_max"] as const,
    },
    type: "slider",
    format: "number",
    icon: BsSliders
  },

  // Special Elements
  "FILE": {
    description: "Carga de Archivos",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    type: "file",
    format: null,
    icon: AiOutlineCloudUpload
  },
  "CAPTCHA": {
    description: "Verificador CAPTCHA",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    type: "input",
    format: "string",
    icon: AiOutlineQrcode
  },
};

export type ElementPropsMap = {
  [key in keyof typeof FormElementBases]: 
  Required<Pick<FormElementProps, typeof FormElementBases[key]['properties']['required'][number]>> &
  Partial<Pick<FormElementProps, typeof FormElementBases[key]['properties']['optional'][number]>>
}