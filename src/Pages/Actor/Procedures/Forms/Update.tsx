import { LayoutSection, LayoutSpacer, LayoutStackedPanel, LayoutText } from "../../../../Components/Layout/StyledComponents";
import { MdOutlineCancel, MdOutlineDataset, MdOutlineNewLabel } from "react-icons/md";
import { FormElement, GetJSONData } from "../../../../Modules/FormElements/OLDTYPES";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Button } from "../../../../Components/Forms/Button";
import { Element } from "../../../../Modules/FormElements/Components/Element";
import { ElementInstance, ElementSchema, FormInstance } from "../../../../Modules/FormElements/Class";
import { Form, Formik } from "formik";
import { AiOutlineSave } from "react-icons/ai";
import { BiBullseye, BiSave } from "react-icons/bi";
import { ElementSchemaTypes, FormElementBases } from "../../../../Modules/FormElements/Types";
import { FormElementBasesMenu, SelectWrapperWithArrow } from "../../../../Modules/FormElements/Components/StyledComponents";
import { ValidateForm } from "../../../../Modules/FormElements/Validators";
import { ElementEditor } from "../../../../Modules/Actor/ElementEditor";
import { CreateFormPopUp, FormCreateCompleteFieldsPopUp, FormCreateErrorPopUp, FormCreatedPopUp, FormFieldsPropertiesPopUp, LoadingFormPopUp, UpdateFormPopUp } from "../../../../Components/Forms/PopUpCards";
import { IFormState } from "../../../../Interfaces/Data";
import { DefaultFormState } from "../../../../Data/DefaultValues";
import { FormContext } from "../../../../Contexts/FormContext";
import { Spinner } from "../../../../Components/Elements/StyledComponents";
import { BackOfficesFormElement } from "../../../../Modules/Actor/FormsElement";
import { HiArrowDown, HiArrowUp, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { FormikButton } from "../../../../Components/Forms/FormikButton";
import { Link } from "react-router-dom";
import { Pages } from "../../../../Routes/Pages";


interface Arguments {
    formToUpdate:FormInstance<ElementSchemaTypes>;
    setVolver:Function,
  }

export const FormUpdate: React.FC<Arguments> = ({formToUpdate, setVolver}) => {

    const { UpdateOneForm , GetElementsByCode, GetFormByCode, setFormularios, isLoading } = useContext(FormContext);

  const [edit, setEdit] = useState(false)
  const [ver, setVer] = useState(false)
  const [ fields, setFields ] = useState<ElementInstance<ElementSchemaTypes>[]>([]);
  const [instance, setIntance] = useState<ElementInstance<ElementSchemaTypes>>()

  const [crear, setCrear] = useState(false)
  const [completarCampos, setCompletarCampos] = useState(false)
  const [cargadoCorrectamente, setCargadoCorrectamente] = useState(false)
  const [errorCarga, setErrorCarga] = useState(false)

  const [ index, setIndex] = useState<number>(0);
  const [ jsonproperties, setJsonproperties] = useState<string>('{ "label": "Prueba", "required": true, "disabled": true, "length_min": 0, "length_max": 10, "value_min": 0, "value_max": 100, "value_default": "", "value_regex": "", "childrens": ""}');
  const [ jsona2, setJsona2 ] = useState<string>('[]');
  const [estadoFormulario, setEstadoFormulario] = useState<string>('Borrador');
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);

 /* const [formBasicData, setFormBasicData] = useState({
    Code: new ElementInstance("Codigo de referencia", new ElementSchema('TEXT', { label: 'Ingresá el código de referencia' }, ["isRequired"])),
    Title: new ElementInstance("Title", new ElementSchema('TEXT', { label: 'Ingresá el Título' }, ["isRequired"])),
    Subtitle: new ElementInstance("Subtitle", new ElementSchema('TEXT', { label: 'Ingresá el Subtítulo' }, ["isRequired"])),
    Description: new ElementInstance("Description", new ElementSchema('TEXTAREA', { label: 'Descripción', length_max: 100 }, ["isRequired"])),
    Keywords: new ElementInstance("Keywords", new ElementSchema('TEXT', { label: 'Palabras Claves' }, ["isRequired"])),
  });*/

  const [codigo, setCodigo] = useState( new ElementInstance("Codigo de referencia", new ElementSchema('TEXT', { label: 'Ingresá el código de referencia' }, ["isRequired"])) )
  const [title, setTitle] = useState(new ElementInstance("Title", new ElementSchema('TEXT', { label: 'Ingresá el Título' }, ["isRequired"])) )
  const [subtitle, setSubtitle] = useState(new ElementInstance("Subtitle", new ElementSchema('TEXT', { label: 'Ingresá el Subtítulo' }, ["isRequired"])) )
  const [description, setDescription] = useState(new ElementInstance("Description", new ElementSchema('TEXTAREA', { label: 'Descripción', length_max: 100 }, ["isRequired"])) )
  const [keywords, setKeywords] = useState(new ElementInstance("Keywords", new ElementSchema('TEXT', { label: 'Palabras Claves' }, ["isRequired"])))

  const initialValues = Object.entries(codigo).reduce((acc, [key, obj]) => ({ ...acc, [key]: obj.value }), {});

  useEffect(() => {

    codigo.setValue(formToUpdate?.getCode());
    title.setValue(formToUpdate?.getTitle());
    subtitle.setValue(formToUpdate?.getSubtitle());
    description.setValue(formToUpdate?.getDescription());
    keywords.setValue(formToUpdate?.getKeywords());
    setEstadoFormulario(formToUpdate?.getStatus());

    const fetchData = async () => {
     
      // Luego ejecuta GetFormByCode si es necesario
      if (formToUpdate.getDescription() === undefined && formToUpdate.getSubtitle() === undefined) {
        await GetFormByCode(formToUpdate.getCode(), setFormState);
      }
      
      // Comienza por ejecutar GetElementsByCode
      if (formToUpdate.elements.length === 0) {
        await GetElementsByCode(formToUpdate.getCode(), setFormState);
      } else {
        setFields(formToUpdate.elements);
      }
  
      
    };
  
    fetchData();
  }, []);

    //this is the new code to get the elements appart
    useEffect(()=>{
        setFields(formToUpdate.elements);
    },[formToUpdate.elements])

    useEffect(()=>{
      setSubtitle(new ElementInstance("Subtitle", new ElementSchema('TEXT', { label: 'Descripción', length_max: 100 }, ["isRequired"]), formToUpdate?.getSubtitle()))

  },[formToUpdate.subtitle])

  useEffect(()=>{
    setDescription(new ElementInstance("Description", new ElementSchema('TEXTAREA', { label: 'Descripción', length_max: 100 }, ["isRequired"]), formToUpdate?.getDescription()))

  },[formToUpdate.description])

  


  const addItem = (type:any) => {
    const newfield = new ElementInstance( (fields.length+1).toString (),new ElementSchema(type,{label:'Ingresá el Título'},["isRequired"]))
    setFields((prev: any)=>[...prev,newfield])
  }

  const handleEstadoFormulario = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEstadoFormulario(event.target.value);
  };

  const handleIndexChange= (event: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(+event.target.value);
  }

  const handleJsonPropiertiesChanges = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonproperties(event.target.value);
  }

  const editarComponente =(schema:ElementInstance<ElementSchemaTypes> , indice:number)=> {
    setIntance(schema)
    setIndex(indice)
    setEdit(true)
  }

  const borrarComponente =( indice:number)=> {
    setFields(prevFields => prevFields.filter((_, i) => i !== indice));
  }

  const guardarFormulario=async ()=> {
   const nuevoFormulario = new FormInstance(codigo.getValue(), title.getValue(), subtitle.getValue(), description.getValue(), keywords.getValue(), estadoFormulario, fields)
   const response = await UpdateOneForm(nuevoFormulario, setFormState, codigo.value);
   if (response){
    setCargadoCorrectamente(true)
    setCrear(false)
   }else{
    setErrorCarga(true)
   }
 }

 const moveElementUp = (index:number) => {
  if (index > 0) {
    // Swap the element with the one above it
    const updatedFields = [...fields];
    const temp = updatedFields[index];
    updatedFields[index] = updatedFields[index - 1];
    updatedFields[index - 1] = temp;
    // Update the state with the new order
    setFields(updatedFields);
  }
};

const moveElementDown = (index:number) => {
  if (index < fields.length - 1) {
    // Swap the element with the one below it
    const updatedFields = [...fields];
    const temp = updatedFields[index];
    updatedFields[index] = updatedFields[index + 1];
    updatedFields[index + 1] = temp;
    // Update the state with the new order
    setFields(updatedFields);
  }
};

  
 if (ver){

    const nuevoFormulario = new FormInstance(codigo.value, title.value, subtitle.value, description.value, keywords.value, estadoFormulario, fields)
    return ( 
      <>
        <BackOfficesFormElement form={nuevoFormulario}  />
        <Button onClick={() => setVer(false)}>Volver a sección editar </Button>
      </>
    )
  }else{
    if (edit){
      if (instance) {
        return(
          <FormFieldsPropertiesPopUp instance={instance} setField={setFields} index={index} fields={fields} setClose={setEdit} />
        );
      } else {
        return null; // Otra opción es mostrar un mensaje de error o una carga condicional
      }  
    }else{
      return(
      <>
        {isLoading&& <LoadingFormPopUp />}
        {crear && (<UpdateFormPopUp formTitle={title.value} create={guardarFormulario} close={setCrear} /> )}
        {cargadoCorrectamente && (<FormCreatedPopUp formTitle={title.value} close={setCargadoCorrectamente} />)}
        {errorCarga && (<FormCreateErrorPopUp formTitle={title.value} close={setErrorCarga} />)}
        {completarCampos && (<FormCreateCompleteFieldsPopUp close={setCompletarCampos} crear={setCrear} /> )}
        <LayoutSection  style={{margin:"5px 0px 15px 0px"}}>
          <h1><MdOutlineNewLabel />Datos Generales del Formulario</h1>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(e:any)=>{
              console.log(e)
            }}
            validate={(values:any) => ValidateForm(values, codigo.getValue())}
          >
          <Form autoComplete="off">
            <h1 style={{margin:"10px 0px 20px 0px"}}> Código de referencia: {codigo.getValue()}</h1>
            <Element instance={title}/>
            <Element instance={subtitle}/>
            <Element instance={description}/>
            <Element instance={keywords}/>
            <LayoutStackedPanel>
              <LayoutSpacer/>
            </LayoutStackedPanel>
          </Form>
          </Formik>
        </LayoutSection>
        <LayoutSection  style={{margin:"5px 0px 15px 0px"}}>
          <h1><MdOutlineDataset />Administrador de Campos</h1>
          <LayoutStackedPanel>
            <div className="flex-1 gap-1" style={{display:'flex', flexDirection:'column'}}>
            <Formik
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(e:any)=>{
              console.log(e)
            }}
          >
            <Form autoComplete="off">
            {fields.map((element: ElementInstance<ElementSchemaTypes>, index: number) => (
                      <div key={index} style={{ display: "flex", flexDirection: "column", width: "auto", margin: "10px 0px 15px 0px" }}>
                        <p style={{ margin: "0px 0px 10px 0px" }}>{element.type}</p>

                        <Element instance={element} />
                        <div style={{ display: "flex", flexDirection: "row", width: "auto", margin: "5px 0px 15px 0px" }}>
                          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            <div style={{display:"flex", flexDirection:"row"}} >

                              <div onClick={() => editarComponente(element, index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                              </div>
                              {index !== 0 && ( // Only render "Move Up" if not the first element
                              <div style={{ margin: "0px 0px 0px 15px" }}>
                                {/* Move Up Button */}
                                <button onClick={() => moveElementUp(index)}><HiArrowUp /></button>
                              </div>
                            )}
                            {index !== fields.length - 1 && ( // Only render "Move Down" if not the last element
                              <div style={{ margin: "0px 0px 0px 15px" }}>
                                {/* Move Down Button */}
                                <button onClick={() => moveElementDown(index)}><HiArrowDown /></button>
                              </div>
                            )}
                            </div>
                            <div onClick={() => borrarComponente(index)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </div>
                          </div>
                         
                        </div>
                      </div>
                    ))}
              <LayoutStackedPanel>
                <LayoutSpacer/>
                <div style={{display:"flex", flexDirection:"row", width:"auto", margin:"10px 0px 15px 0px"}}> 
                </div>
              </LayoutStackedPanel>
            </Form>
          </Formik>
    
            </div>
            <div>
              <h2>Elementos</h2>
              <FormElementBasesMenu>{Object.entries(FormElementBases).map(([clave, element], index) => {
               return(<div key={clave} onClick={()=>addItem(clave)}>
                  <span><element.icon/></span>
                  <ul>
                    <li className="title"><p>{element.description}</p></li>
                  </ul>
                </div>)
              })}</FormElementBasesMenu>
            </div>
          </LayoutStackedPanel>
  
          <div style ={{display:"flex", flexDirection:"column", marginTop:"10px"}}>
            <h1><MdOutlineNewLabel /> Estado</h1>
            <SelectWrapperWithArrow >
            <select value={estadoFormulario} onInput={(e) => setEstadoFormulario((e.target as HTMLInputElement).value)}>
                <option value="" disabled>Seleccione estado del formulario</option>
                <option value="Borrador">Borrador</option>
                <option value="Publicado">Publicado</option>
              </select>
            </SelectWrapperWithArrow>
            </div>    

          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <FormikButton  onClick={() => setVer(true)}>Ver<HiOutlineMagnifyingGlass /></FormikButton>
            <div style={{ display: 'flex', flexDirection:"row", justifyContent: 'right', width: '100%' }}>
                <FormikButton style={{margin:"0px 15px 0px 0px"}} color="secondary"  onClick={() => { setVolver("home"); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Cancelar<MdOutlineCancel/></FormikButton>
                <FormikButton style={{margin:"0px 0px 0px 15px"}} type="submit" onClick={() => { setCrear(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Guardar<BiSave /></FormikButton>
            </div>
          </div>
        </LayoutSection>
      </>);
    }
  }
}

