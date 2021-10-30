import * as React from 'react';
import {Button, StyleSheet, Text, TextInput, View,TouchableOpacity} from 'react-native';
import Logo from '../components/Logo';

export const Registration = () => {

    const [email,setEmail]=React.useState("");
    const [password,setpassword]=React.useState("");
    const [repeatPassword,setRepeatPassword]=React.useState("");

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
