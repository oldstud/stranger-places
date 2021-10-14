
import React from 'react';

import {
  Button,
  SafeAreaView,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux'


const App = () => {
  const counter = useSelector((state) => state)
    const handleClick = () => {
      console.log(counter);

    }
  return (
    <SafeAreaView>
     <Text>Welcome</Text>
     <Button title='aaaa' onPress={handleClick}></Button>
    </SafeAreaView>
  );
};


export default App;
