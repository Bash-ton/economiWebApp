import React from "react";
import {MdDeleteForever} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {deleteItem} from "../Actions/itemActions";
const ItemElement = ({item, thisDate}) => {


    const groupPassword = useSelector(state => state.currentGroup.currentGroupPassword)

    const dispatch = useDispatch();

    const deleteItemHandler = () => {

        let ans = window.confirm("Are you sure you want to delete item: " + item.name + "?")
        if(ans){
            dispatch(deleteItem(thisDate, groupPassword, item.id, item));
        }
    }


    return(
        <tr className="card z-depth-0 item-summery" key={item.id}>
            <td className="card-title">{item.store}</td>
            <td className="card-title">{item.price}</td>
            <td className="card-title">{item.name}</td>
            <td className="card-title">{item.category}</td>
            <td className="card-title">{item.user} </td>
            <td className="card-title"><button onClick={() => deleteItemHandler()} id="deleteItem-btn"><MdDeleteForever color={"#ff0000"} size={20}/> </button> </td>

        </tr>

    )
}

export default ItemElement;