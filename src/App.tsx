import { Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './Components/NewLayout/Default';
import { HomePage } from './Pages/HomePage';
import { ErrorPage } from './Pages/ErrorPage';
import { ValidarCorreo } from './Pages/Auth/ValidarCorreo';
import { RegisterPage } from './Pages/Auth/Register';
import { LoginPage } from './Pages/Auth/Login';
import { AuthRoute, PrivateRoute } from './Routes/PrivateRoute';
import { DashboardLayout } from './Components/Layout/DashboardLayout';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Contexts/AuthContext';
import { ReenviarCodigo } from './Pages/Auth/ReenviarCodigo';
import { DashBoard_Credenciales } from './Components/DashboardCiudadano/Credenciales';
import { DashBoard_Aplicaciones } from './Components/DashboardCiudadano/Aplicaciones';
import { DashBoard_Mensajes } from './Components/DashboardCiudadano/Mensajes';
import { InicioPage } from './Pages/DashboardCiudadano/InicioPage';
import { TramitesOnlinePage } from './Pages/DashboardCiudadano/TramitesOnlinePage';
import { ConfigPage } from './Pages/DashboardCiudadano/Config';

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
          </Route>
          <Route element={<DefaultLayout />}>
            <Route path="ValidarCorreo" element={<ValidarCorreo />} />
            <Route path="ReenviarCodigo" element={<ReenviarCodigo />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route path="Dashboard" element={<InicioPage />} />
            <Route path="Dashboard/Credenciales" element={<DashBoard_Credenciales />} />
            <Route path="Dashboard/Config" element={<ConfigPage />} />
            <Route path="Dashboard/Aplicaciones" element={<DashBoard_Aplicaciones />} />
            <Route path="Dashboard/Mensajes" element={<DashBoard_Mensajes />} />
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