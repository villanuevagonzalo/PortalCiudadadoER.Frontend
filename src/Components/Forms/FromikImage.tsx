import { ErrorMessage, Field, useField, useFormikContext } from "formik";
import { FormError, FormWrapper, FormWrapperInput } from "./StyledComponents";
import { useState } from "react";


interface Props{
    name: string;
    autoFocus?: boolean;
    hidden?: boolean;
    disabled?: boolean;
    component?: React.Component;
    label?: string;
    className?: string;
}

export const FormikImage = ({...props}: Props) => {

    const[Image, setImage] = useState<File | null>(null);

    const [ field ] = useField(props.name)

    const { setFieldValue } = useFormikContext();

    function onChange(event:any) {

      setImage(event.currentTarget.files[0])
      setFieldValue('AttachmentTest',event.currentTarget.files[0])

      console.log(event)

      //setFieldValue(field.name,"hola")

      /*
        try{
            const file = event.currentTarget.files[0];
            setFieldValue(field.name,file)
        } catch(e){
            console.log(e)
        }*/
        
        // console.log("Image file:", file);
        // const reader = new FileReader();
        // reader.onload = () => {
        //   setImage(reader.result as string);
        // };
        // reader.readAsDataURL(file);
        
        // console.log("Image value:", reader.result);
      }


      return (
        <FormWrapper className={props.className}>
            <FormWrapperInput error={false} disabled={props.disabled} focus={true}>
                <div>
                    <label htmlFor={props.name}>{props.label}</label>
                    <input type="file" autoFocus={props.autoFocus} {...field} {...props} onChange={onChange}/>
                    {/* {image && (
                        <img src={`data:image/jpeg;base64,${image}`} alt="preview" style={{ maxWidth: "100%" }} />
                        )
                    } */}
                </div>
            </FormWrapperInput>
            <ErrorMessage name={props.name} component={FormError}/>
        </FormWrapper>
      )

}