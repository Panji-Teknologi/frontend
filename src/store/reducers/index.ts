// third-party
import { combineReducers } from "redux";

// project import
import menu from "./menu";
import auth from "./auth";
import bank from "./bank";
import profile from "./profile";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, auth, bank, profile });

export default reducers;
