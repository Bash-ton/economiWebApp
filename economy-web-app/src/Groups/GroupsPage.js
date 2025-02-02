import {useDispatch, useSelector} from "react-redux";
import {createGroup, joinGroup} from "../Actions/addGroupActions";
import React, {useState, useEffect} from "react";
import './GroupsPage.css';
import GroupList from "./GroupList";

import {getMyGroupsInfo} from "../Actions/myGroupsActions";

//TODO redundant code
const GroupsPage = () => {

    //getMyGroupNames
    //dispatch
    const dispatch = useDispatch();
    
    //selectors
    const passwordGroup = useSelector(state => state.currentGroup.currentGroupPassword)
    const nameGroup = useSelector(state => state.currentGroup.currentGroupName)
    const user = useSelector(state => state.firebase.auth.email);
    const group1 = useSelector(state => state.currentGroup.myGroups1);
    const group2 = useSelector(state => state.currentGroup.myGroups2);
    const group3 = useSelector(state => state.currentGroup.myGroups3);
    const group4 = useSelector(state => state.currentGroup.myGroups4);


    //lifecycle methods
    const [newGroupName, setNewGroupName] = useState(() => {
        return "";
    });
    const  handleGroupName = (event) => {
        setNewGroupName(event.target.value);
    };

    const [joinGroupName, setJoinGroupName] = useState(() => {
        return "";
    });
    const  joinGroupNameHandler = (event) => {
        setJoinGroupName(event.target.value);
    };

    const [joinGroupPassword, setjoinGroupPassword] = useState(() => {
        return "";
    });
    const  joinGroupPasswordHandler = (event) => {
        setjoinGroupPassword(event.target.value);
    };

    //functions and event listeners
    const createGroupHandler = () => {
        dispatch(createGroup({name: newGroupName}));

        let thisBtn =  document.querySelector(".showGroupName-btn");
        let otherBtn =  document.querySelector(".hideGroupName-btn");
        document.querySelector(".showGroupName").className = "hideGroupName";

        thisBtn.className = "hideGroupName-btn";
        otherBtn.className = "showGroupName-btn";
    }

    const enableGroupHandler = () => {
        let thisBtn =  document.querySelector(".showGroupName-btn");
        let otherBtn =  document.querySelector(".hideGroupName-btn");
        document.querySelector(".hideGroupName").className = "showGroupName";
        thisBtn.className = "hideGroupName-btn";
        otherBtn.className = "showGroupName-btn";
    }

    const showGroupPassword = () => {
        document.querySelector(".hidePassword").className = "showPassword";
        let thisBtn =  document.querySelector(".showPassword-btn");
        let otherBtn =  document.querySelector(".hidePassword-btn");
        thisBtn.className = "hidePassword-btn";
        otherBtn.className = "showPassword-btn";

    }
    const hideGroupPassword = () => {
        document.querySelector(".showPassword").className = "hidePassword";
        let thisBtn =  document.querySelector(".showPassword-btn");
        let otherBtn =  document.querySelector(".hidePassword-btn");
        thisBtn.className = "hidePassword-btn";
        otherBtn.className = "showPassword-btn";
    }

    const enableJoinGroupHandler = () => {
        let thisBtn =  document.querySelector(".showGroupInput-btn");
        let otherBtn =  document.querySelector(".hideConfirmJoinGroup-btn");

        document.querySelector(".hideJoinGroupName").className = "showJoinGroupName";
        document.querySelector(".hideJoinGroupPassword").className = "showJoinGroupPassword";

        thisBtn.className = "hideGroupInput-btn";
        otherBtn.className = "showConfirmJoinGroup-btn";
    }
    const joinGroupHandler = () => {
        let thisBtn =  document.querySelector(".showConfirmJoinGroup-btn");
        let otherBtn =  document.querySelector(".hideGroupInput-btn");

        document.querySelector(".showJoinGroupName").className = "hideJoinGroupName";
        document.querySelector(".showJoinGroupPassword").className = "hideJoinGroupPassword";

        thisBtn.className = "hideConfirmJoinGroup-btn";
        otherBtn.className = "showGroupInput-btn";

        console.log("pass: " + joinGroupPassword)
        console.log("name: " + joinGroupName)

        dispatch(joinGroup({password : joinGroupPassword, name : joinGroupName}));

    }



    useEffect(()=>{
        dispatch(getMyGroupsInfo(user))
    }, [])

    return (
        <div className="groupPage-wrapper">
            <div className="currentGroupName">{nameGroup}</div>
            <button className="showPassword-btn" onClick={() => {showGroupPassword()}}>show group password</button>
            <button className="hidePassword-btn" onClick={() => {hideGroupPassword()}}>hide group password</button>
            <div className="hidePassword" >{passwordGroup}</div>
            <div className="hideGroupName">
                <input type="text" name="loginPassword" id="groupName" onChange={(event) => {handleGroupName(event)}} required  ></input>
                <label htmlFor="loginUser">Group Name</label>
            </div>
            <button className="hideGroupName-btn" onClick={() => {createGroupHandler()}}>Confirm group name</button>
            <button className="showGroupName-btn" onClick={() => {enableGroupHandler()}}>Create new group</button>



            <div className="hideJoinGroupName">
                <input type="text" name="loginPassword" id="joinGroupName" onChange={(event) => {joinGroupNameHandler(event)}} required  ></input>
                <label htmlFor="loginUser">Group Name</label>
            </div>
            <div className="hideJoinGroupPassword">
                <input type="text" name="loginPassword" id="joinGroupPassword" onChange={(event) => {joinGroupPasswordHandler(event)}} required  ></input>
                <label htmlFor="loginUser">Group Password</label>
            </div>
            <button className="showGroupInput-btn" onClick={() => {enableJoinGroupHandler()}}>Join a new group</button>
            <button className="hideConfirmJoinGroup-btn" onClick={() => {joinGroupHandler()}}>Connect to this group</button>
            {group1 ?<GroupList group={group1}/> : ""}<br/>
            {group2 ?<GroupList group={group2}/> : ""}<br/>
            {group3 ?<GroupList group={group3}/> : ""}<br/>
            {group4 ?<GroupList group={group4}/> : ""}<br/>
        </div>
    );
}
export default GroupsPage;