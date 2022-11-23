import { Link } from "react-router-dom"

import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

export const FooterComponet = () =>(<footer className="bg-white max-w-7xl mt-10 lg:mt-20 mx-auto px-4 sm:px-6 lg:px-8 text-gray-500">
    <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
                <img src={"./assets/escudo-gobierno.png"} className="block h-8 w-auto mr-4 grayscale" />
                <span className="self-center text-2xl whitespace-nowrap ">Secretaria de Modernización</span>
            </a>
        </div>
        <div className="grid hidden grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">Titulo 1</h2>
                <ul className="text-gray-600 ">
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Link 2</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Link 2</a>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">Titulo 2</h2>
                <ul className="text-gray-600 ">
                    <li className="mb-4">
                        <a href="#" className="hover:underline ">Link 3</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Link 4</a>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Titulo 3</h2>
                <ul className="text-gray-600">
                    <li className="mb-4">
                        <a href="#" className="hover:underline">Link 5</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Link 6</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <hr className="my-6 border-gray-300 sm:mx-auto " />
    <div className="mb-6 sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="#" className="hover:underline">....</a>. Todos los derechos reservados.
        </span>
        <div className="flex mt-4 space-x-6 sm:mt-0 justify-center md:justify-start">
            <a href="#" className="text-gray-500 hover:text-gray-900"><BsFacebook /></a>
            <a href="#" className="text-gray-500 hover:text-gray-900"><BsInstagram /></a>
            <a href="#" className="text-gray-500 hover:text-gray-900"><BsTwitter /></a>
        </div>
    </div>
</footer>)


/*
        <div id="sticky-footer" classNameName="flex-shrink-0 py-4 bg-dark text-white-50"> 
            <div style={{ margin: "10px" }}>
                <img src={"./assets/escudo-gobierno.png"}
                    classNameName="block h-12 w-auto" />
            </div>
            <div style={{ margin: "15px" }}><Link to="/preguntas#frecuentes" style={{ margin: "5px" }}>Preguntas frecuentes</Link></div>
            <div style={{ margin: "15px" }}><Link to="/terminos#condiciones" style={{ margin: "5px" }}>Términos y condiciones</Link></div>
            <strong style={{ margin: "5px" }}>@JAOdev 02/03/2022</strong>
        </div>*/