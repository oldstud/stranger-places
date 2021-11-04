import { ActionI } from '../storeInterfaces';
import * as constants from './constants';

const initialState = {
    isLoggin: false,
    isLoading: false,
    error: null
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
        default:
            return state;
    }
}
