//TODO remove reduntant code, move to one function
import React, {useEffect} from "react";
//import css here
//redux import reducer
import {useDispatch, useSelector} from "react-redux";
import { PieChart } from 'react-minimal-pie-chart';
import './ChartsPage.css';
import { changeCurrentGroup } from "../Actions/myGroupsActions";
import {readItems} from "../Actions/getItemsActions";
import { getMoneyInfo } from "../Actions/getMoneyInfoActions";

//function instead of class to use hooks
const ChartsPage = () => {
    const dispatch = useDispatch();

    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;

    const currentGroupID = useSelector(state => state.currentGroup.currentGroupPassword)
    const currentGroupName = useSelector(state => state.currentGroup.currentGroupName)
    const user = useSelector(state => state.firebase.auth.email);
    const group1 =  useSelector(state => state.currentGroup.myGroups1[0].groupName)
    const group2 =  useSelector(state => state.currentGroup.myGroups2[0].groupName)
    const group3 =  useSelector(state => state.currentGroup.myGroups3[0].groupName)
    const group4 =  useSelector(state => state.currentGroup.myGroups4[0].groupName)

    const groupMembers1 = useSelector(state => state.currentGroup.myGroups1);
    const groupMembers2 = useSelector(state => state.currentGroup.myGroups2);
    const groupMembers3 = useSelector(state => state.currentGroup.myGroups3);
    const groupMembers4 = useSelector(state => state.currentGroup.myGroups4);

    //event handlers
    const changeMonth = (event) => {

        year = document.querySelector("#year").value;
        month = event.target.value

        let date = (year + "-" + month);

        if(currentGroupName === groupMembers1[0].groupName){
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers1));
        }else if(currentGroupName === groupMembers2[0].groupName){
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers2));
        }else if(currentGroupName === groupMembers3[0].groupName){
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers3));
        }else{
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers4));
        }
    }

    const changeYear = (event) => {
        month = document.querySelector("#month").value;
        year = event.target.value

        let date = (year + "-" + month);
        if(currentGroupName === groupMembers1[0].groupName){
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers1));
        }else if(currentGroupName === groupMembers2[0].groupName){
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers2));
        }else if(currentGroupName === groupMembers3[0].groupName){
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers3));
        }else{
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers4));
        }
    }


    const changeCurrentGroupHandler = (event) => {
        dispatch(changeCurrentGroup(event.target.value));
    }

    const setOptionsUpToDateGroup = () => {
        let option = document.querySelector("#groups").options;
        let i = 0;
        while(i<4){
            if(option[i].value === currentGroupName){
                option.selectedIndex = i;
                break;
            }
            i++;
        }
    }

    const setOptionsUpToDate = () => {
        let option = document.querySelector("#month").options;
        option.selectedIndex = month - 1;
        option = document.querySelector("#year").options;
        option.selectedIndex = year - 2020;

    }

    useEffect(() => {
        setOptionsUpToDate();
        setOptionsUpToDateGroup();
        let date = (year + "-" + month);

        if(currentGroupName === groupMembers1[0].groupName){
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers1));
        }else if(currentGroupName === groupMembers2[0].groupName){
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers2));
        }else if(currentGroupName === groupMembers3[0].groupName){
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers3));
        }else{
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers4));
        }

    }, [])

    useEffect(()=>{
        let date = (year + "-" + month);

        if(currentGroupName === groupMembers1[0].groupName){
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers1));
        }else if(currentGroupName === groupMembers2[0].groupName){
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers2));
        }else if(currentGroupName === groupMembers3[0].groupName){
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers3));
        }else{
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers4));
        }
    }, [currentGroupName])



    return(
        <div className="HomePage">
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
            <div>My Group:</div>
            <select onChange={(event) => {changeCurrentGroupHandler(event)}} autoComplete="off" id="groups" >
                {group1 ? <option value={group1}>{group1}</option>: ""}
                {group2 ? <option value={group2}>{group2}</option>: ""}
                {group3 ? <option value={group3}>{group3}</option>: ""}
                {group4 ? <option value={group4}>{group4}</option>: ""}
            </select>
                <div className="chart-container">
                    <div className="Money-container">Total value</div>
                    <div className="pieChart-container">
                        <PieChart animate="true" style={{height: "400px"}} onMouseOver={(e, value) => {}}
                            data={ [
                                { title: 'Food', value: 10, color: '#F8B108' },
                                { title: 'Rarely bought items', value: 15, color: '#79091A' },
                                { title: 'Detergent', value: 20, color: '#cb6363' },
                                { title: 'Hygiene', value: 21, color: '#21316a' },
                                { title: 'Storage', value: 123, color: '#4a862d' },
                                { title: 'Entertainment', value: 100, color: '#ff4500' },
                            ]}
                        />
                        <div className="labels">
                            <div className="labels-wrapper">
                                <div className="boxShape"  ></div><br/>
                                <div className="chartLable"  id="Food">Food</div><br/>
                            </div>
                            <div className="labels-wrapper">
                                <div className="boxShape"  ></div><br/>
                                <div className="chartLable" id="RarelyBoughtItems">RarelyBoughtItems</div><br/>
                            </div>
                            <div className="labels-wrapper">
                                <div className="boxShape"  ></div><br/>
                                <div className="chartLable"  id="Detergent">Detergent</div><br/>
                            </div>
                            <div className="labels-wrapper">
                                <div className="boxShape"  ></div><br/>
                                <div className="chartLable"  id="Hygiene">Hygiene</div><br/>
                            </div>
                            <div className="labels-wrapper">
                                <div className="boxShape"  ></div><br/>
                                <div className="chartLable" id="Storage">Storage</div><br/>
                            </div>
                            <div className="labels-wrapper">
                                <div className="boxShape"  ></div><br/>
                                <div className="chartLable"  id="Entertainment">Entertainment</div><br/>
                            </div>
                        </div>
                    </div>

                </div>

        </div>
    )
}

export default ChartsPage;