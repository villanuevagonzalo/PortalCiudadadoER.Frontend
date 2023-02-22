import { Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NuevosTramites } from '../../Components/Elements/NuevosTramites';
import { NavigatorSpacer, Spinner } from '../../Components/Elements/StyledComponents';
import { Button } from '../../Components/Forms/Button';
import { FormikField } from '../../Components/Forms/FormikField';
import { FormikSearch } from '../../Components/Forms/FormikSearch';
import { LayoutColumns, LayoutGrid, LayoutSection, LayoutTitle, LayoutColumn } from '../../Components/Layout/StyledComponents';
import { AuthContext } from '../../Contexts/AuthContext';
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from '../../Interfaces/FormFields';

const data = [
    {title: 'Solicitud Certificado de Pre-Identificación', description:'El certificado de Pre-Identificación (CPI) es un instrumento con el que podrán contar las personas actualmente indocumentadas para acceder a derechos básicos mientras el trámite de inscripción tardía de nacimiento ante el Registro Civil (ya sea por vía administrativa o por vía judicial), y posteriormente el trámite para obtener el DNI (Documento Nacional de Identidad). La tramitación del CPI no inicia el trámite de inscripción tardía de nacimiento. ...'},
    {title: 'Reemplazo de Libreta Cívica o Libreta de Enrolamiento por nuevo DNI Tarjeta', description:'Es el trámite que te permite reemplazar la Libreta de Enrolamiento o Libreta Cívica por el nuevo DNI Digital en formato tarjeta (Documento Nacional de Identidad). este nuevo DNI Digital conserva el mismo número que tu libreta anterior. ...'},
    {title: 'Solicitud de un nuevo ejemplar de DNI por extravío, robo o deterioro', description: 'Es el trámite que te permite solicitar un nuevo ejemplar de DNI (Documento Nacional de Identidad) en formato tarjeta ante el extravío, robo o deterioro. El nuveo DNI que obtengas conservará el mismo número que el anterior. ...'},
    {title: 'Solicitud de DNI para argentinos naturalizados', description: 'Este trámite te permite solicitar tu DNI (Documento Nacional de Identidad) argentino una vez que ya tengas la carta de ciudadanía, la cual se obtiene mediante proceso judicial que se lleva a cabo exclusiamente ante los tribunales federales argentinos. ...'},
    {title: 'Rectificaión de datos por cambio de género', description:'Este trámite te permite modificar los datos de nombre y género registrados en tu DNI. ...'},
];

const DataName = data.map((item:any)=>item.title);

const FormRequiredFields = ["Tramites"];

export const TramitesOnlinePage = () => {

  const { Login } = useContext(AuthContext);
  const [formState, setFormState] = useState<FormStateProps>(FormStateDefault);

  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));

  return(<><LayoutColumns className='gap-8 FlexSwitchMobile'>
    <LayoutColumn>
      <LayoutTitle>
          Trámites on line
      </LayoutTitle>
      <LayoutSection>
          <Formik enableReinitialize={true} validateOnChange={false} validateOnBlur={false}
              initialValues={FieldValues}
              validationSchema={formGetValidations(FormRequiredFields)}
              onSubmit={async (values: any) => {
              
              }}
          >
              <Form autoComplete="off">
                  <FormikSearch name="Tramites" data={DataName} autoFocus/>
                  <Button disabled={formState.loading} type="submit">
                      {formState.loading ? <Spinner /> : "Ir al Trámite"}
                  </Button>
              </Form>
          </Formik>
      </LayoutSection>
      {data.map((item, index) => <LayoutSection key={index}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <div className="text-right flex gap-4">
          <NavigatorSpacer/> 
              <Button color="gray" fullwidth={false}>+Información</Button>
              <Button color="secondary" fullwidth={false}>Iniciar</Button>
          </div>
      </LayoutSection>)}
    </LayoutColumn>
    <LayoutColumn>
    <Button size={1.5}><b>MIRA TUS TRÁMITES</b></Button>
      <LayoutTitle className="mt-4 mb-2">
          Nuevos Tramites
      </LayoutTitle>
    <NuevosTramites />
    </LayoutColumn>
  </LayoutColumns></>);
}