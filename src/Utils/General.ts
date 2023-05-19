// Genral Functions

import _ from 'lodash';
import { useSearchParams } from 'react-router-dom';
import CryptoJS from 'crypto-js'

export const CapitalizeWords = (sentence: string) =>
  sentence
    .split(' ')
    .map(
      (word: string) => word.length>0?word[0].toUpperCase() + word.substring(1).toLowerCase():""
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
        //values[paramname] = atob(paramvalue);
        values[paramname] = paramvalue;
      } catch (e) {
        values[paramname] = '';
        errors.push(`El parametro ${paramname} presenta un valor invalido`);
        status = false;
      }
    } else {
      values[paramname] = '';
      errors.push(`El parametro ${paramname} no existe`);
      status = false;
  }
  }

  return { status, params, values, errors }
}
  
export const CheckCUIL = (cuil:string) => {

  // Comparamos el largo del string
  if(cuil?.length!==11) return false;

  // Definimos las partes del cuil
  const XY = cuil.substring(0,2);
  const DNI =  cuil.substring(2,10);
  const Z = cuil[10];

  // Determinación del sexo
  let sexo = 'u';
  if(XY==='20' || (XY==='23' && Z==='9')) sexo = 'm';
  if(XY==='27' || (XY==='23' && Z==='4')) sexo = 'f';
  if(XY==='24' || (XY==='23' && Z==='3')) sexo = 'r';
  if(XY==='30' || (XY==='33' && Z==='9')) sexo = 'e';
  if(XY==='34' || (XY==='33' && Z==='3')) sexo = 'er';
  if(sexo==='u') return false;

  let XY2 = '20';
  if(sexo==='f')  XY2 = '27';
  if(sexo==='r')  XY2 = '24';
  if(sexo==='e')  XY2 = '30';
  if(sexo==='er') XY2 = '34';

  const arr1 = Array.from(XY2+DNI, Number)
  const arr2 = [5,4,3,2,7,6,5,4,3,2]

  let Z2 = (11 - arr1.reduce((acc:number, n:number, i:number) => acc + (n * arr2[i]), 0) % 11).toString();

  if(Z2==='11') Z2 = '0';
  else if(Z2==='10'){
    if(sexo==='m'){  Z2 = '9'; XY2 = '23'; } // Hombre
    if(sexo==='f'){  Z2 = '4'; XY2 = '23'; } // Mujer
    if(sexo==='r'){  Z2 = '3'; XY2 = '23'; } // Repetido
    if(sexo==='e'){  Z2 = '9'; XY2 = '33'; } // Empresa
    if(sexo==='er'){ Z2 = '3'; XY2 = '33'; } // Empresa Repetida
  }
  
  return cuil===XY2+DNI+Z2;
}

export const multiGroupBy:any = (seq:any[], keys:string[]) => {
  if (!keys.length) return seq;
  var first = keys[0];
  var rest = keys.slice(1);
  return _.mapValues(_.groupBy(seq, first), function(value) {
    return multiGroupBy(value, rest);
  });
};

var key  = CryptoJS.enc.Hex.parse("27c69b41b5fe49aaa984e472d4aeaa5b");
var iv   = CryptoJS.enc.Hex.parse("17c69b41b5fe49aaa984e472d4aeaa5a");

const Encrypt = (str: string) => CryptoJS.AES.encrypt(str, key, {iv}).toString();
const Decrypt = (str: string) => CryptoJS.AES.decrypt(str, key, {iv}).toString(CryptoJS.enc.Utf8);

export const getLSData = (item:string) => {
  //const data:any = Decrypt(localStorage.getItem(Encrypt(item)) || "") || null;
  const data:any = localStorage.getItem(item) || null;
  return JSON.parse(data);
}

export const setLSData = (item:string, data:any) => {
  //localStorage.setItem(Encrypt(item), Encrypt(JSON.stringify(data)));
  localStorage.setItem(item, JSON.stringify(data));
  return data;
}

export const delLSData = (item:string) => {
  //localStorage.removeItem(Encrypt(item));
  localStorage.removeItem(item);
}

export const stringPreview = (text:string, len:number=100) => text.length>len?(text.slice(0,len)+"..."):text;