import * as yup from 'yup';

// Estado General de un Formulario

export interface FormStateProps {
    loading: boolean;
    error: string;
    finish: boolean;
}

export const FormStateDefault:FormStateProps = {
    loading: false,
    error: '',
    finish: false,
}

// Campos de formularios

interface FieldProps {
    [key: string]: {
        type: string;
        defaultvalue?: any;
        placeholder: string;
        validations: any;
    }
}

export const FormFields:FieldProps = {
    Default:{
        type: 'string',
        defaultvalue: '',
        placeholder: 'Input Genérico - Revisa el campo Name',
        validations: yup.string()
    },

    CUIL:{
        type: 'number',
        defaultvalue: '20390317213',
        placeholder: 'Ingresa tu CUIL (sin guiones)',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .min(11, 'El CUIL debe tener 11 digitos')
                        .max(11, 'El CUIL debe tener 11 digitos')
    },

    Name:{
        type: 'string',
        defaultvalue: '1',
        placeholder: 'Ingresa tu/s nombre/s',
        validations: yup.string()
                        .required('El campo es obligatorio')
    },

    LastName:{
        type: 'string',
        defaultvalue: '1',
        placeholder: 'Ingresa tu/s apellido/s',
        validations: yup.string()
                        .required('El campo es obligatorio')
    },

    Email:{
        type: 'email',
        defaultvalue: 'gonzalo_villanueva@outlook.com',
        placeholder: 'Ingresa tu email',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .email('Debe ser un email válido')
    },

    Email_Validation:{
        type: 'email',
        defaultvalue: 'gonzalo_villanueva@outlook.com',
        placeholder: 'Reingresa tu email',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .email('Debe ser un email válido')
                        .oneOf([yup.ref('Email')],'Los emails no coinciden')
    },

    Password:{
        type: 'password',
        defaultvalue: '1',
        placeholder: 'Ingresa tu contraseña',
        validations: yup.string()
                        .required('El campo es obligatorio')
    },

    Password_Validation:{
        type: 'password',
        defaultvalue: '1',
        placeholder: 'Ingresa tu contraseña',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .oneOf([yup.ref('Password')],'Las contraseñas no coinciden')
    },

    Captcha:{
        type: 'checkbox',
        defaultvalue: false,
        placeholder: '',
        validations: yup.boolean()
                        .oneOf([true], "Debes Verificar el Captcha")
    },

    AcceptTerms:{
        type: 'checkbox',
        defaultvalue: false,
        placeholder: 'Al registrarme en la plataforma Gobierno Digital acepto los Términos y condiciones de uso del servicio.',
        validations: yup.boolean()
                        .required('El campo es obligatorio')
                        .oneOf([true], "Debes aceptar los terminos y condiciones")
    },

    RememberMe:{
        type: 'checkbox',
        defaultvalue: false,
        placeholder: 'Recordarme',
        validations: yup.boolean()
    },

    prs_id:{
        type: 'number',
        defaultvalue: '',
        placeholder: 'Id Ciudadano',
        validations: yup.string()
                        .required('El campo es obligatorio')
    },
}

// Funciones de Obtención de Información

export const formGetFieldProps = (field:string) => FormFields[field] ?? FormFields['Default']
export const formGetValidations = (fields:string[]) => yup.object(fields.reduce((a, v) => ({ ...a, [v]: formGetFieldProps(v).validations}), {}));
export const formGetInitialValues = (fields:string[]) => fields.reduce((a, v) => ({ ...a, [v]: formGetFieldProps(v).defaultvalue}), {});
