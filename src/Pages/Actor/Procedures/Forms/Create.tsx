import { RxDropdownMenu } from "react-icons/rx";
import { BaseField } from "../../../../Components/Fields/BaseField";
import { LayoutSection, LayoutSidebarMenu, LayoutSpacer, LayoutStackedPanel } from "../../../../Components/Layout/StyledComponents";
import { fields, FormFields } from "../../../../Interfaces/Fields";
import { MdOutlineDataset, MdOutlineNewLabel } from "react-icons/md";
import { FormElement, FormElementInstance, GetJSONData } from "../../../../Modules/FormElements/Types";
import { FormElementBases } from "../../../../Modules/FormElements/Props";
import { DivOutlined } from "../../../../Components/Elements/StyledComponents";
import { useEffect, useState } from "react";
import { Button } from "../../../../Components/Forms/Button";
import { FormElementBasesMenu } from "../../../../Modules/FormElements/Components/StyledComponents";
import { RiLayout4Fill } from "react-icons/ri";
import { BaseElementEditor } from "../../../../Modules/FormElements/Components/BaseElementEditor";
import { ElementInstance } from "../../../../Modules/FormElements/Components/ElementInstance";

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
  
  return(<>
    <LayoutSection>
      <h1><MdOutlineNewLabel />Datos Generales del Formulario</h1>
      <ElementInstance element={new FormElement('NUMBER',{label:'Ingresá un titulo',value_max:2})}/>
      <ElementInstance element={new FormElement('TEXT',{label:'Ingresá el Subtítulo',required:true})}/>
      <ElementInstance element={new FormElement('TEXTAREA',{label:'Descripción',required:false})}/>
      <ElementInstance element={new FormElement('MAIL',{label:'mail',required:true})}/>
    </LayoutSection>
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
  </>);
}