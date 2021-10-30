import { createStore, combineReducers } from 'redux';
import countReducer from './Auth/reducerAuth';

const rootReducer = combineReducers({
    count: countReducer
});
const configureStore = () => {
    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),);
}
export default configureStore;  