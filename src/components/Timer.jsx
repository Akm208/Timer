import { useRef , useState, useEffect} from 'react'
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
 




const Timer=() => {
const timerRef=useRef(null);
const [time,setTime]=useState(()=>{
    return Number(localStorage.getItem('time') || 0)
});
const [isRunning,setIsRunning]=useState(false);
useEffect(()=>{
    localStorage.setItem('time', time)
},[time])
const toggleTimer=()=>{
  if(isRunning){
    //Clear interval to stop the Timer
    clearInterval(timerRef.current);
  }else{
    //Start Timer
    timerRef.current=setInterval(()=>{
      setTime(prevTime=>prevTime+1);
    },1000);
  }
  setIsRunning(!isRunning);
}
const resetTimer=()=>{
  clearInterval(timerRef.current);
  setTime(0);
  setIsRunning(false);
  timerRef.current=null;
  localStorage.removeItem('time');
}
  return (

   <div>
   <TimerDisplay time={time}  />

    <TimerControls  isRunning={isRunning} toggleTimer={toggleTimer} resetTimer={resetTimer} />
   </div>


  )
}

export default Timer

