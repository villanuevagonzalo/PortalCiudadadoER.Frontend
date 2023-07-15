import { FC, SetStateAction, createContext, useEffect, useState } from "react";
import { ElementInstance, ElementSchema, FormInstance } from "../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../Modules/FormElements/Types";
import axios, { AxiosResponse } from "axios";
import { ResponseError, handleResponse } from "../Config/Axios";
import { FormAPI } from "../Services/FormAPI";


type FieldsType = ElementInstance<ElementSchemaTypes>[];


const ContextValues = () => {

  const AxiosFormAPI = new FormAPI();
  const [formularios, setFormularios] = useState<FormInstance<ElementSchemaTypes>[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string>("");

  const SaveForm = async (formularios: any, setFormState: Function) => {
    const response: AxiosResponse = await handleResponse(AxiosFormAPI.Create, formularios, setFormState);
    if (response.data) 
      {
        setFormularios(prevState => ([...prevState, formularios]));
      }
    return response;
  }

  const UpdateOneForm = async(formulario: any, setFormState: Function) => {
    const response: AxiosResponse = await handleResponse(AxiosFormAPI.Create, formulario, setFormState);

    if (response.data) 
      {
        //setFormularios(prevState => ([...prevState, formularios]));
      }
    return response;

  }

  const UpdateForms = async() => {


    setIsLoading(true)
    let responseAll:AxiosResponse | ResponseError | null = null;
    
    try { responseAll = await AxiosFormAPI.GetAll(); } catch (error:any) { setErrors("Hubo un problema al cargar las notificaciones generales. Por favor, intente nuevamente mas tarde.") }
    //let forms=responseAll!.data.data; 
   // response_without_backslashes = json.loads(response.replace('\\', ''))
    
   //let FormData = "[]";
   if(responseAll && responseAll.status!==204) 
   {
    const FormData = responseAll.data.data;
      const FormsObj = JSON.parse(FormData);
      const formulariosAux: SetStateAction<FormInstance<ElementSchemaTypes>[]> = [];
      console.log("ESTO ES LO QUE EN PRIMERA INSTANCIA LLEGA: "+FormData)
      console.log("ESTO ES LO QUE SE PARCEA: "+FormsObj)
      console.log("ESTO ES LO QUE SE PARCEA EN STRING"+JSON.stringify(FormsObj))

      const mappedArray = FormsObj.map((formInstance: any) => {
        // Procesar cada elemento del arreglo aquí y retornar el resultado
        // Puedes hacer cualquier operación o transformación en formInstance

        let fields: FieldsType = [];

        let componentes= JSON.parse(formInstance.STATUS)
        componentes.map((componente: any, index:number)=> {

          const aux= new ElementInstance((index+1).toString(), new ElementSchema(componente.type, { label: 'Ingresá el Título' }, ["isRequired"]));
          aux.update((componente.properties))
          fields.push(aux);


        });

        console.log("FIELDS"+JSON.stringify(fields))

        const Formulario = new FormInstance(
          formInstance.CODE,
          formInstance.TITLE,
          formInstance.SUBTITLE,
          formInstance.DESCRIPTION,
          formInstance.ELEMENTS,
          formInstance.KEYWORDS,
          fields
        );
        formulariosAux.push(Formulario);

      });   
      
     /* FormsObj.forEach((forms: { CODE: string; TITLE: string; SUBTITLE: string; DESCRIPTION: string; KEYWORDS: string; ELEMENTS: string; STATUS: ElementInstance<ElementSchemaTypes>[]; }) => {
        console.log("ESTO SE GUARDA DE ELEMENTS: "+  forms.STATUS        )

        const Formulario = new FormInstance(
          forms.CODE,
          forms.TITLE,
          forms.SUBTITLE,
          forms.DESCRIPTION,
          forms.KEYWORDS,
          JSON.parse(forms.ELEMENTS),
          forms.STATUS
        );

        formulariosAux.push(Formulario);
      });*/

      setFormularios(formulariosAux);
   }
   
    
    setIsLoading(false); 
  }

  const UserClearData = () => {
    setFormularios([]);
  }

  return {
    formularios,
    setFormularios,
    SaveForm, 
    UpdateForms
  }
}

export const FormContext = createContext({} as ReturnType<typeof ContextValues>);

const FormContextProvider: FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <FormContext.Provider value={ContextValues()}>
      {props.children}
    </FormContext.Provider>
  );
}

export default FormContextProvider;
  