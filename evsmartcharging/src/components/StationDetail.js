import React, { useEffect,useState } from 'react';
import TimeRange from  './Timerange';
import { useSelector,useDispatch } from 'react-redux';
import { Card,Icon } from 'semantic-ui-react'; 

const StationDetail = ({currlocation}) => {

  const contract = useSelector((state)=>state.SetContract);
  const [stationDetail,setStationDetail]=useState();

  // const fetchDestinations = async () => {
  //   try {
  //     const locations = await contract.getLocations();
  //     return locations;
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  useEffect(()=>{
    (async()=>{
      const details = await contract.locationsToStation(currlocation);
      console.log('stationDetails',details);
      setStationDetail(details);
    })();
  },[]);
      


  return (
    !stationDetail?<div>loading</div>:
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'
    }}>
      <Card style={{width:'50%',height:'90%'}}>
      <iframe title=' ' src={`http://maps.google.com/maps?q=${currlocation}&z=16&output=embed`}  height='60%'/>
        <Card.Content>
          <Card.Header>{stationDetail.name}Header</Card.Header>
          <Card.Meta textAlign='left'>
          <div style={{display:'flex',flexDirection:'row',color:'black' }}><Icon name="point"/>&nbsp;&nbsp;<div>{currlocation}</div></div>
          </Card.Meta>
        <Card.Description textAlign='left'>
          {stationDetail.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra style={{display:'flex',flexDirection:'row',justifyContent:'space-between',color:'black'}}>
        <div>Price/Min : {stationDetail.pricePerunit}</div><div>Max Voltage : {stationDetail.wattage}</div>
      </Card.Content>
      </Card>
      {/* <TimeRange/> */}
      <TimeRange stationDetail={stationDetail}/> 
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



// 0
// : 
// 2
// 1
// : 
// 8
// 2
// : 
// "y"
// 3
// : 
// "lat : 28.49320197428926 , lon : 77.09663987323287"
// 4
// : 
// false
// 5
// : 
// BigNumber {_hex: '0x07', _isBigNumber: true}
// 6
// : 
// "0x041764086A850393E338a2C2ab3eC79f85753f01"
// description
// : 
// "y"
// id
// : 
// 2
// isActive
// : 
// false
// location
// : 
// "lat : 28.49320197428926 , lon : 77.09663987323287"
// owner
// : 
// "0x041764086A850393E338a2C2ab3eC79f85753f01"
// pricePerunit
// : 
// BigNumber {_hex: '0x07', _isBigNumber: true}
// wattage
// : 
// 8
// length
// : 
// 7





// mapping(string => Station) public locationsToStation;







// BookSlot
// : 
// ƒ ()
// BookSlot(uint16,uint256,uint256)
// : 
// ƒ ()
// ListNewStation
// : 
// ƒ ()
// ListNewStation(uint8,string,string,uint256)
// : 
// ƒ ()
// address
// : 
// "0x5AEa3d47AEacCBf2738721fdEB8a5E37Ed7c7DcC"
// addresses
// : 
// ƒ ()
// addresses(uint16)
// : 
// ƒ ()
// addressesToInt
// : 
// ƒ ()
// addressesToInt(address)
// : 
// ƒ ()
// locationsToStation
// : 
// ƒ ()
// locationsToStation(string)
// : 
// ƒ ()
// bookings
// : 
// ƒ ()
// bookings(address,uint256)
// : 
// ƒ ()
// callStatic
// : 
// {BookSlot(uint16,uint256,uint256): ƒ, ListNewStation(uint8,string,string,uint256): ƒ, addresses(uint16): ƒ, addressesToInt(address): ƒ, locationsToStation(string): ƒ, …}
// deleteStation
// : 
// ƒ ()
// deleteStation(uint16)
// : 
// ƒ ()
// estimateGas
// : 
// {BookSlot(uint16,uint256,uint256): ƒ, ListNewStation(uint8,string,string,uint256): ƒ, addresses(uint16): ƒ, addressesToInt(address): ƒ, locationsToStation(string): ƒ, …}
// filters
// : 
// {NewStation(uint256): ƒ, NewStation: ƒ}
// functions
// : 
// {BookSlot(uint16,uint256,uint256): ƒ, ListNewStation(uint8,string,string,uint256): ƒ, addresses(uint16): ƒ, addressesToInt(address): ƒ, locationsToStation(string): ƒ, …}
// getInTimings
// : 
// ƒ ()
// getInTimings(uint16)
// : 
// ƒ ()
// getLocations
// : 
// ƒ ()
// getLocations()
// : 
// ƒ ()
// getOutTimings
// : 
// ƒ ()
// getOutTimings(uint16)
// : 
// ƒ ()
// interface
// : 
// Interface {fragments: Array(14), _abiCoder: AbiCoder, functions: {…}, errors: {…}, events: {…}, …}
// populateTransaction
// : 
// {BookSlot(uint16,uint256,uint256): ƒ, ListNewStation(uint8,string,string,uint256): ƒ, addresses(uint16): ƒ, addressesToInt(address): ƒ, locationsToStation(string): ƒ, …}
// provider
// : 
// Web3Provider {_isProvider: true, _events: Array(0), _emitted: {…}, disableCcipRead: false, formatter: Formatter, …}
// resolvedAddress
// : 
// Promise {<fulfilled>: '0x5AEa3d47AEacCBf2738721fdEB8a5E37Ed7c7DcC'}
// setStationAsInactive
// : 
// ƒ ()
// setStationAsInactive(uint16)
// : 
// ƒ ()
// signer
// : 
// JsonRpcSigner {_isSigner: true, provider: Web3Provider, _index: 0, _address: null}
// stationId
// : 
// ƒ ()
// stationId()
// : 
// ƒ ()
// stations
// : 
// ƒ ()
// stations(address)
// : 
// ƒ ()