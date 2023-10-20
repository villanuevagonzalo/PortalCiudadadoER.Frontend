import { FC, createContext, useState } from "react";

const ContextValues = () => {
   
  const [fileArray, setFileArray] = useState<File[]>([]);

  const addFileToContext = (file: File) => {
    setFileArray(prevFileArray => [...prevFileArray, file]);
  };

  const addFilesToContext = (filesToAdd: File[]) => {
    //console.log((filesToAdd))
    setFileArray(prevFileArray => [...prevFileArray, ...filesToAdd]);
  };

  const getFileName  = (index: number) => {
    if (fileArray[index]){
      return fileArray[index].name
    }else{
      return null
    }
  }

  const clearFileArray = () => {
    setFileArray([])
  }

  return {
    fileArray, setFileArray, addFileToContext, addFilesToContext, clearFileArray, getFileName
  }
}

export const FilesContext = createContext({} as ReturnType<typeof ContextValues>);

const FilesContextProvider: FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <FilesContext.Provider value={ContextValues()}>
      {props.children}
    </FilesContext.Provider>
  );
}

export default FilesContextProvider;