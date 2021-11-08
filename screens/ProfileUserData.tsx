
import * as React from 'react';
import { Text,TextInput,TouchableOpacity,View,StyleSheet,ScrollView } from "react-native";
import { useDispatch,useSelector } from 'react-redux';

import { RootState } from '../store/rootReducer';
import { IScreenProps, IUserData } from './interfaces';
import {instanceDB} from '../sglib.config';
import { loginSuccess } from '../store/Auth/actions';

//have any


export const ProfileUserData:React.FC<IScreenProps> = () => {

  const uidValue = useSelector((state:RootState) => state.auth.currentUid);
  const dispatch = useDispatch();
  // const uidValue ='K9JeNQmq0POXQTCcmXYZos1iz5T2';
  const [userData,setUserData]=React.useState<IUserData>({
                about_user: "",
                avatar_url: "",
                first_name: "",
                last_name: "",
                location: {city: "", country: ""},
                user_id: uidValue,
                user_name: "",
              });

     const handleConfirm = async () => {
      const result =  await instanceDB.users.getAllUsers();
      dispatch(loginSuccess(true))
      // console.log(result)

  // const result = await instanceDB.users.setNewUser(uidValue,userData);
  // }
     }
      
        
    return( 
        <ScrollView style={styles.wrapper}>
        <Text style={styles.subTitle}>Profile</Text>
        <View style={styles.row}>
        <TouchableOpacity style={styles.photo}></TouchableOpacity>
        <Text style={styles.email}>EMAILDISPATCH@EMAIL.COM</Text>
        </View>
        <View style={styles.row}>
        <Text style={styles.label}>First Name</Text>
        <Text style={styles.label}>Last Name</Text>
        </View>
        <View style={styles.row}>
        <TextInput
        style={styles.input}
        value={userData.first_name}
        onChangeText={(text)=>setUserData((prevState)=>({...prevState,first_name:text}))}
        placeholder={'Example: John'}
        />
        <TextInput
        style={styles.input}  
        value={userData.last_name}
        onChangeText={(text)=>setUserData(prevState=>({...prevState,last_name:text}))}
        placeholder={'Example: Wick'}
        />
        </View>
           <Text style={styles.label}>About You</Text>
        <TextInput
         style={styles.textArea}
        value={userData.about_user}
        onChangeText={(text)=>setUserData(prevState=>({...prevState,about_user:text}))}
        multiline={true}
        placeholder={'Example: Like dogs and guns! Have a nice car...'}
        />
           <Text style={styles.label}>Your location*</Text>
           <View style={styles.row}>
        <TextInput
         style={styles.input}
        value={userData.location.country}
        onChangeText={(text)=>setUserData(prevState=>({...prevState,location:{...prevState.location,country:text}}))}
        placeholder={'Example: USA'}
        />
        <TextInput
         style={styles.input}
        value={userData.location.city}
        onChangeText={(text)=>setUserData(prevState=>({...prevState,location:{...prevState.location,city:text}}))}
        placeholder={'Example: Los Angeles'}
        />
        </View>
        <TouchableOpacity
        style={styles.nextButton}
        onPress={handleConfirm}
      >
        <Text style={styles.text}>Confirm</Text>
      </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
      height:"100%",
      marginTop:30
    },
    subTitle:{
      textAlign:'center',
      fontSize:32
    },
    row:{
        flexDirection: "row",
        // justifyContent:"",
        flexWrap: "wrap",
    },
    photo:{
        margin:15,
        borderRadius: 60,
        width: 120,
        height: 120,
        borderWidth: 5,
        borderColor: 'white',
        backgroundColor: 'green'
    },
    email:{
        padding:30,
        height:"100%",
        justifyContent:'center',
    },
    input: {
      flex:1,
      height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 10
    },
    textArea:{
        minHeight:40,
        height:"auto",
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
    label:{
        color:'black',
        marginLeft:15,
    },
    text:{
      fontSize:18
    }
  });
