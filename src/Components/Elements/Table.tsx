import { RiHome4Fill, RiSeedlingFill, RiToolsFill, RiWheelchairFill } from "react-icons/ri";
import { CapitalizeWords } from "../../Utils/General";
import { LayoutGridItem } from "../Layout/StyledComponents";
import { useMemo } from "react";
 import { getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';

 import type { ColumnDef } from '@tanstack/react-table';
import { TableWrapper } from "./StyledComponents";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
 }

 export const Table = <T extends object>({ data, columns }: ReactTableProps<T>) => {
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
 
  return (<TableWrapper>
    <thead>{table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <th key={header.id}>
            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        ))}
      </tr>
    ))}</thead>
    <tbody>{table.getRowModel().rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}</tbody>
  </TableWrapper>)
}
