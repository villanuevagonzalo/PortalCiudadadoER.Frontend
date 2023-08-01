import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LayoutActorSection, LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../../../../Components/Layout/StyledComponents";
import { FormikButton } from "../../../../Components/Forms/FormikButton";
import { AiOutlineCheckCircle, AiOutlineDelete, AiOutlinePlus, AiOutlineSave } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ElementInstance, Element, ElementSchema, ElementSchemaTypes, ValidateForm, ProcedureInstance, FormInstance, SelectWrapper } from "../../../../Modules/FormElements";
import { Form, Formik } from "formik";
import { FormikFieldDummy } from "../../../../Components/Forms/FormikFieldDummy";
import { FormikField } from "../../../../Components/Forms/FormikField";
import { FormikCheckbox } from "../../../../Components/Forms/FormikCheckbox";
import { MdAssignment, MdDrafts, MdMore, MdOutlineCancel, MdOutlineDataset } from "react-icons/md";
import { ProcedureContext } from "../../../../Contexts/ProcedureContext";
import { FormContext } from "../../../../Contexts/FormContext";
import { Button } from "../../../../Components/Forms/Button";
import { FaPlus } from "react-icons/fa";
import { HiOutlineMagnifyingGlass, HiTrash } from "react-icons/hi2";
import { IFormState } from "../../../../Interfaces/Data";
import { DefaultFormState } from "../../../../Data/DefaultValues";
import { Pages } from "../../../../Routes/Pages";
import { CreateProcedurePopUp, GenericAlertPopUp, ProcedureCreateErrorPopUp, ProcedureCreatedPopUp } from "../../../../Components/Forms/PopUpCards";
import { FormElementShow } from "../../../../Modules/FormElements/Components/FormsElement";

type Item = {
  title: string;
  description: string;
}

interface DatosAdjuntos {
  Title_Attached: ElementInstance<  ElementSchemaTypes>,
  Select_Attached: ElementInstance< ElementSchemaTypes>,
}

export const DA_Procedures_Associate = () => {
    const ref:any = useRef(null);

  const { UpdateProcedures, SaveProcedure, GetProcedureCategories, categories,setProcedures, procedures } = useContext(ProcedureContext);
  const { SaveForm, UpdateForms , setFormularios, formularios, isLoading, DeleteOneForm} = useContext(FormContext);

  const [forms, setForm] = useState <ElementInstance<ElementSchemaTypes>[]>([])
  const [proceduresAttached, setProcedureAttached] = useState <ElementInstance<ElementSchemaTypes>[]>([])
  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
  const [formsToSends, setFilteredForms] = useState<FormInstance<ElementSchemaTypes>[]>([]);
  const [datosAdjuntos, setDatosAdjuntos] = useState<DatosAdjuntos[]>([]);
  const [estadoProcedure, setEstadoProcedure] = useState<string>('');
  const [theme, setTheme] = useState <ElementInstance<ElementSchemaTypes>>()

  const [alertMessage, setAlertMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [crear, setCrear] = useState(false)
  const [errorCarga, setErrorCarga] = useState(false)
  const [cargadoCorrectamente, setCargadoCorrectamente] = useState(false)

  const [formToCheck, setFormToCheck] = useState<FormInstance<ElementSchemaTypes>>()
  const [seeOptions, setSeeOptions] = useState("home")

  const [Fields, setFields] = useState({
    Select_Procedure: new ElementInstance("Codigo de Select_Procedure", new ElementSchema('SELECT', { label: 'Seleccione un trámite', options:[{
      value: "NombreTramite1", label: 'Nombre del tramite 1'
    },{
      value: "NombreTramite2",
      label: 'Nombre del tramite 2'
    },{
      value: "NombreTramite3",
      label: 'Nombre del tramite 3'
    }]},["isRequired"])),
  });

  useEffect(()=>{
    UpdateProcedures()
    UpdateForms()
    GetProcedureCategories()
  },[])


  useEffect(()=>{
    const updatedOptions = categories.map((forms) => ({
      value: forms,
      label: forms, 
    }));
    const Select_Theme = new ElementInstance("0", new ElementSchema('SELECT', { label: 'Seleccione una Temática', options: updatedOptions },["isRequired"]))
    setTheme( Select_Theme);
  },[formularios])

  const addNewForm = () =>{
    const updatedOptions = formularios.map((forms) => ({
      value: forms.getCode()+" - "+forms.getTitle(),
      label: forms.getCode()+" - "+forms.getTitle(), 
    }));
    const Select_Form = new ElementInstance(forms.length.toString(), new ElementSchema('SELECT', { label: 'Seleccione un formulario', options: updatedOptions },["isRequired"]))
    setForm(prevForms => [...prevForms, Select_Form]);
  }
  
  const deleteForm = (formToDelete: ElementInstance<ElementSchemaTypes>) => {
    const updatedForms = forms.filter((form) => form !== formToDelete);
    setForm(updatedForms);
  }

  const addNewAttached = () =>{
    const Title_Attached= new ElementInstance(datosAdjuntos.length.toString(),new ElementSchema('TEXT',{label:'Ingrese Título'},["isRequired"]))
    const Select_Attached= new ElementInstance(datosAdjuntos.length.toString(), new ElementSchema('CHECKBOX', { label: 'Habilitar subir archivos'}), false)
    const nuevoDatoAdjunto: DatosAdjuntos = {
      Title_Attached: Title_Attached,
      Select_Attached: Select_Attached,
    };    
    setDatosAdjuntos([...datosAdjuntos, nuevoDatoAdjunto]);
  }

  const deleteAttached = (index:number) => {
    setDatosAdjuntos(prevDatosAdjuntos => prevDatosAdjuntos.filter((_, i) => i !== index));
  }

  const createProcedure = async () =>{
    if(estadoProcedure==''){
      setShowAlert(true)
      setAlertMessage("Debe seleccionar un estado inicial al trámite")
      setCrear(false)
    }else if (theme?.getValue()==""){
      setShowAlert(true)
      setAlertMessage("Debe seleccionar una temática de trámite")
      setCrear(false)
    }
    else if (Fields.Select_Procedure.getValue()==""){
      setShowAlert(true)
      setAlertMessage("Debe seleccionar un título al trámite")
      setCrear(false)
    }
    else if (forms.length != 0) {
      const titleAttachedValues: string[] = [];
      const listaFormularios: string[] = [];
      if (datosAdjuntos.length !=0){
        datosAdjuntos.forEach((dato) => {
          titleAttachedValues.push(dato.Title_Attached.getValue());
        });
      }
      forms.forEach((dato) => {
        listaFormularios.push(dato.getValue().split(" - ")[0]);
      });
      const jsonObject: any = {};
      jsonObject.Title_Attached = titleAttachedValues;
      const newProcedureToBeSend = new ProcedureInstance(
        listaFormularios,
        Fields.Select_Procedure.getValue(),
        "Descripción",
        estadoProcedure,
        theme!.getValue(),
        titleAttachedValues
      );
      const response = await SaveProcedure(newProcedureToBeSend, setFormState, Fields.Select_Procedure.getValue());
      if (response) {
        setCrear(false)
        setCargadoCorrectamente(true)
        setFilteredForms([]);
      } else {
        setErrorCarga(true)
      }
    }else{
      setShowAlert(true)
      setAlertMessage("Debe asociar al menos un formulario al trámite")
      setCrear(false)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const handleSeeForm = (formToSee:string) => {

    const codigoBuscado = formToSee.split("-")[0].trim().toUpperCase(); // Limpiar espacios y convertir a mayúsculas.
    const formularioEncontrado = formularios.find((formulario) => formulario.getCode().toUpperCase() === codigoBuscado);
    if (formularioEncontrado){
      setSeeOptions("seeForm"); 
      setFormToCheck(formularioEncontrado);
    }

  }

  const initialValues = Object.entries(Fields).reduce((acc, [key, obj]) => ({ ...acc, [key]: obj.value }), {});

  if (seeOptions=="seeForm") {
    return (
      <>
        <FormElementShow form={formToCheck!}  />
        <div style={{margin:"10px 0px 15px 0px"}}>
        <Button onClick={() => setSeeOptions("home")}>Volver a Gestor de Trámite</Button>
        </div>
      </>
    )
  }else{

    return(<>
      {showAlert && (<GenericAlertPopUp genericMessage={alertMessage} close={setShowAlert}  />)}
      {crear && (<CreateProcedurePopUp procedureTitle={Fields.Select_Procedure.getValue()} create={createProcedure} close={setCrear}  />)}
      {errorCarga && (<ProcedureCreateErrorPopUp procedureTitle={Fields.Select_Procedure.getValue()} close={setErrorCarga}  /> )}
      {cargadoCorrectamente && (<ProcedureCreatedPopUp title={""} close={setCargadoCorrectamente} />)}
  
      <LayoutActorSection>
        <p>Asociar elementos al trámite</p>
        <h1>Buscar Trámites</h1>
        <Formik
            innerRef={ref}
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={async(values:any)=>{
              const test = {
                Select_Procedure: values.Recipients, //ojo, cambiar esto por el nombre del campo
              };
              console.log(test)
            }}
            validate={(values:any) => ValidateForm(values, Fields)}
          >
              <Form autoComplete="off">
                  <LayoutStackedPanel>
                      {theme&&<Element instance={theme!} className="flex-1"/>}
                  </LayoutStackedPanel>
              </Form>
          </Formik>
        <Formik
            innerRef={ref}
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={async(values:any)=>{
              const test = {
                Select_Procedure: values.Recipients, //ojo, cambiar esto por el nombre del campo
              };
              console.log(test)
            }}
            validate={(values:any) => ValidateForm(values, Fields)}
          >
            <Form autoComplete="off">
              <LayoutStackedPanel>
                <Element instance={Fields.Select_Procedure} className="flex-1"/>
              </LayoutStackedPanel>  
            </Form>
        </Formik>
      </LayoutActorSection>
      <LayoutActorSection>
        <h1><MdOutlineDataset />Cuerpo del trámite</h1>
        En esta sección armamos los elementos del trámite online, para que el ciudadano complete e inicie el trámite.
      
        <h1><MdAssignment /> Formularios asociados al trámite</h1>
        <h2>Asociar con el/los formularios que sean requerido para este trámite</h2>
  
        <Formik
            innerRef={ref}
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={async(values:any)=>{
              const test = {
                Select_Procedure: values.Recipients, //ojo, cambiar esto por el nombre del campo
              };
              console.log(test)
            }}
            validate={(values:any) => ValidateForm(values, Fields)}
        >
          <Form autoComplete="off">
            {forms && forms.map((form, index) => (
              <div key={index} style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0px 0px 10px 0px" }}>
                <LayoutSection style={{ margin: "0px 0px 10px 0px" }}>
                  <p>Anexar formulario</p>
                  <div key={form.name} style={{ display: "flex", flexDirection: "column", width: "100%", margin: "15px 0px 5px 0px" }}>  
                    <Element instance={form} className="flex-1" />
                    
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', textAlign: "right" }}>
                        <HiOutlineMagnifyingGlass fontSize={"1.5rem"} onClick={() => { handleSeeForm(form.getValue())  }} />
                        <HiTrash fontSize={"1.5rem"} style={{ margin: "0px 2px 0px 0px" }} onClick={() => deleteForm(form)} />
                      </div>
  {/*
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                      <Button style={{ width: '150px', height: '40px', marginRight: '10px' }} onClick={() => deleteForm(form)}>Borrar<HiTrash fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} /></Button>
            </div>*/}
                  </div>
                </LayoutSection>
                      {index === forms.length - 1 && (
                        <Button style={{ width: "200px", height: "40px", marginRight: "10px" }} onClick={() => addNewForm()}>
                          Agregar Formulario
                          <FaPlus fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} />
                          </Button>
                      )}
                    </div>
                  ))} 
                  {forms.length==0 && (
                    <div  style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0px 0px 10px 0px" }}>
                      <Button style={{ width: "200px", height: "40px", marginRight: "10px" }} onClick={() => addNewForm()}>
                        Agregar Formulario
                        <FaPlus fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} />
                      </Button>
                      </div>
                      ) }
                  <p></p>
                  <LayoutStackedPanel className="mt-3">
                  <h1><MdDrafts /> Habilitar adjuntar archivos</h1>
                  </LayoutStackedPanel>
                  {datosAdjuntos.length>0 && datosAdjuntos.map((attach, index) => (
                    <div key={index} style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0px 0px 10px 0px" }}>
                    <LayoutSection style={{ margin: "0px 0px 10px 0px" }}>
                    <p>Dato a adjuntar en trámite</p>
                    <div key={index} style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0px 0px 20px 0px" }}>  
                      <Element instance={attach.Title_Attached} className="flex-2"/>
                      <Element instance={attach.Select_Attached} className="flex-1" />
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <Button style={{ width: '150px', height: '40px', marginRight: '10px' }} onClick={() => deleteAttached(index)}>Borrar<HiTrash fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} /></Button>
                    </div>
                  </div>
                  </LayoutSection>
                      {index === datosAdjuntos.length - 1 && (
                          <Button style={{ width: "200px", height: "40px", marginRight: "10px" }} onClick={() => addNewAttached()}>
                          Agregar Adjuntos
                          <FaPlus fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} />
                      </Button>
                      )}
                      </div>
                  ))}
                  { datosAdjuntos.length==0 && (  
                    <div  style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0px 0px 10px 0px" }}>
                    <Button style={{ width: "200px", height: "40px", margin: "15px 0px 10px 0px" }} onClick={() => addNewAttached()}>
                          Agregar Adjuntos
                          <FaPlus fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} />
                      </Button>
                      </div>  
                    )
                  }
                  <p></p>
                  <div style={{display:"flex", flexDirection:"column", margin:"15px 0px 25px 0px"}}>
                  <h1><MdMore /> Estado</h1>
                    <SelectWrapper style={{margin:"10px 0px 0px 10px"}}>
                      <select value={estadoProcedure} 
                        onInput={(e) => setEstadoProcedure((e.target as HTMLInputElement).value)} 
                        >
                          <option value="" disabled>
                            Seleccione el estado
                          </option>
                        <option value="Borrador">Borrador</option>
                        <option value="Publicado">Publicado</option>
                      </select>
                      </SelectWrapper >
  
                    </div>
                  <LayoutStackedPanel className="mt-3">
                    <LayoutSpacer/>
                    <Link to={Pages.DA_Procedures_Config} style={{ textDecoration: 'none' }}>
                      <FormikButton color="secondary">Cancelar<MdOutlineCancel/></FormikButton>
                      </Link>
                    <FormikButton onClick={ ()=>{ setCrear(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} >Finalizar<AiOutlineSave/></FormikButton>
                  </LayoutStackedPanel>
              </Form>
          </Formik>
      </LayoutActorSection>
    </>);

  }
 
}