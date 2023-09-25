import { Form, Formik } from 'formik';
import { useContext, useEffect, useMemo, useState } from 'react';
import { NuevosTramites } from '../../../Components/Elements/NuevosTramites';
import { NavigatorSpacer, Spinner } from '../../../Components/Elements/StyledComponents';
import { Button } from '../../../Components/Forms/Button';
import { FormikSearch } from '../../../Components/Forms/FormikSearch';
import { LayoutColumns, LayoutSection, LayoutTitle, LayoutColumn, LayoutText } from '../../../Components/Layout/StyledComponents';
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
/*
const dummyData = [
    {title: 'Solicitud Certificado de Pre-Identificación', description:'El certificado de Pre-Identificación (CPI) es un instrumento con el que podrán contar las personas actualmente indocumentadas para acceder a derechos básicos mientras el trámite de inscripción tardía de nacimiento ante el Registro Civil (ya sea por vía administrativa o por vía judicial), y posteriormente el trámite para obtener el DNI (Documento Nacional de Identidad). La tramitación del CPI no inicia el trámite de inscripción tardía de nacimiento. ...'},
    {title: 'Reemplazo de Libreta Cívica o Libreta de Enrolamiento por nuevo DNI Tarjeta', description:'Es el trámite que te permite reemplazar la Libreta de Enrolamiento o Libreta Cívica por el nuevo DNI Digital en formato tarjeta (Documento Nacional de Identidad). este nuevo DNI Digital conserva el mismo número que tu libreta anterior. ...'},
    {title: 'Solicitud de un nuevo ejemplar de DNI por extravío, robo o deterioro', description: 'Es el trámite que te permite solicitar un nuevo ejemplar de DNI (Documento Nacional de Identidad) en formato tarjeta ante el extravío, robo o deterioro. El nuveo DNI que obtengas conservará el mismo número que el anterior. ...'},
    {title: 'Solicitud de DNI para argentinos naturalizados', description: 'Este trámite te permite solicitar tu DNI (Documento Nacional de Identidad) argentino una vez que ya tengas la carta de ciudadanía, la cual se obtiene mediante proceso judicial que se lleva a cabo exclusiamente ante los tribunales federales argentinos. ...'},
    {title: 'Rectificaión de datos por cambio de género', description:'Este trámite te permite modificar los datos de nombre y género registrados en tu DNI. ...'},
];*/

//const DataName = dummyData.map((item:any)=>item.title);

const FormRequiredFields = ["Tramites"];

export const TramitesOnlinePage = () => {
    
  const navigate = useNavigate();

  const { UpdatePublishedProcedures, proceduresPublished, isLoadingProcedure} = useContext(ProcedureContext);
  const { CreateCiudadanoProcedure, UpdateCiudadanoProcedures, ciudadanoProcedures } = useContext(CiudadanoProcedureContext);
  const [filteredProcedures, setFilteredProcedures] = useState<ProcedureInstance<ElementSchemaTypes>[]>([]); // procedures filtered for search
  const [searchProcedure, setSearchProcedure] = useState<string>()

  const { userData} = useContext(UserContext);

  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));
  //const [searchProcedure, setSearchProcedure] = useState<string>()
  const [procedureInstance, setProcedureInstance] = useState<ProcedureInstance<ElementSchemaTypes>>();
  const [render, setRender] = useState("home")
  const [showNetworkError,setShowNetworkError] = useState(false)
  const CurrentUserRol:IUserRol[] = getLSData('UserRol');
  const [citizenLevelError, setCitizenLevelError] = useState(false)
  const isMobile = window.innerWidth <= 768; // Cambia 768 al valor deseado para tu definición de pantalla de celular


  useEffect(()=>{
    UpdatePublishedProcedures()
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
    setFilteredProcedures(proceduresPublished)
  },[proceduresPublished])

  useEffect(()=>{
    if (searchProcedure !== undefined &&  searchProcedure != '') {
      const cleanedSearchProcedure = searchProcedure.replace(/\s+\((título|temática)\)$/, '');
      const filtered = proceduresPublished.filter(procedures => procedures.getTitle() === cleanedSearchProcedure);
        if (filtered.length>0){
            setFilteredProcedures(filtered);
        }else{
          const filtered = proceduresPublished.filter(procedures => procedures.getTheme() === cleanedSearchProcedure);
          if (filtered.length>0){
            setFilteredProcedures(filtered);
          }else{
            setFilteredProcedures(proceduresPublished)
          }
        } 
      } else {
        setFilteredProcedures(proceduresPublished)
      }
  },[searchProcedure])


  useEffect(()=>{
    if (render=="home"){
        setProcedureInstance(undefined)
    }
  },[render])

  const DataTitle = useMemo(() => proceduresPublished.map((item:any) => item.getTitle()+" (título)"), [proceduresPublished]);
  const DataTheme = useMemo(() => proceduresPublished.map((item:any) => item.getTheme()+" (temática)").flat(), [proceduresPublished]);
  const ResultArray = useMemo(() => DataTitle.concat(DataTheme), [DataTitle, DataTheme]);


    const seeProcedure = (idBuscado: number) => {
        const foundProcedure = proceduresPublished.find(procedure => procedure.getId() === idBuscado);

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
    }

    const openNewTab = (url:string) => {
        window.open(url, '_blank');
      };

    if (render === "procedure" && procedureInstance) {
        return <CiudadanoProcedureData procedureInstance={procedureInstance} backFunction={setRender} />;
    } 
    else{ 

    return(<>
    {citizenLevelError && procedureInstance && <CitizenProcedureLevelError procedureTitle={procedureInstance.getTitle()} userLevel={procedureInstance.getCitizenLevel()?.split("_")[1]!} close={setCitizenLevelError} />}
    {showNetworkError &&  <NetworkAlertPopUp close={setShowNetworkError} />}
    <LayoutColumns className='gap-8 FlexSwitchMobile'>
        <LayoutColumn style={{width:"100%"}} >
            <LayoutTitle>
                Trámites on line
            </LayoutTitle>
            <LayoutSection >
                <Formik enableReinitialize={true} validateOnChange={false} validateOnBlur={false}
                    initialValues={FieldValues}
                    validationSchema={formGetValidations(FormRequiredFields)}
                    onSubmit={async (values: any) => {
                    
                    }}
                >
                    <Form autoComplete="off">
                        <FormikSearch name="Tramites" label={"Filtra los trámites"} data={ResultArray} setValue={setSearchProcedure} autoFocus/>

                        <Button disabled={FormState.loading} type="submit">
                            {FormState.loading ? <Spinner /> : "Ir al Trámite"}
                        </Button>
                    </Form>
                </Formik>
            </LayoutSection>
            {showNetworkError&&<h2>Error de red, intente nuevamente</h2>}
            {isLoadingProcedure && (<><Spinner color='secondary' size="3rem" /><br /><LayoutText className='text-center'>Cargando Información.<br />Por favor aguarde.</LayoutText></>)}
            
            {filteredProcedures.map((item, index) => <LayoutSection key={index}>
                {item.getIcon() !== "" ? (
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                <div style={{ width: "25%", display: "flex", alignItems: "center" }}>
                <img
                    src={`../../../public/ProceduresIcons/icono_${item.getIcon()}.svg`}
                    alt={item.getTitle()}
                    style={{ width: "64px", height: "64px" }}
                />
                </div>
                <div style={{ width: "75%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
                <h1>{item.getTitle()}</h1>
                <p>{item.getDescription()}</p>
                </div>
            </div>          
                ) : (
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ width: "100%", display: "flex", flexDirection:"column" }}>
                        <h1>{item.getTitle()}</h1>
                        <p>{item.getDescription()}</p>

                    </div>
                </div>
                )}

                <div className="text-right flex gap-4">
                <NavigatorSpacer/> 
                    <Button color="gray" fullwidth={false} onClick={() => ( window.open(item.getUrl()!, '_blank')  )} >+Información</Button>
                    <Button color="secondary" fullwidth={false} onClick={ () => seeProcedure (item.getId()!)} >Iniciar</Button>
                </div>
            </LayoutSection>)
            }
        </LayoutColumn>
        {isMobile ? (
            <LayoutColumn style={{ width: '100%' }}>
                <Button size={1.5}><b>MIRA TUS TRÁMITES</b></Button>
                <LayoutTitle className="mt-4 mb-2">
                Nuevos Tramites
                </LayoutTitle>
                <NuevosTramites />
            </LayoutColumn>
            ) : (
            <LayoutColumn style={{ width: '65%' }}>
                <Button size={1.5}><b>MIRA TUS TRÁMITES</b></Button>
                <LayoutTitle className="mt-4 mb-2">
                Nuevos Tramites
                </LayoutTitle>
                <NuevosTramites />
            </LayoutColumn>
        )}
    </LayoutColumns></>);
    }
}