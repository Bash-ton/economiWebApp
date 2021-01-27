import React from "react";
import ItemList from "./ItemList";
import {useDispatch, useSelector} from 'react-redux';

const TablePage = () => {
    //hook on logged in or not
    const items = useSelector(state => state.items.items);
    const testItems = () => {
        console.log(items);
    }

    return(
        <div className="dashboard container">
            <div className="row">
                <div className="col s12 m6">
                    <ItemList items={items}/>
                    <button onClick={() => {testItems()}}>Test</button>
                </div>
                <div className="col s12 m5 offset-m1">

                </div>
            </div>
        </div>
    )
}

export default TablePage;