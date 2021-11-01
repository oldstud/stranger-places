import * as constants from './constants';

export function loginRequest(value) {
    return {
        type: constants.LOGIN_REQUEST,
        payload: value
    }
}
export function loginSuccess(value) {
    return {
        type: constants.LOGIN_SUCCESS,
        payload: value
    }
}
export function loginError(value) {
    return {
        type: constants.LOGIN_ERROR,
        payload: value
    }
}
