import * as yup from 'yup';

const formValidations = {
    
}

interface FieldProps {
    [key: string]: {
        type: string;
        placeholder: string;
        validations: any;
    }
}

const formFields:FieldProps = {
    CUIL:{
        type: 'number',
        placeholder: 'Ingresa tu CUIL (sin guiones)',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .min(11, 'El CUIL debe tener 11 digitos')
                        .max(11, 'El CUIL debe tener 11 digitos')
    },

    Name:{
        type: 'string',
        placeholder: 'Ingresa tu/s nombre/s',
        validations: yup.string()
                        .required('El campo es obligatorio')
    },

    LastName:{
        type: 'string',
        placeholder: 'Ingresa tu/s apellido/s',
        validations: yup.string()
                        .required('El campo es obligatorio')
    },

    Password:{
        type: 'number',
        placeholder: 'Ingresa tu contraseña',
        validations: null
    },

    Email:{
        type: 'email',
        placeholder: 'Ingresa tu email',
        validations: yup.string()
                        .required('El campo es obligatorio')
                        .email('Debe ser un email válido')
    }
}


const loginFields=[
    {
        labelText:"Cuil",
        labelFor:"cuil",
        id:"cuil",
        name:"cuil",
        type:"number",
        autoComplete:"CUIL",
        isRequired:true,
        autofocus: true,
        placeholder:"Ingrese CUIL (sin guiones)",  
        value: "",
        validations:
        [{
            type:"required",
        },
        {
            type:"minLength",
            value: 11
        },
        {
            type:"maxLength",
            value: 11
        }
    ] 
    },
    {
        labelText:"Contraseña",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        autofocus: false,
        placeholder:"Contraseña", 
        value: "",
        validations:
        [{
            type:"required",
        }] 
    }
]

const signupFields=[
    {
        labelText:"CUIL",
        labelFor:"cuil",
        id:"cuil",
        name:"cuil",
        type:"number",
        autoComplete:"CUIL",
        isRequired:true,
        autofocus:false,
        placeholder:"Ingrese CUIL (sin guiones)",  
        value: "",
        validations:
        [{
            type:"required",
        },
        {
            type:"minLength",
            value: 10
        },
        {
            type:"maxLength",
            value: 11
        }
    ]
    },
    {
        labelText:"Apellido/s",
        labelFor:"apellido",
        id:"apellido",
        name:"apellido",
        type:"text",
        autoComplete:"apellido",
        isRequired:true,
        autofocus:false,
        placeholder:"Apellido/s", 
        value: "",
        validations:
        [{
            type:"required",
        }]  
    },
    {
        labelText:"Nombre/s",
        labelFor:"nombre",
        id:"nombre",
        name:"nombre",
        type:"text",
        autoComplete:"nombre",
        isRequired:true,
        autofocus:false,
        placeholder:"Nombre/s",
        value: "",
        validations:
        [{
            type:"required",
        }]    
    },
    {
        labelText:"Email",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        autofocus:false,
        placeholder:"Email",
        value: "",
        validations:
        [{
            type:"required",
        },
        {
            type:"email",
        },
        ]  
    },
    {
        labelText:"Confirmar Email",
        labelFor:"email-confirm",
        id:"email-confirm",
        name:"email-confirm",
        type:"email",
        autoComplete:"email-confirm",
        isRequired:true,
        autofocus:false,
        placeholder:"Confirmar Email",
        value: "",
        validations:
        [{
            type:"required",
        },
        {
            type:"confirmEmail",
        },
        ]  
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        autofocus:false,
        placeholder:"Password",
        value: "",
        validations:
        [{
            type:"required",
        },
        {
            type:"password",
        },
    ] 
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        autofocus:false,
        placeholder:"Confirm Password",
        value: "",
        validations:
        [{
            type:"required",
        },
        {
            type:"confirmPassword",
        },
    ]  
    }
]

export {loginFields,signupFields,formFields}