import * as React from 'react';
import { Image, StyleSheet, Text, View , TouchableOpacity, Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { IPlaceListDataProps, IPlaceListDataPropsData } from '../components/interfaces';
import PhotoCircle from '../components/PhotoCircle';
import { instanceDB } from '../sglib.config';
import { RootState } from '../store/rootReducer';
import firestore from '@react-native-firebase/firestore';
import { IUserData } from './interfaces';


export const PlaceDetail:React.FC<any> = ({route,navigation}) =>{
    const [placeData,setPlaceData] = React.useState<IPlaceListDataPropsData|null>(null)
    const [userData,setUserData] = React.useState<IUserData|null>(null)

    const getUserData = async() =>{
        const uidsContainer = route.params.otherParam;
        let getData = await instanceDB.users.requestUserData(uidsContainer.user_doc_id);
        if(!getData){getData = await instanceDB.users.requestUserData(uidsContainer.uid);}
        getData.avatar_url = transformedImagePath(getData.avatar_url) 
        setUserData(getData)
    //    console.log(placeData)
    }
    React.useEffect(()=>{
        const data = route.params.otherParam;
        data.img = transformedImagePath(data.img);
        setPlaceData(data);
    });
    React.useEffect(()=>{
        getUserData();
        console.log(route)
    },[])

    const transformedImagePath = (path:string) => {
        const defect = 'data:image/jpeg;base64,';
        const newPath = path.replace(defect,'')
        return newPath
    }
    
    const goToProfile = () => {
        // console.log(userData)
        navigation.navigate('ProfileUserTab',{userInfo : userData})
    }
        return (
            
        <ScrollView style={styles.container}>
         
        <TouchableOpacity
         onPress={goToProfile}
         style={styles.avatar}
         >
        <PhotoCircle avatar_url={userData?.avatar_url}/>     
        </TouchableOpacity> 
        <Image
            style={styles.img}
                source={{
                uri:`data:image/png;base64,${placeData?.img}`
                
             }}></Image>
          
            <Text style={styles.description}>{"«"+placeData?.description+"»"}</Text>

    </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        zIndex:1,
    },
    img:{
        borderRadius: 5,
        height:350,
        margin:15,
        
      },
      description:{
        textAlign:'center',
          margin:15
      },
      avatar:{
        position:'absolute',
        top:10,
        right:10,
        zIndex:50,
    
     
      }
    })
