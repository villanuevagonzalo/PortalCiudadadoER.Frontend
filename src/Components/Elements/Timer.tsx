import { useContext, useRef, useState, useEffect } from 'react';
import { formGetInitialValues, formGetValidations, FormStateDefault, FormStateProps } from "../../Interfaces/FormFields";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { Button } from '../../Components/Forms/Button';

export const CountDown = () => {

    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(300);

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (countdown > 0) {
          setCountdown((prevCountdown) => prevCountdown - 1);
        } else {
          clearInterval(intervalId);
          navigate("/");
        }
      }, 1000);
  
      return () => 
      clearInterval(intervalId);
    }, [countdown]);

    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    const formattedTime = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  
    return <div>{formattedTime}</div>;
}