// Archivo de Mensajes de Error

export const Levels: {[key: string]:{ type: string; level:number; message: string }} = {

    // Provincia
    'level_1': {
        type: 'Ciudadano',
        level: 1,
        message: 'Nivel 1'
    }



}


// Funciones de Obtención de Información

export const GetLevel = (inputmessages:string[]) => {
    
    let templevels = [];
    for( let level of inputmessages){
        templevels.push(Levels[level] || { type: 'Invalido', level:0, message: `El nivel de verificación "${level}" no se encontro en la base de datos. Contactese con Soporte.`})
    }
    
    return templevels

}