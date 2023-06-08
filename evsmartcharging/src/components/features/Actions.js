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

export const setLocation=(location)=>{
    return{
        type:'SET_LOCATION',
        payload:location
    }
}

export const setDestinations=(destinations)=>{
    return{
        type:'SET_LOCATION',
        payload:destinations
    }
}

export const setCurrStationLocation=(location)=>{
    return{
        type:'SET_STATION_LOCATION',
        payload:location
    }
}