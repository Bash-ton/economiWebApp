import React from "react";
import ItemElement from './ItemElement.js'

const ItemList = ({items}) => {
    //items && items.map means only do if has items

    return(
        <div className="project-list section">
            { items && items.map(item => {
                return(
                    <ItemElement item={item} key={item.id}/>
                )
            })}
        </div>
    )
}

export default ItemList;