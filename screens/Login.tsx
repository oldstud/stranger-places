import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, StyleSheet, Text, TextInput, View,TouchableOpacity} from 'react-native';
import Logo from '../components/Logo';
import auth from '@react-native-firebase/auth';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces';
import { LoginFirebase } from '../store/Auth/operations';
import { loginError, loginSuccess } from '../store/Auth/actions';
import { RootState } from '../store/rootReducer';


type PropsScreen = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const Login:React.FC<PropsScreen> = ({navigation}:PropsScreen) => {
  
  React.useEffect(() => {
    dispatch(loginError(''));
    const savedLoginState = auth().currentUser;
    console.log(savedLoginState)
    if(savedLoginState){
      dispatch(loginSuccess(true))
    }
  }, []);

    const [email,setEmail] = React.useState<string>("");
    const [password,setpassword] = React.useState<string>("");
    const dispatch = useDispatch();
    const authError = useSelector((state:RootState) => state.auth.error)

    const handleLogin = async () => {
 
          dispatch(loginError(null))
          if(email && password){
            dispatch(LoginFirebase(email,password));
          }
      }


    return (
    <View style={styles.wrapper}>
      <Logo/>
        <Text style={styles.subTitle}>Login</Text>
        <TextInput
        style={styles.input}
         onChangeText={setEmail}
         value={email}
         placeholder='Email'
        />

        <TextInput
         style={styles.input}
         onChangeText={setpassword}
         value={password}
         placeholder='Password'
        />
        <Text style={styles.error}>{authError}</Text>
        <TouchableOpacity
        style={styles.nextButton}
        onPress={handleLogin}>
        <Text style={styles.text}>Sign In</Text>
      </TouchableOpacity>
        <Button
         title="Sign Up >"
         color="#808080"
         onPress={() => navigation.navigate('Registration')}/>
         

    </View>
    )
} 

const styles = StyleSheet.create({
    wrapper: {
      height:"100%",
      justifyContent:'center',
    },
    error:{
      height:20,
      color:"red",
      width:"100%",
      textAlign:'center'
    },

    subTitle:{
      textAlign:'center',
      fontSize:20
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    nextButton:{
     alignItems: "center",
     alignSelf:"center",
     backgroundColor: "#90ee90",
     padding: 10,
     margin:10,
     width:"75%",    
    },
    switchButton:{
     width:"75%",
     alignSelf:'center',
    },
    text:{
      fontSize:18
    }
  });
