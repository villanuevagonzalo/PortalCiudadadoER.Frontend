
import { AiOutlineDelete, AiOutlineOrderedList } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { LayoutNote, LayoutSection, LayoutText, LayoutTitle } from "../../../Components/Layout/StyledComponents";
import { NotificationsContext } from "../../../Contexts/NotificationContext";
import { useContext, useState, useEffect, useMemo } from "react";
import { Spinner, TableFunctions } from "../../../Components/Elements/StyledComponents";
import { BiMessage } from "react-icons/bi";
import { NotificationActionCard } from "../../../Components/Notifications/ActorCard";
import { ActorNotification, ILocation, Recipients } from "../../../Interfaces/Data";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../../Components/Elements/Table";
import moment from "moment";
import { DeparmentByID, DeparmentNameByID, LocationByID, LocationNameByID, RawLocations } from "../../../Utils/Locations";
import { stringPreview } from "../../../Utils/General";

type Item = {
  title: string;
  description: string;
 }



export const DA_Notifications = () =>{

  const { isLoading, errors, GetAllNotifications, actorNotifications } = useContext(NotificationsContext);
  const [ data, setData ] = useState<any[]>([]);
  const [ Location, setLocation ] = useState<ILocation[]>([]);

  const handleLocations = async() => {
    const response = await RawLocations();
    console.log(response)
    setLocation(response)
  }

  useEffect(()=>{
    handleLocations();
    GetAllNotifications()
  },[])

  useEffect(()=>{
    if(Location.length>0 && actorNotifications.length>0){
      
      actorNotifications[3].AGE_FROM = 5
      actorNotifications[3].DEPARTMENT = 258

    const newdata = actorNotifications.map((N:ActorNotification)=>{
      
      
      console.log(N.LOCALITY,LocationByID(Location,N.LOCALITY))

      return ({
      Title: stringPreview(N.MESSAGE_TITLE,30),
      Date: moment(N.DATE_FROM).format("DD/MM/YY") + " a " + moment(N.DATE_TO).format("DD/MM/YY"),
      Loc: N.LOCALITY?(LocationNameByID(Location,N.LOCALITY)):(N.DEPARTMENT?DeparmentNameByID(Location,N.DEPARTMENT):"Todos"),
      AgeRange: (N.AGE_FROM == 1
        ?(N.AGE_TO==120 ? "-" : "< " + N.AGE_TO)
        :(N.AGE_TO==120 ? N.AGE_FROM + " <" : (N.AGE_FROM + " a " + N.AGE_TO))),
      Recipients: Recipients[N.RECIPIENTS],
      Attachments: N.ATTACHMENTS.length,
      ALL: N
    })})

    console.log(newdata)
    setData(newdata)
   }

    //setData(actorNotifications)
  },[actorNotifications, Location])

  const mcolumns = useMemo<ColumnDef<any>[]>(()=>[
    {
      header: 'Titulo',
      accessorKey: 'Title',
    },
    {
      header: 'Fechas',
      accessorKey: 'Date',
    },
    {
      header: 'Dpto/Loc',
      accessorKey: 'Loc',
    },
    {
      header: 'Rango',
      accessorKey: 'AgeRange'
    },
    {
      header: 'Destinatario',
      accessorKey: 'Recipients',
    },
    {
      header: 'Adjuntos',
      accessorKey: 'Attachments',
    },
    {
      header: 'Acciones',
      accessorKey: 'functions',
      cell: ({ cell }) => {
        console.log(cell.row.original);
        return <TableFunctions><GrFormView/> <AiOutlineDelete /></TableFunctions>
      }
    },

  ],[]);

  return (<>
    <LayoutNote>
      Administre desde esta sección las notificaciones generales que serán publicadas en <b>Ciudadano Digital</b>.
      <br/>Podrá configurar sus notificaciones por rango de edad, ubicación, y si lo desea, enviarlas por correo electrónico.
      <br/>Vea el alcance que va a tener su notificación.
    </LayoutNote>
    <LayoutSection>
      <h1><AiOutlineOrderedList/>Lista de Notificaciones Generales</h1>
      {isLoading?<>
        <br/>
        <Spinner color='secondary' size="3rem"/><br/>
        <LayoutText className='text-center'>Cargando Información.<br/>Por favor aguarde.</LayoutText>
      </>:(actorNotifications.length > 0
        ?<Table columns={mcolumns} data={data} />//actorNotifications.map((N: ActorNotification) => <NotificationActionCard data={N} key={N.ID}/>)
        :<LayoutSection className="items-center">
          <BiMessage size="3rem" />
          <LayoutText className='text-center mb-0'>No tienes ningun mensaje nuevo</LayoutText>
        </LayoutSection>
      )}
    </LayoutSection>
  </>)
}

/**/