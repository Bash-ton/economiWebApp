import React, {useEffect} from "react";
import ItemList from "./ItemList";
import {useDispatch, useSelector} from 'react-redux';
//listener for DB

import {readItems} from "../Actions/getItemsActions";
import './TablePage.css'

const TablePage = () => {
    //tests
    //check local storage
    //else do this

    //tests

    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1

    //dispatch
    const dispatch = useDispatch();

    //selectors
    const items = useSelector(state => state.items);
    const currentGroupID = useSelector(state => state.currentGroup.currentGroupPassword)
    console.log(currentGroupID)


    //event handlers
    const changeMonth = (event) => {


        year = document.querySelector("#year").value;
        month = event.target.value

        dispatch(readItems((year + "-" + month), currentGroupID))
    }

    const changeYear = (event) => {
        month = document.querySelector("#month").value;
        year = event.target.value

        dispatch(readItems((year + "-" + month), currentGroupID))
    }
    const setOptionsUpToDate = () => {
        let option = document.querySelector("#month").options;
        option.selectedIndex = month - 1;
        option = document.querySelector("#year").options;
        option.selectedIndex = year - 2020;

    }

    //lifecycle methods
    useEffect(() => {
        console.log(currentGroupID);
        setOptionsUpToDate();
        dispatch(readItems((year + "-" + month), currentGroupID))
    }, [])





    //render
    return(
        <div className="TablePage-wrapper">
            <div className="row">
                <select type="text" className="options-categories" autoComplete="off" id="month"  onChange={(event) => {changeMonth(event)}} required >
                    <option value="1">january</option>
                    <option value="2">february</option>
                    <option value="3">mars</option>
                    <option value="4">april</option>
                    <option value="5">may</option>
                    <option value="6">june</option>
                    <option value="7">july</option>
                    <option value="8">august</option>
                    <option value="9">september</option>
                    <option value="10">october</option>
                    <option value="11">november</option>
                    <option value="12">december</option>
                </select>
                <select type="text" className="options-categories" autoComplete="off" id="year"  onChange={(event) => {changeYear(event)}} required >
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                </select>
                <div className="col s12 m6">
                    {items ?
                        <ItemList items={items}/> : ""
                    }

                </div>
                <div className="col s12 m5 offset-m1">

                </div>
            </div>
        </div>
    )
}



export default TablePage;