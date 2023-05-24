import moment from "moment";
import { useEffect, useState } from "react";

export const CountDown : React.FC<{ time?:number; onFinish?:Function; }> = ({time=300, onFinish}) => {

  const [duration, setDuration] = useState(time);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (duration > 0) {
        setDuration(duration - 1);
      } else {
        clearInterval(intervalId);
        console.log('termino')
        if(onFinish) onFinish()
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [duration]);

  return (<>{moment.utc(duration*1000).format("mm:ss")}</>)
}