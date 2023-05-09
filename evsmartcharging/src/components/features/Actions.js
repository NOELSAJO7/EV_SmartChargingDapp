export const setEVStationDetail=(details)=>{
return{
    type:'EV_STATION_DETAIL',
    payload:details
    }
}


export const setAccount=(account)=>{
    return{
        type:'SET_ACCOUNT',
        payload:account
    }
}

export const setContract=(contract)=>{
    return{
        type:'SET_CONTRACT',
        payload:contract
    }
}    