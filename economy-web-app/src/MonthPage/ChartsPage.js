//TODO show money per user. (handle how to check the number of users (maybe length - 7))
//TODO remove const user (not used)
//TODO use groupMembers to get group
import React, {useEffect} from "react";
//import css here
//redux import reducer
import {useDispatch, useSelector} from "react-redux";
import {PieChart} from 'react-minimal-pie-chart';
import './ChartsPage.css';
import {changeCurrentGroup} from "../Actions/myGroupsActions";
import {readItems} from "../Actions/getItemsActions";
import {getMoneyInfo} from "../Actions/getMoneyInfoActions";

//function instead of class to use hooks
const ChartsPage = () => {
    const dispatch = useDispatch();

    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;

    const currentGroupID = useSelector(state => state.currentGroup.currentGroupPassword)
    const currentGroupName = useSelector(state => state.currentGroup.currentGroupName)
    const user = useSelector(state => state.firebase.auth.email);
    const group1 = useSelector(state => state.currentGroup.myGroups1[0].groupName)
    const group2 = useSelector(state => state.currentGroup.myGroups2[0].groupName)
    const group3 = useSelector(state => state.currentGroup.myGroups3[0].groupName)
    const group4 = useSelector(state => state.currentGroup.myGroups4[0].groupName)

    const groupMembers1 = useSelector(state => state.currentGroup.myGroups1);
    const groupMembers2 = useSelector(state => state.currentGroup.myGroups2);
    const groupMembers3 = useSelector(state => state.currentGroup.myGroups3);
    const groupMembers4 = useSelector(state => state.currentGroup.myGroups4);

    const colors = useSelector(state => state.currentColors);
    const moneyInfo = useSelector(state => state.moneyInfo)

    //event handlers
    const changeMonth = (event) => {

        year = document.querySelector("#year").value;
        month = event.target.value

        getMoneyInfoHandler();
    }

    const changeYear = (event) => {
        month = document.querySelector("#month").value;
        year = event.target.value


        getMoneyInfoHandler();
    }


    const changeCurrentGroupHandler = (event) => {
        dispatch(changeCurrentGroup(event.target.value));
    }

    const setOptionsUpToDateGroup = () => {
        let option = document.querySelector("#groups").options;
        let i = 0;
        while (i < 4) {
            if (option[i].value === currentGroupName) {
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

    const getMoneyInfoHandler = () => {

        let date = (year + "-" + month);

        if (currentGroupName === groupMembers1[0].groupName) {
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers1));
        } else if (currentGroupName === groupMembers2[0].groupName) {
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers2));
        } else if (currentGroupName === groupMembers3[0].groupName) {
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers3));
        } else {
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers4));
        }
    }

    const setColorInfo = () => {
        document.querySelector("#Food").style.backgroundColor = colors.colors[0].Food;
        document.querySelector("#Detergent").style.backgroundColor = colors.colors[3].Detergent;
        document.querySelector("#Hygiene").style.backgroundColor = colors.colors[2].Hygiene;
        document.querySelector("#Entertainment").style.backgroundColor = colors.colors[1].Entertainment;
        document.querySelector("#Storage").style.backgroundColor = colors.colors[5].Storage;
        document.querySelector("#RarelyBoughtItems").style.backgroundColor = colors.colors[4].RarelyBoughtItems;
    }

    useEffect(() => {
        setOptionsUpToDate();
        setOptionsUpToDateGroup();

        getMoneyInfoHandler();
        setColorInfo();
        console.log(moneyInfo)
    }, [])

    useEffect(() => {

        getMoneyInfoHandler();
        console.log(moneyInfo)
    }, [currentGroupName])


    //probably remove currently only to check change in moneyInfo
    useEffect(() => {
        if (moneyInfo.money[0]) {
            console.log(moneyInfo.money[0].total)
        } else {
            console.log(moneyInfo)
        }
        console.log(colors.colors[0].Food)

    }, [moneyInfo])

    return (

        <div className="HomePage">
            <select type="text" className="options-categories" autoComplete="off" id="month" onChange={(event) => {
                changeMonth(event)
            }} required>
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
            <select type="text" className="options-categories" autoComplete="off" id="year" onChange={(event) => {
                changeYear(event)
            }} required>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
            </select>
            <div>My Group:</div>
            <select onChange={(event) => {
                changeCurrentGroupHandler(event)
            }} autoComplete="off" id="groups">
                {group1 ? <option value={group1}>{group1}</option> : ""}
                {group2 ? <option value={group2}>{group2}</option> : ""}
                {group3 ? <option value={group3}>{group3}</option> : ""}
                {group4 ? <option value={group4}>{group4}</option> : ""}
            </select>

            <div className="chart-container">
                {moneyInfo.money[0] ? <div className="Money-container">
                    <div className="totalMOney">Total: {moneyInfo.money[0].total}</div>
                    <div className="food">Food: {moneyInfo.money[1].Food}</div>
                    <div className="hygien">Hygien: {moneyInfo.money[3].Hygiene}</div>
                    <div className="detergent">Detergent: {moneyInfo.money[4].Detergent}</div>
                    <div className="RarelyBoughtItems">Rarely Bought Items: {moneyInfo.money[5].RarelyBoughtItems}</div>
                    <div className="storage">Storage: {moneyInfo.money[6].Storage}</div>
                    <div className="entertainment">Entertainment: {moneyInfo.money[2].Entertainment}</div>
                </div> : ""}
                <div className="pieChart-container">
                    {moneyInfo.money[0] ?
                        <PieChart animate="true" style={{height: "400px"}} onMouseOver={(e, value) => {}}
                                  data={[
                                      {title: 'Food', value: moneyInfo.money[1].Food, color: colors.colors[0].Food},
                                      {title: 'Rarely bought items', value: moneyInfo.money[5].RarelyBoughtItems, color: colors.colors[4].RarelyBoughtItems},
                                      {title: 'Detergent', value: moneyInfo.money[4].Detergent, color: colors.colors[3].Detergent},
                                      {title: 'Hygiene', value: moneyInfo.money[3].Hygiene, color: colors.colors[2].Hygiene},
                                      {title: 'Storage', value: moneyInfo.money[6].Storage, color: colors.colors[5].Storage},
                                      {title: 'Entertainment', value: moneyInfo.money[2].Entertainment, color: colors.colors[1].Entertainment},
                                  ]}
                        /> : ""
                    }
                    <div className="labels">
                        <div className="labels-wrapper">
                            <div className="boxShape" id="Food"></div>
                            <br/>
                            <div className="chartLable" >Food</div>
                            <br/>
                        </div>
                        <div className="labels-wrapper">
                            <div className="boxShape" id="RarelyBoughtItems"></div>
                            <br/>
                            <div className="chartLable" >RarelyBoughtItems</div>
                            <br/>
                        </div>
                        <div className="labels-wrapper">
                            <div className="boxShape" id="Detergent"></div>
                            <br/>
                            <div className="chartLable" >Detergent</div>
                            <br/>
                        </div>
                        <div className="labels-wrapper">
                            <div className="boxShape" id="Hygiene"></div>
                            <br/>
                            <div className="chartLable" >Hygiene</div>
                            <br/>
                        </div>
                        <div className="labels-wrapper">
                            <div className="boxShape" id="Storage"></div>
                            <br/>
                            <div className="chartLable" >Storage</div>
                            <br/>
                        </div>
                        <div className="labels-wrapper">
                            <div className="boxShape" id="Entertainment"></div>
                            <br/>
                            <div className="chartLable" >Entertainment</div>
                            <br/>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ChartsPage;