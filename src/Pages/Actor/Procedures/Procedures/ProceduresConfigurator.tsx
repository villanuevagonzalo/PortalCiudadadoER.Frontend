import { useContext, useEffect, useMemo, useState } from "react";
import { Table } from "../../../../Components/Elements/Table";
import { LayoutActorSection, LayoutSection, LayoutSpacer, LayoutStackedPanel, LayoutText, RoundedButton } from "../../../../Components/Layout/StyledComponents";

import { ColumnDef } from '@tanstack/react-table';
import { FormikButton } from "../../../../Components/Forms/FormikButton";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { FormikSearch } from "../../../../Components/Forms/FormikSearch";
import { FormWrapperInput } from "../../../../Components/Forms/StyledComponents";
import { Spinner, TableFunctions } from "../../../../Components/Elements/StyledComponents";
import { GrFormView } from "react-icons/gr";
import { Pages } from "../../../../Routes/Pages";
import { ProcedureContext } from "../../../../Contexts/ProcedureContext";
import { TableWrapper } from "../../../../Components/Elements/StyledComponents";
import { ProcedureInstance } from "../../../../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../../../../Modules/FormElements/Types";
import { HiDocumentDuplicate, HiOutlineMagnifyingGlass, HiOutlinePencil } from "react-icons/hi2";
import { BiArrowBack, BiTrash } from "react-icons/bi";
import { Button } from "../../../../Components/Forms/Button";
import { FormContext } from "../../../../Contexts/FormContext";
import { UpdateProcedure } from "./UpdateProcedures";
import { DeleteProcedurePopUp } from "../../../../Components/Forms/PopUpCards";
import { IFormState } from "../../../../Interfaces/Data";
import { DefaultFormState } from "../../../../Data/DefaultValues";
import { Form, Formik } from "formik";
import { formGetInitialValues, formGetValidations } from "../../../../Interfaces/FormFields";
import { BackOfficesProcedureElement } from "../../../../Modules/Actor/ProcedureElement";



const FormRequiredFields = ["Tramites"];

export const DA_Procedures_Config = () => {

  const { UpdateProcedures, DeleteOneProcedure, SaveProcedure, setProcedures, procedures , isLoadingProcedure} = useContext(ProcedureContext);
  const { UpdateForms} = useContext(FormContext);

  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);

  const [procedureToCheck, setProcedureToCheck] = useState<ProcedureInstance<ElementSchemaTypes>>()
  const [procedureToDelete, setProcedureToDelete] = useState<ProcedureInstance<ElementSchemaTypes>>()
  
  const [seeOptions, setSeeOptions] = useState("home")
  const [deleteProcedure, setDeleteProcedure] = useState(false)
  const [copy, setCopy] = useState(false)
  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));
  const [searchProcedure, setSearchProcedure] = useState<string>()
  const [filteredProcedure, setFilteredProcedure] = useState<ProcedureInstance<ElementSchemaTypes>[]>([]);

  useEffect(()=>{
    UpdateProcedures()
    UpdateForms()

    const handlePopState = () => {
      setSeeOptions("home");
      setProcedureToCheck(undefined)
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };

  },[])

  useEffect(()=>{
    if (searchProcedure !== undefined &&  searchProcedure != '') {
      const cleanedSearchProcedure = searchProcedure.replace(/\s+\((título|temática)\)$/, '');
      const filtered = procedures.filter(procedures => procedures.getTitle() === cleanedSearchProcedure);
        if (filtered.length>0){
          setFilteredProcedure(filtered);
        }else{
          const filtered = procedures.filter(procedures => procedures.getTheme() === cleanedSearchProcedure);
          if (filtered.length>0){
            setFilteredProcedure(filtered);
          }else{
            setFilteredProcedure(procedures)
          }
        } 
      } else {
        setFilteredProcedure(procedures)
      }
  },[searchProcedure])


  useEffect(()=>{
    setFilteredProcedure(procedures)
  },[procedures])

  const handleDeleteProcedure = async (id:number)=> {
    const response = await DeleteOneProcedure(id,setFormState);
    if (response){
      setProcedures(prevProcedures => prevProcedures.filter(procedure => procedure.getId() !== id));
    }
    setDeleteProcedure(false)
  }

  const DataTitle = useMemo(() => procedures.map((item:any) => item.title+" (título)"), [procedures]);
  const DataTheme = useMemo(() => procedures.map((item:any) => item.theme+" (temática)").flat(), [procedures]);
  const ResultArray = useMemo(() => DataTitle.concat(DataTheme), [DataTitle, DataTheme]);

  const renderElement = () => {

    if (seeOptions=="seeForm") {
      return (
        <>
          <BackOfficesProcedureElement procedure={procedureToCheck!}  />
          <Button onClick={() => setSeeOptions("home")}><BiArrowBack/>Volver a Configurador</Button>
        </>
      )
    }else if (seeOptions=="modify"){
      return (
        <>
          <UpdateProcedure procedure={procedureToCheck!}  />
          <Button onClick={() => setSeeOptions("home")}><BiArrowBack/>Volver a Configurador</Button>
        </>
      )
    }else{
      return(<>
      {deleteProcedure && (<DeleteProcedurePopUp procedureToDelete={procedureToDelete!} handleDeleteForm={handleDeleteProcedure} close={setDeleteProcedure}   /> )}
        <LayoutActorSection>
        <h1> Configurador de trámites</h1>
        <hr/>
          En esta sección buscamos el trámite y relacionamos los formularios y adjuntos que el ciudadano 
          deberá completar para iniciar su trámite on line.
          <LayoutStackedPanel style={{marginTop:"15px"}}>
          <LayoutSpacer/>
          <div>
              <Formik enableReinitialize={true} validateOnChange={false} validateOnBlur={false}
                  initialValues={FieldValues}
                  validationSchema={formGetValidations(FormRequiredFields)}
                  onSubmit={async (values: any) => {console.log("valores: "+values) }} >
                  <Form autoComplete="off">
                      <FormikSearch name="Tramites" label={"Filtra los trámites"} data={ResultArray} setValue={setSearchProcedure} autoFocus/>
                  </Form>
              </Formik></div>
            {/* Botones para crear o actualizar formularios */}
            <div style={{display:"flex", flexDirection:"row"}}>
                <Button  color="secondary" style={{ width: '150px', height: '40px', marginRight: '10px' }} onClick= {() =>UpdateProcedures()} >Actualizar<RxUpdate/></Button>
                <Link to={Pages.DA_PROCEDURES_CONFIG_ASSOCIATE} style={{ textDecoration: 'none' }}>
                  <Button style={{ width: '150px', height: '40px' }}>Nuevo<AiOutlinePlus/></Button>
                </Link>
            </div>
          </LayoutStackedPanel>
         
          <h4>Lista de tramites creados</h4>
          {isLoadingProcedure?<>
            <br/>
            <Spinner color='secondary' size="3rem"/><br/>
            <LayoutText className='text-center'>Cargando Información.<br/>Por favor aguarde.</LayoutText>
            </>:
            < TableForms datos={filteredProcedure} setFormToCheck={setProcedureToCheck} setSeeOptions={setSeeOptions} setDeleteProcedure={setDeleteProcedure} setProcedureToDelete={setProcedureToDelete} setCopy={setCopy} />
          }
        </LayoutActorSection>
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
  
  const navigate = useNavigate();

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
                <div style={{ display: 'flex', width: 'auto', marginRight:"8px" }}  onClick={() => { setSeeOptions("seeForm"); setFormToCheck(item); navigate("/actor/procedures/config/") }}>
                  { item.getState() != "Borrador" ? <HiOutlineMagnifyingGlass/> : <></>}
                </div>
                <div style={{ display: 'flex', width: 'auto', marginRight:"8px" }} onClick={()=>{setSeeOptions("modify"); setFormToCheck(item); navigate("/actor/procedures/config/") }}>
                  < HiOutlinePencil/>
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