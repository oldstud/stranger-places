import { StackNavigationProp } from '@react-navigation/stack';

export type ProfileScreenNavigationProp = StackNavigationProp<SettingsStackParamList>;

export type RootStackParamList = {
    Registration: undefined;
    Login: undefined;
    ProfileUserData: {firstPushingData:'true'} | undefined;
    ChangePhoto:undefined;
    
  };
export type SettingsStackParamList = {
    Settings: undefined;
    ProfileUserTab:{public:'false'} | undefined;
    ChangePassword:undefined;
    ProfileUserData:{firstPushingData:'false'} | undefined;
    ChangePhoto:undefined;
  };