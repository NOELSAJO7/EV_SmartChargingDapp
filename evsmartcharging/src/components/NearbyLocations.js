import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrStationLocation } from './features/Actions';
import { List, Image, Icon } from 'semantic-ui-react';
import sourcetodestination from '../Images/sourcetodestination.jpg';
import './NearbyLocations.css';

const NearbyLocations = (props) => {

  const dispatch = useDispatch();
  const contract = useSelector((state) => state.SetContract);
  // const location = useSelector((state) => state.SetLocation);
  // const [accAddress] = useSelector((state)=>state.SetAccount);

  const [destinations,setDestinations]=useState([]);
const [LoctoDest, setLoctoDest] = useState();
useEffect(()=>{
  setTimeout(() => {
    setLoctoDest(props.LoctoDest)
    // console.log('Hello, World!')
  }, 1000);
  
},[])


  // const getDistances = async (location,destinations) => {
  //   let LoctoDesttemp=[];
  //   console.log('location',location);
  //   console.log('locations',destinations);
  //   destinations.map(async (destination)=> await axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${location}:${destination}/json?key=1sl47TDNgjLsOVJBOXtqo7hOuGSoWuUa`)
  //   .then((response)=> {
  //     LoctoDesttemp.push({'location':destination,'distance':response.data.routes[0].summary.lengthInMeters,'time':response.data.routes[0].summary.travelTimeInSeconds})
  //   }))
  //   LoctoDest.sort((a, b) => a.distance - b.distance);
  //   console.log(LoctoDesttemp);
  //   setLoctoDest(LoctoDesttemp);
  //   return LoctoDesttemp;
  // };


  //   "summary": {
  //     "lengthInMeters": 948187,
  //     "travelTimeInSeconds": 68271,
  //     "trafficDelayInSeconds": 132,
  //     "trafficLengthInMeters": 3064,
  //     "departureTime": "2023-05-27T00:04:58+05:30",
  //     "arrivalTime": "2023-05-27T19:02:49+05:30"
  // }



  // const stationDetails = contract.locationsToStation(location);
  // console.log('stationDetails',stationDetails);





    // setLoctoDest(props.LoctoDest);


  const [currlocation, setCurrlocation] = useState('');

  const navigate = useNavigate();

  const handleClick = (loc) => {
    console.log('loc is',loc.location)
    
    setCurrlocation(loc.location)
    dispatch(setCurrStationLocation(loc.location));
    navigate('/asevowner/stationdetails');
  }
 
  const [price,setPrice]=useState(0);
  const [voltage,setVoltage]=useState(0);
  const [isActive,setIsActive]=useState(false);
  // const getPrice = async(location)=>{
  //   const station = await contract.locationsToStation(location);
  //   console.log(station['pricePerunit'])
  //   setPrice(station['pricePerunit'])
  //   // return station['pricePerunit'];
  // }


//   props.LoctoDest.map((eachlocation) => {
//  let temp=[];
 
 
//   })
console.log(props.LoctoDest)

  const getActiveStatus = async(somelocation)=>{
    // console.log('eachloc',somelocation)
    const station = await contract.locationsToStation(somelocation);
    // console.log(station.wattage);
    // setVoltage(station['wattage']);
    // // setPrice(station['pricePerunit']);
    // setIsActive(station['isActive']);
    return [station.wattage,station.pricePerunit];
  }
  return (
    
    <div className='jc'>
      {/* {LoctoDest[0]===undefined?(""):(
        <div style={{color:'red'}}>{LoctoDest[0].distance}</div>
      )} */}
      {props.LoctoDest.map((eachlocation) => {
        // const getdetails=()=>{getActiveStatus (eachlocation.location).then((res)=>{return res[0]})}
        // async(const station = await contract.locationsToStation(somelocation))();
        // console.log(getdetails);
        console.log('statio')
        return (
          <div onClick={() => handleClick(eachlocation)}>
            <List  horizontal divided style={{ display: 'flex', flexDirection: 'row', margin:'10px', backgroundColor:'white', justifyContent:'space-around', width:'600px', border:'5px solid green' }}>
              {/* <List.Content style={{ display: 'flex', flexDirection: 'row', border: '2px solid red', margin:'5px' }}> */}
                {/* <div className='iconanddescription'>
                <Icon name='money bill alternate outline' size='big' color='green'/>
                  <List.Header style={{ fontWeight: 'bold', fontSize:'20px', marginRight:'10px' }}>{eachlocation.pricePerunit}</List.Header>
                </div> */}
                <List.Item>
                
              <List.Content>
                <List.Header style={{ fontWeight: 'bold', fontSize:'20px' }}><Icon name='money bill alternate outline' size='big' color='green'/>&nbsp;&nbsp;{eachlocation.pricePerunit}</List.Header>
              </List.Content>
              </List.Item>
              <List.Item>
              
              <List.Content>
                <List.Header style={{ fontWeight: 'bold', fontSize:'20px' }}><Icon name='bolt' size='big' color='blue'/>&nbsp;&nbsp;{eachlocation.wattage}</List.Header>
              </List.Content>
              </List.Item>
              <List.Item>
              {/* <Icon name='bolt' size='big' color='blue'/> */}
              <List.Content>
              <List.Header style={{ fontWeight: 'bold', fontSize:'20px' }}>{eachlocation.isActive?<><Icon name='dot circle' size='large' color='green' />Active</>:<><Icon name='dot circle' size='large' color='red'/>Not Active</>}</List.Header>
              </List.Content>
              </List.Item>
                {/* <div className='iconanddescription'>
                <Icon name='bolt' size='big' color='blue'/>
                  <List.Header style={{ fontWeight: 'bold', fontSize:'20px' }}>{eachlocation.wattage}</List.Header>
                </div> */}
                {/* <div className='iconanddescription'> */}
                  {/* <Image src={sourcetodestination} height='40px' width='40px' /> */}
                  {/* <List.Header style={{ fontWeight: 'bold', fontSize:'20px' }}>{eachlocation.isActive?<><Icon name='dot circle' size='large' color='green' />Active</>:<><Icon name='dot circle' size='large' color='red'/>Not Active</>}</List.Header> */}
                {/* </div> */}
              {/* </List.Content> */}
            </List>
          </div>
        )
      })}

      {/* {renderList} */}
      {/* <StationDetail/> */}
      {/* <Routes>
        <Route exact path='/asevowner/stationdetails' element={<StationDetail stationdetail={currlocation} />} />
      </Routes> */}
    </div>
  )
}

export default NearbyLocations;



// =============================================== i have to change/recompile the contract================






// const [CodeToBeDsiplayed, setCodeToBeDsiplayed] = useState("")
// const [codeVersion, setCodeVersion] = useState(exampleCodeJava8);






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