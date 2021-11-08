import * as React from 'react';
import { useDispatch } from 'react-redux';
import {Button, StyleSheet, Text, TextInput, View,TouchableOpacity} from 'react-native';
import { RegistrationFirebase } from '../store/Auth/operations';
import Logo from '../components/Logo';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces';

type PropsScreen = NativeStackScreenProps<RootStackParamList, 'Registration'>;


export const Registration:React.FC<PropsScreen> = ({navigation}:PropsScreen) => {

    const [email,setEmail] = React.useState("");
    const [password,setpassword] = React.useState("");
    const [repeatPassword,setRepeatPassword] = React.useState("");
    const dispatch = useDispatch();

    const handleRegistration = ():void => {
      // if(password === repeatPassword && password.length > 3) {
      // dispatch(RegistrationFirebase(email,password))
      // navigation.navigate('ProfileUserData')
      // }
      navigation.navigate('ProfileUserData')
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
