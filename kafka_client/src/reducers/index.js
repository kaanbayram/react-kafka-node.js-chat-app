import { combineReducers } from "redux";
import messageReducers from "./messageReducers";
import 'bootstrap/dist/css/bootstrap.min.css';
import topicReducers from "./topicReducers";
import modalReducers from './modalReducers';

export default combineReducers({
    messagesResponse: messageReducers,
    topicsResponse: topicReducers,
    modalResponse: modalReducers,
});