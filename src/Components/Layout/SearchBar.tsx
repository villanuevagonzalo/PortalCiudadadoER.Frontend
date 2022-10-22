import { useState } from "react"

import 'font-awesome/css/font-awesome.min.css';


export const SearchBar = () =>{

    const [mostrar, SetMostrar] = useState(false)
    const img = "./assets/buscarIcono.png"

    

    if(mostrar){
        return(
            <div className="input-group">
                <input type="search" className="form-control rounded" placeholder="Buscar trámites, servicios o áreas" aria-label="Search" aria-describedby="search-addon"     style={{paddingRight: "40px", marginLeft:"5px", height:" 50px"}} />
                <button type="button" className="btn " style={{    marginLeft: "-41px",height:" 49px"}}><span className="fa fa-search "></span></button>  
                <button id="button6"  style={{marginLeft:"10px"}} onClick={()=>SetMostrar(false)}>
                <span className="fa fa-times fa-fw"></span>     
                </button>         

            </div>
        )
    }else{
        return(
            <div style={{float:"right"}}>
            <button className="button button5"  onClick={()=>SetMostrar(true)}>
            <span className="fa fa-search fa-fw"></span>
            </button>
            </div>
        )
    }

}


export const SearchBarPhone = () =>{

    const [mostrar, SetMostrar] = useState(false)
    const img = "./assets/buscarIcono.png"

    

    if(mostrar){
        return(
            <div className="input-group">
                <input type="search" className="form-control rounded" placeholder="Buscar trámites, servicios o áreas" aria-label="Search" aria-describedby="search-addon"     style={{paddingRight: "40px", height:" 50px"}} />
                <button type="button" className="btn " style={{    marginLeft: "-41px",height:" 49px"}}><span className="fa fa-search "></span></button>  
                
                <span className="fa fa-times fa-fw" onClick={()=>SetMostrar(false)} style={{height:"32px", width:"32px"}}></span>     
                    

            </div>
        )
    }else{
        return(
            <div style={{float:"right"}}>
            
            <span className="fa fa-search fa-fw" onClick={()=>SetMostrar(true)} style={{height:"32px", width:"32px"}}></span>
           
            </div>
        )
    }

}