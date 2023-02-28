import { Route, Routes } from 'react-router-dom';
import { ErrorPage } from './Pages/ErrorPage';
import { EmailValidate } from './Pages/Auth/EmailValidate';
import { RegisterPage } from './Pages/Auth/AuthRegister';
import { LoginPage } from './Pages/Auth/AuthLogin';
import { PublicRoute, PrivateRoute } from './Routes/PrivateRoute';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Contexts/AuthContext';
import { Dashboard_HomePage } from './Pages/DashboardCiudadano/InicioPage';
import { TramitesOnlinePage } from './Pages/DashboardCiudadano/TramitesOnlinePage';
import { Dashboard_ConfigurationPage } from './Pages/DashboardCiudadano/Config';
import { DashBoard_Notificaciones } from './Pages/DashboardCiudadano/Notificaciones';
import { DefaultLayout } from './Components/Layout/Default';
import { DashboardCiudadanoLayout } from './Components/Layout/DashboardCiudadanoLayout';
import { DashboardActorLayout } from './Components/Layout/DashboardActorLayout';
import { DashBoardActor_Aplicaciones } from './Pages/DashboardActor/Aplicaciones';
import { DashboardActor_HomePage } from './Pages/DashboardActor/InicioPage';
import { TramitesActorOnlinePage } from './Pages/DashboardActor/TramitesOnlinePage';
import { DashBoardActor_Credenciales } from './Pages/DashboardActor/Credenciales';
import { DashboardActor_ConfigurationPage } from './Pages/DashboardActor/Config';
import { DashBoardActor_Notificaciones } from './Pages/DashboardActor/Notificaciones';
import { MisTramites } from './Pages/DashboardCiudadano/MisTramites';
import { PasswordRestaurar } from './Pages/Auth/PasswordRestaurar';
import { PasswordUpdate } from './Pages/Auth/PasswordUpdate';
import { EmailReValidation } from './Pages/Auth/EmailReValidation';
import { EmailChange } from './Pages/Auth/EmailChange';
import { EmailChangeValidate } from './Pages/Auth/EmailChangeValidate';

export const App = () => {
  
  const { CheckToken } = useContext(AuthContext);

  useEffect(CheckToken,[])
  
  return (
    <Routes>
      <Route element={<PublicRoute><DefaultLayout /></PublicRoute>}>
        <Route index element={<LoginPage />} />
        <Route path="Inicio" element={<LoginPage />} />
        <Route path="Ingresar" element={<LoginPage />} />
        <Route path="Registro" element={<RegisterPage />} />
        <Route path="EmailVerification" element={<EmailReValidation />}/>
      </Route>
      <Route element={<DefaultLayout />}>
        <Route path="*" element={<ErrorPage />}/>
        <Route path="ValidarCorreo" element={<EmailValidate />} />
        <Route path="RestaurarPassword" element={<PasswordRestaurar />} />
        <Route path="PasswordReset" element={<PasswordUpdate />} />
      </Route>
      <Route element={<PrivateRoute><DashboardCiudadanoLayout /></PrivateRoute>}>
        <Route path="Dashboard/Config/EmailChange" element={<EmailChange />} />
        <Route path="ChangeNewEmail" element={<EmailChangeValidate />} />
        

        <Route path="Dashboard" element={<Dashboard_HomePage />} />
        <Route path="Dashboard/Config" element={<Dashboard_ConfigurationPage />} />
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