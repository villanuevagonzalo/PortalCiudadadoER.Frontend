import React, { useContext, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { AuthContext } from '../Contexts/AuthContext';
import { GenericAlertPopUp } from '../Components/Forms/PopUpCards';

export const InactivityDetector = () =>  {

  const { isLogged, Logout } = useContext(AuthContext);
  const [inactivityDetected, setInactivityDetected] = useState<boolean>(false);

  //Indica cuando fue la última acción en la página. 
  const handleOnIdle = (event: any) => {
    
    const parsedTimestamp = new Date(getLastActiveTime()!);
    const now = new Date();
    const timestampMillis = parsedTimestamp.getTime();
    const nowMillis = now.getTime();
    const differenceMillis = nowMillis - timestampMillis;
    const differenceInMinutes = Math.floor(differenceMillis / (1000 * 60));

    if (differenceInMinutes >= 10 && isLogged){
      Logout(); // Llama a la función Logout
      // Programa la recarga de la página después de 500 ms
      setTimeout(() => {
        //window.location.reload(); // Recarga la página después de 500 ms
        setInactivityDetected(true)
      }, 500);
    }

  }

  //aca mostrar que se deslogeo si se alcanzó el tiempo
  const handleOnActive = (event: any) => {
   // console.log('user is active', event)
    //console.log('time remaining', getRemainingTime())
  }
/*
  const handleOnAction = (event: any) => {
    console.log('user did something', event)
  }*/

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 10, //10 minuto
    onIdle: handleOnIdle,
    onActive: handleOnActive,
   // onAction: handleOnAction,
    debounce: 500
  })

  const CloseAll = () => {

    setInactivityDetected(false)
    window.location.reload();
  }

  return (
    <div>
      {inactivityDetected && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)', /* Fondo traslúcido */
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000 /* Asegura que esté en la parte superior */
        }}>
          <div style={{
            backgroundColor: '#fff', /* Fondo del modal */
          
            zIndex: 1001 /* Asegura que esté por encima del overlay */
          }}>
            <GenericAlertPopUp genericMessage={'Tiempo de inactividad prolongado'} close={CloseAll} />
          </div>
        </div>
      )}
    </div>
  )
}