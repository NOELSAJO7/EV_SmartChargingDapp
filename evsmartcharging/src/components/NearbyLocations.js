import React,{useState,useEffect} from 'react';
import axios from 'axios';
import StationDetail from './StationDetail';

const NearbyLocations = ({location}) => {

  // const [source,setLocation]=useState('34.1166662,74.8666632');
    let destinations=['34.103166254,74.809663428','34.1166662,74.8666632','33.9856127242,74.7712135818'];
 
    const [LoctoDest,setLoctoDest]=useState([]);
 
    const getDistances = async (location,destinations) => {
      let LoctoDesttemp=[];
      destinations.map(async(destination)=>await axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${location}:${destination}/json?key=1sl47TDNgjLsOVJBOXtqo7hOuGSoWuUa`)
      .then((response)=> {LoctoDesttemp.push({'location':destination,'distance':response.data.routes[0].summary.lengthInMeters})}))
      LoctoDesttemp.sortOn("distance");
       setLoctoDest(LoctoDesttemp);
    };
    useEffect(() => {
      getDistances(location,destinations);
    },[location]);
 
 
 
// console.log(LoctoDest);



  return (
    <div>
      {LoctoDest.map((eachlocation,index)=>{
        return(
          <StationDetail stationdetail={eachlocation}/>
        )
      })};
     </div>
  )
}

export default NearbyLocations;
