
import React from 'react';

import {
  Button,
  Text,
  View
} from 'react-native';
import { Login } from './screens/Login';


import { Registration } from './screens/Registration';

const App = () => {

  return (
    <View>
      {/* <Login/> */}
      <Registration/>
    </View>
  );
};


export default App;
