import { BsSliders, BsTextParagraph } from "react-icons/bs";
import { MdTitle, MdShortText, MdDateRange, MdRadioButtonChecked } from "react-icons/md";
import { RxTextAlignLeft, RxSection } from "react-icons/rx";
import { TbClockHour4, TbNumber } from "react-icons/tb";
import { ImPageBreak } from "react-icons/im";
import { CgPassword, CgSelectR } from "react-icons/cg";
import { FiMail } from "react-icons/fi"
import { BiCheckSquare } from "react-icons/bi";
import { AiOutlineCloudUpload, AiOutlineQrcode } from "react-icons/ai";
import { FormElement } from "./Types";

// Defining all props in the project
export type FormElementTypes = 'SECTION' | 'TITLE' | 'PARAGRAPH' | 'SPACER' | 'TEXT' | 'TEXTAREA' | 'NUMBER' | 'PASSWORD' | 'MAIL' | 'DATE' | 'HOUR' | 'CHECKBOX' | 'RADIO' | 'SELECT' | 'FILE' | 'CAPTCHA' | 'RANGE';

export interface FormElementProps {
  label: string;
  required: boolean;
  disabled: boolean;
  length_min: number;
  length_max: number;
  value_min: number;
  value_max: number;
  value_default: any;
  value_regex: any,
  childrens: FormElement<keyof FormElementMap>[];
}

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
}

export const FormElementBases = {

  // Non-editable Elements
  SECTION: {
    description: "Sección",
    properties:{
      required: ["label"] as const,
      optional: ["childrens"] as const,
    },
    icon: RxSection
  },
  TITLE: {
    description: "Título",
    properties:{
      required: ["label"] as const,
      optional: [] as const,
    },
    icon: MdTitle
  },
  PARAGRAPH: {
    description: "Párrafo",
    properties:{
      required: ["label"] as const,
      optional: [] as const,
    },
    icon: BsTextParagraph
  },
  SPACER: {
    description: "Separador",
    properties:{
      required: [] as const,
      optional: [] as const,
    },
    icon: ImPageBreak
  },

  // Singles Elements
  NUMBER: {
    description: "Campo Numérico",
    properties:{
      required: ["label","value_max"] as const,
      optional: ["required","disabled","length_min","length_max","value_min"] as const,
    },
    format: "number",
    validations: ["isCUIL"],
    icon: TbNumber
  },
  TEXT: {
    description: "Campo de Texto",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled","length_min","length_max"] as const,
    },
    format: "string",
    validations: ["character_invalid"],
    icon: MdShortText
  },
  TEXTAREA: {
    description: "Campo de Texto Multilínea",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled","length_min","length_max"] as const,
    },
    format: "string",
    icon: RxTextAlignLeft
  },
  PASSWORD: {
    description: "Campo de Contraseña",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    format: "string",
    validations: ["isSecure"],
    icon: CgPassword
  },
  MAIL: {
    description: "Campo de Correo Electrónico",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    format: "string",
    icon: FiMail
  },
  DATE: {
    description: "Campo de Fecha",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    format: "date",
    icon: MdDateRange
  },
  HOUR: {
    description: "Campo de Hora",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    format: "date",
    icon: TbClockHour4
  },

  // Multiple Elements
  CHECKBOX: {
    description: "Chequeo de Valores",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    format: "boolean",
    icon: BiCheckSquare
  },
  RADIO: {
    description: "Radio de Valores",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    format: "number",
    icon: MdRadioButtonChecked
  },
  SELECT: {
    description: "Lista de Valores",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    format: "number",
    icon: CgSelectR
  },
  RANGE: {
    description: "Rango de Valores",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled","value_min","value_max"] as const,
    },
    format: "number",
    icon: BsSliders
  },

  // Special Elements
  FILE: {
    description: "Carga de Archivos",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    format: "files",
    icon: AiOutlineCloudUpload
  },
  CAPTCHA: {
    description: "Verificador CAPTCHA",
    properties:{
      required: ["label"] as const,
      optional: ["required","disabled"] as const,
    },
    format: "string",
    icon: AiOutlineQrcode
  },
};

export type FormElementMap = {
  [key in keyof typeof FormElementBases]: 
  Required<Pick<FormElementProps, typeof FormElementBases[key]['properties']['required'][number]>> &
  Partial<Pick<FormElementProps, typeof FormElementBases[key]['properties']['optional'][number]>>
}