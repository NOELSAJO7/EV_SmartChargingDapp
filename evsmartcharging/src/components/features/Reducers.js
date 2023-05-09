export const EVstationDetail=(state={},action)=>{
    switch(action.type)
    {
        case 'EV_STATION_DETAIL' : return action.payload;
        default : return state;
    }
}

export const SetAccount=(state='',action)=>{
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

