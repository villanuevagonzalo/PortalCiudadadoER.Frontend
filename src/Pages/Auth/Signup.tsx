import { useContext, useState } from 'react';
import { formGetValidations, formGetInitialValues } from "../../Interfaces/FormFields";
import { IFormState } from "../../Interfaces/Data";
import { DefaultFormState } from "../../Data/DefaultValues";
import { Link } from 'react-router-dom';
import { AuthAPI } from '../../Services/AuthAPI';
import { AuthContext } from '../../Contexts/AuthContext';
import { DivOutlined, DivLabel, DivSubtitle, DivTitle2, DivTitle } from '../../Components/Elements/StyledComponents';
import { Button } from '../../Components/Forms/Button';

import React from 'react';
import { FormikStep, FormikStepper } from '../../Components/Forms/FormikStepper';
import { FormikField } from '../../Components/Forms/FormikField';
import { FormikCaptcha } from '../../Components/Forms/FormikCaptcha';
import { CapitalizeWords } from '../../Utils/General';
import { GetMessage } from '../../Interfaces/MessageHandler';
import { FormikCheckbox } from '../../Components/Forms/FormikCheckbox';
import { Pages } from '../../Routes/Pages';
import { AxiosResponse } from 'axios';
    
const FormRequiredFields = [
  'CUIL',
  'Name',
  'LastName',
  'Password',
  'Password_Validation',
  'Email',
  'Email_Validation',
  'Captcha',
  'AcceptTerms',
  'prs_id',
  'Captcha'
]

const AxiosAuthAPI = new AuthAPI();

export const Auth_Signup = () =>{

  const { UserGetData, Signup } = useContext(AuthContext);

  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));
  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
  
  const [InitialData, setInitialData] = useState<boolean>(false);

  return(<>
      {(FormState.finish && !FormState.error)?<>
        <DivTitle className="mt-5 mb-2">¡Bien Hecho!</DivTitle>
        <DivSubtitle className='text-center'>Revisa tu correo electronico para validar tu cuenta y terminar tu proceso de registro.</DivSubtitle>
        <br/>
        <form>
        <DivLabel color="gray_tint">¿Tuviste algun problema?</DivLabel>
        <Link to={Pages.AUTH_EMAILRESENDVALIDATION}><Button disabled={FormState.loading} color="gray">
            No me llego ningun correo de validación                            
        </Button></Link>
        </form>
      </>:<>
        <DivTitle className="mt-5">Crear una Cuenta</DivTitle>
        <DivSubtitle className="text-center pb-2">Ingresá tus datos para registrarte en la plataforma</DivSubtitle>
        <FormikStepper
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}
          initialValues={FieldValues}
          onSubmit={async (values:any) =>{
            await Signup({
              cuil: values.CUIL,
              nombre: CapitalizeWords(values.Name),
              apellido: CapitalizeWords(values.LastName),
              email: values.Email_Validation,
              password: values.Password_Validation,
              prs_id: values.prs_id || "NOTFOUND",
              captcha: values.Captcha,
            }, setFormState)
          }}
          FormState2={[FormState, setFormState]}
          extraHTML={<DivOutlined open={FormState.error?true:false} className="mt-4">{FormState.error}</DivOutlined>}
        >
          <FormikStep
            label="CUIL"
            validationSchema={formGetValidations(['CUIL'])}
            afterFunction={async (values:any, ) =>{
              const response:any = await UserGetData({'cuil':values.CUIL}, setFormState);
              if(response.data){
                let userdata = response.data.data;
                setFieldValues({...values, 
                  Name: CapitalizeWords(userdata.Nombres), 
                  LastName: CapitalizeWords(userdata.Apellido), 
                  prs_id: userdata.prs_id
                });
                setInitialData(true)
              } else if(response.error.response.data.message==='Cuil not existing in DB'){
                setFormState((prev:any) => ({ ...prev, error: '' }));
                setInitialData(false)
              }
            }}
            afterHTML={<> 
              <br />
              <DivLabel>¿Ya te registraste?</DivLabel>
              <Link to={Pages.AUTH_LOGIN} className="w-full"><Button disabled={FormState.loading}>
                  Iniciar Sesión
              </Button></Link>
            </>}
          >
            <DivTitle2 className="mb-4">Paso 1</DivTitle2>
            <FormikField name="CUIL" autoFocus disabled={FormState.loading}/>
            <a href="https://www.anses.gob.ar/consultas/constancia-de-cuil" target="_blank"><DivLabel>
                No lo recuerdo / no tengo mi CUIL
            </DivLabel></a>
          </FormikStep>
          <FormikStep
            label="Datos Personales"
            validationSchema={formGetValidations(['Name','LastName'])}
          >
            <DivTitle2>Paso 2</DivTitle2>
            <DivSubtitle>Datos Personales</DivSubtitle>
            <FormikField name="CUIL" disabled={true} label="CUIL"/>
            {InitialData?<DivLabel className='-mt-2 mb-4'>Si tus datos no son correctos, podes modificarlos.</DivLabel>:<></>}
            <FormikField name="Name" autoFocus disabled={FormState.loading} label={InitialData?"Nombre/s":undefined}/>
            <FormikField name="LastName" disabled={FormState.loading} label={InitialData?"Apellido/s":undefined}/>
          </FormikStep>
          <FormikStep
            label="Email"
            validationSchema={formGetValidations(['Email','Email_Validation'])}
          >
            <DivTitle2>Paso 3</DivTitle2>
            <DivSubtitle>Datos de Contacto</DivSubtitle>
            <FormikField name="Email" autoFocus disabled={FormState.loading}/>
            <FormikField name="Email_Validation" disabled={FormState.loading}/>
          </FormikStep>
          <FormikStep
            label="Contraseña"
            validationSchema={formGetValidations(['Password','Password_Validation'])}
          >
            <DivTitle2>Paso 4</DivTitle2>
            <DivSubtitle>Contraseña</DivSubtitle>
            <FormikField name="Password" autoFocus disabled={FormState.loading}/>
            <FormikField name="Password_Validation" disabled={FormState.loading}/>
            <DivSubtitle><b>La contraseña debe contener:</b></DivSubtitle>
            <DivSubtitle className='-mt-3'>
              <li><span>8 Caracteres o más</span></li>
              <li><span>Como mínimo 4 letras</span></li>
              <li><span>Al menos una Letra Mayúscula</span></li>
              <li><span>Al menos una Letra Minúscula</span></li>
              <li><span>2 Números</span></li>
              <li><span>1 Caracter Especial</span></li>
            </DivSubtitle>
          </FormikStep>
          <FormikStep
            label="Final"
            validationSchema={formGetValidations(['Captcha','AcceptTerms'])}
          >
            <DivTitle2>Paso 5</DivTitle2>
            <DivSubtitle>Confirmación Final</DivSubtitle>
            <FormikCheckbox name="AcceptTerms"/>
            <FormikCaptcha name="Captcha" state={FormState}/>
          </FormikStep>
        </FormikStepper>
      </>}
  </>)
}