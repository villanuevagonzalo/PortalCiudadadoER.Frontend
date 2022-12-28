import { useState } from "react";
import { NavigatorSpacer, NavigatorWrapper, Spinner } from "../Elements/StyledComponents"
import { Button } from "../Forms/Button"

export const Navigator = (props:any) => {

  const [isLoading,setIsLoading]=useState<boolean>(false);

  let currentPage = props.state;
  let pages = props.pages;

  const getback = () =>{
    props.setstate(currentPage?currentPage-1:0)
  }

  const getforward = async () =>{
    props.setstate(pages.length-currentPage-1?currentPage+1:pages.length-1)
    /*
    const mypromise = new Promise(pages[currentPage].afterfunction()).then(()=>{
      console.log('DESPUES')
      props.setstate(pages.length-currentPage-1?currentPage+1:pages.length-1)
    })

    /*if(pages[currentPage].afterfunction){
      pages[currentPage].afterfunction().then(()=>{
        console.log('DESPUES')
        props.setstate(pages.length-currentPage-1?currentPage+1:pages.length-1)
    })
    }
    setIsLoading(false)*/
  }

  const getfinish = () =>{
    props.finish()
  }

  return (<>
    {pages[currentPage].html}
    <NavigatorWrapper>
      {currentPage>0?<Button color="disabled_tint" onClick={getback} fullwidth={false}>
        « Anterior
      </Button>:<></>}
      <NavigatorSpacer />
      {currentPage<pages.length-1?
      <Button color="disabled_tint" onClick={getforward} fullwidth={false} disabled={isLoading}>
        {isLoading ? <Spinner/> : 'Siguiente »'} 
      </Button>:<Button color="secondary" onClick={getfinish} fullwidth={false}>
        Finalizar
      </Button>}
    </NavigatorWrapper>
  </>)
}