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
        placeholder:"CUIL"   
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
        placeholder:"Contraseña"   
    }
]

const signupFields=[
    {
        labelText:"CUIL",
        labelFor:"cuil",
        id:"cuil",
        name:"cuil",
        type:"text",
        autoComplete:"CUIL",
        isRequired:true,
        autofocus:false,
        placeholder:"CUIL",
        value: "",
        validations:
        [{
            type:"required",
        },
        // {
        //     type:"number"
        // },
        // {
        //     type:"minLength",
        //     value: 5
        // },
        // {
        //     type:"maxLength",
        //     type:10
        // }
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
        }]  
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
        }]  
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
        }] 
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
        }]  
    }
]

export {loginFields,signupFields}