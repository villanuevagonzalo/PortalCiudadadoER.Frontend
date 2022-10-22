import { Link } from "react-router-dom";
import { Hero } from "../../Components/Elements/Hero";

export const DashboardCiudadanoPage = () => {
  return (
    <Hero classes="bg-gradient-to-r from-cyan-500 to-blue-500 text-white" tail={true}>
      <h1 className="my-4 text-4xl lg:text-5xl font-bold leading-tight">
        Bienvenido a tu Gobierno Digital!
      </h1>
      <p className="leading-normal text-1xl lg:text-2xl mb-8">
        Una forma fácil y segura de acceder a los servicios digitales del Estado con una única sesión y en un sólo lugar.
      </p>
      <div className="flex space-x-4 justify-center w-full md:justify-start">
       
      </div>
    </Hero>
  );
};
