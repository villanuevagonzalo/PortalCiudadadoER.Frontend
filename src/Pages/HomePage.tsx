import { useContext } from "react";
import { Link } from "react-router-dom";
import { Hero } from "../Components/Elements/Hero";
import { AuthContext } from "../Contexts/AuthContext";
import { MdOutlineLogout } from 'react-icons/md';
import { AiOutlinePaperClip } from 'react-icons/ai'

export const HomePage = () => {
  
  const { isLogged, userData, Logout } = useContext(AuthContext);


  return (
    <Hero classes="bg-gradient-to-r from-cyan-500 to-blue-500 text-white" tail={true}>
      {isLogged?
        <div className="p-4">
          <h1 className="mt-4 text-4xl lg:text-5xl leading-tight">
            Bienvenido <b>{userData.name} {userData.lastname}</b>
          </h1>
          <div className="flex space-x-4 text-sm justify-center w-full md:justify-start">
            <div className="rounded-lg my-6 py-2 px-4 border-solid border-2 border-white">CUIL<br/><b>{userData.cuil}</b></div>
            <div className="rounded-lg my-6 py-2 px-4 border-solid border-2 border-lime-600 bg-lime-600">{userData.roles[0][0]}<br/><b>{userData.roles[0][1]}</b></div>
          </div>
          <p className="leading-normal text-1xl lg:text-2xl mb-8">
            Accede a las diferentes opciones de servicios online disponibles para tu nivel
          </p>
          <div className="flex space-x-4 justify-center w-full md:justify-start">
            <Link to="/DashboardCiudadano" className="bg-white text-gray-800  flex font-bold rounded-lg py-4 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-110 duration-300 ease-in-out">
              <AiOutlinePaperClip aria-hidden="true" className="h-6 w-auto mr-3"/> 
            Servicios
            </Link>
          </div>
          <div className="flex space-x-4 justify-center w-full md:justify-start">
            <Link to="/" className="bg-white text-gray-800 flex font-bold rounded-lg my-6 py-4 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-110 duration-300 ease-in-out" onClick={Logout}>
            Cerrar Sesión
              <MdOutlineLogout aria-hidden="true" className="h-6 w-auto ml-3"/> 
            </Link>
          </div>
        </div>
        :
        <div className="p-4">
          <h1 className="my-4 text-4xl lg:text-5xl font-bold leading-tight">
            Bienvenido a tu Gobierno Digital!
          </h1>
          <p className="leading-normal text-1xl lg:text-2xl mb-8">
            Una forma fácil y segura de acceder a los servicios digitales del Estado con una única sesión y en un sólo lugar.
          </p>
          <div className="flex space-x-4 justify-center w-full md:justify-start">
            <Link to="/Ingresar" className="bg-white text-gray-800 font-bold rounded-lg my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-110 duration-300 ease-in-out">
              Iniciar Sesión
            </Link>
            <Link to="/Registro" className="bg-white text-gray-800 font-bold rounded-lg my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              Registrate
            </Link>
          </div>
        </div>
      }
    </Hero>
  );
};
