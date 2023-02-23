// Archivo de Mensajes de Error

export const Messages: {[key: string]:string} = {

    // AUTH
    'Login successful': 'Inicio de Sesión exitoso.',
    'Invalid Credentials': 'Los datos ingresados no son validos.',
    'Undefined array key 0': 'Error interno del servidor.',
    'User already registered': 'El CUIL ingresado ya se encuentra registrado.',
    'Bad Cuil': 'El CUIL ingresado no se encuenta en la base de datos.',
    'email validation still pending': 'Debes verificar tu email antes de poder iniciar sesión.',

    'User not found': 'El CUIL ingresado no pertecene a ningun usuario registrado.',
    'Email sent': 'Mail Enviado | Por favor aguarda | ',
    'Email already sent': 'Ya se te ha enviado un correo para reestablecer tu contraseña | Por favor aguarda | ',
    'Bad validation code': 'El Token suministrado es invalido.',
    'Password changed': 'Contraseña Actualizada',
    'The payload is invalid.': 'Petición invalida.',
    
    'Email alredy verified': 'El CUIL ingresado ya presenta un correo verificado.',
    'Invalid Cuil': 'El CUIL ingresado no se encuentra registrado',

}

export const StatusCodes: {[key: number]:string} = {

    // AUTH
    404: 'Pagina no Encontrada',

}

// Funciones de Obtención de Información

export const GetMessage = (inputmessage:string, code?:number) => {
    /*if(code){
        return StatusCodes[code] || `El codigo de estado "${code}" no se encontro en la base de datos. Contactese con Soporte.`
    } else{*/
        return Messages[inputmessage] || `El mensaje "${inputmessage}" no se encontro en la base de datos. Contactese con Soporte.`
    //}
}

export const GetMessage2 = (inputmessage:string) => {

    const partialmsg = inputmessage.split('. Wait ');
    return Messages[partialmsg[0]]+(partialmsg[1]?partialmsg[1]:'') || `El mensaje "${inputmessage}" no se encontro en la base de datos. Contactese con Soporte.`
}
