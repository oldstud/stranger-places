import * as React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { instanceDB } from '../sglib.config';
import { IRegionOnMap, IScreenProps } from './interfaces';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess, personalData } from '../store/Auth/actions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import HomeHeaderBtns from '../components/HomeHeaderBtns';
import firestore from '@react-native-firebase/firestore';
import { placesSuccess } from '../store/Places/actions';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../interfaces';

const navigation = useNavigation<HomeScreenNavigationProp>(); 
 
export const Home:React.FC<IScreenProps> = () => {

    const [indicator,setIndicator]=React.useState<boolean>(false);
    const [allPlaces, setAllPlaces] = React.useState<any>([]);
    const dispatch = useDispatch();

    const reqestPlacesData = async() => {
      const documentsIds:Array<string> = [];
      await firestore().collection('users').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              documentsIds.push(doc.id)
          })
      });
      const allPlacesRequest = await new Promise ((resolve)=>{
          let allPlaces:Array<object> = [];
          documentsIds.forEach((id)=>{
          firestore().collection('users').doc(id).collection('places')
          .get().then((querySnapshot)=>{
             if(!querySnapshot.empty) {
                 querySnapshot.forEach((item)=>{
                  // allPlaces.push({...item.data(),id:Math.random().toString(12).substring(0)})
                  allPlaces = [...allPlaces,{...item.data(),id:Math.random().toString(12).substring(0)}]
                 })
                 setAllPlaces(allPlaces)
             }
          })
      })
      return resolve(allPlaces)
  })
    // setAllPlaces(allPlacesRequest);

  }
    const personalDataToStore = async() => {
        const uid = auth().currentUser?.uid;
        const data = await instanceDB.users.requestUserData(uid);
        dispatch(personalData(data))
    }
    React.useEffect(() => {
        reqestPlacesData();
        personalDataToStore();
        setTimeout(()=>{
          // forceUpdate();
          // console.log('dirty')
          setIndicator(true)
        },1500)
    },[])

    React.useEffect(() => { 
        dispatch(placesSuccess(allPlaces));
       
    }, [allPlaces])

    // const [_, forceUpdate] = React.useReducer((x) => x + 1, 0);

 return(
  
        <View style={styles.container}> 

         <HomeHeaderBtns activeButton='map'/>
         {!indicator?<ActivityIndicator></ActivityIndicator> :
        <MapView
          provider={PROVIDER_GOOGLE} 
          style={styles.map}
          >
          { allPlaces.map((marker:any) => (
          <Marker 

          style={{ position: 'absolute', top: 100, left: 50 }}
            key={marker.id}
            coordinate={{latitude : marker.location._lat, longitude:marker.location._long}}
            title={"Tap to see more"}
            description={marker.description}
            onCalloutPress={()=>navigation.navigate('PlaceDetail', { otherParam : marker })}
          /> 
        ))  
        
        }
        </MapView>
}
      </View>
    )
      
} 

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: "100%",
      width: "100%",
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });


