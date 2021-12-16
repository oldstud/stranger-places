import { ActionI, AuthStateI, IPlacesState } from '../storeInterfaces';
import * as constants from './constants';
//have any
const initialState:IPlacesState = {
    gettingData:false,
    isLoading:false,
    allPlaces:null,
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
        default:
            return state;
    }
}
