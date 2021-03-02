export const readItems = (date, id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log("read data");


        const firestore = getFirestore();
        const firebase = getFirebase();


        firestore.collection("Items/" + date + "/" + id).orderBy("date", "desc").onSnapshot( (queryS) => {
            let items = [];
            queryS.forEach((doc) =>{
                items.push({...doc.data(), id: doc.id});
            });
            let values = {
                items
            }


            dispatch({type: 'READ_ITEMS', item: values});

        });

    }

}