import * as constants from './constants';

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
export function loginError(value:boolean) {
    return {
        type: constants.ConstantsI.LOGIN_ERROR,
        payload: value
    }
}
