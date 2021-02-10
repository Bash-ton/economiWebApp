import React from "react";

const GroupElement = ({item}) => {
    return(
        <tr className="card z-depth-0 item-summery" key={item.id}>
            <td className="card-title">{item.store}</td>
            <td className="card-title">{item.price}</td>
            <td className="card-title">{item.name}</td>
            <td className="card-title">{item.category}</td>
            <td className="card-title">{item.user}</td>
        </tr>

    )
}

export default GroupElement;