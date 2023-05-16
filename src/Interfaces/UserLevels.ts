// Archivo de Mensajes de Error

export const Levels: {[key: string]:{ type: string; level:number; message: string }} = {

    // Provincia
    'level_1': {
        type: 'Ciudadano',
        level: 1,
        message: 'Nivel 1'
    },
    
    'level_2': {
        type: 'Ciudadano',
        level: 2,
        message: 'Nivel 2'
    },
    
    'level_3': {
        type: 'Ciudadano',
        level: 3,
        message: 'Nivel 3'
    },
    
    'actor_1': {
        type: 'Actor',
        level: 1,
        message: 'Nivel 1'
    },
    
    'actor_2': {
        type: 'Actor',
        level: 2,
        message: 'Nivel 2'
    }
}

// Funciones de Obtención de Información

export const GetLevels = (inputmessages:string[]) => {
    
    let templevels = [];
    for( let level of inputmessages){
        templevels.push(Levels[level] || { type: 'Invalido', level:0, message: `El nivel de verificación "${level}" no se encontro en la base de datos. Contactese con Soporte.`})
    }
    
    return templevels
}