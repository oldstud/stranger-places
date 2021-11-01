import auth from '@react-native-firebase/auth';
import { Action } from "redux";
import { ThunkDispatch } from 'redux-thunk';
import { AuthStateI } from '../storeInterfaces';

import {
  loginRequest,
  loginSuccess,
  loginError
} from './actions'


export const RegistrationFirebase = (email:string, password:string) => async (dispatch:ThunkDispatch<AuthStateI, void, Action>) => {
  dispatch(loginRequest());
  try {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        dispatch(loginSuccess(true));
      })
      // .then(()=>{
      //   auth().onAuthStateChanged(function(user) {
      //     if (user) {
      //         console.log(user);
      //         user.getIdToken().then(function(idToken) {  
      //            console.log(idToken); // It shows the Firebase token now
      //         });
      //     }
      // });
      // })
      .catch((error)=>{
        dispatch(loginError(error));
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.log(error);
      })
  } catch (error:any) {

    
    console.log(error);

  }
}