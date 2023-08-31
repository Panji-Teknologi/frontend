// third-party
import { combineReducers } from "redux";

// project import
import menu from './menu';
import auth from './auth';
import bank from './bank';
import project from './project';
import profile from "./profile";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, auth, bank, project, profile });

export default reducers;
