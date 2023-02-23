import { Form, Formik } from "formik";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMail } from "react-icons/ai";
import { BiData, BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { DivLabel, NavigatorSpacer, Spinner } from "../../Components/Elements/StyledComponents"
import { Button } from "../../Components/Forms/Button";
import { FormikField } from "../../Components/Forms/FormikField";
import { FormikFieldDummy } from "../../Components/Forms/FormikFieldDummy";
import { FormikSearch } from "../../Components/Forms/FormikSearch";
import { FieldGrid, LayoutColumns, LayoutTitle, LayoutSection } from "../../Components/Layout/StyledComponents";
import { AuthContext } from "../../Contexts/AuthContext";
import { ILocations } from "../../Interfaces/Data";
import { formGetInitialValues, formGetValidations } from "../../Interfaces/FormFields";
import { RawLocations, LocationsFullPath, LocationByID, LocationFullPath, GetLocationByPath } from "../../Utils/Locations"


const FormRequiredFields = [
  'Cellphone',
  'Birthdate',
  'Locality',
  'AddressStreet',
  'AddressNumber',
  'Apartment'
];

export const Dashboard_ConfigurationPage = () => {

  const { isLoading, userData, userContact, userRol, SaveData, CheckToken } = useContext(AuthContext);
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
      <FieldGrid className="FlexSwitchForms gap-4">
        <FormikFieldDummy name="CUIL" value={userData.cuil}/>
        <FormikFieldDummy name="Name" value={userData.name}/>
        <FormikFieldDummy name="LastName" value={userData.last_name}/>
      </FieldGrid>
      <hr/>
      <Link to="/RestaurarPassword"><h3>Cambiar Contraseña »</h3></Link>

      <h1 className="mt-4"><BiData/>Información Adicional</h1>
      <h2>Información de Contacto</h2>
      <FieldGrid className="FlexSwitchForms gap-4 -mt-2 mb-2">
      <FormikFieldDummy name="Email" value={userData.email}/>
      <Link to="EmailChange"><Button>Solicitar cambio de Email <AiOutlineArrowRight/></Button></Link>
      </FieldGrid>
      {(FieldValues)?<Formik
        initialValues={FieldValues}
        enableReinitialize={true}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={formGetValidations(FormRequiredFields)}
        onSubmit={async (values: any) => {
          const LocationData = GetLocationByPath(LocationsValues, values.Locality);
          const SaveDataResponse = await SaveData({
            cuil: userData.cuil,
            birthday: moment(values.Birthdate).format('DD/MM/YYYY').toString(),
            cellphone_number: values.Cellphone,
            department_id: LocationData.DEP_ID,
            locality_id: LocationData.ID,
            address_street: values.AddressStreet,
            address_number: values.AddressNumber,
            apartment: values.Apartment
          });
        }}
      ><Form autoComplete="off">
        <FormikField name="Cellphone" disabled={isLoading}/>
        <h2 className="mt-4">Datos de Ubicación</h2>
        <FormikSearch name="Locality" disabled={isLoading || LocationsValues.length==0} data={LocationsFullPath(LocationsValues)}/>
        <FieldGrid className="FlexSwitchForms">
          <FormikField name="AddressStreet" disabled={isLoading} className="flex-3"/>
          <FormikField name="AddressNumber" disabled={isLoading}/>
          <FormikField name="Apartment" disabled={isLoading}/>
        </FieldGrid>
        <h2 className="">Otros Datos Personales</h2>
        <FormikField name="Birthdate" disabled={isLoading}/>
        <FieldGrid className="FlexSwitchForms">
          <NavigatorSpacer/>
          <div><Button disabled={false} type="submit">{isLoading ? <Spinner /> : "Guardar Cambios"}</Button></div>
        </FieldGrid>
      </Form></Formik>:<Spinner color="primary"/>}
    </LayoutSection>
    <LayoutTitle>
      Nivel de Usuario
    </LayoutTitle>
    <LayoutSection className="flex items-center gap-1 p-10">
      <h1><BiUserCircle />Básico</h1>
      <h2 className="-mt-3 ml-20 pl-1">Usted ha validado su cuenta por medio de su correo electrónico.</h2>
      <h1><BiUserCircle />Por Aplicación</h1>
      <h3 className="-mt-3 ml-20 pl-1">Usted ha validado su cuenta por medio de alguna de las aplicaciones que validan identidad.</h3>
      <h1><BiUserCircle />Presencial</h1>
      <h2 className="-mt-3 ml-20 pl-1">Usted ha validado su cuenta presencialmente.</h2>
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
          <FieldGrid className="FlexSwitchForms">
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