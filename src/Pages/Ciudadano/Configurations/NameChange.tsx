import { useContext, useState } from 'react';
import { formGetValidations, formGetInitialValues } from "../../../Interfaces/FormFields";
import { IFormState } from "../../../Interfaces/Data";
import { DefaultFormState } from "../../../Data/DefaultValues";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthContext';
import { Spinner, DivOutlined, NavigatorSpacer } from '../../../Components/Elements/StyledComponents';
import { Button } from '../../../Components/Forms/Button';
import { Formik, Form } from 'formik';
import { FormikField } from '../../../Components/Forms/FormikField';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { FieldGrid, LayoutSection, LayoutTitle } from '../../../Components/Layout/StyledComponents';
import { CountDown } from '../../../Components/Elements/CountDown';
import moment from 'moment';
import { BiUserCircle } from 'react-icons/bi';
import { CapitalizeWords } from '../../../Utils/General';
import { Pages } from '../../../Routes/Pages';

const FormRequiredFields = [
  'Name',
  'LastName'
]

export const DC_Configurations_NameChange = () => {

  const { UserNameChange, userData, userRol } = useContext(AuthContext);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState);
  const [ FieldValues, setFieldValues ] = useState(formGetInitialValues(FormRequiredFields));

  let errors = FormState.error.split(' | ');
  
  return (<>
    <LayoutTitle>
      Mi Perfil
    </LayoutTitle>
    <LayoutSection>
    <h1><BiUserCircle className='small'/>Cambiar Datos Personales</h1>
    {userRol[0].level===3?<>
    
      <DivOutlined className="flex-col">
      <b className='mb-2'>Tu identidad ya ha sido validada.</b>
      Para cambiar tus datos personales por favor contactese con soporte.
      </DivOutlined>
    
    </>:
      FormState.finish?<>
        <DivOutlined className="mt-0 flex-col" color="secondary">
          <b className='mb-2'>¡Se han actualizado tus Datos Personales!</b>
          <span className='text-sm'>Por favor aguarda <CountDown time={300} onFinish={()=>setFormState(prev=>({...prev, finish:false}))}/> minutos antes de solicitar un nuevo cambio de nombre.</span>
        </DivOutlined>
      </>:<>
        <div className="-mt-2 text-sm mb-2">Ingresa tus datos de Nombre y Apellido corregidos.</div>
        <Formik
          enableReinitialize={true}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{Name: userData.name, LastName: userData.last_name}}
          validationSchema={formGetValidations(FormRequiredFields)}
          onSubmit={(values:any) => {
            UserNameChange({
              cuil: userData.cuil,
              name: CapitalizeWords(values.Name),
              last_name: CapitalizeWords(values.LastName)
            }, setFormState)
          }}
        ><Form autoComplete="off">          
          <FormikField name="Name" disabled={FormState.loading || errors.length>1} autoFocus label='Nombre/s'/>
          <FormikField name="LastName" disabled={FormState.loading || errors.length>1} label='Apellido/s'/>
          <FieldGrid className="FlexSwitchForms">
            <NavigatorSpacer/>
            <div><Button disabled={FormState.loading || errors.length>1} type="submit">
              {FormState.loading ? <Spinner/> : <>Cambiar Datos Personales</>}
            </Button></div>
          </FieldGrid>
        <DivOutlined open={FormState.error?true:false} className="mt-4 flex-col">
          {errors.length>1?<>
            <b className='mb-2'>{errors[1]} <CountDown time={moment.duration('00:'+errors[2]).asSeconds()} onFinish={()=>setFormState(prev=>({...prev, error:''}))}/> minutos</b>
            {errors[0]}
          </>:FormState.error}
        </DivOutlined>
          
        </Form></Formik>
      </>}
      <hr className=''/>
      <FieldGrid className="FlexSwitchForms">
        <Link to={Pages.DC_CONFIGURATIONS}><Button disabled={FormState.loading || errors.length>1} color="gray">
              <AiOutlineArrowLeft/>Volver a <b className='-ml-1'>Mi Perfil</b>                                
          </Button></Link>
        <NavigatorSpacer/>
      </FieldGrid>
    </LayoutSection>
  </>);
}