import * as React from 'react';
import { Text,StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IScreenProps, IUserData } from '../screens/interfaces';
import { instanceDB } from '../sglib.config';
import firestore from '@react-native-firebase/firestore';
import { ISubscribeProps } from './interfaces';

export const FollowersCount:React.FC<ISubscribeProps> = (props) => {
    const {userId} = props;
    const [followersState, setFollowersState] = React.useState<any>([])
    React.useEffect(() => {
        // const subscriber =  instanceDB.subscriptions.getFollowers(userId);
        const subscriber= firestore().collection('users')
        .doc(userId)
        .collection('followers')
        .onSnapshot(documentSnapshot => {
            let followers:any = [];
           documentSnapshot.docs.forEach((data)=>{

            followers = [...followersState,data.data()]
            
           })
           setFollowersState(followers)   
          });
        return () => subscriber();
      }, [userId]);



        const handlePress = () => {
            // will be new screen
        }
    return (
        <TouchableOpacity onPress={handlePress}>
        <Text style={styles.count}>
            {followersState.length}
        </Text>
        </TouchableOpacity>
    )
  
}
const styles = StyleSheet.create({
    count:{
        textAlign: 'center',
        fontFamily: 'Monoton-Regular',
        fontSize:22, 
        color:'#000'
    },
  });
