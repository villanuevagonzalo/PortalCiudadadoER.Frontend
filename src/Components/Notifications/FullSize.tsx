import moment from "moment";
import 'moment/locale/es';
import { CitizenNotification } from "../../Interfaces/Data";
import { NotificationFullSizeWrapper } from "../Elements/StyledComponents";
import { AiOutlineClose, AiOutlineNotification } from "react-icons/ai";
import { BsFiletypeJpg, BsFiletypePdf } from "react-icons/bs";
import { LayoutSection, LayoutSpacer, LayoutStackedPanel } from "../Layout/StyledComponents";
import { Button } from "../Forms/Button";

moment.locale('es')

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	data: CitizenNotification,
  func: Function
}

export const NotificationFullSize: React.FC<Props> = ({data, func, ...props}) => {

  return <NotificationFullSizeWrapper>
    <LayoutSection className="content">
      <div className="header">
        <span className="title"><AiOutlineNotification />Gobierno de Entre Ríos</span>
        <span className="time">{moment(data.CREATED_AT).fromNow()}</span>
        <span className="flex-1"></span>
        <span className="close" onClick={()=>func()}><AiOutlineClose fontSize={"1rem"}/></span>
      </div>
      <h1>{data.MESSAGE_TITLE}</h1>
      <p>{data.MESSAGE_BODY}</p>
      <div className="attachments">
        <h2>Archivos adjuntos</h2>
        <div>
          <span><BsFiletypeJpg /> IMAGEN</span>
          <span><BsFiletypePdf /> PDF</span>
        </div>
      </div>
      <LayoutStackedPanel className="mt-2">
        <LayoutSpacer/>
        <Button onClick={()=>func()}>Cerrar</Button>
      </LayoutStackedPanel>
    </LayoutSection>
    <LayoutSpacer/>
  </NotificationFullSizeWrapper>
}