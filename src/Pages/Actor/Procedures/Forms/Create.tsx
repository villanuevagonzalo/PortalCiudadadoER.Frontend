import { RxDropdownMenu } from "react-icons/rx";
import { BaseField } from "../../../../Components/Fields/BaseField";
import { LayoutSection, LayoutSidebarMenu, LayoutSpacer, LayoutStackedPanel } from "../../../../Components/Layout/StyledComponents";
import { fields, FormFields } from "../../../../Interfaces/Fields";
import { MdOutlineDataset, MdOutlineNewLabel } from "react-icons/md";
import { FormElement } from "../../../../Modules/Fields/Types";
import { ElementBases } from "../../../../Modules/Fields/Props";
import { DivOutlined } from "../../../../Components/Elements/StyledComponents";
import { useEffect, useState } from "react";
import { Button } from "../../../../Components/Forms/Button";
import { FieldsBaseMenu } from "../../../../Modules/Fields/StyledComponents";
import { RiLayout4Fill } from "react-icons/ri";

export const DA_Procedures_Forms_Create = () => {

  


  const test = new FormElement('NUMBER', {})
  const test2= new FormElement('TEXT', {required: true})

  test.update(JSON.parse('{"required": 1}'))

  console.log(test, test2)

  /*console.log(fields)

  console.log(fields.createField('TEXT','hola',{
    min: 5
  }))

  console.log(FormFields)*/

  const [ fields, setFields ] = useState<any>([]);
  const [ jsona, setJsona ] = useState<string>('{"required": true}');

  const addItem = (type:any) => {
    const newfield = new FormElement(type)
    setFields((prev: any)=>[...prev,newfield])
  }

  const update = () => {
    if(fields.length>0){
      const lastField = fields[fields.length - 1];
      lastField.update(JSON.parse(jsona));
      const newFields = [...fields.slice(0, -1), lastField];
      setFields(newFields);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJsona(event.target.value);
  }
  

  useEffect(()=>{
    console.log('cambio algo')
  },[fields])

  return(<>
    <LayoutSection>
      <h1><MdOutlineNewLabel />Datos Generales del Formulario</h1>
    </LayoutSection>
    <LayoutSection>
      <h1><MdOutlineDataset />Administrador de Campos</h1>
      <LayoutStackedPanel>
        <div className="flex-1"><h2 onClick={update}>Formulario Generado</h2>
        <input value={jsona}  onChange={handleChange} />
        {fields.map((element:any, index:number)=>{
          return <DivOutlined key={index}>{element.type}<br/>{JSON.stringify(element.properties)}<br/>{JSON.stringify(element.options)}</DivOutlined>
        })}</div>
        <div><h2>Elementos</h2>
        <FieldsBaseMenu>{Object.entries(ElementBases).map(([clave, element], index) => {
          //console.log(element)
          return(<div key={clave} onClick={()=>addItem(clave)}>
            <span><element.icon/></span>
            <ul>
              <li className="title"><p>{element.description}</p></li>
            </ul>
          </div>)
        })}</FieldsBaseMenu></div>
    </LayoutStackedPanel>
      </LayoutSection>
  </>);
}