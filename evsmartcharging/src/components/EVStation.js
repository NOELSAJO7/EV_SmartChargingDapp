import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { Button,Card,Icon,List,Confirm,Item,Grid,Image } from 'semantic-ui-react';

const EVStation = ({address}) => {
  console.log(address[0])

  const contract = useSelector((state)=>state.SetContract);
  const [stationDetail,setStationDetail]=useState();
  const [bookings,setBookings]=useState();
  // const [accAddress] = useSelector((state)=>state.SetAccount);
  console.log('accAddress',contract)

 const [isActive,setIsActive]=useState(false);
//  const [active,setActive]=useState('ACTIVE');
 const [location,setLocation]=useState('');
 const [tempBookings,setTempBookings]=useState();

  useEffect(()=>{
    // let booking;
    console.log('evstation20');
   ( async()=>{
      const details = await contract.stations(address[0]);
      const booking= await contract.getBookings(address[0]);
      setStationDetail(details);
      // console.log(details);
      setIsActive(stationDetail.isActive)
      // isActive?setActive('INACTIVE'):setActive('ACTIVE');
       console.log('evstation27');
      console.log('booking',booking);
      setBookings(booking);
      setTempBookings(booking);
    })();

    
    // console.log('evstation31');

  })

  // setTimeout(() => {
  //   // console.log('isAc',isActive);
  //   // setIsActive(stationDetail.isActive)
  //   setBookings(tempBookings);
  //   // console.log('timehit')
  //   // console.log(disints)
  //   // callfn();
  //   // setDisabledIntervals(disints);
  // }, 1000);


  const handleClick = async()=>{
    try {
      let transaction;
      if(stationDetail.isActive){
         transaction = await contract.setStationAsInactive(stationDetail.id);
      }else{
         transaction = await contract.setStationAsActive(stationDetail.id);
      }
    
      console.log('transaction',transaction);
      

    //   const stationDetail = await contract.stations(accAddress);
    // setStationDetail(stationDetail);
    
    // console.log(isActive);

    //   const stationDetails = contract.stations(accAddress);
    // console.log('stationDetails',stationDetails);

      // const transaction = await contract.setStationAsInactive(stationId);
      // await transaction.wait();
      // console.log(transaction);
    } catch (e) {
      console.log(e)
    }
  
  }



 const [open,setOpen]=useState(false);
 const handleConfirm = () => {
              setOpen(false);
              
            }
 const handleCancel = () => setOpen(false);
 const show = () => setOpen(true);


  return (
    !stationDetail?<div>loading</div>:
    <div style={{width:'80%'}}>

<Grid>
    <Grid.Column width={7} textAlign='left'>
      {/* ========================================= station detail======================================================================= */}
     
      <Card style={{width:'80%',height:'90%'}}>
      <iframe title=' ' src={`http://maps.google.com/maps?q=${stationDetail.location}&z=16&output=embed`}  height='50%'/>
    <Card.Content>
      <Card.Header>{stationDetail.name}</Card.Header>
      <Card.Meta textAlign='left'>
      <div style={{display:'flex',flexDirection:'row', color:'black' }}><Icon name="point"/>&nbsp;&nbsp;<div>{stationDetail.location}</div></div>
      </Card.Meta>
      <Card.Description textAlign='left'>
        {stationDetail.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra style={{display:'flex',flexDirection:'row',justifyContent:'space-between',color:'black'}}>
   <div>Price/Min : {stationDetail.pricePerunit}</div><div>Max Voltage : {stationDetail.wattage}</div>
    </Card.Content>
  </Card>

  {/* ========================================= station detail======================================================================= */}
    <div style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
  {isActive?
      <Button color='red' onClick={handleClick}>SET AS INACTIVE</Button>:
      <Button color='blue' onClick={handleClick}>SET AS ACTIVE</Button>
      }
      {
        isActive?" ":
      <div>
      <Button color='red' onClick={show}>DELETE STATION</Button>
        <Confirm
          open={open}
          content='YOUR STATION WILL BE DELISTED AT 23:59:59!!  CLICK OK TO CONFIRM'
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
        </div> 
      }
      </div>
    
    </Grid.Column>

    <Grid.Column width={9}>

  {/* ========================================= booking detail======================================================================= */}  
  {/* !bookings?<div>loading</div>:  */}
  <div style={{margin:'10px', fontSize:'15px', fontWeight:'bolder'}}>BOOKINGS</div>
  <div style={{ height:'500px',overflow: 'scroll'}}>
   { !bookings?<div>loading</div>:
  <Item.Group divided>
    {
      bookings.map((booking)=>{
        return(
    <Item style={{borderBottom:'3px solid black',display:'flex', flexDirection:'column',color:'black', fontWeight:'bolder',backgroundColor:'#99dfff'}}>
      <Item.Header >{booking.user}</Item.Header>
      <Item.Meta style={{color:'black'}}>{new Date(booking.timestamp * 1000).toLocaleString()}</Item.Meta>
      <Item.Extra style={{color:'black'}}>{(booking.inTime-booking.inTime%60)/60}:{(booking.inTime%60)} - {(booking.outTime-booking.outTime%60)/60}:{(booking.outTime%60)} </Item.Extra>
    </Item>
        );
      })

    }
  </Item.Group>}
   </div> 
  {/* ========================================= booking detail======================================================================= */}
    
    </Grid.Column>
  </Grid>
    </div>
  )
}

export default EVStation
