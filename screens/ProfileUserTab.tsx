import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { IProfileRoutes, IScreenProps } from './interfaces';
import { useSelector } from 'react-redux';
import PhotoCircle from '../components/PhotoCircle';
import { RootState } from '../store/rootReducer';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const ProfileUserTab:React.FC<IProfileRoutes> = ({route}:IProfileRoutes) => {
    const userData = useSelector((state:RootState) => state.auth.personalData)

    React.useEffect(() => {
        route.params.public == "false" ?
        console.log(userData)
        :console.log('public profile')
    }, [])

    return <View>
      <View style={styles.row}>
        <PhotoCircle avatar_url={userData.avatar_url}/>
        <View >
        <Text style={styles.email}>{userData.user_name}</Text>
        <Text>Followers TBC</Text>
        </View>
        </View>
 
      </View>
    
}

const styles = StyleSheet.create({
 
  row:{
    flexDirection:'row'
  },
  email:{
    fontSize:20,
    fontWeight:"600",
    textAlign:'center',
    margin:15
  }
});
