import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { IScreenProps } from './interfaces';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeaderBtns from '../components/HomeHeaderBtns';
import { RootState } from '../store/rootReducer';
import { FlatList } from 'react-native-gesture-handler';
import PlaceListItem from '../components/PlaceListItem';


export const ListPlaces:React.FC<IScreenProps> = () => {
   
    const allPlaces = useSelector((state:RootState) => state.places)

    return(
        <View style={styles.container}>
            <HomeHeaderBtns activeButton='List'/>
            <View style={styles.test}>
               <FlatList
                   data={allPlaces.allPlaces} 
                   renderItem={({item})=> <PlaceListItem data={item}/>}
                   keyExtractor={item => item.id}
               />
            </View>
      </View>
    )
}
const styles = StyleSheet.create({
    test:{
        width:"90%",
        height:"75%",
        backgroundColor:'white',
        
    },
    container: {
        height: "100%",
        width: "100%",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

   });
   