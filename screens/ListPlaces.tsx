import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { IScreenProps } from './interfaces';
import { useDispatch } from 'react-redux';
import HomeHeaderBtns from '../components/HomeHeaderBtns';
import { instanceDB } from '../sglib.config';


export const ListPlaces:React.FC<IScreenProps> = () => {

    const dispatch = useDispatch();
    const handlePress = async():Promise<any> =>{
        const allPlaces =  await instanceDB.places.getAllPlaces();
        console.log(allPlaces)
    }
    React.useEffect(() => {
        handlePress();
    });

    return(
        <View style={styles.container}>
            <HomeHeaderBtns activeButton='List'/>
            <View style={styles.test}></View>
      </View>
    )
}
const styles = StyleSheet.create({
    test:{
        width:"90%",
        height:"75%",
        backgroundColor:'white'
    },
    container: {
        height: "100%",
        width: "100%",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

   });
   