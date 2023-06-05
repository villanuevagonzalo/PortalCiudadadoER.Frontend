import moment from "moment";
import 'moment/locale/es';
import { ActorNotification, ILocation, Recipients } from "../../Interfaces/Data";
import { NotificationCardWrapper, Spinner } from "../Elements/StyledComponents";
import { stringPreview } from "../../Utils/General";
import { AiOutlineDelete, AiOutlineNotification, AiOutlineStar } from "react-icons/ai";
import { fileTypes } from "../../Interfaces/FileTypes";
import { useEffect, useState } from "react";
import { DeparmentByID, LocationByID, RawLocations } from "../../Utils/Locations";

moment.locale('es')

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	data: ActorNotification;
  loading?: boolean;
}

export const NotificationActionCard: React.FC<Props> = ({data, loading=false, ...props}) => {
  
  const [ Location, setLocation ] = useState<ILocation | null>();

  const handleLocations = async() => {
    const response = await RawLocations();
    const test = data.LOCALITY?(LocationByID(response,data.LOCALITY)):(data.DEPARTMENT?DeparmentByID(response,data.DEPARTMENT):null)
    console.log(test, data.LOCALITY, data.DEPARTMENT)
    console.log(DeparmentByID(response,data.DEPARTMENT))
    setLocation(test)
  }

  useEffect(() => { handleLocations(); },[])

  return <NotificationCardWrapper {...props} loading={loading}>
  <div className="content">
    <label className="header">
      <span className="title">{moment(data.CREATED_AT).fromNow()}</span>
        {moment().isBetween(moment(data.DATE_FROM), moment(data.DATE_TO)) ? <span className="new"><AiOutlineStar /> ACTIVA</span> : <></>}
    </label>
    <h1>{stringPreview(data.MESSAGE_TITLE,30)}</h1>
    <p>{stringPreview(data.MESSAGE_BODY,30)}</p>
    <p>{data.ATTACHMENTS.length}</p>
    <label className="footer2">
      <span className="filters">{'Fechas: '+moment(data.DATE_FROM).format("DD/MM/YY") + " - " + moment(data.DATE_TO).format("DD/MM/YY")}</span>
      <span className="filters">{'Edad: '+data.AGE_FROM + " - " + data.AGE_TO}</span>
      {Location?<span className="filters">{(data.LOCALITY?(Location.DEPARTAMENTO + "-" + Location.NOMBRE):Location.DEPARTAMENTO)}</span>:<></>}
      <span className="filters">{'Destinatario: '+Recipients[data.RECIPIENTS]}</span>
    </label>
  </div>
    <div className="icon">
      {loading?<Spinner color='gray' size="1.5rem"/>:<AiOutlineDelete />}
    </div>
  </NotificationCardWrapper>;
}


/*<span className="attachment"><BsFiletypeJpg /> IMAGEN</span>
          <span className="attachment"><BsFiletypePdf /> PDF</span>
          
          <div className="icon">
      {loading?<Spinner color='gray' size="1rem"/>:<AiOutlineNotification />}
    </div>
    <div className="content">
      <label className="header">
        <span className="title">Gobierno de Entre Ríos</span>
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
          
          
          
          
          
          
          */