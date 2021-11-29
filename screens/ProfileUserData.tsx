
import * as React from 'react';
import { Text,TextInput,TouchableOpacity,View,StyleSheet,ScrollView, Image } from "react-native";
import { useDispatch,useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

import { IScreenProps, IUserData } from './interfaces';
import {instanceDB} from '../sglib.config';
import { loginSuccess, personalData } from '../store/Auth/actions';
import PhotoCircle from '../components/PhotoCircle';
import { RootState } from '../store/rootReducer';

//have any 2

export const ProfileUserData:React.FC<IScreenProps> = ({navigation,route}:any) => {

  const personalDataFromStore = useSelector((state:RootState) => state.auth.personalData);
  const dispatch = useDispatch();
  const uidValue = auth().currentUser?.uid;
  const userNameEmail = auth().currentUser?.email;
  let initialData = {
    about_user: "",
    avatar_url: "",
    first_name: "",
    last_name: "",
    location: {city: "", country: ""},
    user_id: uidValue,  
    user_name: userNameEmail,
  };
  const [userData,setUserData] = React.useState<IUserData>(initialData);

  React.useEffect(()=> {
    route.params.firstPushingData === 'false' 
    ?
    setUserData(personalDataFromStore)
    :
    console.log(route)
  },[]) 
  React.useEffect(()=> {
    route.params.photoData && setUserData((prevState)=>({...prevState,avatar_url:route.params.photoData.base64}))
  },[route.params.photoData]) 
  
    const handleConfirm = async() => {
      console.log(uidValue)
      await instanceDB.users.setNewUser(uidValue,userData);
      dispatch(personalData(userData));
      route.params.firstPushingData === 'false' 
      ?
      dispatch(personalData(userData))&&
      navigation.goBack()
      : 
      dispatch(loginSuccess(true));
    }

    const currentEmail = auth().currentUser?.email;
   
        
    return( 
        <ScrollView style={styles.wrapper}>
        {route.params.firstPushingData === 'false'?false:<Text style={styles.subTitle}>Profile</Text>}
        <View style={styles.row}>
        <TouchableOpacity style={styles.photo} 
        onPress={()=>navigation.navigate('ChangePhoto',{photoData:userData.avatar_url})}>
          {userData.avatar_url
           ?
        <PhotoCircle avatar_url={userData.avatar_url}/>
           : 
         <Text>Touch to add photo</Text>}</TouchableOpacity>
         
        <Text style={styles.email}>{currentEmail}</Text>
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
        justifyContent:'space-around',
        flexWrap: "wrap",
    },
    photo:{
        margin:15,
        borderRadius: 60,
        width: 120,
        height: 120,
        borderWidth: 5,
        borderColor: 'white',
        justifyContent:'center',
        alignItems:'center'
    },
    avatar:{
      borderRadius: 60,
      width: 120,
      height: 120,
    },
    email:{
        padding:30,
        justifyContent:'center',
        color:'#000',
        fontSize:20,
        maxWidth:250,
        
        
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
    },
  });
