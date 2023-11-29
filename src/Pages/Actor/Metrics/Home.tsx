import {  AiFillDatabase, AiOutlineMonitor, AiOutlineOrderedList } from "react-icons/ai";
import { LayoutNote, LayoutSection, LayoutSpacer, LayoutStackedPanel, LayoutText, LayoutTitle } from "../../../Components/Layout/StyledComponents";
import { useContext, useState, useEffect, useMemo, useRef } from "react";
import { Spinner } from "../../../Components/Elements/StyledComponents";
import { BiMessage } from "react-icons/bi";

import { MetricsContext } from "../../../Contexts/MetricsContext";

type Item = {
  title: string;
  description: string;
 }

export const DA_Metrics = () =>{

  const { metrics, errors, isLoading, GetMetrics } = useContext(MetricsContext);

  useEffect(()=>{
   
    if (metrics.length==0){
        GetMetrics()
    }

  },[])


  useEffect(()=>{
   
   console.log("metrics: "+JSON.stringify(metrics))

  },[metrics])

  return ( <>
        {errors!==""?<LayoutNote>{errors}</LayoutNote>:<></>}
    <LayoutNote>
     Métricas principales de <b>Ciudadano Digital</b>.
        <br /> A modo de ejemplo se han definido las siguientes métricas
        <br />Vea el alcance de la plataforma.
    </LayoutNote>
    <LayoutSection>
            <LayoutStackedPanel>
                <LayoutSpacer />
                
            </LayoutStackedPanel>
            <h1><AiFillDatabase />Métricas</h1>
            <div>
                {Object.entries(metrics).map(([category, data]) => (
                    <div key={category}>
                        <LayoutSection style={{marginBottom:"10px"}}>
                        <h1>{category}</h1>
                        <ul>
                            {Object.entries(data).map(([metricName, metricValue]) => (
                                <li key={metricName}>
                                    <strong>{metricName}:</strong> {String(metricValue)}
                                </li>
                            ))}
                        </ul>
                        </LayoutSection>
                    </div>
                ))}
            </div>
            </LayoutSection></>
        );

        }