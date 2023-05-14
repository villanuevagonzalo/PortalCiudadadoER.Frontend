import { InputHTMLAttributes } from "react";
import { InputWrapper } from "../StyledComponents"
import { ElementSchema } from "../../Class";
import { ElementSchemaTypes } from "../../Types";

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  schema: ElementSchema<ElementSchemaTypes>;
}

export const Input: React.FC<Props> = ({ name, schema, ...props }) => {

  return (<InputWrapper>
              <div>
                
                <label htmlFor={name}>{'label' in schema.properties?schema.properties.label:"test"}</label>
                {/*<input type={basetype.format||""} onChange={runValidations}/>
                <div className="FormIcon"><basetype.icon /></div>*/}
              </div>
  </InputWrapper>)
}