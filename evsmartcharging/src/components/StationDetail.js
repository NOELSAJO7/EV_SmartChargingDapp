import React from 'react';
import TimeRange from  './Timerange';
import { useSelector } from 'react-redux'; 

const StationDetail = ({location}) => {

  const contract = useSelector((state)=>state.SetContract);

  return (
    <div>
      <div>description</div>
      <div>isActive</div>
      <div>MaxVoltage</div>
      <div>price</div>
      <div></div>
      {/* <TimeRange/> pass booked slots */}
    </div>
  )
}

export default StationDetail


// uint16 id;  
//   uint8 wattage; 
//   string description;
//   string location;
//   bool isActive;      // is EVCstation active
//   uint256 pricePerunit;      //dynamic price per minute in wei (1 ether = 10^18 wei)
//   address payable owner;      // Owner of the EVCstation
//   bool[] isBooked;
//   uint256[] inTimes;
//   uint256[] outTimes;