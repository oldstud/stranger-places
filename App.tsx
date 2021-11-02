
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Button,
  Text,
  View
} from 'react-native';
import { Login } from './screens/Login';


import { Registration } from './screens/Registration';

const App = () => {

  const Stack = createStackNavigator();

  return (
<NavigationContainer>
        <Stack.Navigator
        initialRouteName="Login"
        >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
      </NavigationContainer>
  );
};


export default App;
