import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';


let countdownTimeout: NodeJS.Timeout;

export function Countdown(){
  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinish, setHasFinish] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRigth] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRigth] = String(seconds).padStart(2, '0').split('');

  function startCountdown(){
    setIsActive(true);
  }

  function resetCountdown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
  }

  useEffect(() => {
    if(isActive && time > 0){
      countdownTimeout = setTimeout(() => {
        setTime( time - 1);
      }, 1000)
    }else if(isActive && time === 0) {
      setHasFinish(true);
      setIsActive(false);
    }
  }, [isActive, time])

  return(
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRigth}</span>
        </div>

        <span>:</span>

        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRigth}</span>
        </div>
      </div>

      { hasFinish ? (
        <button 
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
        <>
          { isActive ? (
            <button 
              type="button" 
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button 
              type="button" 
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}        
        </>
      )}
  </div>   
  );
}