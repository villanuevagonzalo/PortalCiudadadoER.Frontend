import { Form, Formik } from "formik";
import { Spinner, TableWrapper } from "../../../../Components/Elements/StyledComponents";
import { FormikSearch } from "../../../../Components/Forms/FormikSearch";
import { LayoutSection, LayoutSpacer, LayoutStackedPanel, LayoutText } from "../../../../Components/Layout/StyledComponents";
import { useContext, useEffect, useMemo, useState } from "react";
import { IFormState } from "../../../../Interfaces/Data";
import { formGetInitialValues, formGetValidations } from "../../../../Interfaces/FormFields";
import { Button } from "../../../../Components/Forms/Button";

import { DefaultFormState } from '../../../../Data/DefaultValues';
import { Link } from "react-router-dom";
import { Pages } from "../../../../Routes/Pages";
import { Table } from "../../../../Components/Elements/Table";
import { ColumnDef } from "@tanstack/react-table";
import { FormContext } from "../../../../Contexts/FormContext";
import { ElementSchemaTypes } from "../../../../Modules/FormElements/Types";
import { FormInstance } from "../../../../Modules/FormElements/Class";
import { HiOutlineMagnifyingGlass, HiOutlinePencil } from "react-icons/hi2";
import { FormElementShow } from "../../../../Modules/FormElements/Components/FormsElement";
import { FormUpdate } from "./Update";
import { DeleteFormPopUp } from "../../../../Components/Forms/PopUpCards";
import { BiTrash } from "react-icons/bi";


const FormRequiredFields = ["Tramites"];

export const DA_Procedures_Forms_Home = () => {
/*
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
  const mdata = useMemo(()=>data,[])*/


  const { UpdateForms , setFormularios, formularios, isLoading, DeleteOneForm} = useContext(FormContext);
  
  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));
  const [updateForm, setUpdateForm] = useState(false)
  const [seeOptions, setSeeOptions] = useState("home")
  const [formToCheck, setFormToCheck] = useState<FormInstance<ElementSchemaTypes>>()
  const [formToDelete, setFormToDelete] = useState<FormInstance<ElementSchemaTypes>>()
  const [deleteForm, setDeleteForm] = useState(false)

  useEffect(()=>{
    UpdateForms()
  },[])

  const handleDeleteForm = async (code:string)=> {

    const response = await DeleteOneForm(code,setFormState);
    if (response){
      setFormularios(prevFormularios => prevFormularios.filter(form => form !== formToDelete));
    }
    setDeleteForm(false)

  }

 

  const DataName = formularios.map((item:any)=>item.title)
  
  const renderElement = () => {
    if (seeOptions=="seeForm") {
      return (
        <>
          <FormElementShow form={formToCheck!}  />
          <Button onClick={() => setSeeOptions("home")}>Volver</Button>
        </>
      )
    } else if (seeOptions=="modify") {
      return <div>
          <FormUpdate formToUpdate= {formToCheck!} />
          <Button onClick={() => setSeeOptions("home")}>Volver</Button>

        </div>;
    } else {
      return(<>
        {deleteForm && (<DeleteFormPopUp formToDelete={formToDelete!} handleDeleteForm={handleDeleteForm} close={setDeleteForm}  /> )}

        <LayoutSection>
          <LayoutStackedPanel>
            <div>
              <Formik enableReinitialize={true} validateOnChange={false} validateOnBlur={false}
                  initialValues={FieldValues}
                  validationSchema={formGetValidations(FormRequiredFields)}
                  onSubmit={async (values: any) => { }} >
                  <Form autoComplete="off">
                      <FormikSearch name="Tramites" data={DataName} autoFocus/>
                  </Form>
              </Formik></div>
            <LayoutSpacer/>
            
            {/* Botones para crear o actualizar formularios */}
            <div style={{display:"flex", flexDirection:"row"}}>
              <Button disabled={FormState.loading} color="secondary" style={{ width: '150px', height: '40px', marginRight: '10px' }} onClick= {() =>UpdateForms()} >
                {FormState.loading ? <Spinner /> : "Actualizar"}
              </Button>
              <Link to={Pages.DA_PROCEDURES_FORMS_NEW} style={{ textDecoration: 'none' }}>
                <Button style={{ width: '150px', height: '40px' }}>Nuevo</Button>
              </Link>
            </div>
    
          </LayoutStackedPanel>
          
        {/*  <Table columns={mcolumns} data={mdata} />*/}
        {isLoading?<>
        <br/>
        <Spinner color='secondary' size="3rem"/><br/>
        <LayoutText className='text-center'>Cargando Información.<br/>Por favor aguarde.</LayoutText>
      </>:< TableForms datos={formularios} setFormToCheck={setFormToCheck} setSeeOptions={setSeeOptions} setDeleteForm={setDeleteForm} setFormToDelete={setFormToDelete} />
      }
        </LayoutSection>
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
  setFormToDelete:Function
}

const TableForms: React.FC<TableProps> = ({ datos, setFormToCheck, setSeeOptions, setDeleteForm, setFormToDelete }) => {
  

  return (

    <TableWrapper>
    <table style={{ marginTop:"15px", width:"100%" }}>
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
                  
                <div style={{ display: 'flex', width: 'auto', marginRight:"8px" }}  onClick={() => { setSeeOptions("seeForm"); setFormToCheck(item); }}>
                  { item.getStatus() != "asd22f" ? <HiOutlineMagnifyingGlass/> : <></>}
                </div>
                  
                <div style={{ display: 'flex', width: 'auto', marginRight:"8px" }} onClick={()=>{setSeeOptions("modify"); setFormToCheck(item)}}>
                  < HiOutlinePencil/>
                </div>
                <div style={{ display: 'flex', width: 'auto', marginRight:"0px" }} onClick={()=>{setFormToDelete(item);setDeleteForm(true)} }>
                  <BiTrash />
                </div> 
                  </div>     
                </div> 
             
            </td>

            {/* Agrega más celdas según las propiedades del objeto */}
          </tr>
        ))}
      </tbody>
    </table>
    </TableWrapper>

  );
};