import { Fragment, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AiOutlineMore, AiOutlineUser } from 'react-icons/ai'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { AuthContext } from '../../Contexts/AuthContext'
import { RoundedActorButton } from './StyledComponents'
import { MdOutlineEdit, MdOutlineMoreVert } from 'react-icons/md'
import { BiLogOut } from 'react-icons/bi'

const REACTENV = process.env

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function DropDownEx() {

    const { userData, userRol, Logout2 } = useContext(AuthContext);


  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-1 text-sm font-semibold text-gray-900 ">
        <RoundedActorButton>
         <span>{userData.last_name.toUpperCase()}, {userData.name.toUpperCase()}</span>
         <MdOutlineMoreVert />
       </RoundedActorButton>
        </Menu.Button>
      </div>

        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-index:100">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                href="#" onClick={()=>{window.location.href= REACTENV.REACT_APP_PROJECT_ADMIN+"perfil" }}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'flex items-center block px-4 py-2 text-sm'
                  )}
                >
                  <AiOutlineUser color='gray ' className="mr-2"/>Perfil
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={()=>{
                    window.open('https://apps.entrerios.gov.ar/cambioclave/',"_blank")
                  }}
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'flex items-center block px-4 py-2 text-sm'
                  )}
                >
                  <MdOutlineEdit color='gray ' className="mr-2"/>Cambiar Contraseña
                </a>
              )}
            </Menu.Item>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={Logout2}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'flex items-center block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    <BiLogOut color='gray ' className="mr-2"/>Cerrar Sesion
                   
                  </button>
                )}
              </Menu.Item>
              </div>
          </div>
        </Menu.Items>
    </Menu>
  )
}
