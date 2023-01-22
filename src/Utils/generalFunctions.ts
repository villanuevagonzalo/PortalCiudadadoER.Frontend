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
  

export const CheckCUIL = (cuil:string) => {

  // Compramos el largo del string
  if(cuil.length!=11) return false;

  // Definimos las partes del cuil
  const XY = cuil.substring(0,2);
  const DNI =  cuil.substring(2,10);
  const Z = cuil[10];

  // Determinación del sexo
  let sexo = 'u';
  if(XY=='20' || XY=='23' && Z=='9') sexo = 'm';
  if(XY=='27' || XY=='23' && Z=='4') sexo = 'f';
  if(XY=='24' || XY=='23' && Z=='3') sexo = 'r';
  if(XY=='30' || XY=='33' && Z=='9') sexo = 'e';
  if(XY=='34' || XY=='33' && Z=='3') sexo = 'er';
  if(sexo=='u') return false;

  let XY2 = '20';
  if(sexo=='f')  XY2 = '27';
  if(sexo=='r')  XY2 = '24';
  if(sexo=='e')  XY2 = '30';
  if(sexo=='er') XY2 = '34';

  const arr1 = Array.from(XY2+DNI, Number)
  const arr2 = [5,4,3,2,7,6,5,4,3,2]

  let Z2 = (11 - arr1.reduce((acc:number, n:number, i:number) => acc + (n * arr2[i]), 0) % 11).toString();

  if(Z2=='11') Z2 = '0';
  else if(Z2=='10'){
    if(sexo=='m'){  Z2 = '9'; XY2 = '23'; } // Hombre
    if(sexo=='f'){  Z2 = '4'; XY2 = '23'; } // Mujer
    if(sexo=='r'){  Z2 = '3'; XY2 = '23'; } // Repetido
    if(sexo=='e'){  Z2 = '9'; XY2 = '33'; } // Empresa
    if(sexo=='er'){ Z2 = '3'; XY2 = '33'; } // Empresa Repetida
  }

  return cuil==XY2+DNI+Z2;
}
