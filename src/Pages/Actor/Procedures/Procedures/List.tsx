import { useContext, useEffect, useMemo, useState } from "react";
import { Table } from "../../../../Components/Elements/Table";
import { LayoutSection } from "../../../../Components/Layout/StyledComponents";

import { ColumnDef } from '@tanstack/react-table';
import { ProcedureContext } from "../../../../Contexts/ProcedureContext";
import { TableWrapper } from "../../../../Components/Elements/StyledComponents";
import { ProcedureInstance } from "../../../../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../../../../Modules/FormElements/Types";
import { HiArrowDown, HiDocumentDuplicate, HiOutlineMagnifyingGlass, HiOutlinePencil } from "react-icons/hi2";
import { BiTrash } from "react-icons/bi";
import { Button } from "../../../../Components/Forms/Button";
import { BackOfficesProcedureElement } from "../../../../Modules/Actor/ProcedureElement";


export const DA_Procedures_List = () => {

  const { UpdateProcedures, gotAllActorProcedures, SaveProcedure, setProcedures, procedures } = useContext(ProcedureContext);
  const [procedureToCheck, setProcedureToCheck] = useState<ProcedureInstance<ElementSchemaTypes>>()
  const [procedureToDelete, setProcedureToDelete] = useState<ProcedureInstance<ElementSchemaTypes>>()
  const [seeOptions, setSeeOptions] = useState("home")
  const [deleteProcedure, setDeleteProcedure] = useState(false)
  const [copy, setCopy] = useState(false)

  useEffect(()=>{

    if(procedures.length==0){
      UpdateProcedures()
    }

  },[])

  const getMoreNews = () => {
    UpdateProcedures()
  }

  const renderElement = () => {

  if (seeOptions=="seeForm") {
    return (
      <>
        <BackOfficesProcedureElement procedure={procedureToCheck!}  />
        <Button onClick={() => setSeeOptions("home")}>Volver</Button>
      </>
    )
  }else{
    return(<>
      <LayoutSection>
        Lista de tramites creados
        <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
        < TableForms datos={procedures} setFormToCheck={setProcedureToCheck} setSeeOptions={setSeeOptions} setDeleteProcedure={setDeleteProcedure} setProcedureToDelete={setProcedureToDelete} setCopy={setCopy} />
        {gotAllActorProcedures ? null :  <Button style={{marginTop:"20px"}} onClick={() => getMoreNews()}>< HiArrowDown/>VER MÁS</Button>} 
        </div>
        
      </LayoutSection>
    </>);
  }
};

return (
  <div>
      {renderElement()}
  </div>
);
  
}



interface TableProps {
  datos: ProcedureInstance<ElementSchemaTypes>[];
  setFormToCheck:Function,
  setSeeOptions:Function,
  setDeleteProcedure:Function,
  setProcedureToDelete:Function,
  setCopy:Function
}

const TableForms: React.FC<TableProps> = ({ datos, setFormToCheck, setSeeOptions, setDeleteProcedure, setProcedureToDelete, setCopy }) => {
  

  return (
    <TableWrapper>
      <thead>
        <tr >
          <th>COD.F</th>
          <th>Título</th>
          <th>Estado</th>
          <th>Acciones</th>
          {/* Agrega más encabezados de columna según tus necesidades */}
        </tr>
      </thead>
      <tbody>
        {datos.map((item, index) => (
          <tr key={index}>
            <td style={{ verticalAlign: 'middle'}}>{item.getTitle()}</td>
            <td style={{ verticalAlign: 'middle'}}>{item.getState()}</td>
            <td style={{ verticalAlign: 'middle', width:"auto"}}> 
              <div style={{display:"flex", flexDirection:"row", width:"auto", margin:"5px 0px 15px 0px", justifyContent:"left"}}> 
                <div style={{ display: 'flex', width: 'auto', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', width: 'auto', marginRight:"8px" }}  onClick={() => { setSeeOptions("seeForm"); setFormToCheck(item); }}>
                  { item.getState() != "Borrador" ? <HiOutlineMagnifyingGlass/> : <></>}
                </div>
                <div style={{ display: 'flex', width: 'auto', marginRight:"8px" }} onClick={()=>{setSeeOptions("modify"); setFormToCheck(item)}}>
                  < HiOutlinePencil/>
                </div>
                <div style={{ display: 'flex', width: 'auto', marginRight:"8px" }} onClick={()=>{setCopy(true); setFormToCheck(item) ; window.scrollTo({ top: 0, behavior: 'smooth' });}}>
                  < HiDocumentDuplicate/>
                </div>
                <div style={{ display: 'flex', width: 'auto', marginRight:"0px" }} onClick={()=>{setProcedureToDelete(item);setDeleteProcedure(true) ; window.scrollTo({ top: 0, behavior: 'smooth' });} }>
                  <BiTrash />
                </div> 
                  </div>     
                </div> 
            </td>
            {/* Agrega más celdas según las propiedades del objeto */}
          </tr>
        ))}
      </tbody>
    </TableWrapper>

  );
};