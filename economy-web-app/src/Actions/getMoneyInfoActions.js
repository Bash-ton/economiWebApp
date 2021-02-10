//TODO remove if make while loop insted

export const getMoneyInfo = ( id, date, groupMembers ) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to db
        const firestore = getFirestore();
        const firebase = getFirebase();

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
                   if (groupMembers[1]) {
                       let userMail = groupMembers[1].member;
                       let userName = userMail.split(".")[0]
                       let mistake = groupMembers[1].member.split(".")[1]
                       if (doc.data()[userName]) {
                           let money = doc.data()[userName][mistake];
                           console.log(doc.data()[userName][mistake])//money
                           moneyArray.push({user1: {[userMail]: money}})
                       }
                   }
                   if (groupMembers[2]) {
                       let userMail = groupMembers[2].member;
                       let userName = userMail.split(".")[0]
                       let mistake = groupMembers[2].member.split(".")[1]
                       if (doc.data()[userName]) {
                           let money = doc.data()[userName][mistake];
                           console.log(doc.data()[userName][mistake])//money
                           moneyArray.push({user2: {[userMail]: money}})
                       }

                   }
                   if (groupMembers[3]) {
                       let userMail = groupMembers[3].member;
                       let userName = userMail.split(".")[0]
                       let mistake = groupMembers[3].member.split(".")[1]
                       if (doc.data()[userName]) {
                           let money = doc.data()[userName][mistake];
                           console.log(doc.data()[userName][mistake])//money
                           moneyArray.push({user3: {[userMail]: money}})
                       }
                   }
                   if (groupMembers[4]) {

                       let userMail = groupMembers[4].member;
                       let userName = userMail.split(".")[0]
                       let mistake = groupMembers[4].member.split(".")[1]
                       if (doc.data()[userName]) {
                           let money = doc.data()[userName][mistake];
                           console.log(doc.data()[userName][mistake])//money
                           moneyArray.push({user4: {[userMail]: money}})
                       }
                   }
                   //dispatch this!!
                   console.log(moneyArray)
               })
           }else{
               console.log("no info about money")
               //dispatch empty
           }
        })
    }
}