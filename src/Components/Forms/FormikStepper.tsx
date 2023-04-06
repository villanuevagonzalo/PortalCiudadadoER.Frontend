import { Form, Formik, FormikConfig, FormikValues } from "formik";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { NavigatorSpacer, NavigatorWrapper, Spinner } from "../Elements/StyledComponents";
import { Button } from "../Forms/Button";
import { Sleep } from "../../Utils/General";
import { IFormState } from "../../Interfaces/Data";

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
  afterFunction?: any;
  afterHTML?: any;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export interface FormikStepperProps extends FormikConfig<FormikValues>{
  FormState2: [IFormState, React.Dispatch<React.SetStateAction<IFormState>>];
  extraHTML?: any;
}

export function FormikStepper({ children, FormState2, extraHTML, ...props }:FormikStepperProps) {

  const [step, setStep] = useState(0);
  let [FormState, setFormState] = FormState2

  const childrenArray = React.Children.toArray(children).filter((e:any)=>e.type===FormikStep) as React.ReactElement<FormikStepProps>[];
  const currentChild = childrenArray[step];

  const isLastStep = () => step === childrenArray.length - 1;

  useEffect(() => {
    if(FormState.changing){
      if(!isLastStep() && !FormState.error){
        setStep((s) => s + 1);
      }
      setFormState(prev=>({...prev, changing:false}))
    }
  }, [FormState.changing])

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
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
            {currentChild}
            {extraHTML?extraHTML:<></>}
            <NavigatorWrapper>
                {step>0?<Button color="secondary" type="button" onClick={() => setStep((s) => s - 1)} fullwidth={false} disabled={FormState.loading}>
                    « Anterior
                </Button>:<></>}
                <NavigatorSpacer />
                {isLastStep()?
                <Button color="secondary" type="submit" fullwidth={false} disabled={FormState.loading}>
                  {FormState.loading ? <Spinner/> : 'Finalizar'}
                </Button>:
                <Button color="secondary" type="submit" fullwidth={false} disabled={FormState.loading}>
                  {FormState.loading ? <Spinner/> : 'Siguiente »'} 
                </Button>}
            </NavigatorWrapper>
            {currentChild.props.afterHTML?currentChild.props.afterHTML:<></>}
        </Form>
      )}
    </Formik>
  );
}