import { MdOutlineDataset, MdOutlineNewLabel } from "react-icons/md";
import { LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../../Components/Layout/StyledComponents";
import { ElementInstance, FormInstance } from "../FormElements/Class";
import { ElementSchemaTypes } from "../FormElements/Types";
import { Form, Formik } from "formik";
import {Element} from './../FormElements/Components/Element';
import { Button } from "../../Components/Forms/Button";

interface Arguments {
    form:FormInstance<ElementSchemaTypes>;
  }

  export const CiudadanoFormElement: React.FC<Arguments> = ({form}) => {
    
   
    const checkValues = () => {
        form.elements.map((element: ElementInstance<ElementSchemaTypes>, index: number) => {
            const jsonString = JSON.stringify(element.properties);
            const propertiesObj = JSON.parse(jsonString);
            const value = element.getValue()
            if (propertiesObj.required==true && value=="" ){
                console.log ("debe completar el campo: "+ element.properties.label)
            } 
        });
    };

    const initialValues = Object.entries(form.elements).reduce((acc, [key, obj]) => ({ ...acc, [key]: obj.value }), {});
    return (
        <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto", padding:"15px"}}>
            <LayoutSection style={{margin:"5px 0px 15px 0px"}}>
                <h1><MdOutlineNewLabel />Datos Generales del Formulario</h1>
             
                <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                    <h1>Título</h1>
                    <p>{form.getTitle()}</p>
                </LayoutSection>
                <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                    <h1>Subtítulo</h1>
                    <p>{form.getSubtitle()}</p>
                </LayoutSection>
                <LayoutSection style={{margin:"0px 0px 10px 0px", paddingTop:"10px", paddingBottom:"10px"}}>
                    <h1>Descripción</h1>
                    <p>{form.getDescription()} </p>
                </LayoutSection>
              
            </LayoutSection>    
            <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto"}}>
                <LayoutSection style={{margin:"5px 0px 15px 0px"}}>
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
                            </LayoutStackedPanel>
                        </Form>
                    </Formik>
                </LayoutSection> 
            </div>
            <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto"}}>
            <Button onClick={ () => checkValues()} >ENVIAR</Button>

            </div>
        </div>
    )
  }