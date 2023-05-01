import { LayoutBreadCrumpWrapper } from "./StyledComponents"
import { GetFullPath } from "../../Routes/Pages"
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";

export const LayoutBreadcrump = (props: any) => {

  const Path = GetFullPath(window.location.pathname);

  return (<>{Path.length>0
    ?
    (<LayoutBreadCrumpWrapper color={props.color}>
      {Path.map((child, index)=><li key={child.path}>
        {window.location.pathname===child.path
          ?<p>{index===0?<AiOutlineHome/>:''}{child.label}</p>
          :<><NavLink to={child.path}>{index===0?<AiOutlineHome/>:''}{child.label}</NavLink><MdKeyboardArrowRight/></>
        }
      </li>)}
      </LayoutBreadCrumpWrapper>):<></>}</>
  )
}