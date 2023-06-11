import { LayoutActorBreadCrumpWrapper, LayoutBreadCrumpWrapper } from "./StyledComponents"
import { GetFullPath } from "../../Routes/Pages"
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";

export const LayoutActorBreadcrump = (props: any) => {

  let pathname = window.location.pathname;
  //console.log(pathname)
  pathname = pathname+(pathname[pathname.length-1]!=='/'?'/':'')
  const Path = GetFullPath(pathname);
  //console.log(pathname, Path)
  
  return (<>{Path.length>0
    ?
    (<LayoutActorBreadCrumpWrapper color={props.color}>
      {Path.map((child, index)=><li key={child.path}>
        {window.location.pathname===child.path
          ?<p>{index===0?<AiOutlineHome/>:''}{child.label}</p>
          :<><NavLink to={child.path}>{index===0?<AiOutlineHome/>:''}{child.label}</NavLink><MdKeyboardArrowRight/></>
        }
      </li>)}
      </LayoutActorBreadCrumpWrapper>):<></>}</>
  )
}