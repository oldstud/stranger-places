import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Text,View,StyleSheet, TouchableOpacity } from 'react-native';
import { HomeScreenNavigationProp } from '../interfaces';
import { IScreenProps } from '../screens/interfaces';

const HomeHeaderBtns:React.FC<IScreenProps> = (props) => {

    const navigation = useNavigation<HomeScreenNavigationProp>();
 const onPressList = () => {
    navigation.navigate('ListPlaces')
 }
 const onPressMap = () => {
     navigation.navigate('Home')
 }
    return (
        <View style={styles.headerBtns}>
           <TouchableOpacity 
           onPress={()=>onPressMap()}
           style={[styles.btnItemWrapper , props.activeButton == 'map' ? styles.activeItem:false]}>
               <Text style={[styles.btnText,props.activeButton == 'map'?styles.btnTextActive:false]}>Map</Text>
            </TouchableOpacity>
           <TouchableOpacity 
           onPress={()=>onPressList()}
           style={[styles.btnItemWrapper ,props.activeButton == 'List' ? styles.activeItem:false]}>
               <Text style={[styles.btnText,props.activeButton == 'List'?styles.btnTextActive:false]}>List</Text>
            </TouchableOpacity>
        </View>
    )
  
}
const styles = StyleSheet.create({
    headerBtns:{
       zIndex:5,
       flexDirection:'row',
       margin:10,
       width:"60%",
       justifyContent:'space-around'
    },
    btnItemWrapper:{
        backgroundColor:'rgba(255, 115, 28, 1)',
        paddingHorizontal:30,
        paddingVertical:5,
        borderRadius: 4,
        elevation: 3,
    },
    activeItem:{
        backgroundColor:'#fff'
    },
    btnText : {
        fontSize:22,
        fontWeight:'600',
        color:'white'
    },
    btnTextActive: {
        color:'rgba(255, 115, 28, 1)',
        textDecorationLine:'underline'
    }
  });

  export default HomeHeaderBtns