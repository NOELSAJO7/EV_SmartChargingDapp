import React from 'react';
import { useSelector } from 'react-redux';

const EVStation = () => {

  const contract = useSelector((state)=>state.SetContract);
  const [accAddress] = useSelector((state)=>state.SetAccount);

  const handleClick = async()=>{
    try {
      const stationId = await contract.addressesToInt(accAddress);
      console.log('transaction',stationId);
      const transaction = await contract.setStationAsInactive(stationId);
      await transaction.wait();
      console.log(transaction);
    } catch (e) {
      console.log(e)
    }
  
  }

  // mapping(address => uint16) public addressesToInt;

  return (
    <div>
      {/* station details */}
      {/* Todays bookings */}
      <button onClick={handleClick}>SET AS INACTIVE</button>
    </div>
  )
}

export default EVStation
