
import { AiOutlineOrderedList } from "react-icons/ai";
import { LayoutNote, LayoutSection, LayoutText, LayoutTitle } from "../../../Components/Layout/StyledComponents";
import { NotificationsContext } from "../../../Contexts/NotificationContext";
import { useContext, useState, useEffect, useMemo } from "react";
import { Spinner } from "../../../Components/Elements/StyledComponents";
import { BiMessage } from "react-icons/bi";
import { NotificationActionCard } from "../../../Components/Notifications/ActorCard";
import { ActorNotification, IFormState } from "../../../Interfaces/Data";
import { DefaultFormState } from "../../../Data/DefaultValues";
import { NotificationActorFullSize } from "../../../Components/Notifications/ActorFullSize";





export const DA_Notifications = () =>{

  const { isLoading, errors, GetAllNotifications, actorNotifications, DeleteNotification } = useContext(NotificationsContext);
  const [ FullSizeNotification, setFullSizeNotification ] = useState<ActorNotification | null>(null);
  const [ FormState, setFormState ] = useState<IFormState>(DefaultFormState); 
  const [ loadingNotification, setLoadingNotification ] = useState<number>(0);
  
  const ShowNotification = async (N: ActorNotification) => {
    //const response = await ReadNotification(N.ID, setLoadingNotification);
    //if(response?.data?.success){
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setFullSizeNotification(N);
    //} else{
    //  console.log(response,0);
    //}
  }

  const CloseNotification = () => setFullSizeNotification(null);

  useEffect(()=>{
    GetAllNotifications()
  },[])

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
        ?actorNotifications.map((N: ActorNotification) => <NotificationActionCard data={N} key={N.ID} onClick={() => ShowNotification(N)} func={()=>DeleteNotification(N.ID,setFormState)} loading={FormState.loading}/>
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

/**/