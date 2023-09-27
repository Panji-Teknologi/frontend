// third-party
import { combineReducers } from "redux";

// project import
import menu from './menu';
import auth from './auth';
import bank from './bank';
import project from './project';
import profile from "./profile";
import chat from "./chat";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, auth, bank, project, profile, chat });

export default reducers;
