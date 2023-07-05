import { LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../../../../Components/Layout/StyledComponents";
import { MdOutlineDataset, MdOutlineNewLabel } from "react-icons/md";
import { FormElement, GetJSONData } from "../../../../Modules/FormElements/OLDTYPES";
import { useEffect, useState } from "react";
import { Button } from "../../../../Components/Forms/Button";
import { Element } from "../../../../Modules/FormElements/Components/Element";
import { ElementInstance, ElementSchema } from "../../../../Modules/FormElements/Class";
import { Form, Formik } from "formik";
import { AiOutlineSave } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { ElementSchemaTypes, FormElementBases } from "../../../../Modules/FormElements/Types";
import { FormElementBasesMenu } from "../../../../Modules/FormElements/Components/StyledComponents";
import { ValidateForm } from "../../../../Modules/FormElements/Validators";
import { ElementEditor } from "../../../../Modules/FormElements/Components/ElementEditor";
import { FormFieldsPropertiesPopUp } from "../../../../Components/Forms/FormFieldsProperties";

export const DA_Procedures_Forms_Create = () => {

  const [ fields, setFields ] = useState<ElementInstance<ElementSchemaTypes>[]>([]);
  const [instance, setIntance] = useState<ElementInstance<ElementSchemaTypes>>()
  const [edit, setEdit] = useState(false)
  const [ index, setIndex] = useState<number>(0);
  const [ jsonproperties, setJsonproperties] = useState<string>('{ "label": "Prueba", "required": true, "disabled": true, "length_min": 0, "length_max": 10, "value_min": 0, "value_max": 100, "value_default": "", "value_regex": "", "childrens": ""}');
  const [ jsona2, setJsona2 ] = useState<string>('[]');

  const addItem = (type:any) => {
    //const newfield = new FormElement(type,{}) //FormElement es viejo, ahora hay que unser un ElementSchema 
    const newfield = new ElementInstance( fields.length.toString (),new ElementSchema(type,{label:'Ingresá el Título'},["isRequired"]))
    setFields((prev: any)=>[...prev,newfield])
    console.log(type)
  }

  /*
  Así accedo a los campos.

  fields[0].update(aca le mando el json con las propiedades, el json al formato lo tomo de)
  { "label": "Prueba", "required":"true"} 


  */


  const update = () => {
    if(fields.length>0){
      const someField = fields[index];
      someField.update(JSON.parse(jsonproperties));
    
    }
  }

  const handleIndexChange= (event: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(+event.target.value);
  }

  const handleJsonPropiertiesChanges = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonproperties(event.target.value);
  }

  const editarComponente =(schema:ElementInstance<ElementSchemaTypes> , indice:number)=> {

    setIntance(schema)
    setIndex(indice)
    setEdit(true)
    
  }
  useEffect(()=>{
    //setJsona2(JSON.stringify(GetJSONData(fields)))

  },[fields])

  const Fields: {[key: string]: ElementInstance<ElementSchemaTypes>} = {
    Title: new ElementInstance("Title",new ElementSchema('TEXT',{label:'Ingresá el Título'},["isRequired"])),
    Subtitle: new ElementInstance("Subtitle",new ElementSchema('TEXT',{label:'Ingresá el Subtítulo'},["isRequired"])),
    Description: new ElementInstance("Description",new ElementSchema('TEXTAREA',{label:'Descripción',length_max:100},["isRequired"])),
    Keywords: new ElementInstance("Keywords",new ElementSchema('TEXT',{label:'Palabras Claves'},["isRequired"])),
  }

  const initialValues = Object.entries(Fields).reduce((acc, [key, obj]) => ({ ...acc, [key]: obj.value }), {});

  if (edit){
    if (instance) {
      return(
      
        <FormFieldsPropertiesPopUp instance={instance} func={setEdit} index={index} fields={fields} />
          );
    } else {
      return null; // Otra opción es mostrar un mensaje de error o una carga condicional
    }
   

  }else{

    return(<>
      <LayoutSection>
        <h1><MdOutlineNewLabel />Datos Generales del Formulario</h1>
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={(e:any)=>{
            console.log(e)
          }}
          validate={(values:any) => ValidateForm(values, Fields)}
        >
        <Form autoComplete="off">
          <Element instance={Fields.Title}/>
          <Element instance={Fields.Subtitle}/>
          <Element instance={Fields.Description}/>
          <Element instance={Fields.Keywords}/>
  
          <LayoutStackedPanel>
            <LayoutSpacer/>
            <div><Button type="submit">
              Guardar <BiSave/>
            </Button></div>
          </LayoutStackedPanel>
        </Form>
        </Formik>
      </LayoutSection>
      <LayoutSection>
        <h1><MdOutlineDataset />Administrador de Campos</h1>
        <LayoutStackedPanel>
          <div className="flex-1 gap-1" style={{display:'flex', flexDirection:'column'}}>
          {/*  <h2 onClick={update}>Actualizar</h2>
            <input value={index} type="number" onChange={handleIndexChange}/>
            <textarea value={jsonproperties} onChange={handleJsonPropiertiesChanges} style={{width:'100%', height:'100px'}} />
        
          {fields.map((element:ElementInstance<ElementSchemaTypes>) => <ElementEditor key={element.name} instance={element} />)}
  */ }
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
        {fields.map((element: ElementInstance<ElementSchemaTypes>, index: number) => (
          <div key={element.name}  style={{display:"flex", flexDirection:"column", width:"auto", margin:"10px 0px 15px 0px"}}>
            <p style={{margin:"0px 0px 10px 0px"}}>{element.type}</p>
            <Element instance={element} />
            <div style={{display:"flex", flexDirection:"row", width:"auto", margin:"5px 0px 15px 0px"}}> 
              <Button onClick={() => editarComponente(element, index)}>Editar</Button>
            </div>
          </div>
        ))}  
          <LayoutStackedPanel>
            <LayoutSpacer/>
            <div style={{display:"flex", flexDirection:"row", width:"auto", margin:"10px 0px 15px 0px"}}> 
              <Button type="submit">Guardar <BiSave/></Button>
            </div>
          </LayoutStackedPanel>
        </Form>
        </Formik>
  
          </div>
          <div>
            <h2>Elementos</h2>
            <FormElementBasesMenu>{Object.entries(FormElementBases).map(([clave, element], index) => {
              return(<div key={clave} onClick={()=>addItem(clave)}>
                <span><element.icon/></span>
                <ul>
                  <li className="title"><p>{element.description}</p></li>
                </ul>
              </div>)
            })}</FormElementBasesMenu>
          </div>
        </LayoutStackedPanel>
      </LayoutSection>
  
    </>);
  }
 
}

/*



        <Element instance={Fields.Prueba1}/>
        <Element instance={Fields.Prueba2}/>
        <Element instance={Fields.Prueba3}/>


<Element name="Prueba" schema={schematest3}/>
      <Element name="Prueba2" schema={schematest4}/>
      <Element name="Prueba3" schema={schematest5}/>


<hr/>
      <ElementInstance element={new FormElement('NUMBER',{label:'Ingresá un titulo',value_max:2})}/>
      <ElementInstance element={new FormElement('TEXT',{label:'Ingresá el Subtítulo',required:true})}/>
      <ElementInstance element={new FormElement('TEXTAREA',{label:'Descripción',required:false})}/>
      <ElementInstance element={new FormElement('MAIL',{label:'mail',required:true})}/>
    <LayoutSection>
      <h1><MdOutlineNewLabel />Datos Generales del Formulario</h1>
      <ElementInstance element={new FormElement('TEXT',{label:'Ingresá el Título',required:true})}/>
      <ElementInstance element={new FormElement('TEXT',{label:'Ingresá el Subtítulo',required:true})}/>
      <ElementInstance element={new FormElement('TEXTAREA',{label:'Descripción',required:false})}/>
      <ElementInstance element={new FormElement('TEXT',{label:'Palabras Claves',required:true})}/>
    </LayoutSection>
    <LayoutSection>
      <h1><MdOutlineDataset />Administrador de Campos</h1>
      <LayoutStackedPanel>
        <div className="flex-1 gap-1" style={{display:'flex', flexDirection:'column'}}>
          <h2 onClick={update}>Actualizar</h2>
          <input value={jsona0} type="number" onChange={handleChange0}/>
          <textarea value={jsona} onChange={handleChange} style={{width:'100%', height:'100px'}} />
          <h2>Formulario Generado - EDICION</h2>
          {fields.map((element:FormElement<any>) => <BaseElementEditor key={element.id} element={element} />)}
          <hr/>
          <h2>Formulario Generado - CARGA DE DATOS</h2>
          {fields.map((element:FormElement<any>) => <ElementInstance key={element.id} element={element}/>)}
          <h2>Exportacion</h2>
          <textarea value={jsona2} style={{width:'100%', height:'100px'}} />
        </div>
        <div>
          <h2>Elementos</h2>
          <FormElementBasesMenu>{Object.entries(FormElementBases).map(([clave, element], index) => {
            return(<div key={clave} onClick={()=>addItem(clave)}>
              <span><element.icon/></span>
              <ul>
                <li className="title"><p>{element.description}</p></li>
              </ul>
            </div>)
          })}</FormElementBasesMenu>
        </div>
      </LayoutStackedPanel>
    </LayoutSection>

*/