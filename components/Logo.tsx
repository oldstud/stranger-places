import * as React from 'react';
import { Text,StyleSheet } from 'react-native';
import { IScreenProps } from '../screens/interfaces';

const Logo:React.FC<IScreenProps> = () => {
    return (
        <Text style={styles.logo}>
            Stranger Places
        </Text>
    )
  
}
const styles = StyleSheet.create({
    logo:{
        textAlign: 'center',
        margin: 20,
        fontFamily: 'Monoton-Regular',
        fontSize:36,
        backgroundColor:'#000000',
        color:'#ffffff'
    },
  });

  export default Logo