import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Table } from "../../../Components/Elements/Table";
import { LayoutActorSection, LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../../../Components/Layout/StyledComponents";

import { ColumnDef } from '@tanstack/react-table';
import { FormikButton } from "../../../Components/Forms/FormikButton";
import { AiOutlineDelete, AiOutlinePlus, AiOutlineSave } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { FormikSearch } from "../../../Components/Forms/FormikSearch";
import { FormWrapperInput } from "../../../Components/Forms/StyledComponents";
import { TableFunctions } from "../../../Components/Elements/StyledComponents";
import { GrFormView } from "react-icons/gr";
import { ElementInstance, Element, ElementSchema, ElementSchemaTypes, ValidateForm } from "../../../Modules/FormElements";
import { Form, Formik } from "formik";
import { FormikFieldDummy } from "../../../Components/Forms/FormikFieldDummy";
import { FormikField } from "../../../Components/Forms/FormikField";
import { FormikCheckbox } from "../../../Components/Forms/FormikCheckbox";
import { MdOutlineCancel } from "react-icons/md";
import { ProcedureContext } from "../../../Contexts/ProcedureContext";
import { FormContext } from "../../../Contexts/FormContext";
import { Button } from "../../../Components/Forms/Button";
import { FaPlus } from "react-icons/fa";
import { HiTrash } from "react-icons/hi2";

type Item = {
  title: string;
  description: string;
}

const data = [
  {title: 'Nombre del tramite', description: 'ACTIVO'},
  {title: 'Nombre del tramite', description: 'ACTIVO'},
  {title: 'Nombre del tramite', description: 'ACTIVO'},
  {title: 'Nombre del tramite', description: 'BORRADOR?'},
]



//console.log(BaseFields.TEXT.validations)

export const DA_Procedures_Associate = () => {
    const ref:any = useRef(null);

  const mcolumns = useMemo<ColumnDef<Item>[]>(()=>[
    {
      header: 'Título',
      accessorKey: 'title',
    },
    {
      header: 'Estado',
      accessorKey: 'description',
    },
    {
        header: 'Acciones',
        accessorKey: 'functions',
        cell: ({ cell }) => {
            // const NN = cell.row.original.ALL;
            //console.log(cell.row.original);
            return <TableFunctions>
              <GrFormView/>
              <AiOutlineDelete/>
            </TableFunctions>
          }
    },
  ],[]);
  const mdata = useMemo(()=>data,[])


  const { UpdateProcedures, SaveProcedure, setProcedures, procedures } = useContext(ProcedureContext);
  const { SaveForm, UpdateForms , setFormularios, formularios, isLoading, DeleteOneForm} = useContext(FormContext);

  const [forms, setForm] = useState <ElementInstance<ElementSchemaTypes>[]>([])

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

  useEffect(()=>{
    UpdateProcedures()
    UpdateForms()
  },[])

  useEffect(()=>{
    const updatedOptions = formularios.map((forms) => ({
      value: forms.getCode()+" - "+forms.getTitle(),
      label: forms.getCode()+" - "+forms.getTitle(), 
    }));
    const Select_Form = new ElementInstance("0", new ElementSchema('SELECT', { label: 'Seleccione un formulario', options: updatedOptions },["isRequired"]), "both")
    //setForm (Select_Procedure);
    setForm(prevForms => [ Select_Form]);

  },[formularios])

  const addNewForm = () =>{
    const updatedOptions = formularios.map((forms) => ({
      value: forms.getCode()+" - "+forms.getTitle(),
      label: forms.getCode()+" - "+forms.getTitle(), 
    }));
    const Select_Form = new ElementInstance(forms.length.toString(), new ElementSchema('SELECT', { label: 'Seleccione un formulario', options: updatedOptions },["isRequired"]), "both")
    setForm(prevForms => [...prevForms, Select_Form]);
  }
  const deleteForm = (formToDelete: ElementInstance<ElementSchemaTypes>) => {
    const updatedForms = forms.filter((form) => form !== formToDelete);
    setForm(updatedForms);
  }


  const initialValues = Object.entries(Fields).reduce((acc, [key, obj]) => ({ ...acc, [key]: obj.value }), {});

  return(<>
    <LayoutActorSection>
      <p>Asociar elementeos al trámite</p>
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
                  <Element instance={Fields.Select_Procedure} className="flex-1"/>
                </LayoutStackedPanel>  
            </Form>
        </Formik>
    </LayoutActorSection>
    <LayoutActorSection>
      En esta sección armamos los elementos del trámite online, para que el ciudadano complete e inicie el trámite.
      <FormikFieldDummy name="Título" value="Título de trámite seleccionado"className="flex-1"/>
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
                    <Element instance={Fields.Select_Theme} className="flex-1"/>
                </LayoutStackedPanel>
            </Form>
        </Formik>

        <h1>Asociar con el/los formularios que sean requerido para este trámite</h1>

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
                  <div key={form.name} style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0px 0px 20px 0px" }}>  
                  <Element instance={form} className="flex-1" />
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <Button style={{ width: '150px', height: '40px', marginRight: '10px' }} onClick={() => addNewForm()}>Agregar<FaPlus fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} /></Button>
                    {index !== 0 && (
                      <Button style={{ width: '150px', height: '40px', marginRight: '10px' }} onClick={() => deleteForm(form)}>Borrar<HiTrash fontSize={"1rem"} style={{ margin: "0px 10px 0px 0px" }} /></Button>
                    )}
                  </div>
                </div>
                ))}
                <p></p>
                <LayoutStackedPanel className="mt-3">
                  <h1>Habilitar adjuntar archivos</h1>
                </LayoutStackedPanel>
                <LayoutStackedPanel className="mt-2" >
                  <FormikField name="Title" className="flex-3"/>
                  <FormikCheckbox name="UploadFiles" />
                </LayoutStackedPanel>
                <LayoutStackedPanel className="mt-2" >
                  <FormikField name="Title" className="flex-3"/>
                  <FormikCheckbox name="UploadFiles" />
                </LayoutStackedPanel>
                <LayoutStackedPanel className="mt-2" >
                  <FormikField name="Title" className="flex-3"/>
                  <FormikCheckbox name="UploadFiles" />
                </LayoutStackedPanel>
                <p></p>
                <LayoutStackedPanel>
                  <LayoutSpacer/>
                  <FormikButton color="secondary">Cancelar<MdOutlineCancel/></FormikButton>
                  <FormikButton>Finalizar<AiOutlineSave/></FormikButton>
                </LayoutStackedPanel>
            </Form>
        </Formik>
        
    </LayoutActorSection>
  </>);
}