import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { IAddNewPlacePlaceData, IUserData } from '../screens/interfaces'
import type { RootState, AppDispatch } from './rootReducer'

//auth

export interface AuthStateI{
    isLoggin: boolean,
    isLoading: boolean,
    error: null | string | object,
    personalData:null | IUserData
}
export type IAuthStore = {
    auth:AuthStateI
}

export interface ActionI {
    type:string,
    payload:boolean
}
//places
export interface IPlacesState{
    gettingData:boolean,
    isLoading:boolean,
    allPlaces:Array<object> | Array<IAddNewPlacePlaceData>,
    error: null | string | object,
    
}


// не забыть
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
