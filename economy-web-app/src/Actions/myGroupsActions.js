//learning outcomes:
//need to use onSnapshot to get event listener on my groups in the DB
//since onSnapshot does not return a promise I cannot use .then() to wait for promise
//the problem is that dispatch runs before snapShot is ready and updates the state to early => wrong data/groups info is shown in groups page
//to solve this, call a "send" method from inside the onSnapshot call. The send method calls dispatch with an object ie handles dispatch

//TODO bug in send method
//first time/group works now
//stuck at row 34 (ie find if you should write second group)
export const getMyGroupsInfo = (user) => {

    console.log("test")
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log(getState())
        //TODO
        //fallucka vad händer om man lämnar gruppen i mitten?
        //ex) finns 3 gruper (1-3) 2an lämnas? Borde funka eftersom ritar upp allt på nytt?
        //måste lägga till att ta bort från state om man lämnar gruppen bara
        //
        //gör om dispatch så att den ser bättre ut i String

        //force dispatch to wait for values from groups
        const send = (item, currentGroupName) => {
            console.log(currentGroupName.groupName)
            console.log(getState())



            if(getState().currentGroup.myGroups1){
                if(currentGroupName.groupName === getState().currentGroup.myGroups1[0].groupName){//update?
                    dispatch({type: 'READ_MY_GROUPS_INFO' + '_' + 1, item: item});
                }else if(getState().currentGroup.myGroups2){//om grupp 2 finns
                    if(currentGroupName.groupName === getState().currentGroup.myGroups2[0].groupName){//update?
                        dispatch({type: 'READ_MY_GROUPS_INFO' + '_' + 2, item: item});
                    }else if(getState().currentGroup.myGroups3){//finns grupp 3?
                        if(currentGroupName.groupName === getState().currentGroup.myGroups3[0].groupName){//update?
                            dispatch({type: 'READ_MY_GROUPS_INFO' + '_' + 3, item: item});
                        }else{//update or create grupp4
                            dispatch({type: 'READ_MY_GROUPS_INFO' + '_' + 4, item: item});
                        }
                    }else{//skapa grupp 3
                        dispatch({type: 'READ_MY_GROUPS_INFO' + '_' + 3, item: item});
                    }
                }else{//skapa grupp 2
                    dispatch({type: 'READ_MY_GROUPS_INFO' + '_' + 2, item: item});
                }
            }else{//no group
                dispatch({type: 'READ_MY_GROUPS_INFO' + '_' + 1, item: item});
            }


        }

        //handles foreach
        const forEachHandler = (query, type, array) => {

            query.forEach( doc => {
                if(doc.data()[type + "1"] !== ""){
                    array.push({groupName:doc.data()[type + "1"]});
                }
                if(doc.data()[type + "2"] !== ""){
                    array.push({groupName: doc.data()[type + "2"]});
                }
                if(doc.data()[type + "3"] !== ""){
                    array.push({groupName: doc.data()[type + "3"]});
                }
                if(doc.data()[type + "4"] !== ""){
                    console.log(doc.data().group4)
                    array.push({groupName: doc.data()[type + "4"]});
                }
            })

        }

        const firestore = getFirestore();

       // let user = firebase.auth().currentUser.email;

        //variables

        let names = [];
        //get group name one by one
        firestore.collection("MyGroups").where("user", "==", user).onSnapshot( queryS => {

            forEachHandler(queryS, "group", names);
          /*  queryS.forEach( doc => {
                if(doc.data().group1 !== ""){
                    names.push({groupName:doc.data().group1});
                }
                if(doc.data().group2 !== ""){
                    names.push({groupName: doc.data().group2});
                }
                if(doc.data().group3 !== ""){
                    names.push({groupName: doc.data().group3});
                }
                if(doc.data().group4 !== ""){
                    names.push({groupName: doc.data().group4});
                }


            });*/
            console.log("Names in action: ", names);
            console.log(names.length)
            let i = 0;
            let j = 1;
            let k = 2;
            let l = 3;
            let m = 4;
            while(i < names.length){
                let members = [];
                members.push({groupName:names[i].groupName})
                console.log(names[i].groupName)
                //onsnapshot
                //per group


                firestore.collection("Groups").where("name", "==", names[i].groupName).onSnapshot( query => {

                    while(members.length > 1){
                        members.pop();
                    }

                    query.forEach(doc =>{

                        if(doc.data().user1 !== ""){
                            members.push({member:doc.data().user1});
                        }
                        if(doc.data().user2 !== ""){
                            members.push({member: doc.data().user2});
                        }
                        if(doc.data().user3 !== ""){
                            members.push({member: doc.data().user3});
                        }
                        if(doc.data().user4 !== ""){
                            members.push({member: doc.data().user4});
                        }
                        console.log(members[0])
                        send(members, members[0])
                    })
                    console.log(members)
                    //dispatch when ready
                    console.log("j: " + j)

                    j++;
                })

                i++;
            }

        })

    }

}
//dispatch({type: 'CREATE_GROUP', item: groupName, password: newGroup.id});
export const changeCurrentGroup = ( newGroupName ) => {
    console.log("test")
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        console.log(firestore)
        firestore.collection("Groups").where("name", "==", newGroupName).get().then( snapshot => {

            dispatch({type: 'CREATE_GROUP', item: newGroupName, password: snapshot.docs[0].id});
        })

    }
}