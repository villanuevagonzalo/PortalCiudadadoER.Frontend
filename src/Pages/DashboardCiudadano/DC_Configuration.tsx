import { Form, Formik } from "formik";
import moment from "moment";
import * as yup from 'yup';
import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineCheckCircle } from "react-icons/ai";
import { BiData, BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import {  NavigatorSpacer, Spinner } from "../../Components/Elements/StyledComponents"
import { Button } from "../../Components/Forms/Button";
import { FormikField } from "../../Components/Forms/FormikField";
import { FormikFieldDummy } from "../../Components/Forms/FormikFieldDummy";
import { FormikSearch } from "../../Components/Forms/FormikSearch";
import { FieldGrid, LayoutTitle, LayoutSection, LayoutGridItem, LayoutListItem } from "../../Components/Layout/StyledComponents";
import { AuthContext } from "../../Contexts/AuthContext";
import { ILocation } from "../../Interfaces/Data";
import { formGetValidations } from "../../Interfaces/FormFields";
import { IFormState } from "../../Interfaces/Data";
import { DefaultFormState } from "../../Data/DefaultValues";
import { RawLocations, LocationsFullPath, LocationByID, LocationFullPath, GetLocationByPath } from "../../Utils/Locations"
import { BsBookmark, BsBookmarkCheck, BsBookmarkPlus, BsBookmarkStar, BsBookmarkX } from "react-icons/bs";


const FormRequiredFields = [
  'Cellphone',
  'Birthdate',
  'Locality',
  'AddressStreet',
  'AddressNumber',
  'Apartment'
];

export const DC_Configuration = () => {

  const { userData, userContact, userRol, SaveData, AFIP_getURL } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
  const [ ValidationFormState, setValidationFormState ] = useState<IFormState>(DefaultFormState);
  const [ LocationsValues, setLocationsValues ] = useState< ILocation[]>([]);
  const [ FieldValues, setFieldValues ] = useState<any>(null);

  const handleValidation2 = async () => {
    
  }
  
  const handleValidation3 = async () => {
    const Response = await AFIP_getURL({
      cuil: userData.cuil
    }, setValidationFormState);

    if(Response.status){
      window.location = Response.response.data;
    }
  }

  useEffect(() => {
    if(userContact){
      if(userContact.LOCALITY_ID!==0 && LocationsValues.length>0){
        setFieldValues({...FieldValues, Locality: LocationFullPath(LocationByID(LocationsValues,userContact.LOCALITY_ID))})
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
      <FieldGrid className="FlexSwitchMobile gap-4">
      <NavigatorSpacer/>
      {userRol[0].level==3?<></>:<Link to="NameChange"><Button color="gray">Cambiar Nombre</Button></Link>}
      <Link to="/RestaurarPassword"><Button>Solicitar cambio de Contraseña <AiOutlineArrowRight/></Button></Link>
      </FieldGrid>

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
        validationSchema={formGetValidations(FormRequiredFields).concat(yup.object({
          'Locality': yup.string().oneOf(LocationsFullPath(LocationsValues), "Debes seleccionar una localidad valida.")
        }))}
        onSubmit={async (values: any) => {
          const LocationData = GetLocationByPath(LocationsValues, values.Locality);
          const SaveDataResponse = await SaveData({
            cuil: userData.cuil,
            birthday: moment(values.Birthdate).format('DD/MM/YYYY').toString(),
            cellphone_number: values.Cellphone,
            department_id: LocationData?.DEP_ID,
            locality_id: LocationData?.ID,
            address_street: values.AddressStreet,
            address_number: values.AddressNumber,
            apartment: values.Apartment
          }, setFormState);
        }}
      ><Form autoComplete="off">
        <FormikField name="Cellphone" disabled={FormState.loading}/>
        <h2 className="mt-4">Datos de Ubicación</h2>
        <FormikSearch name="Locality" disabled={FormState.loading || LocationsValues.length==0} data={LocationsFullPath(LocationsValues)}/>
        <FieldGrid className="FlexSwitchForms">
          <FormikField name="AddressStreet" disabled={FormState.loading} className="flex-3"/>
          <FormikField name="AddressNumber" disabled={FormState.loading}/>
          <FormikField name="Apartment" disabled={FormState.loading}/>
        </FieldGrid>
        <h2 className="">Otros Datos Personales</h2>
        <FormikField name="Birthdate" disabled={FormState.loading}/>
        <FieldGrid className="FlexSwitchForms">
          <NavigatorSpacer/>
          <div><Button disabled={false} type="submit">{FormState.loading ? <Spinner /> : "Guardar Cambios"}</Button></div>
        </FieldGrid>
      </Form></Formik>:<Spinner color="primary"/>}
    </LayoutSection>
    <LayoutTitle>
      Niveles de Usuario
    </LayoutTitle>
    <LayoutSection>
      <LayoutListItem color="gray" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkCheck/></div>
        <div className="flex-1">
          <h1><b className="mr-2 ">Nivel 1 </b> Básico</h1>
          <h2>Usted ha validado su cuenta por medio de su correo electrónico.</h2>
        </div>
      </LayoutListItem>
      {userRol[0].level>1?<LayoutListItem color="primary" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkPlus/></div>
        <div className="flex-1">
          <h1><b className="mr-2">Nivel 2</b> Intermedio</h1>
          <h2>Usted ha completado su información adicional.</h2>
        </div>
      </LayoutListItem>:<LayoutListItem color="error" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkX/></div>
        <div className="flex-1">
          <h1><b className="mr-2">Nivel 2</b> Datos Personales</h1>
          <h2>Usted no ha completado su información adicional.</h2>
        </div>
        <div>
          <Button color="error" onClick={handleValidation2}>Completar<br/>Información</Button>
        </div>
      </LayoutListItem>}
      {userRol[0].level>2?
      <LayoutListItem color="secondary" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkStar/></div>
        <div className="flex-1">
          <h1><b className="mr-2">Nivel 3</b> Por Aplicación</h1>
          <h2>Usted ha terminado de validar su indentidad.</h2>
        </div>
      </LayoutListItem>:(userRol[0].level>1? <LayoutListItem color="error" className="FlexSwitchMobile">
        <div className="ListItemIcon"><BsBookmarkX/></div>
        <div className="flex-1">
          <h1><b className="mr-2">Nivel 3</b> Por Aplicación</h1>
          <h2>Usted no ha terminado de validar su indentidad.</h2>
        </div>

        <div>
          <Button color="error" onClick={handleValidation3} disabled={ValidationFormState.loading}>{ValidationFormState.loading ? <Spinner /> : "Validar"}</Button>
        </div>
      </LayoutListItem>:<LayoutListItem color="disabled">
        <div className="ListItemIcon"><BsBookmark/></div>
        <div className="flex-1">
          <h1><b className="mr-2">Nivel 3</b>. Por Aplicación</h1>
          <h2>Usted no ha completado su información adicional.</h2>
        </div>
      </LayoutListItem>)}
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
            <FormikField name="Cellphone" disabled={FormState.loading}/>
            <FormikField name="Birthdate" disabled={FormState.loading}/>
          </FieldGrid>
          <FormikField name="DepartmentID"/>
          <LayoutColumns className="gap-4">
            <NavigatorSpacer/><NavigatorSpacer/>
            <Button  disabled={FormState.loading}>Guardar Cambios</Button>
          </LayoutColumns>
        </Form>
      </Formik>

*/