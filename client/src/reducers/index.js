import { combineReducers } from "redux";
import ChatReducer from "./ChatReducer";
import AppReducer from "./AppReducer";
import AuthReducer from "./authReducer";
import alertReducer from "./alertReducer";
import notificationReducer from "./notificationReducer";
export default combineReducers({
  chat: ChatReducer,
  app: AppReducer,
  auth: AuthReducer,
  alert: alertReducer,
  notification: notificationReducer,
});
