import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from './Components/NewLayout/Default';
import { HomePage } from './Pages/HomePage';
import { TramitesPage } from './Pages/Tramites/index';
import { ErrorPage } from './Pages/ErrorPage';
import { ValidarCorreo } from './Pages/Auth/ValidarCorreo';
import { RegisterPage } from './Pages/Auth/Register';
import { LoginPage } from './Pages/Auth/Login';
import { HomeRoute, PrivateRoute } from './Routes/PrivateRoute';
import { DashboardCiudadanoPage } from './Pages/Dashboard/DashboardCiudadano';
import { DashboardLayout } from './Components/Layout/DashboardLayout';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Contexts/AuthContext';
import { ReenviarCodigo } from './Pages/Auth/ReenviarCodigo';
import { Empty } from './Pages/Empty';
import { DashBoard_Default } from './Components/DashboardCiudadano/Default';
import { DashBoard_Credenciales } from './Components/DashboardCiudadano/Credenciales';
import { DashBoard_Aplicaciones } from './Components/DashboardCiudadano/Aplicaciones';
import { DashBoard_Mensajes } from './Components/DashboardCiudadano/Mensajes';
import { DashBoard_Tramites } from './Components/DashboardCiudadano/Tramites';
import { InicioPage } from './Pages//Dashboard/InicioPage';
import { TramitesOnlinePage } from './Pages/Dashboard/TramitesOnlinePage';

function App() {
  
  const { CheckToken } = useContext(AuthContext);

  useEffect(()=>{
      CheckToken()
  },[])

  
  return (
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomeRoute />} />
            <Route path="Inicio" element={<HomePage />} />
            <Route path="Ingresar" element={<LoginPage />} />
            <Route path="Registro" element={<RegisterPage />} />
            <Route path="ValidarCorreo" element={<ValidarCorreo />} />
            <Route path="ReenviarCodigo" element={<ReenviarCodigo />} />
            
            <Route path="servicios"
              element={
                <PrivateRoute>
                  <TramitesPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="Dashboard" element={<DashBoard_Default />} />
            <Route path="Dashboard/Credenciales" element={<DashBoard_Credenciales />} />
            <Route path="Dashboard/Aplicaciones" element={<DashBoard_Aplicaciones />} />
            <Route path="Dashboard/Mensajes" element={<DashBoard_Mensajes />} />
            <Route path="Dashboard/Tramites" element={<DashBoard_Tramites />} />
            <Route path="DashboardCiudadano" element={<DashboardCiudadanoPage />} />
          </Route>
        </Routes>
  );
}

export default App;


/*

            <Route path="registro" element={<Registro />} />
            <Route path="ingresar" element={<Ingresar />} />
            <Route path="RestaurarPassword" element={<Ingresar />} />*/