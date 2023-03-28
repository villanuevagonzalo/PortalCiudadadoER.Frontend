import { useContext, useRef, useState } from 'react';
import { formGetValidations, formGetInitialValues } from "../../Interfaces/FormFields";
import { IFormState } from "../../Interfaces/Data";
import { DefaultFormState } from "../../Data/DefaultValues";
import { Link } from 'react-router-dom';
import { AuthAPI } from '../../Services/AuthAPI';
import { AuthContext } from '../../Contexts/AuthContext';
import { DivOutlined, DivLabel, MainContainer, DivSubtitle, DivTitle2, DivTitle } from '../../Components/Elements/StyledComponents';
import { Button } from '../../Components/Forms/Button';

import React from 'react';
import { FormikStep, FormikStepper } from '../../Components/Forms/FormikStepper';
import { FormikField } from '../../Components/Forms/FormikField';
import { FormikCaptcha } from '../../Components/Forms/FormikCaptcha';
import { CapitalizeWords } from '../../Utils/General';
import { Descripcion } from '../../Components/Elements/Descripcion';
import { GetMessage } from '../../Interfaces/MessageHandler';
import { FormikCheckbox } from '../../Components/Forms/FormikCheckbox';
import { LayoutSidebar } from '../../Components/Layout/StyledComponents';
import { LayoutSidebarLogos } from '../../Components/Layout/LayoutSidebarLogos';
    
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
  'prs_id'
]

const AxiosAuthAPI = new AuthAPI();

export const RegisterPage = () =>{

  const ref:any = useRef(null);
  const { UserGetData, Signup } = useContext(AuthContext);

  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));
  const [FormState, setFormState] = useState<IFormState>(DefaultFormState);
  
  const [InitialData, setInitialData] = useState<boolean>(false);

  const setError = (errormessage:string) => setFormState(prev=>({...prev, error:errormessage}))

  return(<>
    <LayoutSidebar>
      <LayoutSidebarLogos/>
      {(FormState.finish && !FormState.error)?<>
        <DivTitle className="mt-5 mb-2">¡Bien Hecho!</DivTitle>
        <DivSubtitle className='text-center'>Revisa tu correo electronico para validar tu cuenta y terminar tu proceso de registro.</DivSubtitle>
        <br/>
        <form>
        <DivLabel>¿Ya validaste tu correo electrónico?</DivLabel>
        <Link to="/Ingresar" className="w-full"><Button disabled={FormState.loading}>
            Iniciar Sesión
        </Button></Link>
        <DivLabel color="gray_tint">¿Tuviste algun problema?</DivLabel>
        <Link to="/EmailVerification"><Button disabled={FormState.loading} color="gray">
            No me llego ningun correo de validación                            
        </Button></Link>  
        <Link to="/RestaurarPassword"><Button disabled={FormState.loading} color="gray">
            No recuerdo mi contraseña                
        </Button></Link>
        </form>
      </>:<>
        <DivTitle className="mt-5">Crear una Cuenta</DivTitle>
        <DivSubtitle className="text-center pb-2">Ingresá tus datos para registrarte en la plataforma</DivSubtitle>
        <FormikStepper
          innerRef={ref}
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
              prs_id: values.prs_id || "NOTFOUND"
            }, setFormState)
          }}
          FormState2={[FormState, setFormState]}
          extraHTML={<DivOutlined open={FormState.error?true:false} className="mt-4">{FormState.error}</DivOutlined>}
        >
          <FormikStep
            label="CUIL"
            validationSchema={formGetValidations(['CUIL'])}
            afterFunction={async (values:any, ) =>{

              const response = await UserGetData({'cuil':ref.current.values.CUIL}, setFormState);

              if(response.status){
                console.log(response)
                let userdata = response.response.data;
                
                setFieldValues({...values, 
                  Name: CapitalizeWords(userdata.Nombres), 
                  LastName: CapitalizeWords(userdata.Apellido), 
                  prs_id: userdata.prs_id
                });
                setInitialData(true)

              } else if(response.message==GetMessage('Bad Cuil')){
                setInitialData(false)
                setFormState((prev:any) => ({ ...prev, error: '' }));
              }

/*
              await AxiosAuthAPI.UserGetData({'cuil':ref.current.values.CUIL}).then((response)=>{
                let userdata = response.data
                console.log(response)
                setFieldValues({...values, 
                  Name: CapitalizeWords(userdata.Nombres), 
                  LastName: CapitalizeWords(userdata.Apellido), 
                  prs_id: userdata.prs_id
                });
                setInitialData(false)
                setError('')
              }).catch((e:any)=>{
                let messageerror = e.response.data.message;
                if(messageerror=='Bad Cuil'){
                  setInitialData(false)
                  setError('')
                } else{
                  setError(GetMessage(messageerror))
                }
              })*/
            }}
            afterHTML={<> 
              <br />
              <DivLabel>¿Ya te registraste?</DivLabel>
              <Link to="/Ingresar" className="w-full"><Button disabled={FormState.loading}>
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
            {InitialData?<DivLabel className='-mt-2 mb-4'>¿Tus datos estan mal? ¡Corrígelos!</DivLabel>:<></>}
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
          </FormikStep>
          <FormikStep
            label="Final"
            validationSchema={formGetValidations(['Captcha','AcceptTerms'])}
          >
            <DivTitle2>Paso 5</DivTitle2>
            <DivSubtitle>Confirmación Final</DivSubtitle>
            <FormikCheckbox name="AcceptTerms"/>
            <FormikCaptcha name="Captcha"/>
            <FormikCheckbox name="Captcha" hidden/>
          </FormikStep>
        </FormikStepper>
      </>}                          
    </LayoutSidebar>
    <MainContainer>
      <Descripcion />
    </MainContainer>
  </>)
}