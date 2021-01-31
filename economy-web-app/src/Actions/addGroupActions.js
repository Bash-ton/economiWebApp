//DONE
//TODO clean function
//TODO alert or somehow show user feedback
export const createGroup = (groupInfo) => {
    //takes groupInfo(name, password)
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        console.log(groupInfo);
        //make async call to db
        const firestore = getFirestore();
        const firebase = getFirebase();

        //get user current group from DB

        let user = firebase.auth().currentUser.email;
        let groupName = groupInfo.name;

        //change to states insted
        let fullGroup = true;
        let emptyGroupPosition = 1;
        let noPreviousGroups = false;
        let nameNotTaken = false;



        //check if user has space left for groups
        //first check if group list is full
        firestore.collection("MyGroups").where("user", "==", user).get().then(
            snapshot => {
                if(snapshot.empty){
                    fullGroup = false;
                    noPreviousGroups = true;
                    console.log("group list is empty")
                }else{
                    snapshot.forEach(doc => {
                        console.log(doc.data());
                        let i;
                        for (i = 1; i < 5; i++) { //find space for new group
                            let spot = "group" + i;
                            if (doc.data().[spot].length > 0) {
                                emptyGroupPosition++;
                            }else{ //found spot then break
                                fullGroup = false;
                                break;
                            }

                        }
                        console.log(doc.data())
                    });

                }

                //check that group name is not taken
                firestore.collection("Groups").where("name", "==", groupName).get().then(
                    snap => {
                        if(snap.empty){
                            nameNotTaken = true;
                        }


                        console.log("fullgroup: " + fullGroup);
                        //create group
                        if(fullGroup === false && nameNotTaken === true) {
                            console.log("japp")
                            firestore.collection("Groups").add({
                                name: groupName,
                                user1: user,
                                user2: "",
                                user3: "",
                                user4: "",
                            }).then((newGroup) => {
                                console.log(newGroup.id);
                                dispatch({type: 'CREATE_GROUP', item: groupName, password: newGroup.id});
                            }).catch((err) => {
                                dispatch({type: 'CREATE_GROUP_ERROR', err});
                            });


                            //update my groups or create
                            console.log("no groups?: " + noPreviousGroups)
                            if(noPreviousGroups === false) {//update
                                console.log("already has group")
                                //join group
                                let spot = "group" + emptyGroupPosition;
                                console.log("spot: " + spot)
                                snapshot.forEach(doc => {
                                    console.log(doc.id)
                                    firestore.collection("MyGroups").doc(doc.id).update({
                                        [spot]: groupName
                                    });
                                });
                            }else{//create
                                console.log("new group creation")
                                firestore.collection("MyGroups").add({
                                    user: user,
                                    group1: groupName,
                                    group2:"",
                                    group3:"",
                                    group4:"",
                                });
                            }
                        }
                    })
            });
    }
};

//TODO NOT WORKING RIGHT NOW
//TODO its now not adding anything
export const joinGroup = (groupInfo) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        let user = firebase.auth().currentUser.email;
        let password = groupInfo.password;
        let groupName = groupInfo.name;

        let fullGroup = true;
        let emptyGroupPosition = 1;
        let noPreviousGroups = false;

        //first check if group list is full
        firestore.collection("MyGroups").where("user", "==", user).get().then(
            snapshot => {
                if(snapshot.empty){
                    fullGroup = false;
                    noPreviousGroups = true;
                }else{
                    snapshot.forEach(doc => {
                        console.log(doc.data());
                        let i;
                        for (i = 1; i < 5; i++) { //find space for new group
                            let spot = "group" + i;
                            if (doc.data().[spot].length > 0) {
                                emptyGroupPosition++;
                            }else{ //found spot then break
                                break;
                            }

                        }
                        console.log(doc.data())
                    });

                }
            }

        );


        if(!fullGroup) {
            firestore.collection("Groups").where("name", "==", groupName).get().then(
                snapshot => {
                    let matchingPassword = false;
                    let alreadyInGroup = false;
                    if (snapshot.empty) {//no group name
                        console.log("not exist");
                    } else {//password?
                        snapshot.forEach(doc => {
                            console.log(doc.id, "=>", doc.data())
                            if (password === doc.id) {//correct password
                                matchingPassword = true;
                                let i;
                                for (i = 1; i < 5; i++) {
                                    let spot = "user" + i;
                                    if (doc.data().[spot].length > 0) {
                                        console.log("no");
                                        if (doc.data().[spot] === user) {
                                            alreadyInGroup = true;
                                            console.log("already in group")
                                            break;
                                        }
                                        console.log(doc.data().[spot]);
                                    } else {//join group unless already in group or already have 4 groups
                                        if (!alreadyInGroup) {

                                            //join group
                                            firestore.collection("Groups").doc(password).update({
                                                [spot]: user
                                            });
                                            console.log("joined group")
                                            //update DB mygroups or create if new
                                            //update my groups or create
                                            if(!noPreviousGroups) {//update
                                                //join group
                                                let spot = "group" + emptyGroupPosition;
                                                firestore.collection("MyGroups").update({
                                                    [spot]: groupName
                                                });
                                            }else{//create
                                                firestore.collection("MyGroups").add({
                                                    user: user,
                                                    group1: groupName,
                                                    group2:"",
                                                    group3:"",
                                                    group4:"",
                                                });
                                            }

                                            //update store
                                            console.log(doc.data().[spot]);
                                            break;
                                        }


                                    }
                                }

                            } else {//wrong password
                                console.log("wrong password")
                            }
                        });

                    }
                }
            );
        }



    }

}