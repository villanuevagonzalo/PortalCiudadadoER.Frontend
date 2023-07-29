import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Table } from "../../../../Components/Elements/Table";
import { LayoutActorSection, LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../../../../Components/Layout/StyledComponents";

import { ColumnDef } from '@tanstack/react-table';
import { FormikButton } from "../../../../Components/Forms/FormikButton";
import { AiOutlineCheckCircle, AiOutlineDelete, AiOutlinePlus, AiOutlineSave } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { FormikSearch } from "../../../../Components/Forms/FormikSearch";
import { FormWrapperCheckbox, FormWrapperInput } from "../../../../Components/Forms/StyledComponents";
import { TableFunctions } from "../../../../Components/Elements/StyledComponents";
import { GrFormView } from "react-icons/gr";
import { ElementInstance, Element, ElementSchema, ElementSchemaTypes, ValidateForm, ProcedureInstance, FormInstance, SelectWrapper } from "../../../../Modules/FormElements";
import { Form, Formik } from "formik";
import { FormikFieldDummy } from "../../../../Components/Forms/FormikFieldDummy";
import { FormikField } from "../../../../Components/Forms/FormikField";
import { FormikCheckbox } from "../../../../Components/Forms/FormikCheckbox";
import { MdAssignment, MdDrafts, MdMore, MdOutlineCancel, MdOutlineDataset, MdOutlineNewLabel } from "react-icons/md";
import { ProcedureContext } from "../../../../Contexts/ProcedureContext";
import { FormContext } from "../../../../Contexts/FormContext";
import { Button } from "../../../../Components/Forms/Button";
import { FaPlus } from "react-icons/fa";
import { HiTrash } from "react-icons/hi2";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { IFormState } from "../../../../Interfaces/Data";
import { DefaultFormState } from "../../../../Data/DefaultValues";
import { forEach } from "lodash";

interface Arguments {
    procedure:ProcedureInstance<ElementSchemaTypes>;
}

interface DatosAdjuntos {
  Title_Attached: ElementInstance<  ElementSchemaTypes>,
  Select_Attached: ElementInstance< ElementSchemaTypes>,
}

//console.log(BaseFields.TEXT.validations)

export const UpdateProcedure: React.FC<Arguments> = ({procedure}) => {
    const ref:any = useRef(null);

  const { UpdateOneProcedure, setProcedures, procedures } = useContext(ProcedureContext);
  const { UpdateForms , formularios} = useContext(FormContext);

  const [forms, setForm] = useState <ElementInstance<ElementSchemaTypes>[]>([])
  const [oldForms, setOldForms] = useState <string []> ([])

  const [proceduresAttached, setProcedureAttached] = useState <ElementInstance<ElementSchemaTypes>[]>([])
  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
  const [formsToSends, setFilteredForms] = useState<FormInstance<ElementSchemaTypes>[]>([]);

  const [datosAdjuntos, setDatosAdjuntos] = useState<DatosAdjuntos[]>([]);
  const [oldDatosAdjuntos, setOldDatosAdjuntos]= useState <string []> ([])

  const [estadoProcedure, setEstadoProcedure] = useState<string>('Borrador');

  const [Fields, setFields] = useState({
    Select_Procedure: new ElementInstance("Codigo de Select_Procedure", new ElementSchema('SELECT', { label: 'Seleccione un trámite', options:[{
      value: "NombreTramite1", label: 'Nombre del tramite 1'
    },{
      value: "NombreTramite2",
      label: 'Nombre del tramite 2'
    },{
      value: "NombreTramite3",
      label: 'Nombre del tramite 3'
    }]},["isRequired"]), "both"),
    Select_Theme: new ElementInstance("Select_Theme", new ElementSchema('SELECT', { label: 'Temáticas' ,options:[{
      value: "NombreTemática1",
      label: 'Temática 1'
    },{
      value: "NombreTemática2",
      label: 'Temática 2'
    },{
      value: "NombreTemática3",
      label: 'Temática 3'
    }]},["isRequired"]), "both"),
  });

  useEffect(() => {

    const listaFormularios: string [] = [];
    const listaAdjuntos: string [] = [];
    procedure.getForms().map((element, index: number) => {
        const formularioEncontrado = formularios.find((formulario) => formulario.getCode() === element);
        if (formularioEncontrado) {
            listaFormularios.push(formularioEncontrado.getCode() + " - " + formularioEncontrado.getTitle())
        }
    });
    setOldForms( listaFormularios);
    procedure.getAttachments().map((element, index: number) => {
      listaAdjuntos.push(element)
    });
    setOldDatosAdjuntos(listaAdjuntos);

   /* const updatedOptions = formularios.map((forms) => ({
        value: forms.getCode()+" - "+forms.getTitle(),
        label: forms.getCode()+" - "+forms.getTitle(), 
      }));
      const Select_Form = new ElementInstance("0", new ElementSchema('SELECT', { label: 'Seleccione un formulario', options: updatedOptions },["isRequired"]))
      setForm(prevForms => [ Select_Form]);
  
      const Title_Attached= new ElementInstance("TitleAttached",new ElementSchema('TEXT',{label:'Ingrese Título'},["isRequired"]))
      const Select_Attached= new ElementInstance("SendByEmail", new ElementSchema('CHECKBOX', { label: 'Habilitar subir archivos'}), false)
      const nuevoDatoAdjunto: DatosAdjuntos = {
        Title_Attached: Title_Attached,
        Select_Attached: Select_Attached,
      };
      setDatosAdjuntos([ nuevoDatoAdjunto]);*/

  }, []);
  

  const addNewForm = () =>{
    const updatedOptions = formularios.map((forms) => ({
      value: forms.getCode()+" - "+forms.getTitle(),
      label: forms.getCode()+" - "+forms.getTitle(), 
    }));
    const Select_Form = new ElementInstance(forms.length.toString(), new ElementSchema('SELECT', { label: 'Seleccione un formulario', options: updatedOptions },["isRequired"]), "both")
    setForm(prevForms => [...prevForms, Select_Form]);
  }
  
  const deleteOldForm= (formToDelete: string) => {
    const updatedForms = oldForms.filter((form) => form !== formToDelete);
    setOldForms(updatedForms)
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

  const deleteOldAttached = (attachmentToDelete:string) => {
    const updateAttachments = oldDatosAdjuntos.filter((attach) => attach !== attachmentToDelete);
    setOldDatosAdjuntos(updateAttachments)
  }

  const deleteAttached = (index:number) => {
    setDatosAdjuntos(prevDatosAdjuntos => prevDatosAdjuntos.filter((_, i) => i !== index));
  }

  const updateProcedure = async () =>{

    const titleAttachedValues: string[] = [];
    const listaFormularios: string[] = [];

    if (oldForms.length !=0){
        oldForms.forEach((dato) => {
            listaFormularios.push(dato);
          });
    }
    if (oldDatosAdjuntos.length !=0 ){
        oldDatosAdjuntos.forEach((dato) => {
            titleAttachedValues.push(dato);
          });
    }
    if (forms.length != 0) {
      
      forms.forEach((dato) => {
        listaFormularios.push(dato.getValue().split(" - ")[0]);
      });
     }

     if(datosAdjuntos.length!=0){
        datosAdjuntos.forEach((dato) => {
            titleAttachedValues.push(dato.Title_Attached.getValue());
          });
     } 

     
      const jsonObject: any = {};
      jsonObject.Title_Attached = titleAttachedValues;
      const newProcedureToBeSend = new ProcedureInstance(
        listaFormularios,
        Fields.Select_Procedure.getValue(),
        "Descripción",
        estadoProcedure,
        Fields.Select_Theme.getValue(),
        titleAttachedValues,
        procedure.getId()
      );
      const response = await UpdateOneProcedure(newProcedureToBeSend.getJSON(), setFormState, "hola");
      if (response) {
        console.log("SE ENVIÓ");
        setFilteredForms([]);
      } else {
        console.log("NO SE ENVIÓ" + response);
        setFilteredForms([]);

      }
    
  }

  const initialValues = Object.entries(Fields).reduce((acc, [key, obj]) => ({ ...acc, [key]: obj.value }), {});

  return(<>
    <LayoutActorSection style={{margin:"10px 0px 10px 0px"}}>
      <h1><MdOutlineNewLabel />Datos generales del Trámite</h1>
      <h2>Título del trámite: {procedure.getTitle()} </h2>
      <h2>Temática del trámite: {procedure.getTheme()} </h2>
    </LayoutActorSection>

    <LayoutActorSection style={{margin:"10px 0px 10px 0px"}}>
        <h1><MdOutlineDataset />Cuerpo del trámite</h1>
        En esta sección armamos los elementos del trámite online, para que el ciudadano complete e inicie el trámite.
        
        <h1><MdAssignment /> Formularios asociados al trámite</h1>

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

                {oldForms.length>0 && oldForms.map((form, index) => (
                  <LayoutSection style={{margin:"0px 0px 10px 0px"}}>
                  <p>Formulario cargado con anterioridad</p> 
                  <div key={index} style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0px 0px 10px 0px" }}>  
                  <h2 >{form}</h2> 
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <Button style={{ width: '150px', height: '40px', marginRight: '10px' }} onClick={() => deleteOldForm(form)}>Borrar<HiTrash fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} /></Button>
                  </div>
                </div>
                </LayoutSection>
                ))}
                
                {forms.length > 0 ? (
                    forms.map((form, index) => (
                        <div key={index} style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0px 0px 10px 0px" }}>
                        <LayoutSection style={{ margin: "0px 0px 10px 0px" }}>
                            <p>Anexar nuevo formulario</p>
                            <div style={{ display: "flex", flexDirection: "column", width: "100%", margin: "10px 0px 10px 0px" }}>
                            <Element instance={form} className="flex-1" />
                            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                                <Button style={{ width: "150px", height: "40px", marginRight: "10px" }} onClick={() => deleteForm(form)}>
                                Borrar
                                <HiTrash fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} />
                                </Button>
                            </div>
                            </div>
                        </LayoutSection>
                        {index === forms.length - 1 && (
                            <Button style={{ width: "200px", height: "40px", margin: "20px 0px 20px 0px"  }} onClick={() => addNewForm()}>
                            Agregar Formulario
                            <FaPlus fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} />
                            </Button>
                        )}
                        </div>
                    ))
                    ) : (
                        <Button style={{ width: "200px", height: "40px", margin: "20px 0px 20px 0px"  }} onClick={() => addNewForm()}>
                        Agregar Formulario
                        <FaPlus fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} />
                        </Button>
                    )}

                <p></p>
                <LayoutStackedPanel className="mt-3">
                  <h1><MdDrafts /> Habilitar adjuntar archivos</h1>
                </LayoutStackedPanel>
                {oldDatosAdjuntos.length>0 && oldDatosAdjuntos.map((form, index) => (
                  <LayoutSection style={{margin:"0px 0px 10px 0px"}}>
                   <p>Dato a adjuntar cargado con anterioridad</p> 
                  <div key={index} style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0px 0px 20px 0px" }}>  
                  <h2 >{form}</h2> 
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <Button style={{ width: '150px', height: '40px', marginRight: '10px' }} onClick={() => deleteOldAttached(form)}>Borrar<HiTrash fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} /></Button>
                  </div>
                </div>
                </LayoutSection>
                ))}
                {datosAdjuntos.length > 0 ? (
                datosAdjuntos.map((attach, index) => (
                    <div key={index} style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0px 0px 10px 0px" }}>
                    <LayoutSection style={{ margin: "0px 0px 10px 0px" }}>
                    <p>Nuevo dato a adjuntar</p>

                    <div key={index} style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0px 0px 20px 0px" }}>
                        <Element instance={attach.Title_Attached} className="flex-2" />
                        <Element instance={attach.Select_Attached} className="flex-1" />
                        <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                        {index === datosAdjuntos.length - 1 && (
                            <Button style={{ width: "150px", height: "40px", marginRight: "10px" }} onClick={() => deleteAttached(index)}>
                            Borrar
                            <HiTrash fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} />
                            </Button>
                        )}
                        </div>
                    </div>
                    </LayoutSection>
                    {index === datosAdjuntos.length - 1 && (
                        <Button style={{ width: "200px", height: "40px", margin: "20px 0px 20px 0px" }} onClick={() => addNewAttached()}>
                        Agregar Adjuntos
                        <FaPlus fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} />
                    </Button>
                    )}
                    </div>
                ))
                ) : (
                    <div  style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0px 0px 10px 0px" }}>

                <Button style={{ width: "200px", height: "40px", margin: "20px 0px 20px 0px"  }} onClick={() => addNewAttached()}>
                    Agregar Adjuntos
                    <FaPlus fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} />
                </Button>
                </div>
                )}

                <p></p>
                <div style={{display:"flex", flexDirection:"column", margin:"15px 0px 15px 0px"}}>
                  <h1><MdMore /> Estado</h1>
                  <SelectWrapper >
                    <select value={estadoProcedure} 
                      onInput={(e) => setEstadoProcedure((e.target as HTMLInputElement).value)} 
                      >
                      <option value="Borrador">Borrador</option>
                      <option value="Publicado">Publicado</option>
                    </select>
                    </SelectWrapper >

                  </div>
                <LayoutStackedPanel className="mt-3">
                  <LayoutSpacer/>
                  <FormikButton color="secondary">Cancelar<MdOutlineCancel/></FormikButton>
                  <FormikButton onClick={ ()=> updateProcedure()} >Finalizar<AiOutlineSave/></FormikButton>
                </LayoutStackedPanel>
            </Form>
        </Formik>
        
    </LayoutActorSection>
  </>);
}