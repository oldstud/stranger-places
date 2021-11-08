import firestore from '@react-native-firebase/firestore';
import StuffyGrannyLib from 'stuffy-granny-lib';

//have any

 function updatedDB () {
    const uDB:any = new StuffyGrannyLib(firestore);
    uDB.users.setNewUser = (id:string,dataObj:object) => {
        return new Promise(() => {
            firestore().collection('users')
            .doc(id)
            .set(dataObj)
        })
    }
    return uDB
}

export const instanceDB = updatedDB();

