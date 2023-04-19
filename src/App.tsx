import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Contexts/AuthContext';

// Layouts
import { LayoutActor } from './Components/Layout/Actor';
import { LayoutDefault } from './Components/Layout/Default';
import { LayoutCiudadano } from './Components/Layout/Ciudadano';


import { ErrorPage } from './Pages/ErrorPage';
import { PublicRoute, PrivateRoute } from './Routes/RoutesMiddleware';

// Pages
import { Auth_Login } from './Pages/Auth/Login';
import { Auth_Signup } from './Pages/Auth/Signup';
import { Auth_PasswordReset } from './Pages/Auth/PasswordReset';
import { Auth_PasswordUpdate } from './Pages/Auth/PasswordUpdate';

import { AutenticarToken } from './Pages/Ciudadano/Configurations/AutenticarToken';
import { DA_Home } from './Pages/Actor/Home';
import { DC_Notifications } from './Pages/Ciudadano/Notifications/Home';
import { DC_Configurations } from './Pages/Ciudadano/Configurations/Home';
import { DC_Configurations_EmailChange } from './Pages/Ciudadano/Configurations/EmailChange';
import { DC_Configurations_EmailChangeValidate } from './Pages/Ciudadano/Configurations/EmailChangeValidate';
import { DC_Home } from './Pages/Ciudadano/Home';
import { DC_Configurations_NameChange } from './Pages/Ciudadano/Configurations/NameChange';
import { DC_Validation } from './Pages/Ciudadano/Configurations/DC_Validation';
import { Auth_EmailResendValidation } from './Pages/Auth/EmailResendValidation';
import { Auth_EmailValidate } from './Pages/Auth/EmailValidate';
import { MisTramites } from './Pages/Ciudadano/Procedures/MisTramites';
import { TramitesOnlinePage } from './Pages/Ciudadano/Procedures/TramitesOnlinePage';
import { DA_Procedures_Home } from './Pages/Actor/Procedures/Home';
import { DA_Procedures_Create } from './Pages/Actor/Procedures/Create';

export const App = () => {
  
  const { CheckToken } = useContext(AuthContext);

  useEffect(CheckToken,[])
  
  return (
    <Routes>
      <Route element={<PublicRoute><LayoutDefault /></PublicRoute>}>
        <Route index element={<Auth_Login />} />
        <Route path="Inicio" element={<Auth_Login />} />
        <Route path="Ingresar" element={<Auth_Login />} />
        <Route path="Registro" element={<Auth_Signup />} />
        <Route path="EmailVerification" element={<Auth_EmailResendValidation />}/>
      </Route>
      <Route element={<LayoutDefault />}>
        <Route path="*" element={<ErrorPage />}/>
        <Route path="ValidarCorreo" element={<Auth_EmailValidate />} />
        <Route path="RestaurarPassword" element={<Auth_PasswordReset />} />
        <Route path="PasswordReset" element={<Auth_PasswordUpdate />} />
        <Route path="AutenticarToken" element={<AutenticarToken />} />
      </Route>
      <Route element={<PublicRoute><LayoutCiudadano /></PublicRoute>}>
        <Route path="Test" element={<Auth_Login />} />
      </Route>
      <Route element={<PrivateRoute><LayoutCiudadano /></PrivateRoute>}>
        <Route path="Dashboard" element={<DC_Home />} />
        <Route path="Dashboard/Config" element={<DC_Configurations />} />
        <Route path="Dashboard/Validations" element={<DC_Validation />} />
        <Route path="Dashboard/Config/EmailChange" element={<DC_Configurations_EmailChange />} />
        <Route path="ChangeNewEmail" element={<DC_Configurations_EmailChangeValidate />} />
        <Route path="Dashboard/Config/NameChange" element={<DC_Configurations_NameChange />} />
        <Route path="Dashboard/Notificaciones" element={<DC_Notifications />} />
        <Route path="Dashboard/MisTramites" element={<MisTramites />} />
        <Route path="Dashboard/Tramites" element={<TramitesOnlinePage />} />
      </Route>
      <Route path="actor" element={<PrivateRoute><LayoutActor /></PrivateRoute>}>
        <Route index element={<DA_Home />} />
        <Route path="procedure">
          <Route index element={<DA_Procedures_Home />} />
          <Route path="new" element={<DA_Procedures_Create />} />
        </Route>



        <Route path="*" element={<ErrorPage />}/>
      </Route>
    </Routes>
  );
}