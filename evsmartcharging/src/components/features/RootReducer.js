import {combineReducers} from 'redux';
import {SetContract,SetAccount,EVstationDetail,SetLocation,SetDestination,SetCurrStationLocation} from './Reducers';

const RootReducer = combineReducers({SetContract,SetAccount,EVstationDetail,SetLocation,SetDestination,SetCurrStationLocation});

export default RootReducer
