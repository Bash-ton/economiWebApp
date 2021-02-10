export const readItems = (date, id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log("read data");


        const firestore = getFirestore();
        const firebase = getFirebase();


        firestore.collection("Items/" + date + "/" + id).onSnapshot( (queryS) => {
            let items = [];
            queryS.forEach((doc) =>{
                items.push(doc.data());
            });
            console.log("Items in action: ", items);
            let values = {
                items
            }


            dispatch({type: 'READ_ITEMS', item: values});

        });

    }

}