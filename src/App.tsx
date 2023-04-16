import { Route, Router, Routes } from 'react-router-dom';
import { ErrorPage } from './Pages/ErrorPage';
import { LoginPage } from './Pages/Auth/AuthLogin';
import { PublicRoute, PrivateRoute } from './Routes/PrivateRoute';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Contexts/AuthContext';

import { DC_Home } from './Pages/DashboardCiudadano/DC_Home';
import { TramitesOnlinePage } from './Pages/DashboardCiudadano/TramitesOnlinePage';
import { DC_Configuration } from './Pages/DashboardCiudadano/DC_Configuration';
import { DashBoard_Notificaciones } from './Pages/DashboardCiudadano/Notificaciones';
import { LayoutDefault } from './Components/Layout/Default';
import { LayoutCiudadano } from './Components/Layout/Ciudadano';
import { LayoutActor } from './Components/Layout/Actor';
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
import { DC_Validation } from './Pages/DashboardCiudadano/DC_Validation';

export const App = () => {
  
  const { CheckToken } = useContext(AuthContext);

  useEffect(CheckToken,[])
  
  return (
    <Routes>
      <Route element={<PublicRoute><LayoutDefault /></PublicRoute>}>
        <Route index element={<LoginPage />} />
        <Route path="Inicio" element={<LoginPage />} />
        <Route path="Ingresar" element={<LoginPage />} />
        <Route path="Registro" element={<RegisterPage />} />
        <Route path="EmailVerification" element={<EmailReValidation />}/>
      </Route>
      <Route element={<LayoutDefault />}>
        <Route path="*" element={<ErrorPage />}/>
        <Route path="ValidarCorreo" element={<EmailValidate />} />
        <Route path="RestaurarPassword" element={<PasswordRestaurar />} />
        <Route path="PasswordReset" element={<PasswordUpdate />} />
        <Route path="AutenticarToken" element={<AutenticarToken />} />
      </Route>
      <Route element={<PublicRoute><LayoutCiudadano /></PublicRoute>}>
        <Route path="Test" element={<LoginPage />} />
      </Route>
      <Route element={<PrivateRoute><LayoutCiudadano /></PrivateRoute>}>
        <Route path="Dashboard" element={<DC_Home />} />
        <Route path="Dashboard/Config" element={<DC_Configuration />} />
        <Route path="Dashboard/Validations" element={<DC_Validation />} />
        <Route path="Dashboard/Config/EmailChange" element={<DC_EmailChange />} />
        <Route path="ChangeNewEmail" element={<DC_EmailChangeValidate />} />
        <Route path="Dashboard/Config/NameChange" element={<DC_NameChange />} />
        <Route path="Dashboard/Notificaciones" element={<DashBoard_Notificaciones />} />
        <Route path="Dashboard/MisTramites" element={<MisTramites />} />
        <Route path="Dashboard/Tramites" element={<TramitesOnlinePage />} />
      </Route>
      <Route element={<PrivateRoute><LayoutActor /></PrivateRoute>}>
        <Route path="Actor" element={<DC_Home />} />
      </Route>
    </Routes>
  );
}