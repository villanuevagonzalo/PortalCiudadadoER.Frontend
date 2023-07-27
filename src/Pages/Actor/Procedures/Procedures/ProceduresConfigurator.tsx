import { useContext, useEffect, useMemo, useState } from "react";
import { Table } from "../../../../Components/Elements/Table";
import { LayoutActorSection, LayoutSection, LayoutSpacer, LayoutStackedPanel, RoundedButton } from "../../../../Components/Layout/StyledComponents";

import { ColumnDef } from '@tanstack/react-table';
import { FormikButton } from "../../../../Components/Forms/FormikButton";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { FormikSearch } from "../../../../Components/Forms/FormikSearch";
import { FormWrapperInput } from "../../../../Components/Forms/StyledComponents";
import { TableFunctions } from "../../../../Components/Elements/StyledComponents";
import { GrFormView } from "react-icons/gr";
import { Pages } from "../../../../Routes/Pages";
import { ProcedureContext } from "../../../../Contexts/ProcedureContext";
import { TableWrapper } from "../../../../Components/Elements/StyledComponents";
import { ProcedureInstance } from "../../../../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../../../../Modules/FormElements/Types";
import { HiDocumentDuplicate, HiOutlineMagnifyingGlass, HiOutlinePencil } from "react-icons/hi2";
import { BiTrash } from "react-icons/bi";
import { ProcedureElementShow } from "../../../../Modules/FormElements/Components/ProcedureElementShow";
import { Button } from "../../../../Components/Forms/Button";



//console.log(BaseFields.TEXT.validations)

export const DA_Procedures_Config = () => {

  const { UpdateProcedures, SaveProcedure, setProcedures, procedures } = useContext(ProcedureContext);
  const [procedureToCheck, setProcedureToCheck] = useState<ProcedureInstance<ElementSchemaTypes>>()
  const [procedureToDelete, setProcedureToDelete] = useState<ProcedureInstance<ElementSchemaTypes>>()
  const [seeOptions, setSeeOptions] = useState("home")
  const [deleteProcedure, setDeleteProcedure] = useState(false)
  const [copy, setCopy] = useState(false)

  useEffect(()=>{
    UpdateProcedures()
  },[])


/*
  return(<>
    <LayoutActorSection>
      <p> Configurador de trámites</p>
      En esta sección buscamos el trámite y relacionamos los formularios y adjuntos que el ciudadano 
      deberá completar para iniciar su trámite on line.
      <LayoutStackedPanel>
      <LayoutSpacer/>
      <FormikButton color="secondary">Actualizar<RxUpdate/></FormikButton>
      <Link to={Pages.DA_PROCEDURES_CONFIG_ASSOCIATE}>
        <FormikButton>Nuevo<AiOutlinePlus/></FormikButton>
      </Link>
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
  </>);*/


  const renderElement = () => {

    if (seeOptions=="seeForm") {
      return (
        <>
          <ProcedureElementShow procedure={procedureToCheck!}  />
          <Button onClick={() => setSeeOptions("home")}>Volver a Configurador</Button>
        </>
      )
    }else{
      return(<>
        <LayoutSection>
          Lista de tramites creados
          < TableForms datos={procedures} setFormToCheck={setProcedureToCheck} setSeeOptions={setSeeOptions} setDeleteProcedure={setDeleteProcedure} setProcedureToDelete={setProcedureToDelete} setCopy={setCopy} />
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