import { ButtonHTMLAttributes, ChangeEvent, HTMLAttributes, useEffect, useState } from "react";
import { FormElement, FormElementInstance } from "../OLDTYPES";
import { ElementPropsMap, ElementSchemaTypes, FormElementBases, HelpToken } from "../Types";
import { ElementWrapper, BaseWrapperInfo, InputWrapper, ElementError, SelectWrapper, FileWrapper, CheckboxWrapper } from "./StyledComponents";
import { FormWrapperInput } from "../../../Components/Forms/StyledComponents";
import { AiOutlineCheckCircle, AiOutlineEyeInvisible } from "react-icons/ai";
import { ElementInstance, ElementSchema, FormInstance } from "../Class";
import { ErrorMessage, Form, Formik, getIn, useField, useFormikContext } from "formik";
import { validationFunctions } from "../Validators";
import { MdOutlineDataset, MdOutlineNewLabel, MdRadioButtonUnchecked } from "react-icons/md";
import { LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../../../Components/Layout/StyledComponents";
import {Element} from './Element';


interface Arguments {
    form:FormInstance<ElementSchemaTypes>;
  }

  export const FormElementShow: React.FC<Arguments> = ({form}) => {
    
    const initialValues = Object.entries(form.elements).reduce((acc, [key, obj]) => ({ ...acc, [key]: obj.value }), {});

    return (

        <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto", padding:"15px"}}>
            <LayoutSection>
                <h1><MdOutlineNewLabel />Datos Generales del Formulario</h1>
                <h2 style={{textAlign:"center"}}> {form.getTitle()} </h2>
                <h2>  {form.getSubtitle()} </h2>
                <h2> Descripción: {form.getDescription()} </h2>
                <h2> Keywords:{form.getKeywords()} </h2>
             </LayoutSection>    
            <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto"}}>
            <LayoutSection>
                <h1><MdOutlineDataset />Campos de formulario</h1>

                <Formik
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(e:any)=>{
                console.log(e)
            }}
            >
            <Form autoComplete="off">

            {form.elements.map((element: ElementInstance<ElementSchemaTypes>, index: number) => (
            <div key={element.name}  style={{display:"flex", flexDirection:"column", width:"auto", margin:"10px 0px 15px 0px"}}>
                <Element instance={element} />
            </div>
            ))}  
            <LayoutStackedPanel>
                <LayoutSpacer/>
                <div style={{display:"flex", flexDirection:"row", width:"auto", margin:"10px 0px 15px 0px"}}> 
                </div>
            </LayoutStackedPanel>
            </Form>
            </Formik>
            </LayoutSection> 
            </div>
            
            <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto"}}>

            </div>
        </div>
    )
  }