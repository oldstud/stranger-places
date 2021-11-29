import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { instanceDB } from '../sglib.config';
import { IRegionOnMap, IScreenProps } from './interfaces';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess, personalData } from '../store/Auth/actions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import HomeHeaderBtns from '../components/HomeHeaderBtns';


export const Home:React.FC<IScreenProps> = ({navigation}:any) => {
    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };
    const [regionOnMap,setRegionOnMap]=React.useState<IRegionOnMap>(initialRegion);
    const[showHeaderButtons,setShowHeadersButton]=React.useState<boolean>(true)
    const dispatch = useDispatch();
    const personalDataToStore = async() => {
        const uid = auth().currentUser?.uid;
        const data = await instanceDB.users.requestUserData(uid);
        dispatch(personalData(data))
    }
    React.useEffect(() => {
        personalDataToStore();
    }, [])

    

    return(
  
        <View style={styles.container}>
         
         <HomeHeaderBtns activeButton='map'/>
      
        <MapView
          provider={PROVIDER_GOOGLE} 
          style={styles.map}
          region={initialRegion}>
             <Marker
          coordinate={ {latitude: 37.78825, longitude: -122.4324}}
          title={'marker.title'}
          description={'marker.description'}
        />
        </MapView>
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
   