import Logo from '../../Assets/LOGO-CiudadanoDigital.svg'


export const LogoCiudadanoDigital: React.FC<{width?:string}> = ({width='300px'}) => {
  
  return (<div style={{height:'auto', width}}>
    <img
      src={Logo}
      alt="Ciudadano Digital"
    />
    </div>)
}