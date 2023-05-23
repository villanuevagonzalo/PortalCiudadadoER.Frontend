import moment from "moment";
import 'moment/locale/es';
import { CitizenNotification } from "../../Interfaces/Data";
import { NotificationCardWrapper, Spinner } from "../Elements/StyledComponents";
import { stringPreview } from "../../Utils/General";
import { AiOutlineStar, AiOutlineNotification } from "react-icons/ai";
import { fileTypes } from "../../Interfaces/FileTypes";

moment.locale('es')

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	data: CitizenNotification;
  loading?: boolean;
}

export const NotificationCard: React.FC<Props> = ({data, loading=false, ...props}) => {
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
        <span className="time">{moment(data.CREATED_AT).fromNow()}</span>
        {data.ATTACHMENTS.length>0 ? <span className="attachments">Adjuntos: {data.ATTACHMENTS.map((e:any)=>{
          const tt = fileTypes[e.type] || fileTypes["png"];        
          return (<span className="attachment" key={e.ID}><tt.icon /> {tt.label}</span>)})}</span>: <></>}
      </label>
    </div>
  </NotificationCardWrapper>;
}


/*<span className="attachment"><BsFiletypeJpg /> IMAGEN</span>
          <span className="attachment"><BsFiletypePdf /> PDF</span>*/