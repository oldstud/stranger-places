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
import { Subscribe } from '../components/Subscribe';
import { FollowersCount } from '../components/FollowersCount';



export const ProfileUserTab:React.FC<IProfileRoutes> = ({route}:IProfileRoutes) => {
  
    const personalData = useSelector((state:RootState) => state.auth.personalData);
    const allPlaces = useSelector((state:RootState) => state.places.allPlaces);
    const [userData, setUserData] = React.useState<IUserData | null>(null);
    const [listData, setListData] = React.useState<IAddNewPlacePlaceData | any>(null);

    const myProfileData = async() => {
      setUserData(personalData)
      const myPlaces:IAddNewPlacePlaceData[] = await instanceDB.places.updateMyPlaces(personalData.user_id);
      const dataWithId:IAddNewPlacePlaceData[] | any =  transformData(myPlaces)
      setListData(dataWithId)
      console.log(userData)
    }
    const anotherUserProfileData = () => {
      const data = route.params.userInfo;
       setUserData(data);
       let userPlaces:IAddNewPlacePlaceData | any = [] ;
       allPlaces.forEach((item:IAddNewPlacePlaceData)=>{
        if(item.user_id == data.user_id) { 
          userPlaces=[...userPlaces,item];
        }
      });
      setListData(userPlaces)
      // console.log(elButton);
      
    } 

    const transformData = (arrayOfObj:Array<IAddNewPlacePlaceData>) => {
      let newArray:Array<IAddNewPlacePlaceData> = [];
     arrayOfObj.forEach(element => {
       newArray = [...newArray,{...element,id:Math.random().toString(12).substring(0)}];
     });
     return newArray
    }


    React.useEffect(() => {
        // mySubscriptions()

        route.params.public == "false" 
        ?
        myProfileData()
        :
        anotherUserProfileData()
    }, [])

    const isMyAccount = () =>{
      const property = route.params.userInfo.user_id
      if(property){
        if(property == personalData.user_id ) {
          return false
        }
      }
    }

    return <View> 
      <View style={styles.row}>
        <PhotoCircle avatar_url = {userData?.avatar_url}/>
        <View >
        <Text style={styles.email}>{userData?.user_name}</Text>
        <FollowersCount userId = { route.params.public == "false" ? personalData.user_id : route.params.userInfo.user_id} />
        { route.params.public !== "false"  ?
        <Subscribe
        //  userId = {userData?.user_id}
        userId = {route.params.userInfo.user_id}
         />:false
        }
        </View>
        </View>
     <View style={styles.flatContainer}>
        <FlatList
        data={listData} 
        extraData={listData}
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
    // flex:1,
    height:500
  }
});
