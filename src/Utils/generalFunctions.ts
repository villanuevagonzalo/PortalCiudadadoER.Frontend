// Genral Functions

export const CapitalizeWords = (sentence:string) =>
    sentence
        .split(" ")
        .map((word:string) =>
            word[0].toUpperCase() + word.substring(1).toLowerCase()
        )
        .join(" ")


export const Sleep = (ms: number) => 
    new Promise(resolve => setTimeout(resolve, ms));

