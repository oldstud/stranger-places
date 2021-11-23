import { IUserData } from '../../screens/interfaces';
import * as constants from './constants';
//have any
export function loginRequest() {
    return {
        type: constants.ConstantsI.LOGIN_REQUEST,
    }
}
export function loginSuccess(value:boolean) {   
    return {
        type: constants.ConstantsI.LOGIN_SUCCESS,
        payload: value
    }
}
export function loginError(value:string | null) {
    return {
        type: constants.ConstantsI.LOGIN_ERROR,
        payload: value
    }
}

export function personalData(value:IUserData) {
    return {
        type: constants.ConstantsI.PERSONAL_DATA,
        payload: value
    }
}

