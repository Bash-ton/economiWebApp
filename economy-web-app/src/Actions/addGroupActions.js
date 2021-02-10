
//TODO clean function redundant code
//TODO alert or somehow show user feedback
//TODO call reducers?
export const createGroup = (groupInfo) => {
    //takes groupInfo(name, password)
    return (dispatch, getState, { getFirebase, getFirestore }) => {


        //make async call to db
        const firestore = getFirestore();
        const firebase = getFirebase();

        //get user current group from DB

        let user = firebase.auth().currentUser.email;
        let groupName = groupInfo.name;


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
                            if (doc.data()[spot].length > 0) {
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


//TODO redundant code
//TODO alert or somehow show user feedback
//TODO call reducers
export const joinGroup = (groupInfo) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        let user = firebase.auth().currentUser.email;
        let password = groupInfo.password;
        let groupName = groupInfo.name;

        let fullMyGroup = true;
        let fullGroup = true;
        let emptyGroupPosition = 1;
        let noPreviousGroups = false;
        let freeGroupSpot = 0;
        let validPass = false;
        let alreadyExistAsUser = false;


        //check if user has space left for groups 1
        firestore.collection("MyGroups").where("user", "==", user).get().then(
            snapshot => {
                if (snapshot.empty) {
                    fullMyGroup = false;
                    noPreviousGroups = true;
                    console.log("group list is empty")
                } else {
                    snapshot.forEach(doc => {
                        console.log(doc.data());
                        let i;
                        for (i = 1; i < 5; i++) { //find space for new group
                            let spot = "group" + i;
                            if (doc.data()[spot].length > 0) {
                                emptyGroupPosition++;
                            } else { //found spot then break
                                fullMyGroup = false;
                                break;
                            }

                        }
                        console.log(doc.data())
                    });

                }

                //check if group has space 2
                if(fullMyGroup === false){
                    console.log("I have space")
                    firestore.collection("Groups").where("name", "==", groupName).get().then(
                        snap => {
                            if(snap.empty){
                                console.log("group does not exist!");
                            }else{
                                snap.forEach(doc => {
                                    let i;
                                    for(i = 1; i<5; i++){
                                        let spot = "user" + i;
                                        console.log(spot)
                                        if(doc.data()[spot].length === 0){
                                            console.log("group has space!")
                                            fullGroup = false
                                            freeGroupSpot = i;
                                            console.log(freeGroupSpot)

                                            break
                                        }
                                    }

                                })
                            }
                            console.log(freeGroupSpot)

                            //check valid pass 3
                            //already exist here 4
                            if(fullGroup === false){
                                snap.forEach(doc => {
                                    if(password === doc.id){
                                        let i;
                                        let spot;
                                        for(i=1; i<5; i++){
                                            spot = "user" + i;
                                            if(doc.data()[spot] === user){
                                                alreadyExistAsUser = true;
                                                console.log("already here")
                                            }
                                        }
                                        validPass = true;
                                        console.log("correct password")

                                        if(alreadyExistAsUser === false){
                                            //update/join groups 5
                                            snap.forEach(doc=>{
                                                console.log(doc.id)
                                                let spot = "user" + freeGroupSpot;
                                                console.log(spot)
                                                console.log(freeGroupSpot);

                                                firestore.collection("Groups").doc(doc.id).update({
                                                    [spot]: user
                                                }).then(//call reducers
                                                    dispatch({type: 'JOINED_GROUP', item: groupName, password: doc.id})
                                                );
                                            })

                                            //6
                                            //update my groups or create
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


                                    }else{
                                        console.log("wrong password")
                                    }

                                })
                            }
                        }
                    )
                }
            })

    }

}