import * as React from 'react';
import { Text, View ,TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { IScreenProps } from './interfaces';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/Auth/actions';
import { useNavigation } from '@react-navigation/core';
import { ProfileScreenNavigationProp } from '../interfaces';

//TS switcher +usestate

export const Settings:React.FC<IScreenProps> = () => {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const dispatch = useDispatch();
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const handlePressChangePassword= async() => {
       navigation.navigate('ChangePassword')
    }
    const handlePressChangeProfileData = async() => {
       navigation.navigate('ProfileUserData')
    }
    const handlePressLogOut= async() => {
        await auth().signOut().then(() => console.log('User signed out!'));
        dispatch(loginSuccess(false));

    }
    return(<View style={styles.wrapper}>
        <TouchableOpacity
        style={styles.changeButton}
        onPress={handlePressChangePassword}>
            <Text style={styles.text}>Change password</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.changeButton}
        onPress={handlePressChangeProfileData}>
            <Text style={styles.text}>Change profile</Text>
        </TouchableOpacity>
        <View style={styles.switcher}>
            <Text style={[isEnabled?{color:'green'}:{color:'red'},styles.text]}>Notifications:{isEnabled?'ON':'OFF'}</Text>
        <Switch
        trackColor={{ false: "#767577", true: "#90ee90" }}
        thumbColor={isEnabled ? "#90ee90" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        style={{ transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }],height:70 }}
        onValueChange={toggleSwitch}
        value={isEnabled}/>
        </View>
        <TouchableOpacity
        style={styles.changeButton}
        onPress={handlePressLogOut}>
            <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        height:"100%",
        justifyContent:'center',
    },
    changeButton: {
        alignItems: "center",
        alignSelf:"center",
        backgroundColor: "#fff",
        padding: 10,
        margin:10,
        width:"75%",
        borderWidth:2 ,
        borderColor:"black"
    },
    text: {
        fontSize:18
    },
    switcher:{
        alignItems: "center",
        justifyContent: "center"
    }
})