import { Form, Formik, FormikConfig, FormikValues } from "formik";
import React from "react";
import { useState } from "react";
import { NavigatorSpacer, NavigatorWrapper, Spinner } from "../Elements/StyledComponents";
import { Button } from "../Forms/Button";

import { FormStateProps } from "../../Interfaces/FormFields";

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
  const [formState, setFormState] = formState2

  const childrenArray = React.Children.toArray(children).filter((e:any)=>e.type===FormikStep) as React.ReactElement<FormikStepProps>[];
  const currentChild = childrenArray[step];

  const isLastStep = () => step === childrenArray.length - 1;

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={ async (values, helpers) => {
        setFormState(prev=>({...prev, loading:true}))
        if(currentChild.props.afterFunction){
          await currentChild.props.afterFunction(values, helpers)
                                  .then((e:any)=>{
                                      //props.setstate(pages.length-currentPage-1?currentPage+1:pages.length-1)
                                  })
                                  .catch((e:any)=>{
                                      console.log(e)
                                  })
        }
        if(isLastStep()){
          //await props.onSubmit(values, helpers);
          setFormState(prev=>({...prev, finish:true}))
        } else{
          setStep((s) => s + 1);
        }
        setFormState(prev=>({...prev, loading:false}))
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