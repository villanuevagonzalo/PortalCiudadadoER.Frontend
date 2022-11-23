import { BiError, BiArrowToLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Hero } from "../Components/Elements/Hero";

export const ErrorPage = () => {
  return (
    <Hero classes="bg-gradient-to-r from-rose-500 to-orange-500 text-white" tail={true}>
    <div className="p-4">
      <h1 className="my-4 text-4xl lg:text-5xl font-bold leading-tight flex space-x-4 justify-center w-full md:justify-start">
        <BiError aria-hidden="true" className="h-10 lg:h-14 w-auto mr-4"/>
        ERROR
      </h1>
      <p className="leading-normal text-1xl mb-4 lg:text-2xl justify-center w-full md:justify-start">
        La pagina solicitada no existe.
      </p>
      <div className="flex space-x-4 justify-center w-full md:justify-start mb-8">
        <Link to="/" className="bg-white text-gray-800 flex font-bold rounded-lg my-6 py-4 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-110 duration-300 ease-in-out">
         
        <BiArrowToLeft aria-hidden="true" className="h-6 w-auto mr-4"/> Volver al Inicio
        </Link>
      </div>
      </div>
    </Hero>
  );
};
