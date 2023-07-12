import { useMemo, useRef } from "react";
import { Table } from "../../../Components/Elements/Table";
import { LayoutActorSection, LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../../../Components/Layout/StyledComponents";

import { ColumnDef } from '@tanstack/react-table';
import { FormikButton } from "../../../Components/Forms/FormikButton";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { FormikSearch } from "../../../Components/Forms/FormikSearch";
import { FormWrapperInput } from "../../../Components/Forms/StyledComponents";
import { TableFunctions } from "../../../Components/Elements/StyledComponents";
import { GrFormView } from "react-icons/gr";
import { ElementInstance, Element, ElementSchema, ElementSchemaTypes, ValidateForm } from "../../../Modules/FormElements";
import { Form, Formik } from "formik";

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

  const Fields: {[key: string]: ElementInstance<ElementSchemaTypes>} = {
    Select_Procedure: new ElementInstance("Select_Procedure",new ElementSchema('SELECT',{label:'Seleccione un trámite',options:[{
      value: "NombreTramite1",
      label: 'Nombre del tramite 1'
    },{
      value: "NombreTramite2",
      label: 'Nombre del tramite 2'
    },{
      value: "NombreTramite3",
      label: 'Nombre del tramite 3'
    }]},["isRequired"]), "both"),
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
  </>);
}