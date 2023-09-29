
import { AiOutlineDelete, AiOutlineOrderedList, AiOutlinePlus } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { LayoutNote, LayoutSection, LayoutSpacer, LayoutStackedPanel, LayoutText, LayoutTitle } from "../../../Components/Layout/StyledComponents";
import { NotificationsContext } from "../../../Contexts/NotificationContext";
import { useContext, useState, useEffect, useMemo } from "react";
import { Spinner, TableFunctions, TableLabel } from "../../../Components/Elements/StyledComponents";
import { BiMessage } from "react-icons/bi";
import { NotificationActionCard } from "../../../Components/Notifications/ActorCard";
import { ActorNotification, ILocation, Recipients, IFormState, ActorTableNotification } from "../../../Interfaces/Data";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../../Components/Elements/Table";
import moment from "moment";
import { DeparmentByID, DeparmentNameByID, LocationByID, LocationNameByID, RawLocations } from "../../../Utils/Locations";
import { stringPreview } from "../../../Utils/General";
import { DefaultFormState } from "../../../Data/DefaultValues";
import { NotificationActorFullSize } from "../../../Components/Notifications/ActorFullSize";
import { Link } from "react-router-dom";
import { Pages } from "../../../Routes/Pages";
import { FormikButton } from "../../../Components/Forms/FormikButton";
import { Button } from "../../../Components/Forms/Button";
import { BsFileArrowDown } from "react-icons/bs";

type Item = {
  title: string;
  description: string;
 }



export const DA_Notifications = () =>{

  const { isLoading, errors, GetAllNotifications, actorNotifications, DeleteNotification } = useContext(NotificationsContext);
  const [ data, setData ] = useState<ActorTableNotification[]>([]);
  const [ Location, setLocation ] = useState<ILocation[]>([]);
  const [totalNotifications, setTotalNotifications] = useState <number> (0)

  const handleLocations = async () => {
    try {
      const response = await RawLocations();
      setLocation(response);
    } catch (error) {
      console.error("Error en handleLocations:", error);
    }
  }

  const [ FullSizeNotification, setFullSizeNotification ] = useState<ActorNotification | null>(null);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState); 
  const [ loadingNotification, setLoadingNotification ] = useState<number>(0);
  
  const ShowNotification = async (N: ActorNotification) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFullSizeNotification(N);
  }

  const CloseNotification = () => setFullSizeNotification(null);

  useEffect(()=>{
    handleLocations();
    GetAllNotifications(totalNotifications, setTotalNotifications)
  },[])


  useEffect(()=>{
    if(Location.length>0 && actorNotifications.length>0){
  
    const newdata:ActorTableNotification[] = actorNotifications.map((N:ActorNotification)=>{
      return ({
      Title: stringPreview(N.MESSAGE_TITLE,30),
      Date: moment(N.DATE_FROM).format("DD/MM/YY") + " a " + moment(N.DATE_TO).format("DD/MM/YY"),
      Loc: N.LOCALITY?(LocationNameByID(Location,N.LOCALITY)):(N.DEPARTMENT?DeparmentNameByID(Location,N.DEPARTMENT):"Todos"),
      AgeRange: (N.AGE_FROM == 1
        ?(N.AGE_TO==120 ? "-" : "< " + N.AGE_TO)
        :(N.AGE_TO==120 ? N.AGE_FROM + " <" : (N.AGE_FROM + " a " + N.AGE_TO))),
      Recipients: Recipients[N.RECIPIENTS],
      Attachments: ""+N.ATTACHMENTS.length||"-",
      Active: N.DELETED_AT!=""?"BORRADA":moment().isBetween(moment(N.DATE_FROM), moment(N.DATE_TO))?"ACTIVA":"-",
      Disabled: N.DELETED_AT!="",
      ALL: N
    })})
    setData(newdata)
   }

    //setData(actorNotifications)
  },[actorNotifications, Location])

  const getMoreNews = ()=>{
    GetAllNotifications(totalNotifications, setTotalNotifications)

  }

  const mcolumns = useMemo<ColumnDef<ActorTableNotification>[]>(()=>[
    {
      header: 'Estado',
      accessorKey: 'Active',
      show: false,
      cell: ({ cell }) => {
        const val = cell.getValue()+"";
        return <TableLabel>{val}</TableLabel>
      },
      size: 100
    },
    {
      header: 'Titulo',
      accessorKey: 'Title', show: false
      
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
        const NN = cell.row.original.ALL;
        //console.log(cell.row.original);
        return <TableFunctions>
          <GrFormView onClick={() => ShowNotification(NN)}/>
          <AiOutlineDelete  onClick={()=>DeleteNotification(NN.ID,setFormState)} className="DELETE"/>
        </TableFunctions>
      }
    },
    {
      header: 'Disabled',
      accessorKey: 'Disabled',
      show: false,
    },

  ],[]);

  return (<>
    <LayoutNote>
      Administre desde esta sección las notificaciones generales que serán publicadas en <b>Ciudadano Digital</b>.
      <br/>Podrá configurar sus notificaciones por rango de edad, ubicación, y si lo desea, enviarlas por correo electrónico.
      <br/>Vea el alcance que va a tener su notificación.
    </LayoutNote>
    <LayoutSection>
      <LayoutStackedPanel>
        <LayoutSpacer/>
        <Link to={Pages.DA_NOTIFICATIONS_NEW}><FormikButton>Nuevo<AiOutlinePlus/></FormikButton></Link>
      </LayoutStackedPanel>
      <h1><AiOutlineOrderedList/>Lista de Notificaciones Generales</h1>
      {isLoading?<>
        <br/>
        <Spinner color='secondary' size="3rem"/><br/>
        <LayoutText className='text-center'>Cargando Información.<br/>Por favor aguarde.</LayoutText>
      </>:(actorNotifications.length > 0
        ?(<div style={{display:"flex", flexDirection:"column", width:"100%"}} >
          <Table columns={mcolumns} data={data} />
          <Button style={{marginTop:"15px"}} onClick={() => getMoreNews()}><BsFileArrowDown />VER MÁS</Button>
          </div>

        )
        :<LayoutSection className="items-center">
          <BiMessage size="3rem" />
          <LayoutText className='text-center mb-0'>No tienes ningun mensaje nuevo</LayoutText>
        </LayoutSection>
      )}
      {FullSizeNotification && <NotificationActorFullSize data={FullSizeNotification} func={CloseNotification} />}
    </LayoutSection>
  </>)
}

