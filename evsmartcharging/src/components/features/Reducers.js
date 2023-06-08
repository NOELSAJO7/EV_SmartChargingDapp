export const EVstationDetail=(state={},action)=>{
    switch(action.type)
    {
        case 'EV_STATION_DETAIL' : return action.payload;
        default : return state;
    }
}

export const SetAccount=(state='NC',action)=>{
    switch(action.type)
    {
        case 'SET_ACCOUNT' : return action.payload;
        default : return state;
    }
}


export const SetContract=(state={},action)=>{
    switch(action.type)
    {
        case 'SET_CONTRACT' : return action.payload;
        default : return state;
    }
}


export const SetLocation=(state='',action)=>{
    switch(action.type)
    {
        case 'SET_LOCATION' : return action.payload;
        default : return state;
    }
}


export const SetDestination=(state=[],action)=>{
    switch(action.type)
    {
        case 'SET_DESTINATION' : return action.payload;
        default : return state;
    }
}

export const SetCurrStationLocation=(state='',action)=>{
    switch(action.type)
    {
        case 'SET_STATION_LOCATION' : return action.payload;
        default : return state;
    }
}

