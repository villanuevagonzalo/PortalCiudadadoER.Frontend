import { useMemo } from "react";
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

export const DA_Procedures_Config = () => {

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

  return(<>
    <LayoutActorSection>
      <p> Configurador de trámites</p>
      En esta sección buscamos el trámite y relacionamos los formularios y adjuntos que el ciudadano 
      deberá completar para iniciar su trámite on line.
      <LayoutStackedPanel>
      <LayoutSpacer/>
      <FormikButton color="secondary">Actualizar<RxUpdate/></FormikButton>
        <FormikButton>Nuevo<AiOutlinePlus/></FormikButton>
      </LayoutStackedPanel>
      <LayoutStackedPanel>
        Buscar:
        <FormWrapperInput>
        <div>
          <input type="text"/>
          <div className="FormIcon"></div>
        </div>
      </FormWrapperInput>
      </LayoutStackedPanel>
      <Table columns={mcolumns} data={mdata} />
    </LayoutActorSection>
  </>);
}