
import { Spinner } from '../../../Components/Elements/StyledComponents';
import { BiMessage, BiNotification } from "react-icons/bi";
import { LayoutSection, LayoutNote, LayoutText } from "../../../Components/Layout/StyledComponents";
import { NotificationsContext } from "../../../Contexts/NotificationContext";
import { useContext, useState } from "react";
import { CitizenNotification } from "../../../Interfaces/Data";
import { NotificationCard } from "../../../Components/Notifications/Card";
import { NotificationFullSize } from "../../../Components/Notifications/FullSize";

export const DC_Notifications = () =>{

  const { isLoading, userNotifications, setUserNotifications, ReadNotification } = useContext(NotificationsContext);
  const [ FullSizeNotification, setFullSizeNotification ] = useState<CitizenNotification | null>(null);
  const [ loadingNotification, setLoadingNotification ] = useState<number>(0);

  const ShowNotification = async (N: CitizenNotification) => {
    const response = await ReadNotification(N.ID, setLoadingNotification);
    
window.scrollTo({ top: 0, behavior: 'smooth' });
    if(response?.data?.succes){
      setFullSizeNotification(N);
    } else{
      console.log(response,0);
      setFullSizeNotification(N);
    }
  }

  const CloseNotification = () => setFullSizeNotification(null);

  return (<>
    <LayoutNote>Enterate de las actualizaciones de tus trámites y notificaciones de la plataforma</LayoutNote>
    <LayoutSection>
      <h1><BiNotification />Notificaciones</h1>
      {isLoading?<>
        <br/>
        <Spinner color='secondary' size="3rem"/><br/>
        <LayoutText className='text-center'>Cargando Información.<br/>Por favor aguarde.</LayoutText>
      </>:(userNotifications.length > 0
        ?userNotifications.map((N: CitizenNotification) => <NotificationCard data={N} key={N.ID} onClick={() => ShowNotification(N)} loading={N.ID==loadingNotification}/>
        )
        :<LayoutSection className="items-center">
          <BiMessage size="3rem" />
          <LayoutText className='text-center mb-0'>No tienes ningun mensaje nuevo</LayoutText>
        </LayoutSection>
      )}
      {FullSizeNotification && <NotificationFullSize data={FullSizeNotification} func={CloseNotification} />}
    </LayoutSection>
  </>);
};