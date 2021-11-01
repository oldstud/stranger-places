import * as React from 'react';
import { useDispatch } from 'react-redux';
import {Button, StyleSheet, Text, TextInput, View,TouchableOpacity} from 'react-native';
import { RegistrationFirebase } from '../store/Auth/operations';
import Logo from '../components/Logo';
import { DB } from '../sglib.config';



export const Login = () => {

    const [email,setEmail] = React.useState("");
    const [password,setpassword] = React.useState("");

    const dispatch = useDispatch();

    const handleRegistration = async ():Promise<any> => {
      
       
            const result = await DB.users.getAllUsers();
            console.log(result)
        
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

        <TouchableOpacity
        style={styles.nextButton}
        onPress={handleRegistration}
      >
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
        <Button
         title="< Sign In"
         color="#808080"
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
