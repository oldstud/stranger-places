import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreenNavigationProp, RootStackParamList, SettingsStackParamList } from './interfaces';
import { useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';
import { Home } from './screens/Home';
import { Login } from './screens/Login';
import { Registration } from './screens/Registration';
import { ProfileUserData } from './screens/ProfileUserData';
import ChangePhoto from './screens/ChangePhoto';
import { ProfileUserTab } from './screens/ProfileUserTab';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconAD from 'react-native-vector-icons/Entypo';
import { AddNewPlace } from './screens/AddNewPlace';
import { Button } from 'react-native';
import { Settings } from './screens/Settings';
import { useNavigation } from '@react-navigation/native';
import { ChangePassword } from './screens/ChangePassword';



const App = () => {

  const authStatus = useSelector((state:RootState) => state.auth.isLoggin);
  const Stack = createStackNavigator<RootStackParamList>(); 
  const Tab = createBottomTabNavigator();
  const SettingsStack = createStackNavigator<SettingsStackParamList>();
  


const SettingsStackScreen=()=> {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const Stack = createStackNavigator();

  return (

    <SettingsStack.Navigator initialRouteName='ProfileUserTab'>
       <SettingsStack.Screen name="ProfileUserTab" component={ProfileUserTab} 
        initialParams={{ public: "false" }}
        options={{
          title:'Profile',
          headerRight: () => (
          <IconFA.Button
            onPress={() => navigation.navigate('Settings')}
            name="gear" 
            size={50}
            color="grey"
            style={{ backgroundColor: 'white',height:50,padding:0,width:100,justifyContent:"center"}}
          />
        ),}}
        />
      <SettingsStack.Screen name="Settings" component={Settings}/>
      <SettingsStack.Screen name="ChangePassword" component={ChangePassword}/>
      <SettingsStack.Screen name="ChangePhoto" component={ChangePhoto}/>
      <SettingsStack.Screen name="ProfileUserData" component={ProfileUserData}
        options={{ title:'Your Profile'}} 
        initialParams={{ firstPushingData: "false" }}/>
     
      {/* other screens */}
    </SettingsStack.Navigator>
  );
}
 
  return (
    <NavigationContainer>
      { authStatus ?
      <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign:'center',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'tomato',
      })}
      >
      <Tab.Screen name="Home" 
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarItemStyle:{flex:4},
        tabBarIcon: ({ focused }) => (
          <IconFA name="home" size={30} color={focused?"orange":"gray"} />
        ),
      }}
       />
      <Tab.Screen name="AddNewPlace" 
      component={AddNewPlace}
      options={{
        tabBarLabelStyle:{display:'none'},
        tabBarItemStyle:{flex:1},
        tabBarIcon: ({ focused }) => (
          <IconFA name="plus-circle" size={50} color={focused?"orange":"gray"} />
        ),
      }}
       />
      <Tab.Screen name="Profile"
       component={SettingsStackScreen} 
       options={{
         headerShown:false,
        tabBarLabel: 'Profile',
        tabBarItemStyle:{flex:4},
        tabBarIcon: ({ focused }) => (
          <IconFA name="user" size={30} color={focused?"orange":"gray"} />
        ),
        
      }}
       />
    </Tab.Navigator>
        :
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="ProfileUserData" component={ProfileUserData} 
           initialParams={{ firstPushingData: "true" }}/>
        <Stack.Screen name="ChangePhoto" component={ChangePhoto} />
        
      </Stack.Navigator>
      }
    </NavigationContainer>

  );
};


export default App;
