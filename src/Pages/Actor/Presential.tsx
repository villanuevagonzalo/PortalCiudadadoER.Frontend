
import { useEffect } from "react";
import { Spinner } from "../../Components/Elements/StyledComponents";
import { LayoutGrid, LayoutTitle, LayoutSection } from "../../Components/Layout/StyledComponents";
import { useNavigate } from "react-router-dom";

const REACTENV = process.env

export const DA_PRESENTIAL = () => {

  const navigate = useNavigate();

  useEffect(()=>{

    const location = REACTENV.REACT_APP_PROJECT_ADMIN+"ciudadano_digital/autenticar" ;


    console.log(location)
    window.location.href = location;

    
  },[])

  return(<>
    <LayoutSection>
      <Spinner color='secondary' size="3rem"/>
    </LayoutSection>
  </>);
}