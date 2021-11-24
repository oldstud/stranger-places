import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { instanceDB } from '../sglib.config';
import { IScreenProps } from './interfaces';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess, personalData } from '../store/Auth/actions';

export const Home:React.FC<IScreenProps> = () => {
    const dispatch = useDispatch();
    const personalDataToStore = async() => {
        const uid = auth().currentUser?.uid;
        const data = await instanceDB.users.requestUserData(uid);
        dispatch(personalData(data))
    }
    React.useEffect(() => {
        personalDataToStore()
    }, [])
    
const handlePress = async():Promise<any> =>{
    // const allUsers =  await instanceDB.users.getAllUsers();
    // console.log(allUsers) 
    const currentEmail = auth().currentUser
    console.log(currentEmail)   
    // await auth().signOut().then(() => console.log('User signed out!'));
    //     dispatch(loginSuccess(false));
    
}
    return(<View>
        <Text>Welcome to HOME</Text>
        <Button
         title="All"
         onPress={handlePress}
        />

        <Text> <Icon name="home" size={30} color="#900" /></Text>

        </View>
    )
}