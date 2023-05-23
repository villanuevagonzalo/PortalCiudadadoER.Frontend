import { InputHTMLAttributes, useRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
}

export const FileUploader: React.FC<Props> = ({ name, ...props }) => {

  

  return (
    <>
      <label className="uploader" htmlFor="file">
        Upload a file
      </label>
      <input type="file"
      id="file" 
             style={{display:'none'}} 
      /> 
    </>
  );
};