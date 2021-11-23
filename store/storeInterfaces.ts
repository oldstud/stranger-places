import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { IUserData } from '../screens/interfaces'
import type { RootState, AppDispatch } from './rootReducer'

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


// не забыть
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
