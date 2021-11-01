import auth from '@react-native-firebase/auth';
import {loginRequest,loginSuccess,loginError} from './actions'

export const RegistrationFirebase = (email,password) => async dispatch => {
    dispatch(loginRequest());
try{
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
    console.log('User account created & signed in!');
    dispatch(loginSuccess(true));
     })
    }catch(error){
        dispatch(loginError(error));
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
    console.log(error);
    
}
}