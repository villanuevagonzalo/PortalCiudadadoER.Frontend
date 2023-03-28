import { Route, Routes } from 'react-router-dom';
import { ErrorPage } from './Pages/ErrorPage';
import { LoginPage } from './Pages/Auth/AuthLogin';
import { PublicRoute, PrivateRoute } from './Routes/PrivateRoute';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Contexts/AuthContext';

import { DC_Home } from './Pages/DashboardCiudadano/DC_Home';
import { TramitesOnlinePage } from './Pages/DashboardCiudadano/TramitesOnlinePage';
import { DC_Configuration } from './Pages/DashboardCiudadano/DC_Configuration';
import { DashBoard_Notificaciones } from './Pages/DashboardCiudadano/Notificaciones';
import { DefaultLayout } from './Components/Layout/Default';
import { DashboardCiudadanoLayout } from './Components/Layout/DashboardCiudadanoLayout';
import { DashboardActorLayout } from './Components/Layout/DashboardActorLayout';
import { MisTramites } from './Pages/DashboardCiudadano/MisTramites';
import { PasswordRestaurar } from './Pages/Auth/PasswordRestaurar';
import { PasswordUpdate } from './Pages/Auth/PasswordUpdate';
import { EmailReValidation } from './Pages/Auth/EmailReValidation';
import { DC_EmailChange } from './Pages/DashboardCiudadano/DC_EmailChange';
import { DC_EmailChangeValidate } from './Pages/DashboardCiudadano/DC_EmailChangeValidate';
import { AutenticarToken } from './Pages/DashboardCiudadano/AutenticarToken';
import { DC_NameChange } from './Pages/DashboardCiudadano/DC_NameChange';
import { RegisterPage } from './Pages/Auth/AuthRegister';
import { EmailValidate } from './Pages/Auth/EmailValidate';

const REACTENV = process.env

export const App = () => {
  
  const { CheckToken } = useContext(AuthContext);

  useEffect(CheckToken,[])
  
  return (//PUBLIC_URL
    <Routes>
      <Route path={REACTENV.PUBLIC_URL+"/"}>
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
          <Route path="AutenticarToken" element={<AutenticarToken />} />
        </Route>
        <Route element={<PrivateRoute><DashboardCiudadanoLayout /></PrivateRoute>}>
          <Route path="Dashboard" element={<DC_Home />} />
          <Route path="Dashboard/Config" element={<DC_Configuration />} />
          <Route path="Dashboard/Config/EmailChange" element={<DC_EmailChange />} />
          <Route path="ChangeNewEmail" element={<DC_EmailChangeValidate />} />
          <Route path="NameChange" element={<DC_NameChange />} />
          <Route path="Dashboard/Notificaciones" element={<DashBoard_Notificaciones />} />
          <Route path="Dashboard/MisTramites" element={<MisTramites />} />
          <Route path="Dashboard/Tramites" element={<TramitesOnlinePage />} />
        </Route>
        <Route element={<PrivateRoute><DashboardActorLayout /></PrivateRoute>}>
        </Route>
      </Route>
    </Routes>
  );
}