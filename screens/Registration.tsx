import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, StyleSheet, Text, TextInput, View,TouchableOpacity} from 'react-native';
import { RegistrationFirebase } from '../store/Auth/operations';
import Logo from '../components/Logo';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces';
import { RootState } from '../store/rootReducer';
import { loginError } from '../store/Auth/actions';

type PropsScreen = NativeStackScreenProps<RootStackParamList, 'Registration'>;

//TS and validation

export const Registration:React.FC<PropsScreen> = ({navigation}:PropsScreen) => {
  React.useEffect(()=>{
    dispatch(loginError(''));
  },[])

    const [email,setEmail] = React.useState<string>("");
    const [password,setpassword] = React.useState<string>("");
    const [repeatPassword,setRepeatPassword] = React.useState<string>("");
    const dispatch = useDispatch();
    const authError = useSelector((state:RootState) => state.auth.error)

    const handleRegistration = ():void => {
      dispatch(loginError(''))
      const checkEmail = /.+@.+\..+/i;
      if(password === repeatPassword && password.length > 3 && checkEmail.test(email)) {
        dispatch(RegistrationFirebase(email,password))
        navigation.navigate('ProfileUserData')
      } else {
        dispatch(loginError('Incorrect data'))
      }
      // console.log(route)

    }

    return (
    <View style={styles.wrapper}>
      <Logo/>
        <Text style={styles.subTitle}>Registration</Text>
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
        <TextInput
         style={styles.input}
         onChangeText={setRepeatPassword}
         value={repeatPassword}
         placeholder='Repeat password'
        />

            <Text style={styles.error}>{authError}</Text>

        <TouchableOpacity
        style={styles.nextButton}
        onPress={handleRegistration}
      >
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>

        <Button
         title="< Sign In"
         color="#808080"
         onPress={()=>navigation.navigate('Login')}
         />
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
