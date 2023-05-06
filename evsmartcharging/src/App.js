import { useEffect, useState } from 'react';
import './App.css';
import ListNewStation from './components/ListNewStation';
import Timerange from './components/Timerange';
import { ethers } from 'ethers';
import abi from './ContractsJSON/EVSmartChargingDapp.json';
import EVOwner from './components/EVOwner';


function App() {

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
    const provider = new ethers.providers.Web3Provider(ethereum); //to read blockchain
    const signer =  provider.getSigner(); // to write on blockchain

    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    )

    console.log(contract); // to check the instance

    setState({provider,signer,contract});
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
      {/* <ListNewStation state={state}/> */}
      <EVOwner state={state}/>
      {/* <Timerange/> */}

    </div>
  );
}

export default App;
