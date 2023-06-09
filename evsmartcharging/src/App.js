import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Button, Segment} from 'semantic-ui-react'
import ListNewStation from './components/ListNewStation';
import { ethers } from 'ethers';
import abi from './ContractsJSON/EVSmartChargingDapp.json';
import EVOwner from './components/EVOwner';
import EVStation from './components/EVStation';
import StationDetail from './components/StationDetail';
import { useDispatch,useSelector } from 'react-redux';
import { setAccount as SetAccount,setContract } from './components/features/Actions';
import Mainpage from './Mainpage';
import 'semantic-ui-css/semantic.min.css'




function App() {

  const dispatch = useDispatch();

  const [state,setState]=useState({
    Provider:null,
    signer:null,
    contract:null
  })

  const [account,setAccount]=useState('NC');
  // To automatically fetch contract instance
  useEffect(()=>{
    const template=async()=>{
    const contractAddress="0xb001560921aFCCa0BCEdb03f4F4bEE9013cC5E81";  
    const contractABI=abi.abi;

    // metamask part to perform transactions in goerli
try{
    const {ethereum}=window;

    const account=await ethereum.request({method:"eth_requestAccounts"});

    window.ethereum.on('accountsChanged',()=>{window.location.reload()});

    setAccount(account);
    dispatch(SetAccount(account));  // setting account in react  state


    const provider = new ethers.providers.Web3Provider(ethereum); //to read blockchain
    const signer =  provider.getSigner(); // to write on blockchain

    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    )

    // console.log('inside app',contract); // to check the instance

    setState({provider,signer,contract});
    dispatch(setContract(contract));
    
  
  }
    catch(error){
      console.log(error);
    }
  }
    
    template();
  },[]);

  // const [accAddress] = useSelector((state)=>state.SetAccount);
  const contract = useSelector((state)=>state.SetContract);
  const handleConnectClick=async()=>{
    
    console.log('acc',account);
    const [acc]=account;
    const id=await contract.addressesToInt(acc);
    // console.log('afdghjkl',id);
    // setAccount('TC');
    // const {ethereum}=window;
    // const account=await ethereum.request({method:"eth_requestAccounts"});
    // account==='TC'?setAccount('NC'):setAccount(account);

  }

  const currlocation = useSelector((state) => state.SetCurrStationLocation);
  

  // const [propLoading]=useState('loading');
  return (

    <BrowserRouter>
    <div className="App">
      {/* <ListNewStation state={state}/> */}
      {/* <EVStation />
      <EVOwner state={state}/>
    </div> */}
    <Routes>
        <Route exact path='/' element={<Mainpage/>}/>
        <Route exact path='/asevowner/' element={<EVOwner/>} />
        <Route exact path='/asstationowner/' element={<EVStation address={account}/>}/>
        <Route exact path='/newstationowner/' element={<ListNewStation/>}/>
        <Route exact path='/asevowner/stationdetails' element={<StationDetail currlocation={currlocation} />} />
    </Routes>
    {/* <div> 
      {
        <Popup content='Add users to your feed' trigger={<Button icon='add' />} />
        account==='NC'?<Button onClick={handleConnectClick}>connect with metamask to continue</Button>:account==='TC'?<Button loading>connect with metamask to continue</Button>:<div>Connected account :{account}</div>
      }
      */}
      {/* <Button onClick={handleConnectClick}>CLICk</Button> */}
    </div> 
    </BrowserRouter>
  );
}

export default App;


