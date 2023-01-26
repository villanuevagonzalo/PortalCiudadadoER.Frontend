
import { RawLocations, GetLocations } from "../../Utils/LocationsFunctions"

export const ConfigPage = () => {



    RawLocations().then((response)=>{
        console.log(GetLocations(response.data))
    }).catch((e:any)=>{
        
    })

  return (
    <div>Config</div>
  )
}
