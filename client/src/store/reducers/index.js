import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import category from "./category";
import topic from "./topic";

export default combineReducers({ alert, auth, category, topic });
