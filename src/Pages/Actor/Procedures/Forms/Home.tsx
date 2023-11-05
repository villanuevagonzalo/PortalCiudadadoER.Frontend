import { Form, Formik } from "formik";
import { Spinner, TableWrapper } from "../../../../Components/Elements/StyledComponents";
import { FormikSearch } from "../../../../Components/Forms/FormikSearch";
import { LayoutActorSection, LayoutNote, LayoutSection, LayoutSpacer, LayoutStackedPanel, LayoutText } from "../../../../Components/Layout/StyledComponents";
import { useContext, useEffect, useMemo, useState } from "react";
import { IFormState } from "../../../../Interfaces/Data";
import { formGetInitialValues, formGetValidations } from "../../../../Interfaces/FormFields";
import { Button } from "../../../../Components/Forms/Button";

import { DefaultFormState } from '../../../../Data/DefaultValues';
import { Link, useNavigate } from "react-router-dom";
import { Pages } from "../../../../Routes/Pages";
import { Table } from "../../../../Components/Elements/Table";
import { ColumnDef } from "@tanstack/react-table";
import { FormContext } from "../../../../Contexts/FormContext";
import { ElementSchemaTypes } from "../../../../Modules/FormElements/Types";
import { FormInstance } from "../../../../Modules/FormElements/Class";
import { HiArrowDown, HiDocumentDuplicate, HiOutlineMagnifyingGlass, HiOutlinePencil } from "react-icons/hi2";
import { FormUpdate } from "./Update";
import { CopyFormPopUp, DeleteFormPopUp, FormCreateErrorPopUp } from "../../../../Components/Forms/PopUpCards";
import { BiArrowBack, BiTrash } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { BackOfficesFormElement } from "../../../../Modules/Actor/FormsElement";
import { showMessageForSeconds } from "../../../../Utils/General";


const FormRequiredFields = ["Tramites"];

export const DA_Procedures_Forms_Home = () => {

  const { SaveForm, GetFormByCode, GetElementsByCode, UpdateForms , setFormularios, formularios, totalFormUnitsInDB, isLoading, DeleteOneForm, totalFormUnitReaded, setTotalFormUnitReaded  } = useContext(FormContext);
  
  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));
  const [updateForm, setUpdateForm] = useState(false)
  const [seeOptions, setSeeOptions] = useState("home")
  const [formToCheck, setFormToCheck] = useState<FormInstance<ElementSchemaTypes>>()
  const [formToDelete, setFormToDelete] = useState<FormInstance<ElementSchemaTypes>>()
  const [searchForm, setSearchForm] = useState<string>()
  const [filteredForms, setFilteredForms] = useState<FormInstance<ElementSchemaTypes>[]>([]);

  const [deleteForm, setDeleteForm] = useState(false)
  const [copy, setCopy] = useState(false)
  const [newCode, setNewCode] = useState("")
  const [errorCarga, setErrorCarga] = useState(false)
  const [showMessage, setShowMessage] = useState(false);

  
  useEffect(()=>{
    
    if(formularios.length==0){
      UpdateForms()
    }
    
    const handlePopState = () => {
      setSeeOptions("home");
      setFormToCheck(undefined)
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };

  },[])

  const getMoreNews = () => {
    UpdateForms()
  }


  const handleDeleteForm = async (code:string)=> {
    const response = await DeleteOneForm(code,setFormState);
    if (response){
      setFormularios(prevFormularios => prevFormularios.filter(form => form !== formToDelete));
    }
    setDeleteForm(false)
  }

  const handleCopyForm = async (code:string)=> {
    if (code!=""){


      const formData = GetFormByCode (formToCheck?.getCode()!, setFormState)

      if (await formData){

        const formElements = GetElementsByCode (formToCheck?.getCode()!, setFormState)

        if (await formElements){

          formToCheck!.setCode(code)
          formToCheck!.setStatus("Borrador")
          
          const response = await SaveForm(formToCheck!, setFormState, code, formToCheck?.getTitle()!);
          if (response){
            setFormToCheck(undefined)
            setCopy(false)
            setNewCode("")
            UpdateForms()
          }else{
            setErrorCarga(true)
          }
        }

      }

      
    }
  }

  useEffect(()=>{
    if (searchForm !== undefined &&  searchForm != '') {
      const cleanedSearchForm = searchForm.replace(/\s+\((título|keyword|COD.F)\)$/, '');
      const filtered = formularios.filter(form => form.getTitle() == cleanedSearchForm);
      if (filtered.length>0){
        setFilteredForms(filtered);
      }else{
        const filtered = formularios.filter(form => form.getKeywords() == cleanedSearchForm);
        if (filtered.length>0){
          setFilteredForms(filtered);
        }else{
          const filtered = formularios.filter(form => form.getCode() == cleanedSearchForm);
          if (filtered.length>0){
            setFilteredForms(filtered);  
          }else{
            setFilteredForms(formularios)
          }
        }
      }
    } else {
      setFilteredForms(formularios)
    }
  },[searchForm])
 
  useEffect(()=>{
    setFilteredForms(formularios)
  },[formularios])

  const DataTitle = useMemo(() => formularios.map((item:any) => item.title + " (título)"), [formularios]);
  const DataKeywords = useMemo(() => {
    return formularios.flatMap((item:any) => {
      const keywordsArray = item.keywords.split(" ");
      return keywordsArray.map((keyword:string) => keyword + " (keyword)");
    });
  }, [formularios]);
  const DataCode = useMemo(() => formularios.map((item:any) => item.code + " (COD.F)"), [formularios]);
  
  const ResultArray = useMemo(() => DataTitle.concat(DataKeywords, DataCode), [DataTitle, DataKeywords, DataCode]);


  const renderElement = () => {
    if (seeOptions=="seeForm") {
      return (
        <>
          <BackOfficesFormElement form={formToCheck!}  />
          <Button onClick={() => {setSeeOptions("home")}}><BiArrowBack/>Volver</Button>
        </>
      )
    } else if (seeOptions=="modify") {
      return <div>
          <FormUpdate formToUpdate= {formToCheck!} setVolver={setSeeOptions} />
          {/*<Button onClick={() => setSeeOptions("home")}><BiArrowBack/>Volver</Button>*/}
        </div>;
    }else {
      return(<>
        {deleteForm && (<DeleteFormPopUp formToDelete={formToDelete!} handleDeleteForm={handleDeleteForm} close={setDeleteForm}  /> )}
        {copy&&(<CopyFormPopUp formToCopy={formToCheck!} handleCopyForm={handleCopyForm} close={setCopy} /> )}
        {errorCarga && (<FormCreateErrorPopUp formTitle={""} close={setErrorCarga} />)}
        <LayoutActorSection>
        <h1> Configurador de formularios</h1>
        <hr/>
          En esta sección generamos, modificamos y damos de baja los formularios que serán utilizados en los trámites  
          <LayoutStackedPanel style={{marginTop:"15px"}}>
          <LayoutSpacer/>
            <div>
              <Formik enableReinitialize={true} validateOnChange={false} validateOnBlur={false}
                  initialValues={FieldValues}
                  validationSchema={formGetValidations(FormRequiredFields)}
                  onSubmit={async (values: any) => {console.log("valores: "+values) }} >
                  <Form autoComplete="off">
                      <FormikSearch name="Tramites" label={"Filtra los formularios"} data={ResultArray} setValue={setSearchForm} autoFocus/>
                  </Form>
              </Formik></div>
            {/* Botones para crear o actualizar formularios */}
            <div style={{display:"flex", flexDirection:"row"}}>
              <Button disabled={FormState.loading} color="secondary" style={{ width: '150px', height: '40px', marginRight: '10px' }} onClick= {() =>UpdateForms()} >
                {FormState.loading ? <Spinner /> : "Actualizar"}<RxUpdate/>
              </Button>
              <Link to={Pages.DA_PROCEDURES_FORMS_NEW} style={{ textDecoration: 'none' }}>
                <Button style={{ width: '150px', height: '40px' }}>Nuevo<AiOutlinePlus/></Button>
              </Link>
            </div>
          </LayoutStackedPanel>
          
        {/*  <Table columns={mcolumns} data={mdata} />*/}
        {isLoading?<>
        <br/>
        <Spinner color='secondary' size="3rem"/><br/>
        <LayoutText className='text-center'>Cargando Información.<br/>Por favor aguarde.</LayoutText>
      </>:
          <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
            < TableForms datos={filteredForms} setFormToCheck={setFormToCheck} setSeeOptions={setSeeOptions} setDeleteForm={setDeleteForm} setFormToDelete={setFormToDelete} setCopy={setCopy} />
            {(totalFormUnitsInDB > formularios.length) ?  <Button style={{marginTop:"20px"}} onClick={() => getMoreNews()}>< HiArrowDown/>VER MÁS</Button> : null } 
            {(showMessage &&!totalFormUnitReaded) && (<div><LayoutNote>No hay más formularios cargados</LayoutNote></div>)}
          </div>
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
};
  



interface TableProps {
  datos: FormInstance<ElementSchemaTypes>[];
  setFormToCheck:Function,
  setSeeOptions:Function,
  setDeleteForm:Function,
  setFormToDelete:Function,
  setCopy:Function
}

const TableForms: React.FC<TableProps> = ({ datos, setFormToCheck, setSeeOptions, setDeleteForm, setFormToDelete, setCopy }) => {
  
  const navigate = useNavigate();

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
            <td style={{ verticalAlign: 'middle'}}>{item.getCode()}</td>
            <td style={{ verticalAlign: 'middle'}}>{item.getTitle()}</td>
            <td style={{ verticalAlign: 'middle'}}>{item.getStatus()}</td>
            <td style={{ verticalAlign: 'middle', width:"auto"}}> 
              <div style={{display:"flex", flexDirection:"row", width:"auto", margin:"5px 0px 15px 0px", justifyContent:"left"}}> 
                <div style={{ display: 'flex', width: 'auto', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', width: 'auto', marginRight:"8px" }}  onClick={() => { setSeeOptions("seeForm"); setFormToCheck(item); navigate("/actor/procedures/forms");}}>
                  { item.getStatus() != "Borrador" ? <HiOutlineMagnifyingGlass/> : <></>}
                </div>
                <div style={{ display: 'flex', width: 'auto', marginRight:"8px" }} onClick={()=>{setSeeOptions("modify"); setFormToCheck(item);navigate("/actor/procedures/forms"); }}>
                  < HiOutlinePencil/>
                </div>
                <div style={{ display: 'flex', width: 'auto', marginRight:"8px" }} onClick={()=>{setCopy(true); setFormToCheck(item) ; window.scrollTo({ top: 0, behavior: 'smooth' });}}>
                  < HiDocumentDuplicate/>
                </div>
                <div style={{ display: 'flex', width: 'auto', marginRight:"0px" }} onClick={()=>{setFormToDelete(item);setDeleteForm(true) ; window.scrollTo({ top: 0, behavior: 'smooth' });} }>
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