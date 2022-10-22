/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'

import { CgClose } from 'react-icons/cg'
import { AiOutlineMenu, AiFillHome, AiOutlinePaperClip, AiOutlineSchedule } from 'react-icons/ai'
import { BiLogIn, BiUserCircle } from 'react-icons/bi'
import { FaSearch } from 'react-icons/fa'

import LogoER from '../../Assets/LOGO-ER.svg'
import { Link, NavLink } from 'react-router-dom'

const navigation = [
  { name: 'Inicio', icon: AiFillHome, href: '/', current: true },
  { name: 'Mis Tramites', icon: AiOutlinePaperClip, href: 'tramites', current: false },
  { name: 'Servicios Online', icon: AiOutlineSchedule, href: 'servicios', current: false }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const HeaderComponet = () =>{
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-24">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-gray-600 ">
                  <span className="sr-only">Abrir Menu</span>
                  {open ? (
                    <CgClose className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <AiOutlineMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-start pl-14 lg:pl-0 sm:items-stretch sm:justify-start">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <img
                    className="block h-12 lg:h-14 w-auto"
                    src={LogoER}
                    alt="Entre Ríos"
                  />
                </Link>
                <div className="hidden sm:block sm:ml-10 sm:my-3 ">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({isActive}) => (isActive ? 'bg-celeste text-white' : 'text-gray-700 hover:bg-gray-600 hover:text-white')+' px-3 py-2 rounded-md text-sm font-medium flex'}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {<item.icon  className="h-4 w-4 mr-2 mt-0.5" />}
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
                  <span className="sr-only">Ver Notificaciones</span>
                  <FaSearch aria-hidden="true" className="h-6 w-6"  />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative z-50">
                  <div>
                    <Menu.Button className="flex text-sm rounded-full ring-5 ring-gray-500 text-gray-500 hover:text-gray-700">
                      <span className="sr-only">Menu de Usuario</span>
                      <BiUserCircle aria-hidden="true" className="h-8 w-8"/>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Perfil
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Configuraciones
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Cerrar Sesión
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button className="w-full">
                  <NavLink
                  key={item.name}
                  to={item.href}
                  className={({isActive}) => (isActive ? 'bg-celeste text-white' : 'text-gray-700 hover:bg-gray-600 hover:text-white')+' px-3 py-2 rounded-md text-sm font-medium flex'}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {<item.icon  className="h-4 w-4 mr-4 mt-0.5" />}
                  {item.name}
                  </NavLink>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}