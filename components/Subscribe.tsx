import * as React from 'react';
import { Text,StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IScreenProps } from '../screens/interfaces';
import { instanceDB } from '../sglib.config';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ISubscribeProps } from './interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';

export const Subscribe:React.FC<ISubscribeProps> = (props) => {
    const {userId} = props;
    const personalDataFromStore = useSelector((state:RootState) => state.auth.personalData);
    const [mySubscriptionsState,setMysubcriptionsState] = React.useState<string>('Subscribe');
    const [stateUserId, setStateUserId] = React.useState('userId');

    React.useEffect(()=>{
        getStatusOfSubscript();

    
        // status?setMysubcriptionsState('Subscribe'):setMysubcriptionsState('Unsubscribe')
        // console.log('subScribe props:',props);
    },[])       

    const getStatusOfSubscript = async() => {
        let myDocId =  await instanceDB.users.getDocId(personalDataFromStore.user_id);
        let mySubscribs =  await instanceDB.subscriptions.updateGetMySubcriptions(myDocId);
        let mySubscribsData = mySubscribs.data;
        const uid = userId;
        let idInMysubscrib = mySubscribsData.find((item:any) => item.user_id == uid);   
        if(idInMysubscrib){
            setMysubcriptionsState('Unsubscribe')
        }else{
            setMysubcriptionsState('Subscribe')
        }
    }

    let followerDocIdReqest = async (userDocId:string) => {
        let documentId:string = '';
        await firestore().collection('users')
        .doc(userDocId)
        .collection('followers')
        .where("user_id", "==", personalDataFromStore.user_id).get().then((querySnapshot) => { 
            querySnapshot.forEach((doc)=> {
                documentId = doc.id
        })})
        return documentId  
    }

    const handlePress = async() => {
        const uid = userId;
        console.log(uid)
        let userDocId:any =  await instanceDB.users.getDocId(uid);
        let myDocId =  await instanceDB.users.getDocId(personalDataFromStore.user_id);
        const dataWithId = {...personalDataFromStore,_id:myDocId}
        const mySubscriptionsArray = await instanceDB.subscriptions.updateGetMySubcriptions(myDocId);
        const followerDocId:any = await followerDocIdReqest(userDocId)
        if(!followerDocId) {
         await instanceDB.subscriptions.subscribe(userDocId,dataWithId);
         setMysubcriptionsState('Unsubscribe')
                }else{
            await instanceDB.subscriptions.unsubscribe(userDocId, dataWithId ,followerDocId, mySubscriptionsArray.data)
        setMysubcriptionsState('Subscribe')
        }

    }


    return (

        <TouchableOpacity
            onPress={handlePress}
            style={[styles.container,mySubscriptionsState == 'Subscribe'? {backgroundColor:"green"}:{backgroundColor:"red"}]}
        >
        <Text style={styles.count}>
           {mySubscriptionsState}
        </Text>
        </TouchableOpacity>
    )
  
}
const styles = StyleSheet.create({
    container:{
        borderRadius:5
    },
    count:{
        textAlign: 'center',
        margin: 5,
        fontSize:20,
        color:'#ffffff',
        
    },

  });
