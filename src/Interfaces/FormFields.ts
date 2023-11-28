import * as yup from 'yup';
import YupPassword from 'yup-password'
import { CheckCUIL } from '../Utils/General';
import moment from 'moment';
YupPassword(yup) // extend yup

// Campos de formularios

interface FieldProps {
    [key: string]: {
        type: string;
        defaultvalue?: any;
        label?: string;
        placeholder: string;
        validations: any;
    }
}

export const FormFields:FieldProps = {
    Default:{
        type: 'string',
        defaultvalue: '',
        label:'Invalido',
        placeholder: 'Input no encontrado - Revisar atributo Name',
        validations: yup.string()
    },

    CUIL:{
        type: 'number',
        defaultvalue: '', // '20390317213',//'27271187179',20133638084
        label: 'N° de CUIL',
        placeholder: 'Ingresa tu CUIL (sin guiones)',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .min(11, 'El CUIL debe tener 11 digitos')
                        .max(11, 'El CUIL debe tener 11 digitos')
                        .test('','El CUIL es invalido', (value:any)=>CheckCUIL(value))    
    },

    Name:{
        type: 'string',
        defaultvalue: '',
        label: 'Nombre/s',
        placeholder: 'Ingresa tu/s nombre/s',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .test('','El campo posee caracteres invalidos', (value:any)=>!/[^a-zA-Z\u00C0-\u017F ']/g.test(value))
    },

    LastName:{
        type: 'string',
        defaultvalue: '',
        label: 'Apellido/s',
        placeholder: 'Ingresa tu/s apellido/s',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .test('','El campo posee caracteres invalidos', (value:any)=>!/[^a-zA-Z\u00C0-\u017F ']/g.test(value))
    },

    Email:{
        type: 'email',
        defaultvalue: '', // 'gonzalo_villanueva@outlook.com',
        label: 'Email',
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
                        .oneOf([yup.ref('Email')],'Los emails no coinciden')
    },

    Password:{
        type: 'password',
        defaultvalue: '', // 'Test123.',
        placeholder: 'Ingresa tu contraseña',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .min(8, 'La contraseña debe ser como mínimo de 8 caracteres.')
                        .test('', 'La contraseña posee mas de 4 caracteres iguales consecutivos.', (value:any) => value?!/(.)\1{3}/g.test(value):false)
                        .test('', 'La contraseña no puede tener mas de 4 numeros consecutivos.', (value:any) => {
                            if (!value) return true;
                            let consecutive = 0;
                            for (let i = 1; i < value.length; i++) {
                                consecutive=Number(value[i])-Number(value[i-1])===1?consecutive+1:0
                                if(consecutive>=3){ return false }
                            }
                            return true
                        })
                        .test('','La contraseña debe contener como mínimo 4 letras.', (value:any)=>value?[...value.matchAll(/[a-zA-Z]/g)].length>3:false)
                        .minUppercase(1, 'La contraseña debe contener al menos 1 letra mayúscula.')
                        .minLowercase(1, 'La contraseña debe contener al menos 1 letra minúscula.')
                        .minNumbers(2, 'La contraseña debe contener al menos 2 caracteres numéricos.')
                        .minSymbols(1, 'La contraseña debe contener como mínimo un carácter especial.')
    },

    Password_Validation:{
        type: 'password',
        defaultvalue: '', // 'Test123.',
        placeholder: 'Reingresa tu contraseña',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .oneOf([yup.ref('Password')],'Las contraseñas no coinciden')
    },

    Captcha:{
        type: 'string',
        defaultvalue: '',
        placeholder: '',
        validations: yup.string()
                        .required('Debes Verificar el Captcha')
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

    Cellphone:{
        type: 'tel',
        defaultvalue: '',
        placeholder: 'Ingresa tu numero de telefono',
        validations: yup.string()
                        .test('numbers', 'El campo debe tener un numero valido', value => !value || /^[0-9]+$/.test(value))
                        .required('El campo es obligatorio')
    },

    /*
    Birthdate:{
        type: 'date',
        defaultvalue: null,
        placeholder: 'Ingresa tu fecha de nacimiento',
        validations: yup.date()
                        .required('El campo es obligatorio')
                        .min(new Date(new Date().getFullYear() - 120, new Date().getMonth(), new Date().getDate()), 
                            'La fecha de nacimiento no puede tener mas de 120 años')
                        .max(new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()),
                            'La fecha de nacimiento debe tener por lo menos 1 año.')
    },*/

    Birthdate: {
        type: 'date',
        defaultvalue: null,
        placeholder: 'Ingresa tu fecha de nacimiento',
        validations: yup.date()
          .required('El campo es obligatorio')
          .min(new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate()), 'La fecha de nacimiento no puede tener más de 100 años')
          .max(new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()), 'La fecha de nacimiento debe tener por lo menos 1 año.'),
      },


    Locality:{
        type: 'string',
        defaultvalue: '',
        placeholder: 'Busca tu localidad',
        validations: yup.string()
                        .required('El campo es obligatorio')
    },

    AddressStreet:{
        type: 'string',
        defaultvalue: '',
        placeholder: 'Calle',
        validations: yup.string()
                        .required('El campo es obligatorio')
    },

    AddressNumber:{
        type: 'number',
        defaultvalue: '',
        placeholder: 'Numero',
        validations: yup.string()
                        .test('lessThanTen', 'El campo debe tener un numero valido', value => !value || Number(value) > 0)
                        .required('El campo es obligatorio')
    },

    Apartment:{
        type: 'string',
        defaultvalue: '',
        placeholder: 'Departamento',
        validations: yup.string()
    },

    Tramites:{
        type: 'string',
        defaultvalue: '',
        placeholder: 'Filtra los tramites',
        validations: yup.string()
    },

    Recipients:{
        type: 'string',
        defaultvalue: '',
        placeholder: 'Filtra los destinatarios',
        validations: yup.string()
    },

    Age_From:{
        type: 'number',
        defaultvalue: '',
        placeholder: 'Edad Desde',
        validations: yup.string()
                        .test('lessThanTen', 'El campo debe tener un numero valido', value => !value || Number(value) > 0)  
                        .required('El campo es obligatorio')
    },

    Age_To:{
        type: 'number',
        defaultvalue: '',
        placeholder: 'Edad Hasta',
        validations: yup.string()
                        .test('lessThanTen', 'El campo debe tener un numero valido', value => !value || Number(value) > 0)  
                        .required('El campo es obligatorio')
    },

    Message_Title:{
        type: 'string',
        defaultvalue: '',
        placeholder: 'Titulo',
        validations: yup.string()
                        .required('El campo es obligatorio')
    },

    Message_Body:{
        type: 'string',
        defaultvalue: '',
        placeholder: 'Mensaje',
        validations: yup.string()
                        .required('El campo es obligatorio')
    },

    Attachment_Type:{
        type: 'string',
        defaultvalue: '',
        placeholder: 'Tipo de Archivo',
        validations: yup.string()
                        .required('El campo es obligatorio')
    },

    Attachment:{
        type: 'file',
        defaultvalue: '',
        placeholder: 'Archivo',
        validations: yup.object().shape({
            file: yup.mixed().required('El campo es obligatorio'),
        })
    },

    Notification_Date_From:{
        type: 'date',
        defaultvalue: null,
        placeholder: 'Fecha desde',
        validations: yup.string()
                        .required('El campo es obligatorio')
    },

    Notification_Date_To:{
        type: 'date',
        defaultvalue: null,
        placeholder: 'Fecha hasta',
        validations: yup.string()
                        .required('El campo es obligatorio')
    },

    // Send_By_Email:{
    //     type: 'checkbox',
    //     defaultvalue: false,
    //     placeholder: 'Enviar por Email',
    //     validations: yup.boolean()
    // },

    /*
        DocumentFrontPhoto:{
        type: 'file',
        defaultvalue: '',
        placeholder: 'Foto dni frontal',
        validations: yup.object({
            Image: yup.mixed().required('El campo es obligatorio')
            .test('FILE_SIZE', 'El archivo es muy grande', (value:any) => value && value.size < 1024*1024)
            .test('FILE_TYPE', 'El archivo no es una imagen', (value:any) => value && ['image/jpeg', 'image/png'].includes(value.type))
        }),
    },

    DocumentBackPhoto:{
        type: 'file',
        defaultvalue: '',
        placeholder: 'Foto dni trasera',
        validations: yup.object({
            Image: yup.mixed().required('El campo es obligatorio')
            .test('FILE_SIZE', 'El archivo es muy grande', (value:any) => value && value.size < 1024*1024)
            .test('FILE_TYPE', 'El archivo no es una imagen', (value:any) => value && ['image/jpeg', 'image/png'].includes(value.type))
        }),
    },

    DocumentCityzenPhoto:{
        type: 'file',
        defaultvalue: '',
        placeholder: 'Foto de ciudadano',
        validations: yup.object({
            Image: yup.mixed().required('El campo es obligatorio')
            .test('FILE_SIZE', 'El archivo es muy grande', (value:any) => value && value.size < 1024*1024)
            .test('FILE_TYPE', 'El archivo no es una imagen', (value:any) => value && ['image/jpeg', 'image/png'].includes(value.type))
        }),
    },
    
    */

    Send_By_Email:{
        type: 'checkbox',
        defaultvalue: false,
        placeholder: 'Enviar por Email',
        validations: yup.boolean()
                        .required('El campo es obligatorio')
    },

    Select_Procedure:{
        type: 'string',
        defaultvalue: '',
        placeholder: 'Busca un trámite',
        validations: yup.string()
    },
}

// Funciones de Obtención de Información

export const formGetFieldProps = (field:string) => FormFields[field] ?? FormFields['Default']
export const formGetValidations = (fields:string[]) => yup.object(fields.reduce((a, v) => ({ ...a, [v]: formGetFieldProps(v).validations}), {}));
export const formGetInitialValues = (fields:string[]) => fields.reduce((a, v) => ({ ...a, [v]: formGetFieldProps(v).defaultvalue}), {});
