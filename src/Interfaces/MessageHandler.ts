// Archivo de Mensajes de Error

export const Messages: {[key: string]:string} = {

    // AUTH
    ['Login successful']: 'Inicio de Sesión exitoso.',
    ['Invalid Credentials']: 'Los datos ingresados no son validos.',



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
