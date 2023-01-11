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



export const GetParams = (params: string[]) => {

  const values: {[key: string]: string } = {};
  let status: boolean = true;
  const errors: any[] = [];

  const [searchParams] = useSearchParams();

  for (let param in params) {
      const paramname = params[param]
    const paramvalue = searchParams.get(params[param]) as string
    if (paramvalue) {
      try {
        values[paramname] = atob(paramvalue);
      } catch (e) {
        values[paramname] = '';
        errors.push(`El campo ${paramname} presenta un valor invalido`);
        status = false;
      }
    } else {
      values[paramname] = '';
      errors.push(`El campo ${paramname} no existe`);
      status = false;
  }
  }

  return { status, params, values, errors }
}
  

