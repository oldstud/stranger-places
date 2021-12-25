import React, {useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Alert
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import PhotoCircle from '../components/PhotoCircle';
import { RootState } from '../store/rootReducer';
import { Callback, CameraOptions, IFilePath, ImageLibraryOptions } from './interfaces';

//have any!!

const ChangePhoto = ({navigation,route}:any) => {
  React.useEffect(()=>{
    console.log(route)
   route.params.photoData && setFilePath({base64:route.params.photoData,uri:''})
  },[])
  const authStatus = useSelector((state:RootState) => state.auth.isLoggin);
  const [filePath, setFilePath] = useState<IFilePath>({uri:'',base64:''});

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
            buttonPositive:'OK'
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
            buttonPositive:'OK'
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err:any) {
        console.warn(err);
        Alert.alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type:any) => {
    let options:CameraOptions = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30,
      saveToPhotos: true,
      includeBase64:true
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response:any) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          Alert.alert(response.errorMessage);
          return;
        }
        setFilePath({...filePath,uri:response.assets[0].uri,base64:response.assets[0].base64});
      });
    }
  };

  const chooseFile = (type:any) => {
    let options:ImageLibraryOptions = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64:true
    };
    launchImageLibrary(options, (response:any) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      }
      setFilePath({...filePath,uri:response.assets[0].uri,base64:response.assets[0].base64});
    });
  };

  const handleCustomBack = () => {
    route.params.circleMode == 'false' ? navigation.navigate('AddNewPlace', { photoData: filePath }):
    navigation.navigate('ProfileUserData', { photoData: filePath })
  }

  return (
    <SafeAreaView style={{flex: 1}}>
    
      <View style={styles.container}>
        {filePath.base64?
         <PhotoCircle  avatar_url={filePath.base64} circleMode={route.params.circleMode}/>
        :
        <View style={[styles.imageStyle, route.params?.circleMode =='false' ? styles.disabledCircleMode:false]}>
        <Text>Place for your photo</Text>
        </View>
        }
         <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => setFilePath({uri:'',base64:''})}>
          <Text style={styles.textStyle}>
            Remove Photo
          </Text>
          </TouchableOpacity>
        <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('photo')}>
          <Text style={styles.textStyle}>
            Make Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Photo</Text>
        </TouchableOpacity>
        </View>

        <TouchableOpacity
        style={styles.nextButton}
        onPress={handleCustomBack}
      >
        <Text style={styles.text}>Confirm</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangePhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center'
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    margin:10,
    width: 150,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 25,
    borderRadius:100,
    borderColor:'grey',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'grey'
  },
  disabledCircleMode : {
    borderRadius:1
  },
  row:{
    flexDirection:'row',
  },
  nextButton:{
    alignItems: "center",
    alignSelf:"center",
    backgroundColor: "#90ee90",
    padding: 10,
    margin:10,
    width:"75%",
    
},
text:{
  fontSize:18
}
});



