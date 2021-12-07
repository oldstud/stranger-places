export interface IScreenProps {
    [key: string]: string,
  }
export interface IProfileRoutes {
 route:{ key: string
  name: string
  params: {public: string}
  path: undefined
  "Symbol(CHILD_STATE)": any
  }}
export interface IUserData {
  about_user: string,
  avatar_url: string,
  first_name: string,
  last_name: string,
  location: {city: string, country: string},
  user_id: string | null | undefined,
  user_name: string | null | undefined,
  }

//Home 
  export interface IRegionOnMap {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
  }

//addNewPlace
export interface IAddNewPlacePlaceData {
   img:string,
   description:string,
   location:
   {_lat:number|any,
    _long:number|any},
    user_doc_id:string | undefined,
    user_id:string | undefined
}

// camera screeen:ChangePhoto.tsx 

export type Callback = (response: ImagePickerResponse) => any;

export interface ImageLibraryOptions {
  mediaType: MediaType;
  maxWidth?: number;
  maxHeight?: number;
  quality?: PhotoQuality;
  videoQuality?: AndroidVideoOptions | iOSVideoOptions;
  includeBase64?: boolean;
}

export interface CameraOptions extends ImageLibraryOptions {
  durationLimit?: number;
  saveToPhotos?: boolean;
  cameraType?: CameraType;
}

export interface ImagePickerResponse {
  didCancel?: boolean;
  errorCode?: ErrorCode;
  errorMessage?: string;
  base64?: string;
  uri?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  type?: string; 
  fileName?: string;
}

export interface IFilePath {
    uri:string,
    base64:string
}

export type PhotoQuality =
  | 0
  | 0.1
  | 0.2
  | 0.3
  | 0.4
  | 0.5
  | 0.6
  | 0.7
  | 0.8
  | 0.9
  | 1;
export type CameraType = 'back' | 'front';
export type MediaType = 'photo' | 'video';
export type AndroidVideoOptions = 'low' | 'high';
export type iOSVideoOptions = 'low' | 'medium' | 'high';
export type ErrorCode = 'camera_unavailable' | 'permission' | 'others';