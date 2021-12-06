import { StackNavigationProp } from '@react-navigation/stack';



export type ProfileScreenNavigationProp = StackNavigationProp<SettingsStackParamList>;
export type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList>;
export type AddNewPlaceNavigationProp = StackNavigationProp<AddPlaceStackParamList>;

export type RootStackParamList = {
    Registration: undefined;
    Login: undefined;
    ProfileUserData: {firstPushingData:'true'} | undefined;
    ChangePhoto:undefined;
  };
export type SettingsStackParamList = {
    Settings: undefined;
    ProfileUserTab : { public:'false' } | undefined;
    ChangePassword : undefined;
    ProfileUserData : { firstPushingData:'false' } | undefined;
    ChangePhoto : undefined;
  };
export type HomeStackParamList = {
    Home : undefined;
    ListPlaces : undefined;
 
  };
export type AddPlaceStackParamList = {
    AddNewPlace : {photoData:{base64: string, uri: string}}| undefined;
    ChangePhoto :{circleMode:string ,photoData:string} | undefined;
  };

