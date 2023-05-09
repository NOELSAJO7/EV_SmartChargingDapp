import React ,{ useState } from 'react'
 
const ListNewStation = ({state}) => { 
  
  const [location,setLocation]=useState(''); 
  const getLocation=()=>{ 
    if (navigator.geolocation) { 
      navigator.geolocation.getCurrentPosition((position)=>setLocation(`lat : ${position.coords.latitude} , lon : ${position.coords.longitude}`)); } 
  else { console.log("Geolocation is not supported by this browser"); } } 
  
  
  const handleSubmit=async(event)=>{
    event.preventDefault();
    const {contract}=state;

    try {
    const transaction=await contract.ListNewStation(voltage,description,location,price);
    await transaction.wait();
    console.log('transaction',transaction);
  } catch (e) {
    console.log(e)
      if(e.data.message==='VM Exception while processing transaction: revert Address already present');  //err code : -32603
      alert('address already present')
  }
    
  }
  
  const [description,setDesctription]=useState('');
  const [price,setPrice]=useState(0);
  const [voltage,setVoltage]=useState(0);


  return( 
  <div>
    {/* uint8 _wattage,string memory _description,string memory _location,uint256 _price */}
    <form onSubmit={handleSubmit}>
      <label>Description: 
        <input type="text" value={description} onChange={(e)=>{setDesctription(e.target.value)}} required/>
      </label> 
      <label>Location: 
        <input type="text"  value={location} required readOnly /> 
        <button type='button' onClick={getLocation}>fetch my location</button> 
        </label> 
        <label>PricePerMin: <input type="number" value={price} required  onChange={(e)=>{setPrice(e.target.value)}}/> 
        </label> 
        <label>Max Voltage: 
          <input type="number" value={voltage} required onChange={(e)=>{setVoltage(e.target.value)}}/> 
          </label> 
          <button type='submit'>Register</button> 
    </form> 
          </div> 
          );
          
        } 
  export default ListNewStation;