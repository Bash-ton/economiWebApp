export const readItems = (date) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log("read data");


        const firestore = getFirestore();
        const firebase = getFirebase();

        firestore.collection(date).onSnapshot( function(queryS) {
            let items = [];
            queryS.forEach(function(doc){
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