import * as constants from './constants';

const initialState = {
    isLoggin: false,
    isLoading: false,
    error: null
};
export const reducerAuth = (state = initialState, action) => {
    switch (action.type) {
        case constants.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case constants.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggin:action.payload,
                isLoading: false,
                error: null
            };
        case constants.LOGIN_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
}

// export const isLoading = (state = false, action) => {
//     switch (action.type) {
//         case constants.LOGIN_REQUEST:
//             return {
//                 ...state,
//                 isLoading: true
//             };
//         case constants.LOGIN_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false
//             };
//         case constants.LOGIN_ERROR:
//             return {
//                 ...state,
//                 isLoading: false
//             };
//         default:
//             return state;
//     }
// }

// export const error = (state = null, action) => {
//     switch (action.type) {

//         case constants.LOGIN_ERROR:
//             return {
//                 ...state,
//                 error: action.payload
//             };
//         case constants.LOGIN_REQUEST:
//             return {
//                 ...state,
//                 error: null
//             };
//         default:
//             return state;
//     }
// }