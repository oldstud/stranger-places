import * as React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { IAddNewPlacePlaceData, IProfileRoutes, IScreenProps, IUserData } from './interfaces';
import { useSelector } from 'react-redux';
import PhotoCircle from '../components/PhotoCircle';
import { RootState } from '../store/rootReducer';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { instanceDB } from '../sglib.config';
import { FlatList } from 'react-native-gesture-handler';
import PlaceListItem from '../components/PlaceListItem';



export const ProfileUserTab:React.FC<IProfileRoutes> = ({route}:IProfileRoutes) => {
  
    const personalData = useSelector((state:RootState) => state.auth.personalData);
    const allPlaces = useSelector((state:RootState) => state.places.allPlaces)
    const [userData, setUserData] = React.useState<IUserData | null>(null)
    const [listData, setListData] = React.useState<IAddNewPlacePlaceData | any>(null)

    const myProfileData = async() => {
      setUserData(personalData)
      const myPlaces:IAddNewPlacePlaceData[] = await instanceDB.places.updateMyPlaces(userData?.user_id);
      const dataWithId:IAddNewPlacePlaceData[] | any =  transformData(myPlaces)
      setListData(dataWithId)
      console.log(myPlaces)
    }
    const anotherUserProfileData = () =>{
      const data = route.params.userInfo;
       setUserData(data);
       let userPlaces:IAddNewPlacePlaceData | any = [] ;
       allPlaces.forEach((item:IAddNewPlacePlaceData)=>{
        if(item.user_id == data.user_id) { 
          userPlaces=[...userPlaces,item];
          console.log('<-places');
        }
      });
      setListData(userPlaces)
      console.log(route);
      
    } 

    const transformData = (arrayOfObj:Array<IAddNewPlacePlaceData>) => {
      let newArray:Array<IAddNewPlacePlaceData> = [];
     arrayOfObj.forEach(element => {
       newArray = [...newArray,{...element,id:Math.random().toString(12).substring(0)}];
     });
     return newArray
    }

    React.useEffect(() => {
        route.params.public == "false" ?
        myProfileData()
        :anotherUserProfileData()
    }, [])

    return <View> 
      <View style={styles.row}>
        <PhotoCircle avatar_url = {userData?.avatar_url}/>
        <View >
        <Text style={styles.email}>{userData?.user_name}</Text>
        <Text>Followers TBC</Text>
        </View>
        </View>
     <View>
        <FlatList
        data={listData} 
        // extraData={listData}
        renderItem={({item})=> <PlaceListItem data={item}/>}
        keyExtractor={item => item.id}
      />
  
  </View>
     </View>
    
}

const styles = StyleSheet.create({
 
  row:{
    flexDirection:'row',

  },
  email:{
    fontSize:20,
    fontWeight:"600",
    textAlign:'center',
    margin:15
  },
  flatContainer :{
    flex:1
  }
});
