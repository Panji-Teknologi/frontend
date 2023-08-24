// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import auth from './auth';
import bank from './bank';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, auth, bank });

export default reducers;
