import {  AiOutlineAppstore } from "react-icons/ai";
import { ContainerCard } from "../../Components/Elements/StyledComponents";

export const DashBoardActor_Aplicaciones = () =>(
    <ContainerCard>
        <div><AiOutlineAppstore /> No tienes ninguna aplicación instalada</div>
        <div>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none m-2 w-full" type="button" style={{ transition: "all .15s ease" }}>
            Añadir Aplicación
            </button>
        </div>
    </ContainerCard>
)