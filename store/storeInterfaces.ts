import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './rootReducer'



export interface AuthStateI{
    isLoggin: boolean,
    isLoading: boolean,
    error: null | string | object,
    currentUid:null | string
}
export type IAuthStore = {
    auth:AuthStateI
}

export interface ActionI {
    type:string,
    payload:boolean
}


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
