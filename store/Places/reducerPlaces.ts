import { ActionI, AuthStateI, IPlacesState } from '../storeInterfaces';
import { allPlaces } from './actions';
import * as constants from './constants';
//have any
const initialState:IPlacesState = {
    gettingData:false,
    isLoading:false,
    allPlaces:[],
    error: null,

};
export const reducerPlaces = (state = initialState, action:ActionI) => {
    switch (action.type) {
        case constants.ConstantsI.PLACES_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case constants.ConstantsI.PLACES_SUCCESS:
            return {
                ...state,
                allPlaces:action.payload,
                isLoading: false,
                error: null
            };
        case constants.ConstantsI.PLACES_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case constants.ConstantsI.PLACES_ADD_NEW_PACE:
            return {
                ...state,
                allPlaces:[...state.allPlaces,action.payload]
            };
        default:
            return state;
    }
}
