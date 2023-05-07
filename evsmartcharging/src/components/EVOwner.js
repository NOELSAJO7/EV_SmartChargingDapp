import React,{useState} from 'react';
import NearbyLocations from './NearbyLocations';


const EVOwner = ({state}) => {

    const [location,setLocation]=useState(); 
    const getLocation=()=>{ 
      if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition((position)=>setLocation(`lat : ${position.coords.latitude} , lon : ${position.coords.longitude}`)); } 
    else { console.log("Geolocation is not supported by this browser"); } }


    const handleSubmit=async(event)=>{
        event.preventDefault();
        const {contract}=state;
    
        console.log(contract);

        try {
            const allLocations=await contract.getLocations();  // fetches all locations of ev stations
            console.log(allLocations);
          } catch (e) {
            console.log(e)
              // if(e.data.message==='VM Exception while processing transaction: revert Address already present');  //err code : -32603
              // alert('address already present')
          }
        
      }

  return (
    <div>
    <form onSubmit={handleSubmit}>

      <label>Location: 
        <input type="text"  value={location} required readOnly /> 
        <button type='button' onClick={getLocation}>fetch my location</button> 
        </label>  
          <button type='submit'>Find</button> 
    </form> 

      <NearbyLocations location={location}/>
          </div> 
  )
}

export default EVOwner
