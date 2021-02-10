import React, {useEffect} from "react";
import './GroupList.css'
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentGroup} from "../Actions/myGroupsActions";

const GroupList = ({group}) => {

    //dispatch
    const dispatch = useDispatch();


    const changeCurrentGroupHandler = () => {
        dispatch(changeCurrentGroup(group[0].groupName));
    }

   // items.items && items.items.map(item =>{
    useEffect(()=>{
        console.log("change!")
    }, [])

console.log(group[0])
            return (

                <table className="content-table">
                    <thead>
                    <tr>
                        <th className="list-header">Group Name: "{group[0].groupName}"<div className="totalMembers">Members: {group.length - 1}/4</div></th>
                        <button onClick={() => {changeCurrentGroupHandler()}} className="activeGroup-btn">set active</button>
                    </tr>
                    </thead>

                    <tbody>
                    <tr className="card z-depth-0 item-summery" key={group.id}>
                        {group[1] ? <td className="card-title">{group[1].member}</td>:""}

                    </tr>
                    <tr className="card z-depth-0 item-summery" key={group.id}>

                        {group[2] ? <td className="card-title">{group[2].member}</td>:""}

                    </tr>
                    <tr className="card z-depth-0 item-summery" key={group.id}>

                        {group[3] ? <td className="card-title">{group[3].member}</td>:""}

                    </tr>
                    <tr className="card z-depth-0 item-summery" key={group.id}>

                        {group[4] ? <td className="card-title">{group[4].member}</td>:""}
                    </tr>
                    </tbody>


                </table>


            )


}



export default GroupList;