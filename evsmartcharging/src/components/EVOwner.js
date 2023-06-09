import { useState, useEffect } from 'react';
import NearbyLocations from './NearbyLocations';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, List } from 'semantic-ui-react';
import { setLocation as SetLocation, setDestinations } from './features/Actions';
import axios from 'axios';

const EVOwner = () => {

  // const dispatch = useDispatch();
  const contract = useSelector((state) => state.SetContract);   //smart contract

  const [location, setLocation] = useState('');
  const [curLocation, setCurLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allDestinations, setAllDestinations] = useState();

  const getLocation = async () => {
    const destinations = await fetchDestinations();
    setAllDestinations(destinations);
    console.log('loading', isLoading);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => { setCurLocation(`${position.coords.latitude},${position.coords.longitude}`) });
    }
    else { console.log("Geolocation is not supported by this browser"); }
  }


  const fetchDestinations = async () => {
    try {
      const locations = await contract.getLocations();
      return locations;
    } catch (e) {
      console.log(e)
    }
  }
  // useEffect(()=>{
  //   getLocation();

  //   (async () => {
  //     dispatch(setDestinations(destinations));
  //     const destinations=await fetchDestinations();
  //     setAllDestinations(destinations)
  //   })();

  //   },[]);




  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   console.log('loading', isLoading);
  //   console.log('submit');
  //   // console.log('inside EVowner',contract);

  // }


  // const getDistances = async (location,destinations) => {
  //   let LoctoDesttemp=[];
  //   console.log('location',location);
  //   console.log('locations',destinations);
  //   destinations.map(async (destination)=> await axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${location}:${destination}/json?key=1sl47TDNgjLsOVJBOXtqo7hOuGSoWuUa`)
  //   .then((response)=> {
  //     LoctoDesttemp.push({'location':destination,'distance':response.data.routes[0].summary.lengthInMeters,'time':response.data.routes[0].summary.travelTimeInSeconds})
  //   }))
  //   LoctoDesttemp.sort((a, b) => a.distance - b.distance);
  //   console.log(LoctoDesttemp);
  //   return LoctoDesttemp;
  // };


  const getDistance = async (location, destinations) => {
    const LoctoDesttemp = [];
    console.log('location', location);
    console.log('locations', allDestinations);
    allDestinations.map(async (destination) => await axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${location}:${destination}/json?key=1sl47TDNgjLsOVJBOXtqo7hOuGSoWuUa`)
      .then((response) => {
        LoctoDesttemp.push({ 'location': destination, 'distance': response.data.routes[0].summary.lengthInMeters, 'time': response.data.routes[0].summary.travelTimeInSeconds })
      }))
    LoctoDesttemp.sort((a, b) => a.distance - b.distance);
    console.log(LoctoDesttemp);
    return LoctoDesttemp;
  }
  let all=[];
  const setNearbyStations = async () => {
    const dest = await getDistance(curLocation, allDestinations);
    setIsLoading(true)
    setAllDestinations(dest);
    
    allDestinations.map(async (destination)=> await contract.locationsToStation(destination)
    .then((response)=> {
      // console.log(response);
      all.push(response)
    }))

setAllDestinations(all);
    // console.log(dest)
  }

  return (
    <div>
      <Form>
      <Form.Input
        // error='Please enter your last name'
        label='Location:'
        placeholder='Location'
        value={curLocation}
        readOnly
        required
      ></Form.Input>
      <Button primary type='button' onClick={() => { setCurLocation(location); getLocation(); }}>Fetch My Location</Button>
      <Button color='green' onClick={setNearbyStations} type='button'>Find Nearby Stations</Button>
      </Form>
      <List>

        {
          isLoading &&
          <NearbyLocations LoctoDest={allDestinations} />
        }
      </List>
    </div>
  )
}

export default EVOwner
