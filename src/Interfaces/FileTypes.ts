import { BsFile, BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from "react-icons/bs";

export const fileTypes:any = {
  "null":{
    label: "NULL",
    fulltype: "image/jpg",
    icon: BsFile
  },
  "jpg":{
    label: "IMAGEN",
    fulltype: "image/jpg",
    icon: BsFiletypeJpg
  },
  "jpeg":{
    label: "IMAGEN",
    fulltype: "image/jpeg",
    icon: BsFiletypeJpg
  },
  "png":{
    label: "IMAGEN",
    fulltype: "image/png",
    icon: BsFiletypePng
  },
  "pdf":{
    label: "DOCUMENTO",
    fulltype: "application/pdf",
    icon: BsFiletypePdf
  }
}

export const getFileType = (type:string) => {
  return fileTypes[type] || fileTypes["null"]
}