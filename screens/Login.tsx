import * as React from 'react';
import { useDispatch } from 'react-redux';
import {Button, StyleSheet, Text, TextInput, View,TouchableOpacity} from 'react-native';
import Logo from '../components/Logo';
import {instanceDB} from '../sglib.config';


import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces';
import { LoginFirebase } from '../store/Auth/operations';

type PropsScreen = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const Login:React.FC<PropsScreen> = ({navigation}:PropsScreen) => {

    const [email,setEmail] = React.useState("");
    const [password,setpassword] = React.useState("");

    const dispatch = useDispatch();

    const handleLogin = async () => {
      const result = await instanceDB.users.getAllUsers();
      console.log(result)
        // dispatch(LoginFirebase(email,password))
        
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

        <TouchableOpacity
        style={styles.nextButton}
        onPress={handleLogin}
      >
        <Text style={styles.text}>Sign In</Text>
      </TouchableOpacity>
  
        <Button
         title="Sign Up >"
         color="#808080"
         onPress={() => navigation.navigate('Registration')}
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
