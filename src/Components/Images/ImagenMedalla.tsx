import Logo from '../../Assets/medalla.svg'


export const ImagenMedalla: React.FC<{width?:string}> = ({width='300px'}) => {
  
  return (<>
    <div style={{height:'auto', width}}>
    <img
      src={Logo}
      alt="Validación"
    />
    </div>
  </>)
}