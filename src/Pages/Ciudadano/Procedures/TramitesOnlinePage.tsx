import { Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { NuevosTramites } from '../../../Components/Elements/NuevosTramites';
import { NavigatorSpacer, Spinner } from '../../../Components/Elements/StyledComponents';
import { Button } from '../../../Components/Forms/Button';
import { FormikSearch } from '../../../Components/Forms/FormikSearch';
import { LayoutColumns, LayoutSection, LayoutTitle, LayoutColumn } from '../../../Components/Layout/StyledComponents';
import { DefaultFormState } from '../../../Data/DefaultValues';
import { IFormState, IUserRol } from '../../../Interfaces/Data';
import { formGetInitialValues, formGetValidations } from '../../../Interfaces/FormFields';
import { ProcedureContext } from '../../../Contexts/ProcedureContext';
import { CiudadanoProcedureContext } from '../../../Contexts/CiudadanoProcedureContext';

import { ProcedureInstance } from '../../../Modules/FormElements/Class';
import { ElementSchemaTypes } from '../../../Modules/FormElements/Types';
import { CiudadanoProcedureData } from '../../../Modules/Ciudadano/ProcedureDataElement';
import {UserContext} from '../../../Contexts/UserContext';
import { getLSData } from '../../../Utils/General';
import { CitizenProcedureLevelError, NetworkAlertPopUp } from '../../../Components/Forms/CitizenPopUpCards';
import { useNavigate } from "react-router-dom";

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
    
  const navigate = useNavigate();

  const { UpdateProcedures, procedures , isLoading} = useContext(ProcedureContext);
  const { CreateCiudadanoProcedure, UpdateCiudadanoProcedures, ciudadanoProcedures } = useContext(CiudadanoProcedureContext);
  const { userData} = useContext(UserContext);

  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));
  const [searchProcedure, setSearchProcedure] = useState<string>()
  const [procedureInstance, setProcedureInstance] = useState<ProcedureInstance<ElementSchemaTypes>>();
  const [render, setRender] = useState("home")
  const [showNetworkError,setShowNetworkError] = useState(false)
  const CurrentUserRol:IUserRol[] = getLSData('UserRol');
  const [citizenLevelError, setCitizenLevelError] = useState(false)

  
  console.log(JSON.stringify(procedures))
  useEffect(()=>{
    UpdateProcedures()
    UpdateCiudadanoProcedures()

    const handlePopState = () => {
        setRender("home");
        setProcedureInstance(undefined)
      };
  
      window.addEventListener("popstate", handlePopState);
  
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };

  },[])

  useEffect(()=>{
    if (procedureInstance!=null && procedureInstance!=undefined){
        navigate("/dashboard/procedures/"); // Cambiar "/procedure" a la ruta real de tu procedimiento
        setRender("procedure")
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
  },[procedureInstance])


  useEffect(()=>{
    if (render=="home"){
        setProcedureInstance(undefined)
    }
  },[render])


  const seeProcedure = (idBuscado: number) => {
    const foundProcedure = procedures.find(procedure => procedure.getId() === idBuscado);

    if (foundProcedure) {

        const foundCiudadanoProcedure = ciudadanoProcedures.find(ciudadanoProcedure => ciudadanoProcedure.getProcedureUnitId() === idBuscado);
        
        if (!foundCiudadanoProcedure){
            if (CurrentUserRol[0].level.toString()==="3" || CurrentUserRol[0].level.toString() == foundProcedure.getCitizenLevel()?.split("_")[1]){
                CreateCiudadanoProcedure(foundProcedure.getId()!, setFormState)
                .then(response => {
                    if (response) {
                        setProcedureInstance(foundProcedure);
                    }else{
                        setShowNetworkError(true)
                    }
                })
                .catch(error => {
                    console.log("error: "+error)
                    setShowNetworkError(true)
                });
           }else{
            setCitizenLevelError (true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
           }
        }else{
            if (CurrentUserRol[0].level.toString()==="3" || CurrentUserRol[0].level.toString() == foundProcedure.getCitizenLevel()?.split("_")[1]){
                setProcedureInstance(foundProcedure);
            }else{
                setCitizenLevelError (true)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }
    }
};

    if (render === "procedure" && procedureInstance) {
        return <CiudadanoProcedureData procedureInstance={procedureInstance} backFunction={setRender} />;
    } 
    else{ 

    return(<>
    {citizenLevelError && procedureInstance && <CitizenProcedureLevelError procedureTitle={procedureInstance.getTitle()} userLevel={procedureInstance.getCitizenLevel()?.split("_")[1]!} close={setCitizenLevelError} />}
    {showNetworkError &&  <NetworkAlertPopUp close={setShowNetworkError} />}
    <LayoutColumns className='gap-8 FlexSwitchMobile'>
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
                <Button color="gray" fullwidth={false} href={item.getUrl()} >+Información</Button>
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


