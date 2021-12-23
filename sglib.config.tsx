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
    }
    uDB.users.getDocId = (user_id:string) => {
        return new Promise((resolve, reject) => {
            let docId:any = null;
            firestore().collection('users')
            .where("user_id", "==", user_id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc)=> {
                docId = doc.id;
            })
            return resolve(docId)
        })
            .catch(() => {
            reject("Error getting document id")
        });
        })
    }
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

    uDB.subscriptions.updateGetMySubcriptions = (my_doc_id: string) => {
        return new Promise((resolve, reject) => {
            firestore().collection('users')
            .doc(my_doc_id)
            .collection('subscriptions')
            .onSnapshot((snapshot => {
                const changes = snapshot.docChanges()
                let data: any = [];
                changes.forEach(change => {
                    if (change.type === 'removed') {
                    // const idToRemove = change.doc.data().user_id
                    // data = change.doc.data().filter(item => item.id !== idToRemove);
                    return
                    } else if (change.type === 'added') {
                    data.push({...change.doc.data(), doc_id: change.doc.id});
                    }
                });
                return resolve({ok: true, status: 200, data: data});
            }))
        })
    }

    uDB.subscriptions.getFollowers = (doc_id: string) => {
        return new Promise((resolve, reject) => {
            firestore().collection('users')
            .doc(doc_id)
            .collection('followers')
            .onSnapshot(documentSnapshot => {
                const followers:any = [];
               documentSnapshot.docs.forEach((data)=>{
                [...followers,data.data()]
               })
               return resolve(followers)    
              });
             
          
        })
    }

    
    return uDB
}

export const instanceDB = updatedDB();

