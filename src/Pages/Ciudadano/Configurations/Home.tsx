import { Form, Formik } from "formik";
import moment from "moment";
import * as yup from 'yup';
import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiData, BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Spinner } from "../../../Components/Elements/StyledComponents"
import { FormikField } from "../../../Components/Forms/FormikField";
import { FormikFieldDummy } from "../../../Components/Forms/FormikFieldDummy";
import { FormikSearch } from "../../../Components/Forms/FormikSearch";
import { LayoutTitle, LayoutSection, LayoutStackedPanel, LayoutSpacer } from "../../../Components/Layout/StyledComponents";
import { AuthContext } from "../../../Contexts/AuthContext";
import { ILocation, IUserRol } from "../../../Interfaces/Data";
import { formGetValidations } from "../../../Interfaces/FormFields";
import { IFormState } from "../../../Interfaces/Data";
import { DefaultFormState } from "../../../Data/DefaultValues";
import { RawLocations, LocationsFullPath, LocationByID, LocationFullPath, GetLocationByPath } from "../../../Utils/Locations"
import { FormikButton } from "../../../Components/Forms/FormikButton";
import { Button } from "../../../Components/Forms/Button";
import { DC_Validation } from "./DC_Validation";
import { Pages } from "../../../Routes/Pages";
import { getLSData } from "../../../Utils/General";
import { NewUserLevel } from "../../../Components/Forms/PopUpCards";

const FormRequiredFields = [
  'Cellphone',
  'Birthdate',
  'Locality',
  'AddressStreet',
  'AddressNumber',
  'Apartment'
];

export const DC_Configurations = () => {

  const { userData, userContact, userRol, SaveData, AFIP_getURL } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
  const [ LocationsValues, setLocationsValues ] = useState< ILocation[]>([]);
  const [ FieldValues, setFieldValues ] = useState<any>(null);
  const [locations, setLocations] = useState<string>()
  const [newLevelAlert, showNewLevelAlert] = useState(false)
  const [message1, setMessage1] = useState <string>("") 
  const [message2, setMessage2] = useState <string>("") 

  const CurrentUserRol:IUserRol[] = getLSData('UserRol');

  useEffect(() => {
    if(userContact){
      console.log(userContact)
      if(userContact.LOCALITY_ID*1!==0 && LocationsValues.length>0){
        setFieldValues({...FieldValues, Locality: LocationFullPath(LocationByID(LocationsValues,userContact.LOCALITY_ID*1))})
      }
    }
  },[LocationsValues])

  useEffect(() => {
    
    RawLocations().then((response)=>{
      setLocationsValues(response)
    }).catch((e:any)=>{
      console.log(e)
    })

    if(userContact){
      let ConvertedBirthdate = moment(userContact.BIRTHDAY).format("YYYY-MM-DD")
      setFieldValues({
        "Cellphone": userContact.CELLPHONE_NUMBER,
        "Birthdate": ConvertedBirthdate==='Invalid date'?'':ConvertedBirthdate,
        "Locality": "",
        "AddressStreet": userContact.ADDRESS_STREET,
        "AddressNumber": userContact.ADDRESS_NUMBER,
        "Apartment": userContact.APARTMENT
      })
    }

  },[userContact])

  const checkNewLevel = (response:boolean)=>{
    if (response){
      if (CurrentUserRol[0].level==1){
        setMessage1("Ha alcanzado un nuevo nivel de usuario")
        setMessage2("Nivel 2")
        showNewLevelAlert(true)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }else{
        setMessage1("Datos personales modificados")
        setMessage2("")
        showNewLevelAlert(true)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

  }

  return (<>
    <LayoutTitle>
      Mi Perfil
    </LayoutTitle>
    {newLevelAlert && <NewUserLevel close={showNewLevelAlert} message1={message1!} message2={message2!} />}
    <LayoutSection>
      <h1><BiUserCircle />Datos Personales</h1>
      <LayoutStackedPanel>
        <FormikFieldDummy name="CUIL" value={userData.cuil}/>
        <FormikFieldDummy name="Name" value={userData.name}/>
        <FormikFieldDummy name="LastName" value={userData.last_name}/>
      </LayoutStackedPanel>
      <hr className="-mt-4 mb-2"/>
      <LayoutStackedPanel>
        <LayoutSpacer/>
        {userRol[0].level===3?<></>:<Link to={Pages.DC_CONFIGURATIONS_NAMECHANGE}><FormikButton color="gray">Cambiar Nombre</FormikButton></Link>}
        <Link to={Pages.DC_CONFIGURATIONS_HOMEPASSWORDRESET}><FormikButton>Solicitar cambio de Contraseña <AiOutlineArrowRight/></FormikButton></Link>
      </LayoutStackedPanel>

      <h1 className="mt-4"><BiData/>Información Adicional</h1>
      <h2>Información de Contacto</h2>
      <LayoutStackedPanel className="-mt-2">
        <FormikFieldDummy name="Email" value={userData.email} className="flex-1"/>
        <Link to={Pages.DC_CONFIGURATIONS_EMAILCHANGE}><Button>Solicitar cambio de Email <AiOutlineArrowRight/></Button></Link>
      </LayoutStackedPanel>
      {(FieldValues)?<Formik
        initialValues={FieldValues}
        enableReinitialize={true}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={formGetValidations(FormRequiredFields).concat(yup.object({
          'Locality': yup.string()
            .test('is-valid', 'Debes seleccionar una localidad valida.', (value) => {
              if (value) {
                return LocationsFullPath(LocationsValues).includes(value);
              }
              return true;
            })
            .test('is-empty', 'El campo es obligatorio', (value) => !!value),
        }))}
        onSubmit={async (values: any) => {
          const LocationData = GetLocationByPath(LocationsValues, values.Locality);
          const SaveDataResponse = await SaveData({
            cuil: userData.cuil,
            birthday: moment(values.Birthdate).format('DD/MM/YYYY').toString(),
            cellphone_number: values.Cellphone,
            department_id: LocationData?.DEP_ID,
            locality_id: LocationData.ID,
            address_street: values.AddressStreet,
            address_number: values.AddressNumber,
            apartment: values.Apartment
          }, setFormState);
          checkNewLevel(SaveDataResponse.data.success)
        }}
      ><Form autoComplete="off">
        <FormikField name="Cellphone" disabled={FormState.loading}/>
        <h2 className="mt-4">Datos de Ubicación</h2>
        <FormikSearch name="Locality" disabled={FormState.loading || LocationsValues.length===0} data={LocationsFullPath(LocationsValues)} setValue={setLocations} />
        <LayoutStackedPanel>
          <FormikField name="AddressStreet" disabled={FormState.loading} className="flex-3"/>
          <FormikField name="AddressNumber" disabled={FormState.loading}/>
          <FormikField name="Apartment" disabled={FormState.loading}/>
        </LayoutStackedPanel>
        <h2 className="">Otros Datos Personales</h2>
        <FormikField name="Birthdate" disabled={FormState.loading}/>
        <LayoutStackedPanel>
          <LayoutSpacer/>
          <div><FormikButton disabled={false} type="submit">{FormState.loading ? <Spinner /> : "Guardar Cambios"}</FormikButton></div>
        </LayoutStackedPanel>
      </Form></Formik>:<Spinner color="primary"/>}
    </LayoutSection>
    <DC_Validation />
  </>);
}