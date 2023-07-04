import React ,{ useState } from 'react';
import { Form, Button, Segment, Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

 
const ListNewStation = () => { 
  
  const contract = useSelector((state)=>state.SetContract);
  const [accAddress] = useSelector((state)=>state.SetAccount);

  const [location,setLocation]=useState(''); 
  const getLocation=()=>{ 
    if (navigator.geolocation) { 
      navigator.geolocation.getCurrentPosition((position)=>setLocation(`${position.coords.latitude},${position.coords.longitude}`)); } 
  else { console.log("Geolocation is not supported by this browser"); } } 
  
  
  const [description,setDesctription]=useState('');
  const [stationName,setStationName]=useState('');
  const [price,setPrice]=useState(0);
  const [voltage,setVoltage]=useState(0);


  const handleSubmit=async(event)=>{
    console.log(contract)
    console.log('price voltage',price,voltage)
    event.preventDefault();
    try {
    const transaction=await contract.ListNewStation(stationName,voltage,description,location,price);
    await transaction.wait();
    console.log('transaction',transaction);
    // navigate('/asstationowner');
  } catch (e) {
    console.log(e)
      // if(e.data.message==='VM Exception while processing transaction: revert Address already present');  //err code : -32603
      // alert('address already present')
  }
    
  }



  return( 
    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <Segment padded='very' textAlign='left'>
    <Form onSubmit={handleSubmit} >
    <Form.Input
      // error={{ content: 'Please enter your first name', pointing: 'below' }}
      // fluid 
      label='Name:'
      placeholder='Station Name'
      value={stationName} onChange={(e)=>{setStationName(e.target.value)}} 
      required
    />
    <Form.Input
      // error={{ content: 'Please enter your first name', pointing: 'below' }}
      // fluid 
      label='Description:'
      placeholder='First name'
      id='form-input-first-name'
      value={description} onChange={(e)=>{setDesctription(e.target.value)}} 
      required
    />
    <Form.Group>
    {/* <Segment > */}
    <Form.Input
      // error='Please enter your last name'
      // fluid
      label='Location:'
      placeholder='Location'
      value={location}
      readOnly
      // onChange={(e)=>{setLocation(e.target.value)}}
      required
    />
    <Button type='Button' style={{height:'40%',marginTop:'25px'}}primary onClick={getLocation}>Fetch Location</Button>
    {/* </Segment> */}
    </Form.Group>

    <Form.Field label='PricePerMin:' control='input' type='number' max={50}   value={price} required onChange={(e)=>{setPrice(e.target.value)}} />
    
    <Form.Field label='Max Voltage:' control='input' type='number' max={500} value={voltage} required onChange={(e)=>{setVoltage(e.target.value)}} />
    
    <Form.Checkbox
      label='I agree to the Terms and Conditions'
      // error={{
      //   content: 'You must agree to the terms and conditions',
      //   pointing: 'left',
      // }}
    />
    <Button type='submit' primary >Register</Button>
  </Form>
  </Segment>
  </Grid.Column>
  </Grid>
          );
          
        } 
  export default ListNewStation;