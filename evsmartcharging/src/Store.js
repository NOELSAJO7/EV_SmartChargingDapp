import {createStore} from 'redux';
import RootReducer from './components/features/RootReducer';

const Store = createStore(RootReducer) 

export default Store;
