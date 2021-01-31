export const createItem = (item) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log("action start");
        console.log(item);
        //make async call to db
        const firestore = getFirestore();
        const firebase = getFirebase();

        //get user current group from DB

        let user = firebase.auth().currentUser.email;
        let date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
        console.log(firebase.auth().currentUser);
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