import React, {useEffect, useState} from "react";
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
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    useEffect(()=>{
        setYear(new Date().getFullYear())
        setMonth(new Date().getMonth() + 1)
        setOptionsUpToDate();
    }, [])



    //dispatch
    const dispatch = useDispatch();

    //selectors
    const items = useSelector(state => state.items);
    const currentGroupID = useSelector(state => state.currentGroup.currentGroupPassword)
    const isLogged = useSelector(state => state.auth.isLogged);


    const groupCheck = useSelector(state => state.currentGroup)
    if(groupCheck.currentGroupName === undefined && isLogged){
        window.location = '/groups';
        alert("Please create or join a group first")
    }

    //event handlers
    const changeMonth = (event) => {


        setYear(document.querySelector("#year").value);
        setMonth(event.target.value);
        console.log(year, month)
        dispatch(readItems((document.querySelector("#year").value + "-" + event.target.value), currentGroupID))
    }

    const changeYear = (event) => {
        setMonth(document.querySelector("#month").value);
        setYear(event.target.value);
        console.log(year, month)
        dispatch(readItems((event.target.value + "-" + document.querySelector("#month").value), currentGroupID))
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

        dispatch(readItems((year + "-" + month), currentGroupID))
    }, [year, month])





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
                        <ItemList items={items} thisDate={year + "-" + month}/> : ""
                    }

                </div>
                <div className="col s12 m5 offset-m1">

                </div>
            </div>
        </div>
    )
}



export default TablePage;