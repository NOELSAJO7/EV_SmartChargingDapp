import {combineReducers} from 'redux';
import {SetContract,SetAccount,EVstationDetail} from './Reducers';

const RootReducer = combineReducers({SetContract,SetAccount,EVstationDetail});

export default RootReducer
