import { Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { NuevosTramites } from '../../../Components/Elements/NuevosTramites';
import { NavigatorSpacer, Spinner } from '../../../Components/Elements/StyledComponents';
import { Button } from '../../../Components/Forms/Button';
import { FormikSearch } from '../../../Components/Forms/FormikSearch';
import { LayoutColumns, LayoutSection, LayoutTitle, LayoutColumn } from '../../../Components/Layout/StyledComponents';
import { DefaultFormState } from '../../../Data/DefaultValues';
import { IFormState } from '../../../Interfaces/Data';
import { formGetInitialValues, formGetValidations } from '../../../Interfaces/FormFields';
import { ProcedureContext } from '../../../Contexts/ProcedureContext';
import { CiudadanoProcedureContext } from '../../../Contexts/CiudadanoProcedureContext';

import { ProcedureInstance } from '../../../Modules/FormElements/Class';
import { ElementSchemaTypes } from '../../../Modules/FormElements/Types';
import { CiudadanoProcedureData } from '../../../Modules/Ciudadano/ProcedureDataElement';

const dummyData = [
    {title: 'Solicitud Certificado de Pre-Identificación', description:'El certificado de Pre-Identificación (CPI) es un instrumento con el que podrán contar las personas actualmente indocumentadas para acceder a derechos básicos mientras el trámite de inscripción tardía de nacimiento ante el Registro Civil (ya sea por vía administrativa o por vía judicial), y posteriormente el trámite para obtener el DNI (Documento Nacional de Identidad). La tramitación del CPI no inicia el trámite de inscripción tardía de nacimiento. ...'},
    {title: 'Reemplazo de Libreta Cívica o Libreta de Enrolamiento por nuevo DNI Tarjeta', description:'Es el trámite que te permite reemplazar la Libreta de Enrolamiento o Libreta Cívica por el nuevo DNI Digital en formato tarjeta (Documento Nacional de Identidad). este nuevo DNI Digital conserva el mismo número que tu libreta anterior. ...'},
    {title: 'Solicitud de un nuevo ejemplar de DNI por extravío, robo o deterioro', description: 'Es el trámite que te permite solicitar un nuevo ejemplar de DNI (Documento Nacional de Identidad) en formato tarjeta ante el extravío, robo o deterioro. El nuveo DNI que obtengas conservará el mismo número que el anterior. ...'},
    {title: 'Solicitud de DNI para argentinos naturalizados', description: 'Este trámite te permite solicitar tu DNI (Documento Nacional de Identidad) argentino una vez que ya tengas la carta de ciudadanía, la cual se obtiene mediante proceso judicial que se lleva a cabo exclusiamente ante los tribunales federales argentinos. ...'},
    {title: 'Rectificaión de datos por cambio de género', description:'Este trámite te permite modificar los datos de nombre y género registrados en tu DNI. ...'},
];

const DataName = dummyData.map((item:any)=>item.title);

const FormRequiredFields = ["Tramites"];

export const TramitesOnlinePage = () => {

  const { UpdateProcedures, procedures , isLoading} = useContext(ProcedureContext);
  const { CreateCiudadanoProcedure, UpdateCiudadanoProcedures, ciudadanoProcedures } = useContext(CiudadanoProcedureContext);

  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));
  const [searchProcedure, setSearchProcedure] = useState<string>()
  const [procedureInstance, setProcedureInstance] = useState<ProcedureInstance<ElementSchemaTypes>>();
  const [render, setRender] = useState("home")
  const [showNetworkError,setShowNetworkError] = useState(true)

  useEffect(()=>{
    UpdateProcedures()
    UpdateCiudadanoProcedures()
  },[])

  useEffect(()=>{
    console.log("Procedures del ciudadano: "+JSON.stringify(ciudadanoProcedures))
  },[ciudadanoProcedures])
  
  useEffect(()=>{
    if (procedureInstance!=null && procedureInstance!=undefined){
        setRender("procedure")
    }
  },[procedureInstance])


  const seeProcedure = (idBuscado: number) => {
    const foundProcedure = procedures.find(procedure => procedure.getId() === idBuscado);
    if (foundProcedure) {
        CreateCiudadanoProcedure(foundProcedure.getId()!, setFormState)
            .then(response => {
                if (response) {
                    setProcedureInstance(foundProcedure);
                }else{
                    setShowNetworkError(true)
                }
            })
            .catch(error => {
                // Handle errors here
            });
    }
};

  if (render=="procedure"){

    return (
        <CiudadanoProcedureData procedureInstance={procedureInstance!} procedureData={procedureInstance!} />
    )

  }else{ 

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
                    <FormikSearch name="Tramites" label={"Filtra los trámites"} data={DataName} setValue={setSearchProcedure} autoFocus/>

                    <Button disabled={FormState.loading} type="submit">
                        {FormState.loading ? <Spinner /> : "Ir al Trámite"}
                    </Button>
                </Form>
            </Formik>
        </LayoutSection>
        {showNetworkError&&<h2>Error de red, intente nuevamente</h2>}
        {dummyData.map((item, index) => <LayoutSection key={index}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <div className="text-right flex gap-4">
            <NavigatorSpacer/> 
                <Button color="gray" fullwidth={false}>+Información</Button>
                <Button color="secondary" fullwidth={false}>Iniciar</Button>
            </div>
        </LayoutSection>)}
        {procedures.map((item, index) => <LayoutSection key={index}>
            <h1>{item.getTitle()}</h1>
            <p>{item.getDescription()}</p>
            <div className="text-right flex gap-4">
            <NavigatorSpacer/> 
                <Button color="gray" fullwidth={false}>+Información</Button>
                <Button color="secondary" fullwidth={false} onClick={ () => seeProcedure (item.getId()!)} >Iniciar</Button>
            </div>
        </LayoutSection>)
        }
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
}


