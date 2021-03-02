import React from "react";
import ItemElement from './ItemElement.js'
import './ItemList.css'

const ItemList = ({items, thisDate}) => {
    //items && items.map means only do if has items


    return(
        <table className="content-table">
            <thead>
                <tr>
                    <th>Store</th>
                    <th>Price</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>User</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.items && items.items.map(item =>{
                    return(
                        <ItemElement item={item} thisDate={thisDate} />
                    )
                })}
            </tbody>
        </table>
    )
}

export default ItemList;