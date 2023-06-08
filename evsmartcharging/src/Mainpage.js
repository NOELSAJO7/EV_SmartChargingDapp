import { useNavigate } from 'react-router-dom';
import { Divider, Grid,  Segment, Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import location from './Images/location.png';
import station from './Images/station.png';
import './Mainpage.css'

const Mainpage = () => {

  const [accAddress] = useSelector((state)=>state.SetAccount);
  const contract = useSelector((state)=>state.SetContract);
  const navigate = useNavigate();

  return (
    <div className='Mainpage' style={{ backgroundColor: 'transparent'}}>
    <Segment style={{ backgroundColor:'transparent'}}>
    <Grid columns={2}>
      <Grid.Column>
{/* first checks if any account connected or not if yes then check if any station registered in that address or not if yes then manage if no then create new one*/}
        <Segment className='Change'  onClick={()=>{accAddress.length>4?navigate('/asevowner'):alert('Please Connect Your Metamask Account')}} >
      
        <Image src={location} centered />
          <div>Locate The Nearest Charging Point</div>
          <div>Book Time Slot</div>
          <div>Connect And Charge</div>
  
          </Segment>
          
      </Grid.Column>

      <Grid.Column>
      <Segment className='Change' onClick={async()=>{accAddress.length>4?( await contract.addressesToInt(accAddress)!==0?navigate('/asstationowner'):navigate('/newstationowner')):alert('Please Connect Your Metamask Account')}}>

      <Image src={station} centered />
         <div>Manage Your Station</div>
         <div>Register As EV Charging Station</div>
         <div>Be Part of the EV Revolution</div>
 
         </Segment>
      </Grid.Column>
    </Grid>
    <Divider vertical style={{ fontSize:'15px'}}>OR</Divider>
    </Segment>
    </div>
  )
}

export default Mainpage
