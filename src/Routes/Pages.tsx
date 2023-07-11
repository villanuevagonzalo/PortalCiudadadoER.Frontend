import { Auth_Login } from "../Pages/Auth/Login";
import { Auth_Signup } from "../Pages/Auth/Signup";

import { DA_Home } from "../Pages/Actor/Home";
import { DA_Procedures_Create } from "../Pages/Actor/Procedures/Create";
import { DA_Procedures_Home } from "../Pages/Actor/Procedures/Home";
import { DA_Notifications } from "../Pages/Actor/Notifications/List";

import { DC_Home } from "../Pages/Ciudadano/Home";
import { DC_Configurations } from "../Pages/Ciudadano/Configurations/Home";
import { DC_Configurations_EmailChange } from "../Pages/Ciudadano/Configurations/EmailChange";
import { DC_Configurations_EmailChangeValidate } from "../Pages/Ciudadano/Configurations/EmailChangeValidate";
import { DC_Configurations_NameChange } from "../Pages/Ciudadano/Configurations/NameChange";
import { DC_Notifications } from "../Pages/Ciudadano/Notifications/Home";
import { DC_Procedures } from "../Pages/Ciudadano/Procedures/Home";
import { DC_Procedures_Started } from "../Pages/Ciudadano/Procedures/Started";

import { Auth_EmailResendValidation } from "../Pages/Auth/EmailResendValidation";
import { Auth_EmailValidate } from "../Pages/Auth/EmailValidate";
import { Auth_PasswordReset } from "../Pages/Auth/PasswordReset";
import { Auth_PasswordUpdate } from "../Pages/Auth/PasswordUpdate";
import { TramitesOnlinePage } from "../Pages/Ciudadano/Procedures/TramitesOnlinePage";
import { DC_UserValidate } from "../Pages/Ciudadano/Configurations/UserValidate";
import { DA_Procedures_Forms_Home } from "../Pages/Actor/Procedures/Forms/Home";
import { DA_Procedures_Forms_Create } from "../Pages/Actor/Procedures/Forms/Create";
import { DA_Procedures_List } from "../Pages/Actor/Procedures/List";
import { Auth_Redirect } from "../Pages/Auth/Redirect";
import { DA_Notifications_Create } from "../Pages/Actor/Notifications/Create";
import { DA_PRESENTIAL } from "../Pages/Actor/Presential";
import { DA_Procedures_Config } from "../Pages/Actor/Procedures/ProceduresConfigurator";

const REACTENV = process.env

interface PageProps {
  path: string;
  label: string;
  element: JSX.Element;
  scope?: string[];
  root?: boolean;
  children?: RawPagesProps;
}
interface RawPagesProps {
  [key: string]: PageProps
}
interface PagesProps {
  [key: string]: string;
}

export const RawPages:RawPagesProps = {

  INDEX:{
    path: '',
    label: 'Inicio',
    element: <Auth_Login />,
    scope: ['public'],
    root: true
  },

  AUTH:{
    path: 'auth',
    label: 'Autenticación',
    element: <Auth_Login />,
    scope: ['public'], //
    root: true,
    children: {
      REDIRECT:{
        path: 'redirect',
        label: 'Iniciar Sesión',
        scope: ['mixed'],
        element: <Auth_Redirect/>
      },
      LOGIN:{
        path: 'signin',
        label: 'Iniciar Sesión',
        element: <Auth_Login />
      },
      SIGNUP:{
        path: 'signup',
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
        scope: ['mixed'],
        element: <Auth_PasswordReset />
      },
      PASSWORDUPDATE:{
        path: 'password/update',
        label: 'Actualizar Contraseña',
        element: <Auth_PasswordUpdate />
      },
      USERVALIDATE:{
        path: 'user/validate',
        label: 'Validación de Usuario',
        scope: ['private','citizen'],
        element: <DC_UserValidate />,
        children: {
          AFIP:{
            path: 'afip',
            label: 'AFIP',
            element: <DC_UserValidate type="AFIP"/>
          },
          MIARGENTINA:{
            path: 'miargentina',
            label: 'Mi Argentina',
            element: <DC_UserValidate type="Mi Argentina" />
          },
        }
      }
    }
  },

  DC:{
    path: 'dashboard',
    label: 'Dashboard Ciudadano',
    element: <DC_Home />,
    scope: ['private','citizen'],
    root: true,
    children: {
      CONFIGURATIONS:{
        path: 'configurations',
        label: 'Mi Perfil',
        element: <DC_Configurations />,
        children: {
          NAMECHANGE:{
            path: 'name/change',
            label: 'Cambiar Datos Personales',
            element: <DC_Configurations_NameChange />
          },
          EMAILCHANGE:{
            path: 'email/change',
            label: 'Cambiar Correo Electrónico',
            element: <DC_Configurations_EmailChange />,
            children: {
              VALIDATE:{
                path: 'validate',
                label: 'Validación',
                element: <DC_Configurations_EmailChangeValidate />
              }
            }
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
        label: 'Tramites',
        element: <TramitesOnlinePage />,
        children: {
          STARTED:{
            path: 'started',
            label: 'Mis Tramites',
            element: <DC_Procedures_Started />
          },
        }
      }
    }
  },

  DA:{
    path: 'actor',
    label: 'Dashboard Actores',
    element: <DA_Home />,
    scope: ['private','actor'],
    root: true,
    children: {
      PROCEDURES:{
        path: 'procedures',
        label: 'Gestor de Tramites',
        element: <DA_Procedures_Home />,
        children: {
          LIST:{
            path: 'list',
            label: 'Trámites',
            element: <DA_Procedures_List />,
            children: {
              NEW:{
                path: 'new',
                label: 'Crear',
                element: <DA_Procedures_Create />
              }
            }
          },
          CONFIG:{
            path: 'config',
            label: 'Configuración',
            element: <DA_Procedures_Config />
          },
          FORMS:{
            path: 'forms',
            label: 'Formularios',
            element: <DA_Procedures_Forms_Home />,
            children: {
              LIST:{
                path: 'list',
                label: 'Lista',
                element: <DA_Procedures_Forms_Home />
              },
              NEW:{
                path: 'new',
                label: 'Crear Nuevo Formulario',
                element: <DA_Procedures_Forms_Create />
              }
            }
          }
        }
      },
      NOTIFICATIONS:{
        path: 'notifications',
        label: 'Gestor de Notificaciones',
        element: <DA_Notifications />,
        children: {
          NEW:{
            path: 'new',
            label: 'Crear Nueva Notificación',
            element: <DA_Notifications_Create/>
          }
        }
      },
      PRESENTIAL:{
        path: 'presential',
        label: 'Validación Presencial',
        element: <DA_PRESENTIAL />
      },
    }
  }

}

const FlattenPages = (RawPages: RawPagesProps, parentPath:string = '', parentKey:string = '', parentScope:string[] = []): RawPagesProps => {
  const flatObject: RawPagesProps = {};
  Object.keys(RawPages).forEach((key) => {
    const path = parentPath + '/' + RawPages[key].path;
    const label = RawPages[key].label;
    const root = RawPages[key].root || false;
    const element = RawPages[key].element;
    const flatKey = parentKey ? parentKey + "_" + key : key;
    const scope = RawPages[key].scope || parentScope;
    const children = RawPages[key].children;
    if (children) {
      const flatChilds = FlattenPages(children, path, flatKey, scope);
      for (const childKey in flatChilds) {
        if (flatChilds.hasOwnProperty(childKey)) {
          flatObject[childKey] = flatChilds[childKey];
        }
      }
    }
    flatObject[flatKey] = {
      path: path + (path==='/'?'':'/'),
      label,
      scope,
      root,
      element
    };
  });
  return flatObject;
};

export const FlatPages:RawPagesProps = FlattenPages(RawPages);
export const Pages:PagesProps = Object.fromEntries(Object.entries(FlatPages).map(([key, value]) => [key, value.path]));

export const GetFullPath = (path:string) => Object.values(FlatPages)
                                                  .filter((item:PageProps)=>path.startsWith(item.path)&&!item.root)
                                                  .sort((a, b) => (a.path > b.path) ? 1 : -1);