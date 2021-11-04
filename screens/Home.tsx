import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { IScreenProps } from './interfaces';

export const Login:React.FC<IScreenProps> = () => {
const handlePress:any = ():void =>{
    console.log(11111)
}
    return(<View>
        <Text>Welcome to HOME</Text>
        <Button
        title="test"
        onPress={handlePress()}
        />
        </View>
    )
}