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

import { ProcedureData, ProcedureInstance } from '../../../Modules/FormElements/Class';
import { ElementSchemaTypes } from '../../../Modules/FormElements/Types';
import { CiudadanoProcedureData } from '../../../Modules/Ciudadano/ProcedureDataElement';
import {UserContext} from '../../../Contexts/UserContext';
import { abrirEnlaceExterno, getLSData } from '../../../Utils/General';
import { CitizenProcedureLevelError, NetworkAlertPopUp } from '../../../Components/Forms/CitizenPopUpCards';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Pages } from '../../../Routes/Pages';
import { HiArrowDown, HiXMark } from 'react-icons/hi2';
import { InactivityDetector } from '../../../Utils/InactivityDetector';
import { CiudadanoFormContext } from '../../../Contexts/CiudadanoFormContext';
import { FormWrapperInput } from '../../../Components/Forms/StyledComponents';
import { FaSearch } from 'react-icons/fa';



const FormRequiredFields = ["Tramites"];

export const TramitesOnlinePage = () => {
    
  const navigate = useNavigate();

  const { UpdatePublishedProcedures, totalPublishedProceduresInDB, proceduresPublished, proceduresSearcedhByKeyword, ClearProcedureSearch, UpdateSearchProceduresByKeyword, totalProceduresSearchedByKeyWordInDB, isLoadingProcedure} = useContext(ProcedureContext);
  const { CreateCiudadanoProcedure, UpdateCiudadanoProcedures, ciudadanoProcedures , totalCitizenProceduresInDB, totalCitizenProceduresQueried, isLoadingProcedureCitizen} = useContext(CiudadanoProcedureContext);
  const [filteredProcedures, setFilteredProcedures] = useState<ProcedureInstance<ElementSchemaTypes>[]>([]); // procedures filtered for search
 // const [searchProcedure, setSearchProcedure] = useState<string>()

  const { userData} = useContext(UserContext);
  const { UpdateCitizenForms} = useContext(CiudadanoFormContext);

  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));
  //const [searchProcedure, setSearchProcedure] = useState<string>()
  const [procedureInstance, setProcedureInstance] = useState<ProcedureInstance<ElementSchemaTypes>>();
  const [render, setRender] = useState("home")
  const [showNetworkError,setShowNetworkError] = useState(false)
  const CurrentUserRol:IUserRol[] = getLSData('UserRol');
  const [citizenLevelError, setCitizenLevelError] = useState(false)
  const isMobile = window.innerWidth <= 768; // Cambia 768 al valor deseado para tu definición de pantalla de celular

  const [seeingProcedure, setSeeingProcedure] = useState(false) 
    
  const [chekingCitizenProcedure, setCheckingCitizenProcedure] = useState(false)
  const [procedureIdSearched, setProcedureIdSearched] = useState<number>()

  const [loadingProcedure , setLoadingProcedure ] = useState<boolean>(false)

  const [searchedByKeyword, setSearchedByKeyword] = useState<boolean>(false)

  useEffect(()=>{
    
    if (proceduresPublished.length===0){
      UpdatePublishedProcedures()
    }
    
    if (ciudadanoProcedures.length==0){
      UpdateCiudadanoProcedures()
    }
    else if( ciudadanoProcedures.length < totalCitizenProceduresInDB  ){
      UpdateCiudadanoProcedures()
    }

  UpdateCitizenForms()

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

    if (chekingCitizenProcedure){
        seeProcedure(procedureIdSearched!)
    }
    
  },[ciudadanoProcedures])

  useEffect(()=>{
    if (procedureInstance!=null && procedureInstance!=undefined && seeingProcedure){
        navigate("/dashboard/procedures/"); // Cambiar "/procedure" a la ruta real de tu procedimiento
        setRender("procedure")
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },[procedureInstance && seeingProcedure])


  useEffect(()=>{
    
    setLoadingProcedure(isLoadingProcedureCitizen)

  },[isLoadingProcedureCitizen])


  const getMoreNews = () => {
    UpdatePublishedProcedures()
    if(ciudadanoProcedures.length < totalCitizenProceduresInDB){
        UpdateCiudadanoProcedures()
    }
  }

  const getMoreNewsSearch = () => {
    UpdateSearchProceduresByKeyword("")
  }

  useEffect(()=>{
    setFilteredProcedures(proceduresPublished)
  },[proceduresPublished])

/*
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
  },[searchProcedure])*/


  useEffect(()=>{
    if (render=="home"){
        setProcedureInstance(undefined)
        setSeeingProcedure(false)
    }
  },[render])

  /*
  const DataTitle = useMemo(() => {
    const uniqueTitles = Array.from(
      new Set(proceduresPublished.map((item: any) => item.getTitle() + " (título)"))
    );
    return uniqueTitles;
  }, [proceduresPublished]);
  
  const DataTheme = useMemo(() => {
    const uniqueThemes = Array.from(
      new Set(proceduresPublished.map((item: any) => item.getTheme() + " (temática)"))
    ).flat();
    return uniqueThemes;
  }, [proceduresPublished]);

  const ResultArray = useMemo(() => DataTitle.concat(DataTheme), [DataTitle, DataTheme]);
*/
    const seeProcedure = async (idBuscado: number) => {
      // Busca el procedimiento en la lista de procedimientos publicados
      setLoadingProcedure(true)
      const foundProcedure = proceduresPublished.find(procedure => procedure.getId() === idBuscado);
    
      // Si no se encuentra el procedimiento, salimos temprano
      if (!foundProcedure) {
        setLoadingProcedure(false)
        return;
      }
  
       // Busca el procedimiento del ciudadano en la lista de procedimientos del ciudadano
       const foundCiudadanoProcedure = ciudadanoProcedures.find(ciudadanoProcedure => ciudadanoProcedure.getProcedureUnitId() === idBuscado);
       
       // Si no se encuentra el procedimiento del ciudadano
      if (!foundCiudadanoProcedure) {
          if (ciudadanoProcedures.length >= totalCitizenProceduresInDB){

              if (CurrentUserRol[0].level.toString() === "3" || CurrentUserRol[0].level.toString() === foundProcedure.getCitizenLevel()?.split("_")[1]) {
                CreateCiudadanoProcedure(foundProcedure.getId()!, setFormState)
                  .then(response => {
                      if (response) {
                          setProcedureInstance(foundProcedure);
                          setSeeingProcedure(true)
                      }else{
                          setShowNetworkError(true)
                      }
                  })
                  .catch(error => {
                      console.log("error: "+error)
                      setShowNetworkError(true)
                  });
              }else{
                  setProcedureInstance(foundProcedure);
                  setCitizenLevelError (true)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
              }
          }
      }else{
       
          if (CurrentUserRol[0].level.toString() === "3" || CurrentUserRol[0].level.toString() === foundProcedure.getCitizenLevel()?.split("_")[1]) {
            setProcedureInstance(foundProcedure);
            setSeeingProcedure(true)
          }else{
            setProcedureInstance(foundProcedure);
            setCitizenLevelError (true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
      }

      setLoadingProcedure(false)
  }

  const handleSearch = (query: string) => {
    // Realiza la lógica de búsqueda aquí con la consulta 'query'
    if (query!=''){
      UpdateSearchProceduresByKeyword(query)
      console.log(`Buscando1: ${query}`);

    }else{
      console.log(`Buscando2: ${query}`);

      ClearProcedureSearch()
    }
  };

  useEffect(()=>{
    
    
    if (proceduresSearcedhByKeyword.length > 0 ){
      setSearchedByKeyword(true)
    }else{
      setSearchedByKeyword(false)
    }

   },[proceduresSearcedhByKeyword])

    
    if (render === "procedure" && procedureInstance) {
        
        return <CiudadanoProcedureData procedureInstance={procedureInstance} backFunction={setRender} />;
    } 
    else{ 

    return(<>
    {citizenLevelError && <CitizenProcedureLevelError procedureTitle={procedureInstance!.getTitle()} userLevel={procedureInstance!.getCitizenLevel()?.split("_")[1]!} close={setCitizenLevelError} />}
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
                      console.log("veamos el valor: "+JSON.stringify(values).toString())
                    }}
                >
                    <Form autoComplete="off">

                    <SearchInput onSearch={handleSearch}  />

                     {/*   <FormikSearch name="Tramites" label={"Filtra los trámites"} data={[]} setValue={setSearchProcedure} autoFocus/>
                        <Button disabled={FormState.loading} type="submit">
                            {FormState.loading ? <Spinner /> : "Ir al Trámite"}
                  </Button> */}
                    </Form>
                </Formik>
            </LayoutSection>
            {showNetworkError&&<h2>Error de red, intente nuevamente</h2>}
            {isLoadingProcedure && (<><Spinner color='secondary' size="3rem" /><br /><LayoutText className='text-center'>Cargando Información.<br />Por favor aguarde.</LayoutText></>)}
            
           {searchedByKeyword? 
            <ProceduresSearchedTable proceduresSearcedhByKeyword={proceduresSearcedhByKeyword} ciudadanoProcedures={ciudadanoProcedures} totalProceduresSearchedByKeyWordInDB={totalProceduresSearchedByKeyWordInDB} seeProcedure={seeProcedure} getMoreNews={getMoreNewsSearch} loadingProcedure={loadingProcedure} /> 
            :
            <PublishedProceduresTable filteredProcedures={filteredProcedures} proceduresPublished={proceduresPublished} ciudadanoProcedures={ciudadanoProcedures} totalPublishedProceduresInDB={totalPublishedProceduresInDB} seeProcedure={seeProcedure} getMoreNews={getMoreNews} loadingProcedure={loadingProcedure} />
            }       
          
        </LayoutColumn>
        {isMobile ? (
            <LayoutColumn style={{ width: '100%' }}>
                <Link to={Pages.DC_PROCEDURES_STARTED}>
                    <Button size={1.5}><b>MIRA TUS TRÁMITES</b></Button> 
                </Link>
                <LayoutTitle className="mt-4 mb-2">
                Nuevos Tramites
                </LayoutTitle>
                <NuevosTramites />
            </LayoutColumn>
            ) : (
            <LayoutColumn style={{ width: '65%' }}>
                <Link to={Pages.DC_PROCEDURES_STARTED}>
                    <Button size={1.5}><b>MIRA TUS TRÁMITES</b></Button>
                </Link>

                <LayoutTitle className="mt-4 mb-2">
                Nuevos Tramites
                </LayoutTitle>
                <NuevosTramites />
            </LayoutColumn>
        )}

    </LayoutColumns></>);
    }
}

export interface PublishedProceduresTableInterface {
  filteredProcedures: ProcedureInstance<ElementSchemaTypes>[],
  proceduresPublished: ProcedureInstance<ElementSchemaTypes>[],
  ciudadanoProcedures: ProcedureData[],
  totalPublishedProceduresInDB:number,
  seeProcedure:Function,
  getMoreNews:Function,
  loadingProcedure: boolean,

}


export const PublishedProceduresTable: React.FC<PublishedProceduresTableInterface> = ({ filteredProcedures, proceduresPublished, ciudadanoProcedures, totalPublishedProceduresInDB, seeProcedure, loadingProcedure, getMoreNews }) => {

return (
  <div>
  {filteredProcedures.map((item, index) => <LayoutSection style={{overflow: "hidden", marginBottom:"15px" }} key={index}>
                {item.getIcon() !== "" ? (
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                <div style={{ width: "25%", display: "flex", alignItems: "center" }}>
                <img
                    src={`../../../public/ProceduresIcons/icono_${item.getIcon()}.svg`}
                    alt={item.getTitle()}
                    style={{ width: "64px", height: "64px" }}
                />
                </div>
                <div style={{ width: "75%", height:"auto", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
                  <h1>{item.getTitle()}</h1>
                  <p style={{ maxWidth: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.getDescription()}</p>
                  <h2 style={{margin:"10px 0px 10px 0px"}} >{ciudadanoProcedures.find(ciudadanoProcedure => ciudadanoProcedure.getProcedureUnitId() == item.getId())?.getStatus()}</h2>
                </div>
            </div>          
                ) : (
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ width: "100%", display: "flex", flexDirection:"column" }}>
                        <h1>{item.getTitle()}</h1>
                        <h4>{item.getDescription()}</h4>
                        <h2 style={{margin:"10px 0px 10px 0px"}} >{ciudadanoProcedures.find(ciudadanoProcedure => ciudadanoProcedure.getProcedureUnitId() == item.getId())?.getStatus()}</h2>

                    </div>
                </div>
                )}

                <div className="text-right flex gap-4">
                <NavigatorSpacer/> 
                {item.getId() ? (<Button color="gray" fullwidth={false} onClick={() => abrirEnlaceExterno("https://portal.entrerios.gov.ar/pf/buscador/tramite?"+item.getId()?.toString())}>+Información </Button>) : null} 
                <Button
                  color="secondary"
                  fullwidth={false}
                  onClick={() => seeProcedure(item.getId()!)}
                >
                  {loadingProcedure ? <Spinner /> : (
                    ciudadanoProcedures.find(
                      ciudadanoProcedure =>
                        ciudadanoProcedure.getProcedureUnitId() == item.getId()
                    )?.getStatus() == "PENDIENTE" ? "Revisar" : "Iniciar"
                  )}
                </Button>
                </div>
            </LayoutSection>)}
            
            {(totalPublishedProceduresInDB > proceduresPublished.length ) ? <Button style={{marginTop:"20px"}} onClick={() => getMoreNews()}>< HiArrowDown/>VER MÁS</Button> : null} 
            </div>

)

}



export interface ProceduresSearchedTableInterface {
  proceduresSearcedhByKeyword: ProcedureInstance<ElementSchemaTypes>[],
  ciudadanoProcedures: ProcedureData[],
  totalProceduresSearchedByKeyWordInDB:number,
  seeProcedure:Function,
  getMoreNews:Function,
  loadingProcedure: boolean,

}

export const ProceduresSearchedTable: React.FC<ProceduresSearchedTableInterface> = ({ proceduresSearcedhByKeyword, ciudadanoProcedures, totalProceduresSearchedByKeyWordInDB, seeProcedure, loadingProcedure, getMoreNews }) => {

return (
  <div>
  {proceduresSearcedhByKeyword.map((item, index) => <LayoutSection style={{overflow: "hidden", marginBottom:"15px" }} key={index}>
  {item.getIcon() !== "" ? (
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                <div style={{ width: "25%", display: "flex", alignItems: "center" }}>
                <img
                    src={`../../../public/ProceduresIcons/icono_${item.getIcon()}.svg`}
                    alt={item.getTitle()}
                    style={{ width: "64px", height: "64px" }}
                />
                </div>
                <div style={{ width: "75%", height:"auto", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
                  <h1>{item.getTitle()}</h1>
                  <p style={{ maxWidth: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.getDescription()}</p>
                  <h2 style={{margin:"10px 0px 10px 0px"}} >{ciudadanoProcedures.find(ciudadanoProcedure => ciudadanoProcedure.getProcedureUnitId() == item.getId())?.getStatus()}</h2>
                </div>
            </div>          
                ) : (
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ width: "100%", display: "flex", flexDirection:"column" }}>
                        <h1>{item.getTitle()}</h1>
                        <h4>{item.getDescription()}</h4>
                        <h2 style={{margin:"10px 0px 10px 0px"}} >{ciudadanoProcedures.find(ciudadanoProcedure => ciudadanoProcedure.getProcedureUnitId() == item.getId())?.getStatus()}</h2>

                    </div>
                </div>
                )}

                <div className="text-right flex gap-4">
                <NavigatorSpacer/> 
                {item.getId() ? (<Button color="gray" fullwidth={false} onClick={() => abrirEnlaceExterno("https://portal.entrerios.gov.ar/pf/buscador/tramite?"+item.getId()?.toString())}>+Información </Button>) : null} 
                <Button
                  color="secondary"
                  fullwidth={false}
                  onClick={() => seeProcedure(item.getId()!)}
                >
                  {loadingProcedure ? <Spinner /> : (
                    ciudadanoProcedures.find(
                      ciudadanoProcedure =>
                        ciudadanoProcedure.getProcedureUnitId() == item.getId()
                    )?.getStatus() == "PENDIENTE" ? "Revisar" : "Iniciar"
                  )}
                </Button>
                </div>
            </LayoutSection>)}
            
            {(totalProceduresSearchedByKeyWordInDB > proceduresSearcedhByKeyword.length ) ? <Button style={{marginTop:"20px"}} onClick={() => getMoreNews()}>< HiArrowDown/>VER MÁS</Button> : null} 
            </div>

)

}

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
     < FormWrapperInput  style={{marginBottom:"15px"}}>
     <div style={{display:"flex", flexDirection:"row"}} >
      <input
        type="text"
        placeholder="Buscar..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <div className="FormIcon">{(searchQuery!='')?<HiXMark color="gray" onClick={() => {onSearch(""); setSearchQuery("")} } />:<FaSearch className="w-4 mr-1"/>}</div>
      </div>
      </FormWrapperInput>
      <Button onClick={handleSearch}>Buscar Trámites</Button>

    </div>
  );
};
