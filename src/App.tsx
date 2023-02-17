import { Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { ErrorPage } from './Pages/ErrorPage';
import { ValidarCorreo } from './Pages/Auth/ValidarCorreo';
import { RegisterPage } from './Pages/Auth/Register';
import { LoginPage } from './Pages/Auth/Login';
import { AuthRoute, PrivateRoute } from './Routes/PrivateRoute';
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
import { DashboardLayout } from './Components/Layout/DashboardLayout';
import { ResetPassword } from './Pages/Auth/ResetPassword';
import { ResendPassword } from './Pages/Auth/ResendPassword';
import { ErrorEmailSent } from './Pages/Auth/ErrorEmailSent';

function App() {
  
  const { CheckToken } = useContext(AuthContext);

  useEffect(()=>{
      CheckToken()
  },[])

  
  return (
        <Routes>
          <Route element={<AuthRoute><DefaultLayout /></AuthRoute>}>
            <Route index element={<LoginPage />} />
            <Route path="Inicio" element={<LoginPage />} />
            <Route path="Ingresar" element={<LoginPage />} />
            <Route path="Registro" element={<RegisterPage />} />
            <Route path="RestaurarPassword" element={<ResetPassword />} />
          </Route>
          <Route element={<DefaultLayout />}>
            <Route path="ValidarCorreo" element={<ValidarCorreo />} />
            <Route path="ReenviarCodigo" element={<ReenviarCodigo />} />
            <Route path="ErrorEmailSent" element={<ErrorEmailSent />}/>
            <Route path="passwordreset" element={<ResendPassword />}/>
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route path="Dashboard" element={<Dashboard_HomePage />} />
            <Route path="Dashboard/Credenciales" element={<DashBoard_Credenciales />} />
            <Route path="Dashboard/Config" element={<Dashboard_ConfigurationPage />} />
            <Route path="Dashboard/Aplicaciones" element={<DashBoard_Aplicaciones />} />
            <Route path="Dashboard/Mensajes" element={<DashBoard_Notificaciones />} />
            <Route path="Dashboard/Tramites" element={<TramitesOnlinePage />} />
          </Route>
        </Routes>
  );
}

export default App;


/*

            <Route path="registro" element={<Registro />} />
            <Route path="ingresar" element={<Ingresar />} />
            <Route path="RestaurarPassword" element={<Ingresar />} />*/