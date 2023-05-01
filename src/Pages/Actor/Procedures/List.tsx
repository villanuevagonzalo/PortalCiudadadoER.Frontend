import { useMemo } from "react";
import { Table } from "../../../Components/Elements/Table";
import { LayoutSection } from "../../../Components/Layout/StyledComponents";

import { ColumnDef } from '@tanstack/react-table';

type Item = {
  title: string;
  description: string;
}

const data = [
  {title: 'Discapacidad', description: 'Certificado único de discapacidad CUD'},
  {title: 'Trabajo', description: 'Requisitos para contrataciones de artistas'},
  {title: 'Vivienda', description: 'Solicitud certificado de vivienda de interés social'},
  {title: 'Medio Ambiente', description: 'Solicitud de quema controlada'},
]



//console.log(BaseFields.TEXT.validations)

export const DA_Procedures_List = () => {

  const mcolumns = useMemo<ColumnDef<Item>[]>(()=>[
    {
      header: 'Name',
      accessorKey: 'title',
    },
    {
      header: 'Price',
      accessorKey: 'description',
    }
  ],[]);
  const mdata = useMemo(()=>data,[])

  return(<>
    <LayoutSection>
      Lista de tramites creados
      <Table columns={mcolumns} data={mdata} />
    </LayoutSection>
  </>);
}