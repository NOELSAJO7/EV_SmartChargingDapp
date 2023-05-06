import React,{useEffect, useState} from 'react';  
import { set,format } from 'date-fns'; 
import TimeRange from './TimeRangeSlider/index'
// import TimeRange from 'react-timeline-range-slider'; 

const now = new Date()
const getTodayAtSpecificHour = (hour = 0,minute=0) =>
	set(now, { hours: hour, minutes: minute, seconds: 0, milliseconds: 0 })

// const selectedStart = getTodayAtSpecificHour()
// const selectedEnd = getTodayAtSpecificHour()



const Timerange=()=>{  

  const [selectedInterval,setSelectedInterval]=useState([getTodayAtSpecificHour(0),getTodayAtSpecificHour(0)]);
  const [startTime]=useState(getTodayAtSpecificHour(0));
  const [endTime]=useState(getTodayAtSpecificHour(24));
  const [error,setError]=useState(false);
  const errorHandler =({error})=>{ setError(error) ;console.log(error)};  

  const onChangeCallback = selectedInterval => setSelectedInterval(selectedInterval);  
    // const { selectedInterval, error } = this.state  

  const handleClick=()=>{setDisabledIntervals([...disabledIntervals,{start:selectedInterval[0],end:selectedInterval[1]}]);
  // console.log((selectedInterval[0].getHours())*60,selectedInterval[0].getMinutes(),disabledIntervals);
}  

useEffect(()=>{

  setInterval(() => {
    let hr=new Date().getHours();
let min=new Date().getMinutes();  
setElapsedHour(hr);setElapsedMinute(min);
// console.log(new Date())
    }, 60000);
},[]);

const[elapsedHour,setElapsedHour]=useState(new Date().getHours());
const[elapsedMinute,setElapsedMinute]=useState(new Date().getMinutes());
const[disabledIntervals,setDisabledIntervals] = useState([
  { start: getTodayAtSpecificHour(0,0), end: getTodayAtSpecificHour(elapsedHour,elapsedMinute) },
  // { start: getTodayAtSpecificHour(7), end: getTodayAtSpecificHour(12) },
  // { start: getTodayAtSpecificHour(20), end: getTodayAtSpecificHour(24) }
])


      return (  
        <>
        <div className="info">
          <span>Selected Interval: </span>
          {selectedInterval.map((d, i) => (
            <span key={i}>{format(d,"HH:mm")}===</span>
          ))}
        </div>
        <TimeRange
          step={1}
          error={error}  
          ticksNumber={72}  
          selectedInterval={selectedInterval}  
          timelineInterval={[startTime,endTime]}  
          onUpdateCallback={errorHandler}  
          onChangeCallback={onChangeCallback}
          disabledIntervals={disabledIntervals}  
        />
        <button onClick={handleClick}>book</button>
        </>
      )  
  
}  

export default Timerange