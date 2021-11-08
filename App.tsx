
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './interfaces';
import { useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';
import { Home } from './screens/Home';
import { Login } from './screens/Login';
import { Registration } from './screens/Registration';
import { ProfileUserData } from './screens/ProfileUserData';

const App = () => {

  const authStatus = useSelector((state:RootState) => state.auth.isLoggin);
  const Stack = createStackNavigator<RootStackParamList>(); 
 
  return (
    <NavigationContainer>
      {
      authStatus ? <Home/> :
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="ProfileUserData" component={ProfileUserData} />
        
      </Stack.Navigator>
      }
    </NavigationContainer>
  );
};


export default App;
