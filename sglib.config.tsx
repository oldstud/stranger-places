import firestore from '@react-native-firebase/firestore';

import StuffyGrannyLib, { IPlace } from 'stuffy-granny-lib';

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
        console.log(response)
        return resolve(data);
        })
        .catch((error)=>{
            console.log('error from UDB:',error)
        })
    })
    },
    uDB.places.updatedGetAllPlaces = () => {
        return new Promise((resolve, reject) => {
            firestore().collectionGroup('places')
            .get()
            .then((response:any) => {
            const data: IPlace[] = [];
            response.forEach((doc: any) => {
                data.push({...doc.data(), _id: doc.id});
            });

            return resolve({ok: true, status: 200, data: data});
            });
        })
    }
    uDB.places.updateMyPlaces = (id:string) => {
        return new Promise((resolve, reject) => {
            firestore().collection("users").doc(id).collection('places')
            .get()
            .then((querySnapshot) => {
                const placesArray:IPlace[] = [];
                querySnapshot.forEach((item)=>{
                    placesArray.push(item.data())
                })
                return resolve(placesArray);
            })
            .catch(() => {
            reject("Error getting documents")
        });
        })
    }
    
    return uDB
}

export const instanceDB = updatedDB();

