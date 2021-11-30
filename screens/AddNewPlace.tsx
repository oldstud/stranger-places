import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { instanceDB } from '../sglib.config';
import { IScreenProps } from './interfaces';

export const AddNewPlace:React.FC<IScreenProps> = () => {
    
    

const handlePress = async():Promise<any> =>{
    const allUsers =  await instanceDB.users.getAllUsers();
    console.log(allUsers)
}
    return(<View>
        <Text>Welcome to Hell</Text>
        <Button
         title="All"
         onPress={handlePress}
         color='green'
        />
  
          
        </View>
    )
}