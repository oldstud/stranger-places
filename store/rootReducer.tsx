import { createStore, combineReducers , applyMiddleware} from 'redux';
import thunk from "redux-thunk" 
import {reducerAuth} from './Auth/reducerAuth';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IAuthStore } from './storeInterfaces';
import { reducerPlaces } from './Places/reducerPlaces';

//have any

const rootReducer = combineReducers<any>({
    auth: reducerAuth,
    places: reducerPlaces
    
});

const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk)));
}

export default configureStore;  
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ReturnType<typeof configureStore>["dispatch"];