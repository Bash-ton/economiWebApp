import React from "react";

const GroupElement = ({item}) => {
    return(
        <tr className="card z-depth-0 item-summery" key={item.id}>
            <td id="grEl1" className="card-title">{item.store}</td>
            <td id="grEl2" className="card-title">{item.price}</td>
            <td id="grEl3" className="card-title">{item.name}</td>
            <td id="grEl4" className="card-title">{item.category}</td>
            <td id="grEl5" className="card-title">{item.user}</td>
        </tr>

    )
}

export default GroupElement;