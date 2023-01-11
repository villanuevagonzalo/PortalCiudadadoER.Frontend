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