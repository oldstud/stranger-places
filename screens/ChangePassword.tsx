import * as React from 'react';
import { useDispatch } from 'react-redux';
import {Button, StyleSheet, Text, TextInput, View,TouchableOpacity} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces';
import auth from '@react-native-firebase/auth';


type PropsScreen = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const ChangePassword:React.FC<PropsScreen> = ({navigation}) => {

    const [oldPassword,setOldPassword] = React.useState<string>("");
    const [newPassword,setNewPassword] = React.useState<string>("");
    const [repeatNewPassword,setRepeatNewPassword] = React.useState<string>("");
    const [resultText,setResultText] = React.useState<string>("");
    const dispatch = useDispatch();

    const handleUpdatePassword = async () => {
      setResultText('')
        if (newPassword === repeatNewPassword && newPassword.length > 3) {
            const currentEmail = auth().currentUser?.email;
            auth()
            .signInWithEmailAndPassword( currentEmail?currentEmail:"", oldPassword)
            .then(function() {
              auth().currentUser?.updatePassword(newPassword).then(function(){
                setResultText('DONE!')
                    console.log("success")
                    setTimeout(()=>navigation.goBack(),1500)
                }).catch(function(err){
                  setResultText('incorrect passwords')
                    console.log('internal catch',err)
                });

            }).catch(function(err2){
                console.log('external catch',err2)
                setResultText('Incorrect passwords')
            });
     }
    }

    return (
    <View style={styles.wrapper}>   
    <Text style={styles.subTitle}>{resultText}</Text>
        <TextInput
         style={styles.input}
         onChangeText={setOldPassword}
         value={oldPassword}  
         placeholder='Password'
        />
        <TextInput
         style={styles.input}
         onChangeText={setNewPassword}
         value={newPassword}
         placeholder='New password'
        />
        <TextInput
         style={styles.input}
         onChangeText={setRepeatNewPassword}
         value={repeatNewPassword}
         placeholder='Repeat new password'
        />

        <TouchableOpacity
        style={styles.nextButton}
        onPress={handleUpdatePassword}>
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
    
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
