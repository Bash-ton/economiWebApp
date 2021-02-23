import React, {useEffect, useState} from "react";
import './GroupList.css'
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentGroup} from "../Actions/myGroupsActions";

const GroupList = ({group}) => {

    const currentGroupName = useSelector(state => state.currentGroup.currentGroupName)
    console.log(currentGroupName)
    //dispatch
    const dispatch = useDispatch();


    const changeCurrentGroupHandler = (event) => {
        let oldActive = document.querySelector(".active");
        if (oldActive !== null) {
            document.querySelector(".active").className = "not-active";
            setInitiallyMarked("not-active")
        }
        document.getElementById(event.target.parentNode.id).className = "active"
        setInitiallyMarked("active")


        dispatch(changeCurrentGroup(group[0].groupName));
    }
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
                <th className="list-header">Group Name: "{group[0].groupName}"
                    <div className="totalMembers">Members: {group.length - 1}/4</div>
                </th>

                <button onClick={(event) => {
                    changeCurrentGroupHandler(event)
                }} className="activeGroup-btn">set active
                </button>

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