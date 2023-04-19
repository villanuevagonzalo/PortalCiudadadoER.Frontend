import { Auth_Login } from "../Pages/Auth/Login";
import { Auth_Signup } from "../Pages/Auth/Signup";

import { DA_Home } from "../Pages/Actor/Home";
import { DA_Procedures_Create } from "../Pages/Actor/Procedures/Create";
import { DA_Procedures_Home } from "../Pages/Actor/Procedures/Home";

import { DC_Home } from "../Pages/Ciudadano/Home";
import { DC_Configurations } from "../Pages/Ciudadano/Configurations/Home";
import { DC_Configurations_EmailChange } from "../Pages/Ciudadano/Configurations/EmailChange";
import { DC_Configurations_EmailChangeValidate } from "../Pages/Ciudadano/Configurations/EmailChangeValidate";
import { DC_Configurations_NameChange } from "../Pages/Ciudadano/Configurations/NameChange";
import { DC_Notifications } from "../Pages/Ciudadano/Notifications/Home";
import { DC_Procedures } from "../Pages/Ciudadano/Procedures/DC_Procedures";

import { Auth_EmailResendValidation } from "../Pages/Auth/EmailResendValidation";
import { Auth_EmailValidate } from "../Pages/Auth/EmailValidate";
import { Auth_PasswordReset } from "../Pages/Auth/PasswordReset";
import { Auth_PasswordUpdate } from "../Pages/Auth/PasswordUpdate";

interface RawPagesProps {
  [key: string]: {
    path: string;
    label: string;
    element: JSX.Element;
    childrens?: RawPagesProps;
  }
}

export const RawPages:RawPagesProps = {

  INDEX:{
    path: '/',
    label: 'Inicio',
    element: <Auth_Login />
  },

  AUTH:{
    path: 'auth',
    label: 'Autenticación',
    element: <Auth_Login />,
    childrens: {
      LOGIN:{
        path: 'ingresar',
        label: 'Iniciar Sesión',
        element: <Auth_Login />
      },
      SIGNUP:{
        path: 'registro',
        label: 'Registro',
        element: <Auth_Signup />
      },
      EMAILVALIDATE:{
        path: 'email/validate',
        label: 'Validar Email',
        element: <Auth_EmailValidate />
      },
      EMAILRESENDVALIDATION:{
        path: 'email/resendvalidation',
        label: 'Reenviar Email de Validación',
        element: <Auth_EmailResendValidation />
      },
      PASSWORDRESET:{
        path: 'password/reset',
        label: 'Resetear Contraseña',
        element: <Auth_PasswordReset />
      },
      PASSWORDUPDATE:{
        path: 'password/update',
        label: 'Actualizar Contraseña',
        element: <Auth_PasswordUpdate />
      }
    }
  },

  DC:{
    path: 'dashboard',
    label: 'Dashboard Ciudadano',
    element: <DC_Home />,
    childrens: {
      CONFIGURATIONS:{
        path: 'configurations',
        label: 'Configuración',
        element: <DC_Configurations />,
        childrens: {
          NAMECHANGE:{
            path: 'changename',
            label: 'Cambiar Nombre',
            element: <DC_Configurations_NameChange />
          },
          EMAILCHANGE:{
            path: 'changename',
            label: 'Cambiar Nombre',
            element: <DC_Configurations_EmailChange />
          },
          EMAILCHANGEVALIDATE:{
            path: 'changename',
            label: 'Cambiar Nombre',
            element: <DC_Configurations_EmailChangeValidate />
          }
        }
      },
      NOTIFICATIONS:{
        path: 'notifications',
        label: 'Notificaciones',
        element: <DC_Notifications />
      },
      PROCEDURES:{
        path: 'procedures',
        label: 'Mis Tramites',
        element: <DC_Procedures />
      }
    }
  },

  DA:{
    path: 'actor',
    label: 'Dashboard Actores',
    element: <DA_Home />,
    childrens: {
      PROCEDURES:{
        path: 'procedures',
        label: 'Configurador de Tramites',
        element: <DA_Procedures_Home />,
        childrens: {
          NEW:{
            path: 'new',
            label: 'Crear',
            element: <DA_Procedures_Create />
          }
        }
      }
    }
  }

}



interface PagesProps {
  [key: string]: string;
}

export const Pages:PagesProps = {
  INDEX: 'inicio'
}


