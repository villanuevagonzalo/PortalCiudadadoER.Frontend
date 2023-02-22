import { Form, Formik } from "formik";
import { useState } from "react";
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Button } from "../Forms/Button";
import { FormikSearch } from "../Forms/FormikSearch";
import { Spinner } from "./StyledComponents";

const data = [
  {title: 'Solicitud Certificado de Pre-Identificación', description:'El certificado de Pre-Identificación (CPI) es un instrumento con el que podrán contar las personas actualmente indocumentadas para acceder a derechos básicos mientras el trámite de inscripción tardía de nacimiento ante el Registro Civil (ya sea por vía administrativa o por vía judicial), y posteriormente el trámite para obtener el DNI (Documento Nacional de Identidad). La tramitación del CPI no inicia el trámite de inscripción tardía de nacimiento. ...'},
  {title: 'Reemplazo de Libreta Cívica o Libreta de Enrolamiento por nuevo DNI Tarjeta', description:'Es el trámite que te permite reemplazar la Libreta de Enrolamiento o Libreta Cívica por el nuevo DNI Digital en formato tarjeta (Documento Nacional de Identidad). este nuevo DNI Digital conserva el mismo número que tu libreta anterior. ...'},
  {title: 'Solicitud de un nuevo ejemplar de DNI por extravío, robo o deterioro', description: 'Es el trámite que te permite solicitar un nuevo ejemplar de DNI (Documento Nacional de Identidad) en formato tarjeta ante el extravío, robo o deterioro. El nuveo DNI que obtengas conservará el mismo número que el anterior. ...'},
  {title: 'Solicitud de DNI para argentinos naturalizados', description: 'Este trámite te permite solicitar tu DNI (Documento Nacional de Identidad) argentino una vez que ya tengas la carta de ciudadanía, la cual se obtiene mediante proceso judicial que se lleva a cabo exclusiamente ante los tribunales federales argentinos. ...'},
  {title: 'Rectificaión de datos por cambio de género', description:'Este trámite te permite modificar los datos de nombre y género registrados en tu DNI. ...'},
]

const DataName = data.map((item:any)=>item.title);
const FormRequiredFields = ["Tramites"];

export const BuscarTramites = (props: any) => {

  const [formState, setFormState] = useState<FormStateProps>(FormStateDefault);
  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));

    return(<Formik enableReinitialize={true} validateOnChange={false} validateOnBlur={false}
      initialValues={FieldValues}
      validationSchema={formGetValidations(FormRequiredFields)}
      onSubmit={async (values: any) => {
      
      }}
    >
    <Form autoComplete="off">
        <FormikSearch name="Tramites" data={DataName} autoFocus/>
    </Form>
  </Formik>);
}
