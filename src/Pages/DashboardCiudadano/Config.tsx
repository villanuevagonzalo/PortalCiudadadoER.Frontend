import { Form, Formik } from "formik";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiData, BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { DivLabel, FieldGrid, LayoutColumns, LayoutSection, LayoutTitle, NavigatorSpacer, Spinner } from "../../Components/Elements/StyledComponents"
import { Button } from "../../Components/Forms/Button";
import { FormikField } from "../../Components/Forms/FormikField";
import { FormikFieldDummy } from "../../Components/Forms/FormikFieldDummy";
import { FormikSearch } from "../../Components/Forms/FormikSearch";
import { AuthContext } from "../../Contexts/AuthContext";
import { ILocations } from "../../Interfaces/Data";
import { formGetInitialValues, formGetValidations } from "../../Interfaces/FormFields";
import { RawLocations, LocationsFullPath, LocationByID, LocationFullPath } from "../../Utils/LocationsFunctions"


const FormRequiredFields = [
  'Cellphone',
  'Birthdate',
  'Locality',
  'AddressStreet',
  'AddressNumber',
  'Apartment'
];

export const Dashboard_ConfigurationPage = () => {

  const { isLoading, userData, userContact, userRol, SaveData } = useContext(AuthContext);
  const [ LocationsValues, setLocationsValues ] = useState< ILocations[]>([]);
  const [ FieldValues, setFieldValues ] = useState<any>(null);

  useEffect(() => {
    if(userContact){
      if(userContact.LOCALITY_ID!==0 && LocationsValues.length>0){
      setFieldValues({...FieldValues, Locality: LocationFullPath(LocationByID(LocationsValues,userContact.LOCALITY_ID))})
    }}
  },[LocationsValues])


  useEffect(() => {
    RawLocations().then((response)=>{
      setLocationsValues(response)
    }).catch((e:any)=>{
      
    })

    if(userContact){   
      setFieldValues({
        "Cellphone": userContact.CELLPHONE_NUMBER,
        "Birthdate": moment(userContact.BIRTHDAY).format("YYYY-MM-DD"),
        "Locality": "",
        "AddressStreet": userContact.ADDRESS_STREET,
        "AddressNumber": userContact.ADDRESS_NUMBER,
        "Apartment": userContact.APARTMENT
      })
    }

  },[userContact])

  return (<>
    <LayoutTitle>
      Mi Perfil
    </LayoutTitle>
    <LayoutSection className="">
      <h1><BiUserCircle />Datos Personales</h1>
      <FieldGrid className="flexinput gap-4">
        <FormikFieldDummy name="CUIL" value={userData.cuil}/>
        <FormikFieldDummy name="Name" value={userData.name}/>
        <FormikFieldDummy name="LastName" value={userData.last_name}/>
      </FieldGrid>

      <h1 className="mt-4"><BiData/>Información Adicional</h1>
      <h2>Información de Contacto</h2>
      <FieldGrid className="flexinput gap-4 -mt-2 mb-2">
      <FormikFieldDummy name="Email" value={userData.email}/>
      <Link to="/Ingresar"><Button>Solicitar cambio de Email »</Button></Link>
      </FieldGrid>
      {(FieldValues)?<Formik
        initialValues={FieldValues}
        enableReinitialize={true}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={formGetValidations(FormRequiredFields)}
        onSubmit={async (values: any) => {
          const LoginResponse = await SaveData();
          
        }}
      ><Form autoComplete="off">
        <FormikField name="Cellphone" disabled={isLoading}/>
        <h2 className="mt-4">Datos de Ubicación</h2>
        <FormikSearch name="Locality" disabled={isLoading || LocationsValues.length==0} data={LocationsFullPath(LocationsValues)}/>
        <FieldGrid className="flexinput">
          <FormikField name="AddressStreet" disabled={isLoading}/>
          <FormikField name="AddressNumber" disabled={isLoading}/>
          <FormikField name="Apartment" disabled={isLoading}/>
        </FieldGrid>
        <h2 className="">Otros Datos Personales</h2>
        <FormikField name="Birthdate" disabled={isLoading}/>
        <FieldGrid className="flexinput gap-4">
          <NavigatorSpacer/>
          <div><Button disabled={false}>{isLoading ? <Spinner /> : "Guardar Cambios"}</Button></div>
        </FieldGrid>
      </Form></Formik>:<Spinner color="primary"/>}
    </LayoutSection>
    <LayoutTitle>
      Nivel de Usuario
    </LayoutTitle>
    <LayoutSection className="flex items-center gap-1 p-10">
        COMPLETAR
    </LayoutSection>
  </>)
}


/*


<Formik
        initialValues={FieldValues}
        enableReinitialize={true}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={formGetValidations(FormRequiredFields)}
        onSubmit={async (values: any) => {
          
        }}
      >
        <Form autoComplete="off">
          <FieldGrid className="flexinput">
            <FormikField name="Cellphone" disabled={isLoading}/>
            <FormikField name="Birthdate" disabled={isLoading}/>
          </FieldGrid>
          <FormikField name="DepartmentID"/>
          <LayoutColumns className="gap-4">
            <NavigatorSpacer/><NavigatorSpacer/>
            <Button  disabled={isLoading}>Guardar Cambios</Button>
          </LayoutColumns>
        </Form>
      </Formik>

*/