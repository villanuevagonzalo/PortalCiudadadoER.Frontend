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
  type: string;
  options?: {
    required?: boolean;
    min?: number;
    max?: number;
    [key: string]: any;
  };
  validations: yup.AnySchema;
}

// Clase que representa un campo base
class BaseField implements BaseFieldProps {
  // Propiedades comunes a todos los campos
  type: string;
  options?: {
    required?: boolean;
    min?: number;
    max?: number;
    [key: string]: any;
  };
  validations: yup.AnySchema;

  // Constructor que recibe el tipo, las opciones y las validaciones del campo
  constructor(
    type: string,
    options?: BaseFieldProps["options"],
    validations?: yup.AnySchema
  ) {
    this.type = type;
    this.options = options;
    this.validations = validations || yup.mixed();
  }

  // Método estático que aplica las validaciones por defecto a un esquema yup
  static defaultValidations(
    validation: any,
    options: Partial<BaseFieldProps["options"]>
  ) {
    if (options?.required) {
      validation = validation.required(ValidationsMessages.REQUIRED);
    }
    if (options?.min) {
      validation = validation.min(
        options.min,
        ValidationsMessages.CHARACTERS_MIN.replace(
          "XX",
          options.min.toString()
        )
      );
    }
    if (options?.max) {
      validation = validation.max(
        options.max,
        ValidationsMessages.CHARACTERS_MAX.replace(
          "XX",
          options.max.toString()
        )
      );
    }
    return validation;
  }

  // Método que crea un objeto con el tipo y la etiqueta del campo

  createField(
    label: string,
    overrides?: Partial<BaseFieldProps["options"] | BaseFieldProps["validations"]>
  ) {
    // Si hay algún valor que sobrescribir, lo asignamos a la propiedad correspondiente
    if (overrides) {
      if ("options" in overrides) {
        this.options = { ...this.options, ...overrides.options };
      }
      if ("validations" in overrides) {
        this.validations = overrides.validations;
      }
    }
    // Devolvemos el objeto con el tipo y la etiqueta
    return {
      type: this.type,
      label,
    };
  }

  // Método estático que actúa como una fábrica de campos según un array de objetos con las definiciones de cada tipo
  static createFields(fieldDefinitions: BaseFieldProps[]) {
    // Creamos un objeto vacío para guardar los campos creados
    let fields: { [key: string]: BaseField } = {};
    // Recorremos el array de definiciones
    for (let fieldDefinition of fieldDefinitions) {
      // Obtenemos el tipo, las opciones y las validaciones de cada definición
      let { type, options, validations } = fieldDefinition;
      // Creamos una instancia de la clase BaseField con esos valores
      let field = new BaseField(type, options, validations);
      // Guardamos el campo en el objeto con el tipo como clave
      fields[type] = field;
    }
    // Devolvemos el objeto con los campos creados
    return fields;
  }


}

// Ejemplo de uso de la clase

// Definimos un array de objetos con las definiciones de cada tipo de campo
let fieldDefinitions: BaseFieldProps[] = [
  {
    type: "string",
    options: {
      required: true,
    },
    validations: yup
      .string()
      .test(
        "",
        ValidationsMessages.CHARACTERS_INVALID,
        (value: any) => !/[^a-zA-Z\u00C0-\u017F ']/g.test(value)
      ),
  },
  {
    type: "email",
    options: {
      required: true,
    },
    validations: yup.string().email(ValidationsMessages.MAIL_VALID),
  },
];

// Creamos los campos usando el método estático createFields
export let fields = BaseField.createFields(fieldDefinitions);

// Accedemos a los campos por su tipo
let textField = fields["string"];
let mailField = fields["email"];

console.log(textField.createField("Nombre")); // { type: "string", label: "Nombre" }
console.log(mailField.createField("Correo")); // { type: "email", label: "Correo" }

console.log(textField.validations.isValidSync("Juan")); // true
console.log(textField.validations.isValidSync("123")); // false

console.log(mailField.validations.isValidSync("juan@correo.com")); // true
console.log(mailField.validations.isValidSync("juan@correo")); // false
