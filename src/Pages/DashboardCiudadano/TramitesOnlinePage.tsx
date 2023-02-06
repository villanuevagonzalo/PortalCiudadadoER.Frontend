import { LayoutItem, LayoutTitle, NavigatorSpacer } from '../../Components/Elements/StyledComponents';
import { Button } from '../../Components/Forms/Button';
import { FormikField } from '../../Components/Forms/FormikField';

const data = [
    {title: 'Solicitud Certificado de Pre-Identificación', description:'El certificado de Pre-Identificación (CPI) es un instrumento con el que podrán contar las personas actualmente indocumentadas para acceder a derechos básicos mientras el trámite de inscripción tardía de nacimiento ante el Registro Civil (ya sea por vía administrativa o por vía judicial), y posteriormente el trámite para obtener el DNI (Documento Nacional de Identidad). La tramitación del CPI no inicia el trámite de inscripción tardía de nacimiento. ...'},
    {title: 'Reemplazo de Libreta Cívica o Libreta de Enrolamiento por nuevo DNI Tarjeta', description:'Es el trámite que te permite reemplazar la Libreta de Enrolamiento o Libreta Cívica por el nuevo DNI Digital en formato tarjeta (Documento Nacional de Identidad). este nuevo DNI Digital conserva el mismo número que tu libreta anterior. ...'},
    {title: 'Solicitud de un nuevo ejemplar de DNI por extravío, robo o deterioro', description: 'Es el trámite que te permite solicitar un nuevo ejemplar de DNI (Documento Nacional de Identidad) en formato tarjeta ante el extravío, robo o deterioro. El nuveo DNI que obtengas conservará el mismo número que el anterior. ...'},
    {title: 'Solicitud de DNI para argentinos naturalizados', description: 'Este trámite te permite solicitar tu DNI (Documento Nacional de Identidad) argentino una vez que ya tengas la carta de ciudadanía, la cual se obtiene mediante proceso judicial que se lleva a cabo exclusiamente ante los tribunales federales argentinos. ...'},
    {title: 'Rectificaión de datos por cambio de género', description:'Este trámite te permite modificar los datos de nombre y género registrados en tu DNI. ...'},
]

export const TramitesOnlinePage = () => {

    return(<>
        <LayoutTitle>
            Trámites on line
        </LayoutTitle>
        
        {data.map((item, index) => <LayoutItem key={index}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <div className="text-right flex gap-4">
            <NavigatorSpacer/> 
                <Button color="gray" fullwidth={false}>+Información</Button>
                <Button color="secondary" fullwidth={false}>Iniciar</Button>
            </div>
        </LayoutItem>)}
        

        {/* <ContainerItem2 className="text-left flex flex-wrap">
            <h1>Solicitud Certificado de Pre-Identificación</h1>
            <p>El certificado de Pre-Identificación (CPI) es un instrumento con el que podrán contar las personas actualmente indocumentadas para acceder a 
                derechos básicos mientras el trámite de inscripción tardía de nacimiento ante el Registro Civil (ya sea por vía administrativa o por vía judicial), y
                posteriormente el trámite para obtener el DNI (Documento Nacional de Identidad). La tramitación del CPI no inicia el trámite de inscripción tardía de 
                nacimiento. ...
            </p>
            <div className="text-right">
            <button className="bg-gris text-white active:bg-gray-500 text-xs font-bold px-10 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none m-2" type="button" style={{ transition: "all .15s ease" }}>
                +Información
            </button>
            <button className="bg-celeste text-white active:bg-blue-700 text-xs font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none m-2" type="button" style={{ transition: "all .15s ease" }}>
                Iniciar
            </button>
        </div>  
        </ContainerItem2> */}
                
    </>);
}