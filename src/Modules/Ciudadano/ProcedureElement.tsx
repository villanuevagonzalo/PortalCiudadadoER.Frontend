import { ProcedureInstance } from "../FormElements/Class";
import { ElementSchemaTypes } from "../FormElements/Types";

interface Arguments {
    procedureInstance:ProcedureInstance<ElementSchemaTypes>;
    procedureData:ProcedureInstance<ElementSchemaTypes>;
}

interface FormGenericData {
    code: string;
    title:string;
  }

  export const CiudadanoProcedureElement: React.FC<Arguments> = ({procedureInstance, procedureData}) => {


    return (
        <p>under contruction</p>

    )
  }