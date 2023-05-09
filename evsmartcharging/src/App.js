import './App.css';
// import {BrowserRouter} from 'react-router-dom'
import { useEffect, useState } from 'react';
import ListNewStation from './components/ListNewStation';
import { ethers } from 'ethers';
import abi from './ContractsJSON/EVSmartChargingDapp.json';
import EVOwner from './components/EVOwner';
import EVStation from './components/EVStation';
import { useDispatch } from 'react-redux';
import { setAccount as SetAccount,setContract } from './components/features/Actions'




function App() {

  const dispatch = useDispatch();

  const [state,setState]=useState({
    Provider:null,
    signer:null,
    contract:null
  })

  const [account,setAccount]=useState('Not Connected');
  // To automatically fetch contract instance
  useEffect(()=>{
    const template=async()=>{
    const contractAddress="0x5AEa3d47AEacCBf2738721fdEB8a5E37Ed7c7DcC";  
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

    console.log(contract); // to check the instance

    setState({provider,signer,contract});
    dispatch(setContract(contract));
    
  
  }
    catch(error){
      alert(error);
    }
  }
    
    template();
  },[])

  return (
    <div className="App">
      <div>Connected account : {account}</div>
      <ListNewStation state={state}/>
      <EVStation />
      <EVOwner state={state}/>
    </div>
  );
}

export default App;


