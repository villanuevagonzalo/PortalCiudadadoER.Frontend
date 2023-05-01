import { RxDropdownMenu } from "react-icons/rx";
import { BaseField } from "../../../../Components/Fields/BaseField";
import { LayoutSection, LayoutSidebarMenu, LayoutSpacer, LayoutStackedPanel } from "../../../../Components/Layout/StyledComponents";
import { fields, FormFields } from "../../../../Interfaces/Fields";
import { MdOutlineDataset, MdOutlineNewLabel } from "react-icons/md";
import { FormElement } from "../../../../Modules/Fields/Types";
import { ElementBases } from "../../../../Modules/Fields/Props";
import { DivOutlined } from "../../../../Components/Elements/StyledComponents";
import { useState } from "react";
import { Button } from "../../../../Components/Forms/Button";
import { FieldsBaseMenu } from "../../../../Modules/Fields/StyledComponents";
import { RiLayout4Fill } from "react-icons/ri";

export const DA_Procedures_Forms_Create = () => {

  
  const [ fields, setFields ] = useState<any>([]);

  const test = new FormElement('SECTION', {})
  const test2= new FormElement('TEXT', {required: true})

  test.update({label: 'test'})

  console.log(test, test2)

  /*console.log(fields)

  console.log(fields.createField('TEXT','hola',{
    min: 5
  }))

  console.log(FormFields)*/

  const addItem = (type:any) => {
    const newfield = new FormElement(type)
    console.log(fields, newfield)
    setFields((prev: any)=>[...prev,newfield])
  }

  const update = () => {
    fields[0].update({required: true})
  }

  return(<>
    <LayoutSection>
      <h1><MdOutlineNewLabel />Datos Generales del Formulario</h1>
    </LayoutSection>
    <LayoutSection>
      <h1><MdOutlineDataset />Administrador de Campos</h1>
      <LayoutStackedPanel>
        <div className="flex-1"><h2 onClick={update}>Formulario Generado</h2>
        {fields.map((element:any)=>{
          return <DivOutlined>{element.type}<br/>{JSON.stringify(element.properties)}<br/>{JSON.stringify(element.options)}</DivOutlined>
        })}</div>
        <div><h2>Elementos</h2>
        <FieldsBaseMenu>{Object.entries(ElementBases).map(([clave, element], index) => {
          console.log(element)
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