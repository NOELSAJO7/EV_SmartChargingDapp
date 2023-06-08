// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EVSmartChargingDapp{

  struct Station {
  string name;   // newly added  
  uint16 id;  
  uint8 wattage; 
  string description;
  string location;
  bool isActive;      // is EVCstation active
  uint16 pricePerunit;      //dynamic price per minute in wei (1 ether = 10^18 wei)
  address payable owner;      // Owner of the EVCstation
  bool[] isBooked;
  uint16[] inTimes;
  uint16[] outTimes;
}
 
uint16 public stationId=1;

string[] Locations;  // to store all locations to map the nearest location

mapping(address => Station) public stations;

mapping(uint16 => address) public addresses;

mapping(address => uint16) public addressesToInt;

mapping(string => Station) public locationsToStation; // locations to station 1:1
 
event NewStation (uint16 indexed stationId);
 
  // To keep track of all bookings
  // Details of a particular booking
  struct Booking{
    uint timestamp; 
    uint16 inTime;
    uint16 outTime;
    address user;
  }
 
  // uint16 public bookingId;
  mapping(address => Booking[]) public bookings;
 
 
 
   function ListNewStation(string memory _name,uint8 _wattage,string memory _description,string memory _location,uint16 _price) public {
    Station memory station = Station({name:_name,id:stationId,wattage:_wattage,description:_description,isActive:true, pricePerunit:_price, owner:payable(msg.sender),isBooked:new bool[](1440),location:_location,inTimes:new uint16[](0),outTimes:new uint16[](0)});

    require(addressesToInt[msg.sender]==0,"Address already present");
    stations[msg.sender] = station;
    addresses[stationId]=msg.sender;
    addressesToInt[msg.sender]=stationId;
    locationsToStation[_location]=station;
    Locations.push(_location);

    emit NewStation(stationId++);
  }
 

//  function to send funds
// function _sendFunds (address payable beneficiary, uint16 value) internal {
//   beneficiary.transfer(value);
//   }




  function _createBooking(uint16 _stationId, uint16 _startTime, uint16 _endTime) internal {
    // Create a new booking object
    Booking memory booking = Booking(block.timestamp,_startTime, _endTime, msg.sender);
 
    bookings[addresses[_stationId]].push(booking);
 
    // Mark the property booked on the requested dates
    for (uint16 i = _startTime; i < _endTime; i++) {
      stations[addresses[_stationId]].isBooked[i] = true;
    }
    stations[addresses[_stationId]].inTimes.push(_startTime);
    stations[addresses[_stationId]].outTimes.push(_endTime);   
 
  }

  function getStation(address add) public view returns (Station memory){
    return stations[add];
  }

  function getStation(string memory _location) public view returns (Station memory){
    return locationsToStation[_location];
  }




    function BookSlot(uint16 _stationId, uint16 inTime, uint16 outTime) public payable {
    // Retrieve station object from the memory
    Station memory station = stations[addresses[_stationId]];

    // Assert that property is active
    require(
      station.isActive == true,
      "Charging station with this ID is not active"
    );

    // Assert that station is available for the time
    for (uint16 i = inTime; i < outTime; i++) {
      if (station.isBooked[i] == true) {
        // if station is already booked for that time, revert the transaction
        revert("station is not free for the selected period");
      }
    }


    // Check the customer has sent an amount equal to (pricePerunit * minutes)
    // require(
    //   msg.value == station.pricePerunit * (outTime - inTime),
    //   "Sent insufficient funds"
    // );

    // send funds to the owner of station
    // _sendFunds(station.owner, msg.value);

    // conditions for a booking are satisfied, so make the booking
    _createBooking(_stationId, inTime, outTime);
  }


 function setStationAsInactive(uint16 _stationId) public {
    require(
      stations[addresses[_stationId]].owner == msg.sender,
      "THIS IS NOT YOUR STATION"
    );
    stations[addresses[_stationId]].isActive = false;

  }


function setStationAsActive(uint16 _stationId) public {
    require(
      stations[addresses[_stationId]].owner == msg.sender,
      "THIS IS NOT YOUR STATION"
    );
    stations[addresses[_stationId]].isActive = true;

  }


  function deleteStation(uint16 _stationId) public {
    //  also delete the property
    require(
      stations[addresses[_stationId]].isActive == false,
      "Charging station with this ID is not active"
    );
    delete(stations[addresses[_stationId]]);
    delete(addressesToInt[addresses[_stationId]]);
    delete(addresses[_stationId]);
  }  



function getOutTimings(uint16 _stationId) public view returns(uint16[] memory) {
    return stations[addresses[_stationId]].outTimes;
  }

  function getInTimings(uint16 _stationId) public view returns(uint16[] memory) {
    return stations[addresses[_stationId]].inTimes;
  }

function getLocations() public view returns(string[] memory) {
    return Locations;
  }

function getBookings(address _address) public view returns(Booking[] memory) {
    return bookings[_address];
  }
  
  }
