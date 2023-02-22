import { useContext, useEffect, useRef, useState } from 'react';
import { formGetValidations, formGetInitialValues, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link } from 'react-router-dom';
import { AuthAPI } from '../../Config/AuthAPI';
import { AuthContext } from '../../Contexts/AuthContext';
import { DivOutlined, DivLabel, MainContainer, Sidebar, SidebarBurger, DivSubtitle, DivTitle2, DivTitle, ToDo } from '../../Components/Elements/StyledComponents';
import { Button } from '../../Components/Forms/Button';
import { LogoCiudadanoDigital } from '../../Components/Images/LogoCiudadanoDigital';

import React from 'react';
import { FormikStep, FormikStepper } from '../../Components/Forms/FormikStepper';
import { FormikField } from '../../Components/Forms/FormikField';
import { FormikCaptcha } from '../../Components/Forms/FormikCaptcha';
import { CapitalizeWords } from '../../Utils/General';
import { Descripcion } from '../../Components/Elements/Descripcion';
import { GetMessage } from '../../Interfaces/MessageHandler';
import { LogoER } from '../../Components/Images/LogoEntreRios';
import { FormikCheckbox } from '../../Components/Forms/FormikCheckbox';
import { LayoutCenterBox, LayoutColumns, LayoutSidebar } from '../../Components/Layout/StyledComponents';
    
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
  const { Signup } = useContext(AuthContext);

  const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));
  const [formState, setFormState] = useState<FormStateProps>(FormStateDefault);
  
  const [InitialData, setInitialData] = useState<boolean>(false);

  const setError = (errormessage:string) => setFormState(prev=>({...prev, error:errormessage}))

  const handleFinish = ()=>{
    setFormState(prev=>({...prev, finish:!formState.finish, error:''}))
  }
    
  return(<>
    <LayoutSidebar>
      <LayoutColumns className="mb-8">
        <LogoER width="150px" />
      </LayoutColumns>
      
      <LayoutCenterBox maxwidth="400px">
        <LogoCiudadanoDigital/>
      </LayoutCenterBox>
        {(formState.finish && !formState.error)?<>
            <DivTitle className="mt-5 mb-2">¡Bien Hecho!</DivTitle>
            <DivSubtitle className='text-center'>Revisa tu correo electronico para validar tu cuenta y terminar tu proceso de registro.</DivSubtitle>
            <br/>
            <DivLabel color="gray_tint">¿Tuviste algun problema?</DivLabel>
            <Button disabled={formState.loading} color="gray" className="w-full">
                No me llego ningun correo de validación                            
            </Button>  
            <Link to="/RestaurarPassword" className="w-full"><Button disabled={formState.loading} color="gray">
                No recuerdo mi contraseña                
            </Button></Link>
        </>:<>
        <DivTitle onClick={handleFinish} className="mt-5">Crear una Cuenta</DivTitle>
        <DivSubtitle className="text-center pb-2">Ingresá tus datos para registrarte en la plataforma</DivSubtitle>
        <FormikStepper
            innerRef={ref}
            initialValues={FieldValues}
            onSubmit={async (values:any) =>{
                console.log(values)
                await Signup({
                    cuil: values.CUIL,
                    nombre: values.Name,
                    apellido: values.LastName,
                    email: values.Email_Validation,
                    password: values.Password_Validation,
                    prs_id: values.prs_id || "NOTFOUND"
                }, setFormState)
            }}
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={false}
            formState2={[formState, setFormState]}
            extraHTML={formState.error?<><DivOutlined open={formState.error?true:false} className="mt-4">{formState.error}</DivOutlined></>:<></>}
        >
            <FormikStep
                label="CUIL"
                validationSchema={formGetValidations(['CUIL'])}
                afterFunction={async (values:any, ) =>{
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
                    })
                }}
                afterHTML={<> 
                  <br />
                    <DivLabel>¿Ya te registraste?</DivLabel>
                    <Link to="/Ingresar" className="w-full"><Button disabled={formState.loading}>
                        Iniciar Sesión
                    </Button></Link>
                </>}
            >
                <DivTitle2 className="mb-4">Paso 1</DivTitle2>
                <FormikField name="CUIL" autoFocus disabled={formState.loading}/>
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
                <FormikField name="Name" autoFocus disabled={InitialData || formState.loading} label={InitialData?"Nombre/s":undefined}/>
                <FormikField name="LastName" disabled={InitialData || formState.loading} label={InitialData?"Apellido/s":undefined}/>
                {InitialData?<DivLabel>¿Tus datos estan mal?</DivLabel>:<></>}
            </FormikStep>
            <FormikStep
                label="Email"
                validationSchema={formGetValidations(['Email','Email_Validation'])}
            >
                <DivTitle2>Paso 3</DivTitle2>
                <DivSubtitle>Datos de Contacto</DivSubtitle>
                <FormikField name="Email" autoFocus disabled={formState.loading}/>
                <FormikField name="Email_Validation" disabled={formState.loading}/>
            </FormikStep>
            <FormikStep
                label="Contraseña"
                validationSchema={formGetValidations(['Password','Password_Validation'])}
            >
                <DivTitle2>Paso 4</DivTitle2>
                <DivSubtitle>Contraseña</DivSubtitle>
                <FormikField name="Password" autoFocus disabled={formState.loading}/>
                <FormikField name="Password_Validation" disabled={formState.loading}/>
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
        <br />
                          
    </LayoutSidebar>
    <MainContainer>
        <Descripcion />
    </MainContainer>
  </>)
}