// Genral Functions

import { useSearchParams } from 'react-router-dom'

export const CapitalizeWords = (sentence: string) =>
  sentence
    .split(' ')
    .map(
      (word: string) => word[0].toUpperCase() + word.substring(1).toLowerCase(),
    )
    .join(' ')

export const Sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))


interface GetParamsProps {
  value: string;
  error: string;
}

export const GetParams = (params: string[]) => {
    const [searchParams] = useSearchParams()
    const newParams: {[key: string]: { value: string; error: string; }} = {}
  
    for (let param in params) {
        const paramname = params[param]
      const paramvalue = searchParams.get(params[param]) as string
      if (paramvalue) {
        try {
          newParams[paramname] = {value:atob(paramvalue),error:''}
        } catch (e) {
            
          newParams[paramname] = {value:'',error:`El campo <b>${paramname}</b> presenta un valor invalido`}
        }
      } else {
        newParams[paramname] = {value:'',error:`El campo <b>${paramname}</b> no existe`}
    }
    }
  
    return newParams
  }

  
  
export const GetParams2 = (params: string[]) => {
    const [searchParams] = useSearchParams()
    const newParams: string[] = []
  
    for (let param in params) {
      console.log(params[param])
      const tempparam = searchParams.get(params[param]) as string
      if (tempparam) {
        try {
          newParams.push(atob(tempparam))
        } catch (e) {
          newParams.push('string invalido')
        }
      } else {
        newParams.push('')
      }
    }
  
    return newParams
  }
  