import { BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from "react-icons/bs";

export const fileTypes:any = {
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