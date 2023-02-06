
import { LayoutItem, LayoutTitle } from "../../Components/Elements/StyledComponents"
import { RawLocations, GetLocations } from "../../Utils/LocationsFunctions"

export const Dashboard_ConfigurationPage = () => {



    RawLocations().then((response)=>{
        console.log(GetLocations(response.data))
    }).catch((e:any)=>{
        
    })

  return (<>
    <LayoutTitle>
      Mi Perfil
    </LayoutTitle>
    <LayoutItem className="flex items-center gap-1 p-10">
        COMPLETAR
    </LayoutItem>
    <LayoutTitle>
      Nivel de Usuario
    </LayoutTitle>
    <LayoutItem className="flex items-center gap-1 p-10">
        COMPLETAR
    </LayoutItem>
  </>)
}
