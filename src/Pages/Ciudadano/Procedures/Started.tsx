import { useContext, useEffect, useMemo, useState } from "react";
import { LayoutSection, LayoutTitle } from "../../../Components/Layout/StyledComponents"
import { CiudadanoProcedureContext } from "../../../Contexts/CiudadanoProcedureContext";
import { Form, Formik } from 'formik';
import { FormikSearch } from "../../../Components/Forms/FormikSearch";
import { Button } from "../../../Components/Forms/Button";
import { ProcedureInstance } from "../../../Modules/FormElements/Class";
import { ElementSchemaTypes } from "../../../Modules/FormElements/Types";
import { formGetInitialValues, formGetValidations } from "../../../Interfaces/FormFields";
import { ProcedureContext } from "../../../Contexts/ProcedureContext";
import { NavigatorSpacer } from "../../../Components/Elements/StyledComponents";
import { CiudadanoProcedureData } from "../../../Modules/Ciudadano/ProcedureDataElement";
import { useNavigate } from "react-router-dom";
import { IFormState } from "../../../Interfaces/Data";
import { DefaultFormState } from "../../../Data/DefaultValues";

const FormRequiredFields = ["Tramites"];


export const DC_Procedures_Started = () => {

  const navigate = useNavigate();


  const { CreateCiudadanoProcedure, UpdateCiudadanoProcedures, ciudadanoProcedures } = useContext(CiudadanoProcedureContext);
  const { UpdatePublishedProcedures, proceduresPublished, isLoadingProcedure} = useContext(ProcedureContext);

  const [AllProcedures, setAllProcedures] = useState<ProcedureInstance<ElementSchemaTypes>[]>([]); // procedures filtered for search

  const [filteredProcedures, setFilteredProcedures] = useState<ProcedureInstance<ElementSchemaTypes>[]>([]); // procedures filtered for search
  const [searchProcedure, setSearchProcedure] = useState<string>()
  const [procedureInstance, setProcedureInstance] = useState<ProcedureInstance<ElementSchemaTypes>>();

  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));
  const [render, setRender] = useState("home")

  const [showNetworkError,setShowNetworkError] = useState(false)
  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);

  useEffect(()=>{

    const ciudadanoProcedureUnitIds = ciudadanoProcedures.map((item) => item.getProcedureUnitId());
    const proceduresInCiudadano = proceduresPublished.filter((item) =>
      ciudadanoProcedureUnitIds.includes(item.getId()!)
    );

    setAllProcedures(proceduresInCiudadano)
    setFilteredProcedures(proceduresInCiudadano)

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
        navigate("/dashboard/procedures/started/"); // Cambiar "/procedure" a la ruta real de tu procedimiento
        setRender("procedure")
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },[procedureInstance])

  useEffect(()=>{
    console.log("veamos como cambia: "+JSON.stringify(filteredProcedures))
  },[filteredProcedures])
  
  const seeProcedure = (idBuscado: number) => {
    const foundProcedure = proceduresPublished.find(procedure => procedure.getId() === idBuscado);

    if (foundProcedure) {

        const foundCiudadanoProcedure = ciudadanoProcedures.find(ciudadanoProcedure => ciudadanoProcedure.getProcedureUnitId() === idBuscado);
        
        if (!foundCiudadanoProcedure){
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
                setProcedureInstance(foundProcedure);
           
        }
    }
}

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


  useEffect(()=>{
    if (searchProcedure !== undefined &&  searchProcedure != '') {
      const cleanedSearchProcedure = searchProcedure.replace(/\s+\((título|temática)\)$/, '');
      const filtered = AllProcedures.filter(procedures => procedures.getTitle() === cleanedSearchProcedure);
        if (filtered.length>0){
            setFilteredProcedures(filtered);
        }else{
          const filtered = AllProcedures.filter(procedures => procedures.getTheme() === cleanedSearchProcedure);
          if (filtered.length>0){
            setFilteredProcedures(filtered);
          }else{
            setFilteredProcedures(AllProcedures)
          }
        } 
      } else {
        setFilteredProcedures(AllProcedures)
      }
  },[searchProcedure])

  if (render === "procedure" && procedureInstance) {
    return <CiudadanoProcedureData procedureInstance={procedureInstance} backFunction={setRender} />;
  }else{
    return (
      <>
        <LayoutTitle>Mis Trámites</LayoutTitle>
        <LayoutSection>
          <Formik
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={FieldValues}
            validationSchema={formGetValidations(FormRequiredFields)}
            onSubmit={async (values: any) => {
              // Lógica de envío del formulario
            }}
          >
            {({ values }) => (
              <Form autoComplete="off">
                <FormikSearch
                  name="Tramites"
                  label={"Filtra los trámites"}
                  data={ResultArray} // Aquí asumo que "data" debe ser reemplazado con los datos reales
                  setValue={setSearchProcedure}
                  autoFocus
                />
              </Form>
            )}
          </Formik>
        </LayoutSection>
          {filteredProcedures.map((item, index) => (
            <LayoutSection key={index}>
            <div key={index}>
              {item.getIcon() !== "" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={`../../../public/ProceduresIcons/icono_${item.getIcon()}.svg`}
                      alt={item.getTitle()}
                      style={{ width: "64px", height: "64px" }}
                    />
                  </div>
                  <div
                    style={{
                      width: "75%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <h1>{item.getTitle()}</h1>
                    <p>{item.getDescription()}</p>
                  </div>
                </div>
                
              ) : (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                    <h1>{item.getTitle()}</h1>
                    <p>{item.getDescription()}</p>
                  </div>
                </div>
              )}
    
              <div className="text-right flex gap-4">
                <NavigatorSpacer />
                <Button
                  color="gray"
                  fullwidth={false}
                  onClick={() => window.open(item.getUrl()!, '_blank')}
                >
                  +Información
                </Button>
                <Button
                  color="secondary"
                  fullwidth={false}
                  onClick={() => seeProcedure(item.getId()!)}
                >
                  Iniciar
                </Button>
              </div>
            </div>
          </LayoutSection>
          ))}
      </>
    );
  } 
  
 }  