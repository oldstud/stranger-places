import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text,StyleSheet,View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { SettingNavigationProp } from '../interfaces';
import { IPlaceListDataProps } from './interfaces';

const PlaceListItem:React.FC<IPlaceListDataProps> = ({data}) => {
    
    const navigation = useNavigation<SettingNavigationProp>();
    const [itemTitle, setItemTitle] = React.useState<string>('');

    const transformTitle = () => {
        const description = data.description;
        if(description.length>6) {  
           setItemTitle(description.slice(0, 6) + " . . .")
        }else{
           setItemTitle(description + " . . .") 
        }

    }
    React.useEffect(()=>{
        transformTitle()
        
    })
    return (
    <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('PlaceDetail', { otherParam : data })}>
        <Text style={styles.title} >{itemTitle}</Text>
        <IconFA
            name="hand-pointer-o" 
            size={40}
            color="black"
            style={{marginTop:10}}
          />
    </TouchableOpacity>
    )
  
}
const styles = StyleSheet.create({

    item: {
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor: '#cecece',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
        fontFamily: 'Monoton-Regular',
      },
  });

  export default PlaceListItem