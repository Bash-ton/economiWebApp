export const createItem = (item) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log("action start");
        console.log(item);
        //make async call to db
        const firestore = getFirestore();
        const firebase = getFirebase();


        let user = firebase.auth().currentUser.email;
        let date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);

        firestore.collection(date).add({
            ...item,
            user: user
        }).then(() => {
            dispatch({type: 'ADD_ITEM', item: item});
        }).catch((err)=>{
            dispatch({ type: 'ADD_ITEM_ERROR', err});
        });

    }
};