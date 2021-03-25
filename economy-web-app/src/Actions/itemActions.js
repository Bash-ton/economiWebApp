export const createItem = (item, id, numberOfItems, index) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        console.log(item)
        console.log(numberOfItems)
        //make async call to db
        const firestore = getFirestore();
        const firebase = getFirebase();

        //get user current group from DB

        //TODO change these back later to add old data
        let user = firebase.auth().currentUser.email;
        //change Imnotgonnareadanyofthis@gmail.com
        let date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
        //change back date
        //let date = "2021-1"
        //TODO ends here

        console.log(firebase.auth().currentUser);

        firestore.collection("Items/" + date + "/" + id.groupID).add({
            ...item,
            user: user,
            date: new Date(),
        }).then(() => {
            dispatch({type: 'ADD_ITEM', item: item});
        }).catch((err) => {
            dispatch({type: 'ADD_ITEM_ERROR', err});
        });


        //get money path for this group
        firestore.collection("Money/" + date + "/" + id.groupID).get().then(
            snap => {


                if (snap.empty && (index === 0)) {//if money group does not exist yet, create it first
                    firestore.collection("Money/" + date + "/" + id.groupID).add({
                        totalAmount: 0,
                        Food: 0,
                        RarelyBoughtItems: 0,
                        Detergent: 0,
                        Hygiene: 0,
                        Storage: 0,
                        Entertainment: 0,
                    })
                }
                //update the money group
                firestore.collection("Money/" + date + "/" + id.groupID).get().then(
                    snap2 => {
                        console.log(user.split(".").join(""));
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

export const deleteItem = (thisDate, groupPassword, itemId, itemInfo) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        firestore.collection("Items/" + thisDate + "/" + groupPassword).doc(itemId).delete().then(
            console.log(itemInfo.price),
            console.log(itemInfo.category),
            //update the money group
            firestore.collection("Money/" + thisDate + "/" + groupPassword).get().then(
                snap2 => {
                    console.log(itemInfo.user.split(".").join(""));
                    let newID = snap2.docs[0].id
                    firestore.collection("Money/" + thisDate + "/" + groupPassword).doc(newID).update({
                        totalAmount: firebase.firestore.FieldValue.increment(-itemInfo.price),
                        [itemInfo.category]: firebase.firestore.FieldValue.increment(-itemInfo.price),
                        [itemInfo.user.split(".").join("")]: firebase.firestore.FieldValue.increment(-itemInfo.price),
                    })
                }
            )

    )
    }

}