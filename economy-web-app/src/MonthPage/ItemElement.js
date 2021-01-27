import React from "react";

const ItemElement = ({item}) => {
    return(
        <div className="card z-depth-0 item-summery">
            <div className="card-content grey-text text-darken-3">
                <div className="card-title">{item.store}</div>
                <div className="card-title">{item.price}</div>
                <div className="card-title">{item.name}</div>
                <div className="card-title">{item.category}</div>
                <div className="card-title">******************************</div>
            </div>
        </div>

    )
}

export default ItemElement;