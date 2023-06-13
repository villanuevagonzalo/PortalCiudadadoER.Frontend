import moment from "moment";
import 'moment/locale/es';
import { CitizenNotification, FileBlob } from "../../Interfaces/Data";
import { NotificationCardWrapper, Spinner } from "../Elements/StyledComponents";
import { stringPreview } from "../../Utils/General";
import { AiOutlineStar, AiOutlineNotification } from "react-icons/ai";
import { fileTypes } from "../../Interfaces/FileTypes";

moment.locale('es')

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	data: FileBlob;
}

export const NotificationFile: React.FC<Props> = ({data, ...props}) => {
  
  const fileDataURL = data.data;

  const downloadImage = () => {

    if(data.data == "") return false;

    const downloadButton = document.createElement('a');
    downloadButton.href = fileDataURL;
    downloadButton.download = data.name;

    const buttonText = document.createTextNode('Descargar imagen');
    downloadButton.appendChild(buttonText);

    // Simular el clic en el botón de descarga
    downloadButton.click();
  };

  const tt = fileTypes[data.type] || fileTypes["png"];    

  return (<span key={data.name} onClick={downloadImage}><tt.icon /> {data.name}
      
  
  </span>)
}


/*




<span className="attachment"><BsFiletypeJpg /> IMAGEN</span>
          <span className="attachment"><BsFiletypePdf /> PDF</span>*/