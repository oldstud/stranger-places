import * as React from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import PhotoCircle from '../components/PhotoCircle';
import { instanceDB } from '../sglib.config';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import { AddPlaceStackParamList } from '../interfaces';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IAddNewPlacePlaceData } from './interfaces';


type PropsScreen = NativeStackScreenProps<AddPlaceStackParamList, 'AddNewPlace'>;

export const AddNewPlace:React.FC<PropsScreen> = ({navigation,route}) => {
    const uidValue = auth().currentUser?.uid;
    const initialState = { img:'',description:'',location:{_lat:'',_long:''},user_doc_id:uidValue,user_id:uidValue};
    const [placeData, setPlaceData] = React.useState<IAddNewPlacePlaceData>(initialState);
    const [error, setError] = React.useState<null | string>(null)
 
    
    React.useEffect(()=> {
        route.params?.photoData && setPlaceData((prevState:any)=>({...prevState,img:route.params?.photoData.base64})) 
        console.log(route)
    },[route.params]) 


    React.useEffect(()=>{
        
    },[])

    const handlePress = async():Promise<void> => {
      setError(null)
      let validateFields = true;
      Object.values(placeData).forEach(element => {
        element == false ? validateFields = false : true
      });
  
     validateFields ? await instanceDB.places.createPlace(placeData,uidValue) : setError('All fields is required. Please check it')
     setPlaceData(initialState)
     navigation.goBack();
    
    }
    return(
    <ScrollView>
      
        <Text style={styles.subTitle}>Please add photo...</Text>
        
        <TouchableOpacity style = {styles.photoPlace}
        onPress={()=>{
            navigation.navigate('ChangePhoto',{circleMode:"false",photoData:placeData.img})
        }}
        >
            {placeData.img ?
           <PhotoCircle avatar_url={placeData.img} circleMode="false"/> 
           : <Text style = {styles.internalText}>Tap to add Photo</Text>}
        </TouchableOpacity>
        <Text style={styles.subTitle}>You need to tap twice to choose a coordinates!</Text>
        
        <View style={styles.container}>

        <MapView
        onDoublePress={
          (e)=>{
            const {nativeEvent} = e;
          setPlaceData((prev:any)=>({...prev,location:{_lat:nativeEvent?.coordinate.latitude,_long:nativeEvent?.coordinate.longitude}}))
          console.log(nativeEvent)}
        }
          provider={PROVIDER_GOOGLE} 
          style={styles.map}
   
            >
       {placeData.location._lat?<Marker
          coordinate={{latitude:placeData.location._lat,longitude:placeData.location._long}}
          title={'marker.title'}
          description={'marker.description'}
        />:false}
        </MapView>
        </View>
        <Text style={styles.subTitle}>Add description please!</Text>
        <TextInput
         style={styles.textArea}
        value={placeData.description}
        onChangeText={(text)=>setPlaceData((prevState:any)=>({...prevState,description:text}))}
        multiline={true}
        placeholder='For example: It is a beautiful place.'
        />
         <Text style={[styles.subTitle,{color:'red',margin:20}]}>{error ? error:""}</Text>
       <View style={{marginBottom:20,marginHorizontal:25}}>
        <Button
         title="Add Place"
         onPress={handlePress}
         color='green'
         
        />
        </View>
        
        </ScrollView>
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
      textAlign:'left',
      fontSize:18,
      marginLeft:15,
      color:"green"
    },
    input: {
        width:"70%",
      height: 40,
      margin: 20,
      borderWidth: 1,
      padding: 10,
      borderRadius:5
    },
    button:{
     alignItems: "center",
     alignSelf:"center",
     backgroundColor: "#90ee90",
     padding: 10,
     margin:10,
     width:"75%", 
     borderRadius:5   
    },
    text:{
      fontSize:18,
      
    },
    internalText : {
        fontSize:25,
        color:"white"
    },
    photoPlace:{
        height:200,
        width:200,
        margin:20,
        backgroundColor:'lightgrey',
        borderWidth:2,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
    container: {
      height:400,
      width: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth:20,
      borderColor:'transparent'
    },
    map: {
      height: "100%",
      width: "100%",
    },
    textArea:{
      minHeight:100,
      height:"auto",
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius:5
  },

  });
