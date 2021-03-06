import { ActionI, AuthStateI } from '../storeInterfaces';
import * as constants from './constants';
//have any
const initialState:AuthStateI = {
    isLoggin: false,
    isLoading: false,
    error: null,
    personalData:null

};
export const reducerAuth = (state = initialState, action:ActionI) => {
    switch (action.type) {
        case constants.ConstantsI.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case constants.ConstantsI.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggin:action.payload,
                isLoading: false,
                error: null
            };
        case constants.ConstantsI.LOGIN_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        case constants.ConstantsI.PERSONAL_DATA:
            return {
                ...state,
                personalData: action.payload
            };

        default:
            return state;
    }
}
