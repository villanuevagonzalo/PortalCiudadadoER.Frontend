import { Form, Formik } from "formik";
import { Spinner } from "../../../../Components/Elements/StyledComponents";
import { FormikSearch } from "../../../../Components/Forms/FormikSearch";
import { LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../../../../Components/Layout/StyledComponents";
import { useMemo, useState } from "react";
import { IFormState } from "../../../../Interfaces/Data";
import { formGetInitialValues, formGetValidations } from "../../../../Interfaces/FormFields";
import { Button } from "../../../../Components/Forms/Button";

import { DefaultFormState } from '../../../../Data/DefaultValues';
import { Link } from "react-router-dom";
import { Pages } from "../../../../Routes/Pages";
import { Table } from "../../../../Components/Elements/Table";
import { ColumnDef } from "@tanstack/react-table";

type Item = {
  title: string;
  description: string;
 }

const data = [
  {title: 'Solicitud Certificado de Pre-Identificación', description:'El certificado de Pre-Identificación (CPI) es un instrumento con el que podrán contar las personas actualmente indocumentadas para acceder a derechos básicos mientras el trámite de inscripción tardía de nacimiento ante el Registro Civil (ya sea por vía administrativa o por vía judicial), y posteriormente el trámite para obtener el DNI (Documento Nacional de Identidad). La tramitación del CPI no inicia el trámite de inscripción tardía de nacimiento. ...'},
  {title: 'Reemplazo de Libreta Cívica o Libreta de Enrolamiento por nuevo DNI Tarjeta', description:'Es el trámite que te permite reemplazar la Libreta de Enrolamiento o Libreta Cívica por el nuevo DNI Digital en formato tarjeta (Documento Nacional de Identidad). este nuevo DNI Digital conserva el mismo número que tu libreta anterior. ...'},
  {title: 'Solicitud de un nuevo ejemplar de DNI por extravío, robo o deterioro', description: 'Es el trámite que te permite solicitar un nuevo ejemplar de DNI (Documento Nacional de Identidad) en formato tarjeta ante el extravío, robo o deterioro. El nuveo DNI que obtengas conservará el mismo número que el anterior. ...'},
  {title: 'Solicitud de DNI para argentinos naturalizados', description: 'Este trámite te permite solicitar tu DNI (Documento Nacional de Identidad) argentino una vez que ya tengas la carta de ciudadanía, la cual se obtiene mediante proceso judicial que se lleva a cabo exclusiamente ante los tribunales federales argentinos. ...'},
  {title: 'Rectificaión de datos por cambio de género', description:'Este trámite te permite modificar los datos de nombre y género registrados en tu DNI. ...'},
];


const DataName = data.map((item:any)=>item.title);

const FormRequiredFields = ["Tramites"];

export const DA_Procedures_Forms_Home = () => {

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

  
  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));

  return(<>
    <LayoutSection>
      
      <LayoutStackedPanel>
        <div>
          <Formik enableReinitialize={true} validateOnChange={false} validateOnBlur={false}
              initialValues={FieldValues}
              validationSchema={formGetValidations(FormRequiredFields)}
              onSubmit={async (values: any) => {
              
              }}
          >
              <Form autoComplete="off">
                  <FormikSearch name="Tramites" data={DataName} autoFocus/>
              </Form>
          </Formik></div>
        <LayoutSpacer/>
        
        {/* Botones para crear o actualizar formularios */}
        <div style={{display:"flex", flexDirection:"row"}}>
          <Button disabled={FormState.loading} color="secondary" style={{ width: '150px', height: '40px', marginRight: '10px' }}>
            {FormState.loading ? <Spinner /> : "Actualizar"}
          </Button>
          <Link to={Pages.DA_PROCEDURES_FORMS_NEW} style={{ textDecoration: 'none' }}>
            <Button style={{ width: '150px', height: '40px' }}>Nuevo</Button>
          </Link>
        </div>

      </LayoutStackedPanel>
      
      <Table columns={mcolumns} data={mdata} />
    </LayoutSection>
  </>);
}