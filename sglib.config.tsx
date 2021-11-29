import firestore from '@react-native-firebase/firestore';
import StuffyGrannyLib from 'stuffy-granny-lib';


//have any

 function updatedDB () {
    const uDB:any = new StuffyGrannyLib(firestore);
    
    uDB.users.setNewUser = (id:string,dataObj:object) => {
        return new Promise((resolve) => {
            firestore().collection('users')
            .doc(id)
            .set(dataObj)
            .then((response)=>{
                return resolve(response)
            })
        })
    }
    uDB.users.requestUserData = (uid:string) => {
      return new Promise((resolve, reject) => {
       firestore().collection('users')
        .doc(uid)
        .get()
        .then(response => {
        const data = response.data();
        return resolve(data);
        });
    })
    }
    
    return uDB
}

export const instanceDB = updatedDB();


