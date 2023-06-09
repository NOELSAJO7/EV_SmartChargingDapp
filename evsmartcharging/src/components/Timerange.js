import React,{useEffect, useState} from 'react';  
import { set,format } from 'date-fns'; 
import TimeRange from './TimeRangeSlider/index';
import { Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

const now = new Date()
const getTodayAtSpecificHour = (hour = 0,minute=0) =>
	set(now, { hours: hour, minutes: minute, seconds: 0, milliseconds: 0 })


const Timerange=({stationDetail})=>{  

  const contract = useSelector((state)=>state.SetContract);

  const[elapsedHour,setElapsedHour]=useState(new Date().getHours());
  const[elapsedMinute,setElapsedMinute]=useState(new Date().getMinutes());
  const [selectedInterval,setSelectedInterval]=useState([getTodayAtSpecificHour(0),getTodayAtSpecificHour(0)]);
  const [startTime]=useState(getTodayAtSpecificHour(elapsedHour,elapsedMinute));
  const [endTime]=useState(getTodayAtSpecificHour(24));
  const [error,setError]=useState(false);
  const [inTime,setInTime]=useState();
  const [outTime,setOutTime]=useState();


  const errorHandler =({error})=>{ setError(error)}  

  const[disabledIntervals,setDisabledIntervals] = useState([
    { start: getTodayAtSpecificHour(0,0), end: getTodayAtSpecificHour(elapsedHour,elapsedMinute) },
  ])
  const[tempdisabledIntervals,settempDisabledIntervals] = useState([]);

  const onChangeCallback = selectedInterval => setSelectedInterval(selectedInterval);  
  const [change,setChange]=useState(true)
  const handleClick=async()=>{

  let intime=selectedInterval[0].getHours()*60+selectedInterval[0].getMinutes();
  let outtime=selectedInterval[1].getHours()*60+selectedInterval[1].getMinutes();
    
    try{
      const transaction=await contract.BookSlot(stationDetail.id,intime,outtime);
      await transaction.wait();
      console.log('success',transaction)
      setChange(!change);
      // setDisabledIntervals(...disabledIntervals,{ start: getTodayAtSpecificHour(selectedInterval[0].getHours(),selectedInterval[0].getMinutes()), end: getTodayAtSpecificHour(selectedInterval[0].getHours(),selectedInterval[].getMinutes()) });
      }catch(e)
      {
        console.log(e)
      }
}
  
// const [disints,setDisints]=useState([]);
useEffect(()=>{
  
      (async()=>{
      let intimes=await contract.getInTimings(stationDetail.id);
      let outtimes=await contract.getOutTimings(stationDetail.id);
      // setInTime(intimes);
      // console.log('intt',inTime);
      // setOutTime(outtimes);
      // console.log('out',outTime);

      let disints=[];
      for(let i=0;i<intimes.length;i++)
      {
        console.log('intime',(intimes[i]-intimes[i]%60)/60,intimes[i]%60);
        console.log('outtime',(outtimes[i]-outtimes[i]%60)/60,outtimes[i]%60);
        // setDisints([...disints,{start:getTodayAtSpecificHour((inTime[i]-inTime[i]%60)/60,inTime[i]%60),end:getTodayAtSpecificHour((outTime[i]-outTime[i]%60)/60,outTime[i]%60)}])
        disints.push({start:getTodayAtSpecificHour((intimes[i]-intimes[i]%60)/60,intimes[i]%60),end:getTodayAtSpecificHour((outtimes[i]-outtimes[i]%60)/60,outtimes[i]%60)});
        console.log('reached',disints)
        setDisabledIntervals(disints);
      }

      setTimeout(() => {
        // console.log('timehit')
        // console.log(disints)
        setDisabledIntervals(disints);
      }, 1000);
      // setDisabledIntervals(disints);
      
        // console.log('Hello, World!')
    })();

    setTimeout(() => {
      console.log('timehit')
      console.log(disabledIntervals)
      settempDisabledIntervals(disabledIntervals);
    }, 3000);


  setInterval(() => {
    let hr=new Date().getHours();
    let min=new Date().getMinutes();  
    setElapsedHour(hr);setElapsedMinute(min);
    }, 60000);
},[change]);

// useEffect(()=>{
// setDisabledIntervals([...disabledIntervals,{start:selectedInterval[0],end:selectedInterval[1]}])
// },[]);


      return (  
        <>
        <div style={{fontSize:'20px', fontWeight:'bold', background:'white'}}>
          <span>Selected Interval: </span>
          {selectedInterval.map((d, i) => (
            <span key={i}>{format(d,"HH:mm")}&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
        {!error &&
         <Button style={{margin:'10px'}}primary type='button' onClick={handleClick}>BOOK SLOT</Button>
         }

        </>
      )  
  
}  

export default Timerange












// import {useEffect, useState} from 'react';  
// import { set,format } from 'date-fns'; 
// import TimeRange from './TimeRangeSlider/index';
// import { Button } from 'semantic-ui-react';
// import { useSelector } from 'react-redux';

// const now = new Date()
// const getTodayAtSpecificHour = (hour = 0,minute=0) =>
// 	set(now, { hours: hour, minutes: minute, seconds: 0, milliseconds: 0 })

// const Timerange=({stationDetail})=>{  

//   const contract = useSelector((state)=>state.SetContract);
//   const [inTime,setInTime]=useState();
//   const [outTime,setOutTime]=useState();

//   const[elapsedHour,setElapsedHour]=useState(new Date().getHours());
//   const[elapsedMinute,setElapsedMinute]=useState(new Date().getMinutes());
//   const[disabledIntervals,setDisabledIntervals] = useState([
//     { start: getTodayAtSpecificHour(0,0), end: getTodayAtSpecificHour(elapsedHour,elapsedMinute) }
//     ])
 
//   useEffect(()=>{
//     (async()=>{
//       // const details = await contract.locationsToStation(currlocation);
//       let intimes = await contract.getInTimings(stationDetail.id);
//       let outtimes = await contract.getOutTimings(stationDetail.id);
//       setInTime(intimes);
//       console.log('intt',inTime);
//       setOutTime(outtimes);
//       console.log('outt',outTime);

      
//       // let disints=[];
//       // for(let i=0;i<inTime.length;i++)
//       // {
//       //   console.log('intime',(inTime[i]-inTime[i]%60)/60,inTime[i]%60);
//       //   console.log('outtime',(inTime[i]-outTime[i]%60)/60,outTime[i]%60);
//       //   disints.push({start:getTodayAtSpecificHour((inTime[i]-inTime[i]%60)/60,inTime[i]%60),end:getTodayAtSpecificHour((inTime[i]-outTime[i]%60)/60,outTime[i]%60)});
//       // }
//       // setDisabledIntervals(...disabledIntervals,disints);
//     })();
//     setInterval(() => {
//       let hr=new Date().getHours();
//       let min=new Date().getMinutes();  
//       setElapsedHour(hr);setElapsedMinute(min);
//   // console.log(new Date())
//       }, 60000);
//     },[]);
    
    



//   const [selectedInterval,setSelectedInterval]=useState([getTodayAtSpecificHour(0),getTodayAtSpecificHour(0)]);
//   const [startTime]=useState(getTodayAtSpecificHour(elapsedHour,elapsedMinute));
//   const [endTime]=useState(getTodayAtSpecificHour(24));
//   const [error,setError]=useState(false);



//   const errorHandler =({error})=>{ setError(error) ;
//   // console.log(selectedInterval[0].getHours()*60+selectedInterval[0].getMinutes());
//   // console.log(selectedInterval[1].getHours()*60+selectedInterval[1].getMinutes());

//   // console.log('disabled interval',disabledIntervals);
//   };  

//   const onChangeCallback = selectedInterval => setSelectedInterval(selectedInterval);  
//     // const { selectedInterval, error } = this.state  

// //   const =()=>{
// //     contract.BookSlot(uint16 _stationId, uint256 inTime, uint256 outTime)
// //     // setDisabledIntervals([...disabledIntervals,{start:getTodayAtSpecificHour(16,30),end:getTodayAtSpecificHour(20,20)}]);
// //     setDisabledIntervals([...disabledIntervals,{start:selectedInterval[0],end:selectedInterval[1]}]);
// //   // console.log((selectedInterval[0].getHours())*60,selectedInterval[0].getMinutes(),disabledIntervals);
// // }  

// const handleClick=()=>{

// console.log(selectedInterval)
// setDisabledIntervals(...disabledIntervals,{start:selectedInterval[0],end:selectedInterval[1]});

//   let intime=selectedInterval[0].getHours()*60+selectedInterval[0].getMinutes();
//   let outtime=selectedInterval[1].getHours()*60+selectedInterval[1].getMinutes();
  // try{
  // let p=await contract.BookSlot(stationDetail.id,intime,outtime);


  // // const transaction = await contract.buyChai(name, message, amount);
  // //   await transaction.wait();
  // console.log('success',p)
  // console.log('disintervals',disabledIntervals)
  // setDisabledIntervals(...disabledIntervals,{start:selectedInterval[0],end:selectedInterval[1]});
  // }catch(e)
  // {
  //   console.log(e)
  // }




//   // console.log('afdghjkl',id);
//   // console.log(selectedInterval[0].getHours()*60+selectedInterval[0].getMinutes());
//   // console.log(selectedInterval[1].getHours()*60+selectedInterval[1].getMinutes());

// }

// // useEffect(()=>{


// // },[]);




//       return (  
//         <>
//         <div className="info">
//           <span>Selected Interval: </span>
//           {selectedInterval.map((d, i) => (
//             <span key={i}>{format(d,"HH:mm")}&nbsp;&nbsp;&nbsp;&nbsp;</span>
//           ))}
//         </div>
//         <TimeRange
//           step={1}
//           error={error}  
//           ticksNumber={72}  
//           selectedInterval={selectedInterval}  
//           timelineInterval={[startTime,endTime]}  
//           onUpdateCallback={errorHandler}  
//           onChangeCallback={onChangeCallback}
//           disabledIntervals={disabledIntervals}  
//         />
//         {!error &&
//         <Button primary type='button' onClick={handleClick}>BOOK SLOT</Button>
//         }
//         </>
//       )  
  
// }  

// export default Timerange