/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'

import { CgClose } from 'react-icons/cg'
import { AiOutlineMenu, AiFillHome, AiOutlinePaperClip, AiOutlineSchedule } from 'react-icons/ai'
import { BiLogIn, BiUserCircle } from 'react-icons/bi'
import { MdHelpOutline } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'

import LogoER from '../../Assets/LOGO-ER.svg'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'


export const HeaderComponet = () =>{

  const { Logout, userData, isLogged } = useContext(AuthContext);

  return (
    <>
    </>
  )
}