import auth from '@react-native-firebase/auth';
import { Action } from "redux";
import { ThunkDispatch } from 'redux-thunk';
import { AuthStateI } from '../storeInterfaces';

import {
  loginRequest,
  loginSuccess,
  loginError
} from './actions'

/// have ANY

export const RegistrationFirebase = (email:string, password:string) => async (dispatch:ThunkDispatch<AuthStateI, void, Action>) => {
  dispatch(loginRequest());
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((info)=> {
        console.log('User account created & signed in!');
      })
      .catch((error)=>{
        dispatch(loginError(error));
        console.log(error);
      })
}

export const LoginFirebase = (email:string, password:string) => async (dispatch:ThunkDispatch<AuthStateI, void, Action>) => {
  dispatch(loginRequest());
  auth()
  .signInWithEmailAndPassword(email, password)
  .then(()=>{
  dispatch(loginSuccess(true));
    console.log('welcome')
  })
  .catch((error)=>{
    dispatch(loginError(error.code))
    console.log(error.code)
  })
}
