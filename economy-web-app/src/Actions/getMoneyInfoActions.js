export const getMoneyInfo = ( id, date, groupMembers ) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();

        let moneyArray= [];

        console.log(groupMembers)

       firestore.collection("Money/" + date + "/" + id).onSnapshot( (query) => {

           //has money info
            console.log(query.docs[0])
           if(query.docs[0]) {
               query.forEach((doc) => {
                   console.log(doc.data())

                   //get total money and categories
                   moneyArray.push({total: doc.data().totalAmount}, {Food: doc.data().Food}, {Entertainment: doc.data().Entertainment}, {Hygiene: doc.data().Hygiene}, {Detergent: doc.data().Detergent}, {RarelyBoughtItems: doc.data().RarelyBoughtItems}, {Storage: doc.data().Storage});
                   //get the member money
                   console.log(moneyArray)
                   let i = 1;
                   while(i<5){
                       if (groupMembers[i]) {
                           let userHolder = ("user" + i)
                           let userMail = groupMembers[i].member;
                           if (doc.data()[groupMembers[i].member.split(".").join("")]) {
                               let money = doc.data()[groupMembers[i].member.split(".").join("")];
                               console.log(doc.data()[groupMembers[i].member.split(".").join("")])
                               moneyArray.push({[userHolder]: {[userMail]: money}})
                           }
                       }
                       i++;
                   }
                   dispatch({type: "GET_MONEY_INFO", item: moneyArray})


               })
           }else{
               dispatch({type: "EMPTY_MONEY", item: moneyArray})
           }
        })
    }
}