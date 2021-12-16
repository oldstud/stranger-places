import { StackNavigationProp } from '@react-navigation/stack';

export type ProfileScreenNavigationProp = StackNavigationProp<SettingsStackParamList>;
export type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList>;

export type SettingNavigationProp = StackNavigationProp<SettingsStackParamList>;
export type AddNewPlaceNavigationProp = StackNavigationProp<AddPlaceStackParamList>;


export type RootStackParamList = {
    Registration: undefined;
    Login: undefined;
    ProfileUserData: {firstPushingData:'true'} | undefined;
    ChangePhoto:undefined;
  };
export type SettingsStackParamList = {
    Settings: undefined;
    PlaceDetail: {otherParam:object}|undefined;
    ProfileUserTab : { public:'false' } | undefined;
    ChangePassword : undefined;
    ProfileUserData : { firstPushingData:'false' } | undefined;
    ChangePhoto : { public:'true' } | undefined;
  };
export type HomeStackParamList = {
    Home : undefined;
    ListPlaces : undefined;
    PlaceDetail: {otherParam:object}|undefined;
    ProfileUserTab:undefined
  };
export type AddPlaceStackParamList = {
    AddNewPlace : {photoData:{base64: string, uri: string}}| undefined;
    ChangePhoto :{circleMode:string ,photoData:string} | undefined;
  };


