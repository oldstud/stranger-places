

export interface AuthStateI{
    isLoggin: boolean,
    isLoading: boolean,
    error: null | string | object
}

export interface ActionI {
    type:string,
    payload:boolean
}

