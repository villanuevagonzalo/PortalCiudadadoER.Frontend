import { useState } from "react";
import { NavigatorSpacer, NavigatorWrapper, Spinner } from "../Elements/StyledComponents"
import { Button } from "../Forms/Button"

export const Navigator = (props:any) => {

  const [isLoading,setIsLoading]=useState<boolean>(false);

  let currentPage = props.state;
  let pages = props.pages;

  const setBackward = () =>{
    props.setstate(currentPage?currentPage-1:0)
  }

  const setForward = async () =>{
    if(pages[currentPage].afterfunction){
      setIsLoading(true)
      await pages[currentPage].afterfunction()
      console.log('DESPUES')
      setIsLoading(false)
    }
    props.setstate(pages.length-currentPage-1?currentPage+1:pages.length-1)
  }

  return (<>
    {pages[currentPage].html}
    <NavigatorWrapper>
      {currentPage>0?<Button color="disabled_tint" onClick={setBackward} fullwidth={false}>
        « Anterior
      </Button>:<></>}
      <NavigatorSpacer />
      {currentPage<pages.length-1?
      <Button color="disabled_tint" onClick={setForward} fullwidth={false} disabled={isLoading}>
        {isLoading ? <Spinner/> : 'Siguiente »'} 
      </Button>:<Button color="secondary" onClick={setForward} fullwidth={false}>
      {isLoading ? <Spinner/> : 'Finalizar'}
      </Button>}
    </NavigatorWrapper>
  </>)
}