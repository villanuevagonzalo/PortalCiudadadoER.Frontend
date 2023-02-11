import { isNumber } from 'lodash';
import * as yup from 'yup';
import YupPassword from 'yup-password'
import { CheckCUIL } from '../Utils/GeneralFunctions';
YupPassword(yup) // extend yup


// Estado General de un Formulario

export interface FormStateProps {
    loading: boolean;
    error: string;
    finish: boolean;
    changing: boolean;
}

export const FormStateDefault:FormStateProps = {
    loading: false,
    error: '',
    finish: false,
    changing: false,
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
        placeholder: 'Input no encontrado - Revisar atributo Name',
        validations: yup.string()
    },

    CUIL:{
        type: 'number',
        defaultvalue: '', // '20390317213',//'27271187179',
        placeholder: 'Ingresa tu CUIL (sin guiones)',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .min(11, 'El CUIL debe tener 11 digitos')
                        .max(11, 'El CUIL debe tener 11 digitos')
                        .test('','CUIL invalido', (value:any)=>CheckCUIL(value))    
    },

    Name:{
        type: 'string',
        defaultvalue: '',
        placeholder: 'Ingresa tu/s nombre/s',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .test('','El campo posee caracteres invalidos', (value:any)=>!/[^a-zA-Z\u00C0-\u017F ']/g.test(value))
    },

    LastName:{
        type: 'string',
        defaultvalue: '',
        placeholder: 'Ingresa tu/s apellido/s',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .test('','El campo posee caracteres invalidos', (value:any)=>!/[^a-zA-Z\u00C0-\u017F ']/g.test(value))
    },

    Email:{
        type: 'email',
        defaultvalue: '', // 'gonzalo_villanueva@outlook.com',
        placeholder: 'Ingresa tu email',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .email('Debe ser un email válido')
    },

    Email_Validation:{
        type: 'email',
        defaultvalue: '', // 'gonzalo_villanueva@outlook.com',
        placeholder: 'Reingresa tu email',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .email('Debe ser un email válido')
                        .oneOf([yup.ref('Email')],'Los emails no coinciden')
    },

    Password:{
        type: 'password',
        defaultvalue: '',
        placeholder: 'Ingresa tu contraseña',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .min(8, 'La contraseña debe ser como mínimo de 8 caracteres.')
                        .test('', 'La contraseña posee mas de 4 caracteres iguales consecutivos.', (value:any) => value?!/(.)\1{3}/g.test(value):false)
                        .test('', 'La contraseña no puede tener mas de 4 numeros consecutivos.', (value:any) => {
                            if (!value) return true;
                            let consecutive = 0;
                            for (let i = 1; i < value.length; i++) {
                                consecutive=Number(value[i])-Number(value[i-1])==1?consecutive+1:0
                                if(consecutive>=3){ return false }
                            }
                            return true
                        })
                        .test('','La contraseña debe contener como mínimo 4 letras.', (value:any)=>value?[...value.matchAll(/[a-zA-Z]/g)].length>3:false)
                        .minUppercase(1, 'La contraseña debe contener al menos 1 letra mayúscula.')
                        .minNumbers(2, 'La contraseña debe contener al menos 2 caracteres numéricos.')
                        .minSymbols(1, 'La contraseña debe contener como mínimo un carácter especial.')
    },

    Password_Validation:{
        type: 'password',
        defaultvalue: '',
        placeholder: 'Reingresa tu contraseña',
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
        placeholder: 'Al registrarme en la plataforma Gobierno Digital acepto los <b>Términos y condiciones de uso</b> del servicio.',
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
        defaultvalue: null,
        placeholder: 'Id Ciudadano',
        validations: yup.string()
                        .required('El campo es obligatorio')
    },

    Search:{
        type: 'search',
        defaultvalue: '',
        placeholder: 'Ingresa tu/s nombre/s',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .test('','El campo posee caracteres invalidos', (value:any)=>!/[^a-zA-Z\u00C0-\u017F ']/g.test(value))
    },
}

// Funciones de Obtención de Información

export const formGetFieldProps = (field:string) => FormFields[field] ?? FormFields['Default']
export const formGetValidations = (fields:string[]) => yup.object(fields.reduce((a, v) => ({ ...a, [v]: formGetFieldProps(v).validations}), {}));
export const formGetInitialValues = (fields:string[]) => fields.reduce((a, v) => ({ ...a, [v]: formGetFieldProps(v).defaultvalue}), {});
