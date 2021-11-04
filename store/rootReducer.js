import { createStore, combineReducers , applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk" 
import {reducerAuth} from './Auth/reducerAuth';

const rootReducer = combineReducers({
    auth: reducerAuth,
    
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = () => {
    return createStore(
        rootReducer,
        composeEnhancer(applyMiddleware(thunk)));
}
export default configureStore;  