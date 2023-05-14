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
import { FormElementBases } from "../../../../Modules/FormElements/Types";
import { FormElementBasesMenu } from "../../../../Modules/FormElements/Components/StyledComponents";

export const DA_Procedures_Forms_Create = () => {

  const [ fields, setFields ] = useState<any>([]);
  const [ jsona0, setJsona0 ] = useState<number>(0);
  const [ jsona, setJsona ] = useState<string>('{ "label": "Prueba", "required": true, "disabled": true, "length_min": 0, "length_max": 10, "value_min": 0, "value_max": 100, "value_default": "", "value_regex": "", "childrens": ""}');
  const [ jsona2, setJsona2 ] = useState<string>('[]');

  const addItem = (type:any) => {
    const newfield = new FormElement(type,{})
    setFields((prev: any)=>[...prev,newfield])
  }

  const update = () => {
    if(fields.length>0){
      const lastField = fields[jsona0];
      lastField.update(JSON.parse(jsona));
      console.log(lastField)
      const newFields = [...fields.slice(0, -1), lastField];
      setFields(newFields);
    }
  }

  const handleChange0 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJsona0(+event.target.value);
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsona(event.target.value);
  }


  useEffect(()=>{
    setJsona2(JSON.stringify(GetJSONData(fields)))

  },[fields])

  const Fields: {[key: string]: ElementInstance} = {
    Title: new ElementInstance("Title",new ElementSchema('TEXT',{label:'Ingresá el Título'},["isRequired"])),
    Subtitle: new ElementInstance("Subtitle",new ElementSchema('TEXT',{label:'Ingresá el Subtítulo'},["isRequired"])),
    Description: new ElementInstance("Description",new ElementSchema('TEXTAREA',{label:'Descripción'})),
    Keywords: new ElementInstance("Keywords",new ElementSchema('TEXT',{label:'Palabras Claves'},["isRequired"])),


    Prueba1: new ElementInstance("Prueba1",new ElementSchema("SPACER",{})),
    Prueba2: new ElementInstance("Prueba2",new ElementSchema("TEXT",{label:'hola',length_max:2},["isRequired"]),"no"),
    Prueba3: new ElementInstance("Prueba3",new ElementSchema("NUMBER",{ label:'ESTO ES UN CUIL'},["isCUIL"]),20390317213)
  }

  const initialValues = Object.entries(Fields).reduce((acc, [key, obj]) => ({ ...acc, [key]: obj.value }), {});


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
        validate={(values:any) => {
          const errors: { [key: string]: string } = {};

          for (const [key, value] of Object.entries(values)) {
            const validations = Fields[key].schema.validators();
            validations.forEach(valid=>{
              const error = valid(value);
              if (error){  errors[key] = error }
            })
          }
  
          return errors;
        }}
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
          ddd
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