export const createItem = (item, id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        //make async call to db
        const firestore = getFirestore();
        const firebase = getFirebase();

        //get user current group from DB

        let user = firebase.auth().currentUser.email;
        let date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
        console.log(firebase.auth().currentUser);

        firestore.collection("Items/" + date + "/" + id.groupID).add({
            ...item,
            user: user
        }).then(() => {
            dispatch({type: 'ADD_ITEM', item: item});
        }).catch((err)=>{
            dispatch({ type: 'ADD_ITEM_ERROR', err});
        });


        //get money path for this group
        firestore.collection("Money/" + date + "/" + id.groupID).get().then(
            snap => {


                if(snap.empty){//if money group does not exist yet, create it first
                   firestore.collection("Money/" + date + "/" + id.groupID).add({
                        totalAmount: 0,
                        Food: 0,
                        RarelyBoughtItems:0,
                        Detergent:0,
                        Hygiene:0,
                        Storage:0,
                        Entertainment:0,
                    })
                }
                //update the money group
                firestore.collection("Money/" + date + "/" + id.groupID).get().then(


                    snap2 => {
                        console.log( user.split(".").join(""));
                        let newID = snap2.docs[0].id
                        firestore.collection("Money/" + date + "/" + id.groupID).doc(newID).update({
                            totalAmount: firebase.firestore.FieldValue.increment(item.price),
                            [item.category]: firebase.firestore.FieldValue.increment(item.price),
                            [user.split(".").join("")]: firebase.firestore.FieldValue.increment(item.price),
                        })
                    }
                )
            }
        )
    }
};