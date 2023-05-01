import { BsTextParagraph } from "react-icons/bs";
import { MdTitle, MdErrorOutline, MdShortText } from "react-icons/md";
import { RxTextAlignLeft, RxSection } from "react-icons/rx";
import { TbNumber } from "react-icons/tb";
import { ImPageBreak } from "react-icons/im";
import { CgPassword } from "react-icons/cg";
import { FiMail } from "react-icons/fi"

export type ElementTypes = 'SECTION' | 'TITLE' | 'PARAGRAPH' | 'SPACER' | 'TEXT' | 'TEXTAREA' | 'NUMBER' | 'PASSWORD' | 'MAIL' | 'DATE' | 'HOUR' | 'CHECKBOX' | 'RADIO' | 'SELECT' | 'FILE' | 'CAPTCHA' | 'RANGE';

// Defining all props in the project

interface ElementProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  length_min?: number;
  length_max?: number;
  value_min?: number;
  value_max?: number;
  value_default?: any;
  value_regex?: RegExp;
  childrens?: any;
}

interface ElementBase {
  description: string;
  properties: any;
  format?: any;
  validations?: any;
  icon?: any;
}

export const ElementBases = {

  // Non-editable Elements
  SECTION: {
    description: "Sección",
    properties: ["label","childrens"] as const,
    icon: RxSection
  },
  TITLE: {
    description: "Título",
    properties: ["label"] as const,
    icon: MdTitle
  },
  PARAGRAPH: {
    description: "Párrafo",
    properties: ["label"] as const,
    icon: BsTextParagraph
  },
  SPACER: {
    description: "Separador",
    properties: [] as const,
    icon: ImPageBreak
  },

  // Singles Elements
  TEXT: {
    description: "Campo de Texto",
    properties: ["label","required","disabled","length_min","length_max"] as const,
    format: "string",
    validations: ["character_invalid"],
    icon: MdShortText
  },
  TEXTAREA: {
    description: "Campo de Texto Multilínea",
    properties: ["label","required","disabled","length_min","length_max"] as const,
    format: "string",
    icon: RxTextAlignLeft
  },
  NUMBER: {
    description: "Campo de Numero",
    properties: ["label","required","disabled","length_min","length_max","value_min","value_max"] as const,
    format: "number",
    validations: ["isCUIL"],
    icon: TbNumber
  },
  PASSWORD: {
    description: "Campo de Contraseña",
    properties: ["label","required","disabled"] as const,
    format: "string",
    validations: ["isSecure"],
    icon: CgPassword
  },
  MAIL: {
    description: "Campo de Correo Electrónico",
    properties: ["label","required","disabled"] as const,
    format: "string",
    icon: FiMail
  },
  DATE: {
    description: "Campo de Fecha",
    properties: ["label","required","disabled"] as const,
    format: "date",
    icon: MdErrorOutline
  },
  HOUR: {
    description: "Campo de Hora",
    properties: ["label","required","disabled"] as const,
    format: "date",
    icon: MdErrorOutline
  },

  // Multiple Elements
  CHECKBOX: {
    description: "Chequeo de Valores",
    properties: ["label","required","disabled"] as const,
    format: "boolean",
    icon: MdErrorOutline
  },
  RADIO: {
    description: "Radio de Valores",
    properties: ["label","required","disabled"] as const,
    format: "number",
    icon: MdErrorOutline
  },
  SELECT: {
    description: "Lista de Valores",
    properties: ["label","required","disabled"] as const,
    format: "number",
    icon: MdErrorOutline
  },

  // Special Elements
  FILE: {
    description: "Carga de Archivos",
    properties: ["label","required","disabled"] as const,
    format: "files",
    icon: MdErrorOutline
  },
  CAPTCHA: {
    description: "Verificador CAPTCHA",
    properties: ["label","required","disabled"] as const,
    format: "string",
    icon: MdErrorOutline
  },
  RANGE: {
    description: "Rango de Valores",
    properties: ["label","required","disabled","value_min","value_max"] as const,
    format: "number",
    icon: MdErrorOutline
  },
};

export type ElementMap = {
  SECTION: Pick<ElementProps, typeof ElementBases['SECTION']['properties'][number]>,
  TITLE: Pick<ElementProps, typeof ElementBases['TITLE']['properties'][number]>,
  PARAGRAPH: Pick<ElementProps, typeof ElementBases['PARAGRAPH']['properties'][number]>,
  SPACER: Pick<ElementProps, typeof ElementBases['SPACER']['properties'][number]>,
  TEXT: Pick<ElementProps, typeof ElementBases['TEXT']['properties'][number]>,
  TEXTAREA: Pick<ElementProps, typeof ElementBases['TEXTAREA']['properties'][number]>,
  NUMBER: Pick<ElementProps, typeof ElementBases['NUMBER']['properties'][number]>,
  PASSWORD: Pick<ElementProps, typeof ElementBases['PASSWORD']['properties'][number]>,
  MAIL: Pick<ElementProps, typeof ElementBases['MAIL']['properties'][number]>,
  DATE: Pick<ElementProps, typeof ElementBases['DATE']['properties'][number]>,
  HOUR: Pick<ElementProps, typeof ElementBases['HOUR']['properties'][number]>,
  CHECKBOX: Pick<ElementProps, typeof ElementBases['CHECKBOX']['properties'][number]>,
  RADIO: Pick<ElementProps, typeof ElementBases['RADIO']['properties'][number]>,
  SELECT: Pick<ElementProps, typeof ElementBases['SELECT']['properties'][number]>,
  FILE: Pick<ElementProps, typeof ElementBases['FILE']['properties'][number]>,
  CAPTCHA: Pick<ElementProps, typeof ElementBases['CAPTCHA']['properties'][number]>,
  RANGE: Pick<ElementProps, typeof ElementBases['RANGE']['properties'][number]>,
}