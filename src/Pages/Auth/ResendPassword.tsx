import { useContext, useRef, useState, useEffect } from 'react';
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { DivLabel, MainContainer, Sidebar, Spinner, DivSubtitle, DivTitle, ToDo } from '../../Components/Elements/StyledComponents';
import { LogoCiudadanoDigital } from '../../Components/Images/LogoCiudadanoDigital';
import { Button } from '../../Components/Forms/Button';
import { Formik, Form } from 'formik';
import { FormikField } from '../../Components/Forms/FormikField';
import { AiOutlineLock } from 'react-icons/ai';
import { Descripcion } from '../../Components/Elements/Descripcion';
import { useNavigate } from 'react-router-dom';
import { GetParams } from '../../Utils/GeneralFunctions';
import { AuthAPI } from '../../Config/AuthAPI';

const AxiosAuthAPI = new AuthAPI();


const FormRequiredFields = [
    'Password',
    'Password_Validation',
]  


export const ResendPassword = () => {

    const navigate = useNavigate();

    const SearchParams = GetParams(["token"]);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const ref:any = useRef(null);
    const { UpdatePassword } = useContext(AuthContext);
    const [formState, setFormState] = useState<FormStateProps>(FormStateDefault);
    const [FieldValues, setFieldValues] = useState(formGetInitialValues(FormRequiredFields));

    // const PasswrodSave = async () => {
    //     debugger;
    //     await AxiosAuthAPI.UserPasswordSave({
    //         'token': SearchParams.values.token,
    //         'new_password': '',
    //     }).then((response)=>{
    //         setIsSuccess((response.statusText == "OK"))
    //         debugger;
    //         console.log(response)
    //     }).catch((reason)=>{
    //         console.log(reason)
    //         setIsSuccess(!(reason.response.data.code == 0))
    //     })
    //     setIsLoading(false)
    // }

    // useEffect(() => {
    //      debugger;
    //     if(SearchParams.status){
    //         PasswrodSave() 
    //     }
    // }, [])



    return (
    <>
    <Sidebar>
        <LogoCiudadanoDigital/>
        <br />
        {
            SearchParams.status ? 
            <>
            {
                isLoading ? 
                <>
                </>:
                <>
                {
                    isSuccess ?
                    <>
                        <DivTitle>Restablecer Contraseña<AiOutlineLock/></DivTitle>
                        <Formik
                            innerRef={ref}
                            initialValues= {FieldValues}
                            validationSchema={formGetValidations(FormRequiredFields)}
                            onSubmit={async(values:any) => {
                            setFormState(prev=>({...prev, loading:true}))
                                console.log(values)
                                debugger;
                            const UpdatePasswordResponse = await UpdatePassword({
                                token: SearchParams.values.token,
                                new_password: values.Password,
                            })
                            debugger;
                            console.log(UpdatePasswordResponse)
                            
                            if(UpdatePasswordResponse.status){
                                await setFormState(prev=>({...prev, error:''}))
                                navigate("/");
                            } else{
                                setFormState(prev=>({...prev, error:UpdatePasswordResponse.message}))
                            }
                            setFormState(prev=>({...prev, loading:false}))
                            }}
                            >
                            <Form autoComplete="off">
                                <FormikField name="Password" disabled={formState.loading}/>
                                <FormikField name="Password_Validation" disabled={formState.loading}/>
                                <Button disabled={formState.loading} type="submit">
                                    {formState.loading ? <Spinner/> : 'Cambiar contraseña'}                                
                                </Button>
                            </Form>
                        </Formik>
                    </>:
                    <>
                    </>
                }
                </>
            }
            </>:
            <>
                <DivTitle>Restablecer Contraseña<AiOutlineLock/></DivTitle>
                <br/>
                <DivSubtitle className='text-center'>Se ha enviado a su casilla de correo un enlace para restablecer su contraseña</DivSubtitle>
            </>

        }
    </Sidebar>
    <MainContainer>
        <Descripcion />
    </MainContainer>
    </>
    )
}