import Logo from '../../Assets/LOGO-EntreRios.svg'


export const LogoER: React.FC<{width?:string}> = ({width='300px'}) => {
  
  return (<>
    <div style={{height:'auto', width}}>
    <img
      src={Logo}
      alt="Gobierno de Entre Ríos"
    />
    </div>
  </>)
}