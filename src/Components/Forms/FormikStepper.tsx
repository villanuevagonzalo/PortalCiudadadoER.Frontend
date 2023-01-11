import { Form, Formik, FormikConfig, FormikValues } from "formik";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { NavigatorSpacer, NavigatorWrapper, Spinner } from "../Elements/StyledComponents";
import { Button } from "../Forms/Button";

import { FormStateProps } from "../../Interfaces/FormFields";
import { Sleep } from "../../Utils/generalFunctions";

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
  afterFunction?: any;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export interface FormikStepperProps extends FormikConfig<FormikValues>{
  formState2: [FormStateProps, React.Dispatch<React.SetStateAction<FormStateProps>>]
}

export function FormikStepper({ children, formState2, ...props }:FormikStepperProps) {

  const [step, setStep] = useState(0);
  let [formState, setFormState] = formState2
  let temperror = '';

  const childrenArray = React.Children.toArray(children).filter((e:any)=>e.type===FormikStep) as React.ReactElement<FormikStepProps>[];
  const currentChild = childrenArray[step];

  const isLastStep = () => step === childrenArray.length - 1;

  const setError = useCallback(
    () => {
      console.log(test)
    },
    [formState.changing],
  )
  

  useEffect(() => {
    if(formState.changing){
      console.log(formState)
      if(!isLastStep() && !formState.error){
        setStep((s) => s + 1);
      }
      setFormState(prev=>({...prev, changing:false}))
    }
  }, [formState.changing])


  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={ async (values, helpers, test=true) => {        
        setFormState(prev=>({...prev, loading:true}))
        if(currentChild.props.afterFunction){
          await currentChild.props.afterFunction(values, helpers).then(()=>setFormState(prev=>({...prev, changing:true})))
        } else{
          setFormState(prev=>({...prev, changing:true}))
        }
        if(isLastStep()){
          await props.onSubmit(values, helpers);
          setFormState(prev=>({...prev, finish:true}))
        }
        setFormState(prev=>({...prev, loading:false}))

        /*
        setFormState(prev=>({...prev, loading:true}))
        if(currentChild.props.afterFunction){
          await currentChild.props.afterFunction(values, helpers)
                                  .then((e:any)=>{
                                    console.log('AFTERFUNCION THEN', e)
                                    console.log('ERRORS: ',formState2[0].error)
                                      //props.setstate(pages.length-currentPage-1?currentPage+1:pages.length-1)
                                  })
                                  .catch((e:any)=>{
                                    console.log('AFTERFUNCION CATG', e)
                                      console.log(e)
                                  })
        }
        if(isLastStep()){
          await props.onSubmit(values, helpers);
          setFormState(prev=>({...prev, finish:true}))
        } else{
          console.log('LOS ESTEPES', formState)
          setStep((s) => s + 1);
        }
        setFormState(prev=>({...prev, loading:false}))*/


      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
            {currentChild}
            <NavigatorWrapper>
                {step>0?<Button color="gray" type="button" onClick={() => setStep((s) => s - 1)} fullwidth={false} disabled={formState.loading}>
                    « Anterior
                </Button>:<></>}
                <NavigatorSpacer />
                {isLastStep()?
                <Button color="secondary" type="submit" fullwidth={false} disabled={formState.loading}>
                  {formState.loading ? <Spinner/> : 'Finalizar'}
                </Button>:
                <Button color="gray" type="submit" fullwidth={false} disabled={formState.loading}>
                  {formState.loading ? <Spinner/> : 'Siguiente »'} 
                </Button>}
            </NavigatorWrapper>
        </Form>
      )}
    </Formik>
  );
                }