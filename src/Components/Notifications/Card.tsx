import moment from "moment";
import 'moment/locale/es';
import { CitizenNotification } from "../../Interfaces/Data";
import { NotificationCardWrapper, Spinner } from "../Elements/StyledComponents";
import { stringPreview } from "../../Utils/General";
import { AiOutlineStar, AiOutlineNotification, AiOutlinePaperClip } from "react-icons/ai";
import { fileTypes } from "../../Interfaces/FileTypes";

moment.locale('es')

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	data: CitizenNotification;
  loading?: boolean;
}

export const NotificationCard: React.FC<Props> = ({data, loading=false, ...props}) => {
  console.log("fecha: "+data.CREATED_AT)
  console.log("fecha modificada: "+moment(data.CREATED_AT))
  return <NotificationCardWrapper new={data.NEW} {...props} loading={loading}>
    <div className="icon">
      {loading?<Spinner color='gray' size="1rem"/>:<AiOutlineNotification />}
    </div>
    <div className="content">
      <label className="header">
        <span className="title">Gobierno de Entre Ríos</span>
        {data.NEW ? <span className="new"><AiOutlineStar /> NUEVO</span> : <></>}
      </label>
      <h1>{data.MESSAGE_TITLE}</h1>
      <p>{stringPreview(data.MESSAGE_BODY)}</p>
      <label className="footer">
        <span className="time">{moment(data.CREATED_AT,"DD/MM/YYYY HH:mm:ss").fromNow()}</span>
        {data.ATTACHMENTS.length>0 ? <span className="attachments"><AiOutlinePaperClip/> {data.ATTACHMENTS.length} Archivos adjuntos</span>: <></>}
      </label>
    </div>
  </NotificationCardWrapper>;
}

export const NotificationCardReduced: React.FC<Props> = ({data, loading=false, ...props}) => {
  return <NotificationCardWrapper new={data.NEW} {...props} loading={loading}>
    <div className="icon">
      {loading?<Spinner color='gray' size="1rem"/>:<AiOutlineNotification />}
    </div>
    <div className="content">
      <label className="header">
        <span className="title">Gobierno de Entre Ríos</span>
        {data.NEW ? <span className="new"><AiOutlineStar /> NUEVO</span> : <></>}
      </label>
      <h1>{data.MESSAGE_TITLE}</h1>
      <label className="footer">
        <span className="time">{moment(data.CREATED_AT).fromNow()}</span>
        {data.ATTACHMENTS.length>0 ? <span className="attachments"><AiOutlinePaperClip/> {data.ATTACHMENTS.length} Archivos adjuntos</span>: <></>}
      </label>
    </div>
  </NotificationCardWrapper>;
}


/*<span className="attachment"><BsFiletypeJpg /> IMAGEN</span>
          <span className="attachment"><BsFiletypePdf /> PDF</span>*/