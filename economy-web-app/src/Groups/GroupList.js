import React, {useEffect, useState} from "react";
import './GroupList.css'
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentGroup, getPassword} from "../Actions/myGroupsActions";

//TODO change alert to info box so that password can be copied
const GroupList = ({group}) => {

    const currentGroupPassword = useSelector(state => state.currentGroup.currentGroupPassword)
    const currentGroupName = useSelector(state => state.currentGroup.currentGroupName)
    const inviteGroupName = useSelector(state => state.currentGroup.inviteGroupName)
    const invitePassword = useSelector(state => state.currentGroup.invitePassword)

    //dispatch
    const dispatch = useDispatch();


    const changeCurrentGroupHandler = (event) => {
        let oldActive = document.querySelector(".active");
        if (oldActive !== null) {
            document.querySelector(".active").className = "not-active";
            setInitiallyMarked("not-active")
        }
        document.getElementById(event.target.parentNode.parentNode.id).className = "active"
        setInitiallyMarked("active")


        dispatch(changeCurrentGroup(group[0].groupName));
    }

    const inviteHandler = () => {
        if ((currentGroupName === group[0].groupName)){
            alert("Group name: " + currentGroupName + "\n" + "Password:" + currentGroupPassword)
        } else if((inviteGroupName === group[0].groupName)){
            alert("Group name: " + inviteGroupName + "\n" + "Password:" + invitePassword)
        }else {
            dispatch(getPassword(group[0].groupName))
            setInvite(true);
        }
    }
    const [invite, setInvite] = useState(false);
    useEffect(() => {
        if (invite) {
            setInvite(false);
            alert("Group name: " + inviteGroupName + "\n" + "Password:" + invitePassword)


        }
    }, [invitePassword])

    const [initiallyMarked, setInitiallyMarked] = useState("not-active");
    useEffect(() => {

        if (currentGroupName === group[0].groupName) {
            setInitiallyMarked("active")
        }
    }, [initiallyMarked])

    return (

        <table className="content-table">
            <thead>
            <tr className={initiallyMarked} id={group[0].groupName}>

                <div className="groupButton-wrapper">
                    {(currentGroupName !== group[0].groupName) ? <button onClick={(event) => {
                        changeCurrentGroupHandler(event)
                    }} className="activeGroup-btn">set active
                    </button> : ""}
                    {((group.length - 1) !== 4) ? <button onClick={(event) => {
                        inviteHandler()
                    }} className="invite-btn">Invite member
                    </button> : ""}
                </div>

                <br/>

                <th className="list-header" id="groupTableHeader">Group Name: "{group[0].groupName}"

                    <div className="totalMembers">Members: {group.length - 1}/4</div>
                </th>




            </tr>
            </thead>

            <tbody>
            <tr className="card z-depth-0 item-summery" key={group.id}>
                {group[1] ? <td className="card-title">{group[1].member}</td> : ""}

            </tr>
            <tr className="card z-depth-0 item-summery" key={group.id}>

                {group[2] ? <td className="card-title">{group[2].member}</td> : ""}

            </tr>
            <tr className="card z-depth-0 item-summery" key={group.id}>

                {group[3] ? <td className="card-title">{group[3].member}</td> : ""}

            </tr>
            <tr className="card z-depth-0 item-summery" key={group.id}>

                {group[4] ? <td className="card-title">{group[4].member}</td> : ""}
            </tr>
            </tbody>


        </table>


    )


}


export default GroupList;