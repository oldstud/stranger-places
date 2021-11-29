import { IUserData } from '../../screens/interfaces';
import * as constants from './constants';
//have any
export function placesRequest() {
    return {
        type: constants.ConstantsI.PLACES_REQUEST,
    }
}
export function placesSuccess(value:boolean) {   
    return {
        type: constants.ConstantsI.PLACES_SUCCESS,
        payload: value
    }
}
export function placesError(value:string | null) {
    return {
        type: constants.ConstantsI.PLACES_ERROR,
        payload: value
    }
}

export function allPlaces(value:any) {
    return {
        type: constants.ConstantsI.PLACES_ALLPLACES,
        payload: value
    }
}

