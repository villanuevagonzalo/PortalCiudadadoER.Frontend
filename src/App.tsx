import { Route, Routes } from 'react-router-dom';
import { ErrorPage } from './Pages/ErrorPage';
import { ValidarCorreo } from './Pages/Auth/ValidarCorreo';
import { RegisterPage } from './Pages/Auth/Register';
import { LoginPage } from './Pages/Auth/Login';
import { PublicRoute, PrivateRoute } from './Routes/PrivateRoute';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Contexts/AuthContext';
import { ReenviarCodigo } from './Pages/Auth/ReenviarCodigo';
import { Dashboard_HomePage } from './Pages/DashboardCiudadano/InicioPage';
import { TramitesOnlinePage } from './Pages/DashboardCiudadano/TramitesOnlinePage';
import { Dashboard_ConfigurationPage } from './Pages/DashboardCiudadano/Config';
import { DashBoard_Credenciales } from './Pages/DashboardCiudadano/Credenciales';
import { DashBoard_Aplicaciones } from './Pages/DashboardCiudadano/Aplicaciones';
import { DashBoard_Notificaciones } from './Pages/DashboardCiudadano/Notificaciones';
import { DefaultLayout } from './Components/Layout/Default';
import { DashboardCiudadanoLayout } from './Components/Layout/DashboardCiudadanoLayout';
import { RestaurarPassword } from './Pages/Auth/RestaurarPassword';
import { ResendPassword } from './Pages/Auth/ResendPassword';
import { ErrorEmailSent } from './Pages/Auth/ErrorEmailSent';
import { ResendEmailVerification } from './Pages/Auth/ResendEmailVerification';
import { EmaiVerificationSent } from './Pages/Auth/EmailVerificationSent';
import { ErrorEmaiVerificationSent } from './Pages/Auth/ErrorEmailVerificationSent';
import { DashboardActorLayout } from './Components/Layout/DashboardActorLayout';
import { DashBoardActor_Aplicaciones } from './Pages/DashboardActor/Aplicaciones';
import { DashboardActor_HomePage } from './Pages/DashboardActor/InicioPage';
import { TramitesActorOnlinePage } from './Pages/DashboardActor/TramitesOnlinePage';
import { DashBoardActor_Credenciales } from './Pages/DashboardActor/Credenciales';
import { DashboardActor_ConfigurationPage } from './Pages/DashboardActor/Config';
import { DashBoardActor_Notificaciones } from './Pages/DashboardActor/Notificaciones';
import { MisTramites } from './Pages/DashboardCiudadano/MisTramites';

function App() {
  
  const { CheckToken } = useContext(AuthContext);

  useEffect(()=>{
    CheckToken()
  },[])
  
  return (
    <Routes>
      <Route element={<PublicRoute><DefaultLayout /></PublicRoute>}>
        <Route index element={<LoginPage />} />
        <Route path="Inicio" element={<LoginPage />} />
        <Route path="Ingresar" element={<LoginPage />} />
        <Route path="Registro" element={<RegisterPage />} />
        <Route path="EmailVerification" element={<ResendEmailVerification />}/>
      </Route>
      <Route element={<DefaultLayout />}>
        <Route path="RestaurarPassword" element={<RestaurarPassword />} />
        <Route path="ValidarCorreo" element={<ValidarCorreo />} />
        <Route path="ReenviarCodigo" element={<ReenviarCodigo />} />
        <Route path="ErrorEmailSent" element={<ErrorEmailSent />}/>
        <Route path="passwordreset" element={<ResendPassword />}/>
        <Route path="EmailVerificationSent" element={<EmaiVerificationSent />}/>
        <Route path="ErrorEmailVerificationSent" element={<ErrorEmaiVerificationSent />}/>
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route element={<PrivateRoute><DashboardCiudadanoLayout /></PrivateRoute>}>
        <Route path="Dashboard" element={<Dashboard_HomePage />} />
        <Route path="Dashboard/Credenciales" element={<DashBoard_Credenciales />} />
        <Route path="Dashboard/Config" element={<Dashboard_ConfigurationPage />} />
        <Route path="Dashboard/Aplicaciones" element={<DashBoard_Aplicaciones />} />
        <Route path="Dashboard/Notificaciones" element={<DashBoard_Notificaciones />} />
        <Route path="Dashboard/MisTramites" element={<MisTramites />} />
        <Route path="Dashboard/Tramites" element={<TramitesOnlinePage />} />
      </Route>
      <Route element={<PrivateRoute><DashboardActorLayout /></PrivateRoute>}>
        <Route path="DashboardActor" element={<DashboardActor_HomePage />} />
        <Route path="DashboardActor/Credenciales" element={<DashBoardActor_Credenciales />} />
        <Route path="DashboardActor/Config" element={<DashboardActor_ConfigurationPage />} />
        <Route path="DashboardActor/Aplicaciones" element={<DashBoardActor_Aplicaciones />} />
        <Route path="DashboardActor/Notificaciones" element={<DashBoardActor_Notificaciones />} />
        <Route path="DashboardActor/Tramites" element={<TramitesActorOnlinePage />} />
      </Route>
    </Routes>
  );
}

export default App;