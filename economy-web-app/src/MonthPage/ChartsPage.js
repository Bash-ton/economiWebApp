//TODO show money per user. (handle how to check the number of users (maybe length - 7))
//TODO remove const user (not used)
//TODO use groupMembers to get group
import React, {useEffect, useState} from "react";
//import css here
//redux import reducer
import {useDispatch, useSelector} from "react-redux";
import {PieChart} from 'react-minimal-pie-chart';
import './ChartsPage.css';
import {changeCurrentGroup} from "../Actions/myGroupsActions";
import {getMoneyInfo} from "../Actions/getMoneyInfoActions";

import {GithubPicker} from 'react-color';
import {updateColors} from "../Actions/colorActions";

//function instead of class to use hooks
const ChartsPage = () => {
    const dispatch = useDispatch();

    //  let year = new Date().getFullYear();
    //  let month = new Date().getMonth() + 1;
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const isLogged = useSelector(state => state.auth.isLogged);
    const groupCheck = useSelector(state => state.currentGroup)
    if (groupCheck.currentGroupName === undefined && isLogged) {
        window.location = '/groups';
        alert("Please create or join a group first")
    }

    const currentGroupID = useSelector(state => state.currentGroup.currentGroupPassword)
    const currentGroupName = useSelector(state => state.currentGroup.currentGroupName)
    const group1 = useSelector(state => state.currentGroup.myGroups1?.[0].groupName)
    const group2 = useSelector(state => state.currentGroup.myGroups2?.[0].groupName)
    const group3 = useSelector(state => state.currentGroup.myGroups3?.[0].groupName)
    const group4 = useSelector(state => state.currentGroup.myGroups4?.[0].groupName)

    const groupMembers1 = useSelector(state => state.currentGroup.myGroups1);
    const groupMembers2 = useSelector(state => state.currentGroup.myGroups2);
    const groupMembers3 = useSelector(state => state.currentGroup.myGroups3);
    const groupMembers4 = useSelector(state => state.currentGroup.myGroups4);

    const colors = useSelector(state => state.currentColors);
    const moneyInfo = useSelector(state => state.moneyInfo)

    const state = useSelector(state => state);

    //event handlers
    const changeMonth = (event) => {

        // year = document.querySelector("#year").value;
        setYear(document.querySelector("#year").value)
        // month = event.target.value
        setMonth(event.target.value);

        getMoneyInfoHandler();
    }

    const changeYear = (event) => {
        //   month = document.querySelector("#month").value;
        //  year = event.target.value

        setMonth(event.target.value);
        setYear(document.querySelector("#year").value)

        getMoneyInfoHandler();
    }
    const [currentColorID, setCurrentColorID] = useState({});


    const [colorDisplay, setColorDisplay] = useState(false);

    const showColorOptions = (val) => {

        let id = val.target.id;

        if (currentColorID.id === id) {
            setColorDisplay(!colorDisplay);
        } else {
            setColorDisplay(true);
        }

        let position = 0;

        console.log(val.target.id)

        switch (val.target.id) {
            case "Food":
                position = 0;
                break
            case "Entertainment":
                position = 1;
                break
            case "Hygiene":
                position = 2;
                break
            case "Detergent":
                position = 3;
                break
            case "RarelyBoughtItems":
                position = 4;
                break
            default:
                position = 5;

        }
        console.log(position)

        console.log(colors.colors[position][id])
        setCurrentColorID({id: id, position: position})

    }


    const changeColorOptions = (val) => {
        let hexCol = rgbToHex(val.rgb.r, val.rgb.g, val.rgb.b)
        let newColors = colors;
        newColors.colors[currentColorID.position][currentColorID.id] = hexCol;
        dispatch(updateColors(newColors.colors))
    }
    const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')


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
    const [members, setMembers] = useState(0);
    const membersHandler = () => {

    }

    const getMoneyInfoHandler = () => {

        let date = (year + "-" + month);
        let i = 1;
        let arr = [];
        if (currentGroupName === groupMembers1[0].groupName) {
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers1));

            while (i < groupMembers1.length) {
                arr.push(groupMembers1[i].member)
                i++;
                if (i === groupMembers1.length) {
                    setMembers(arr);
                    console.log(arr)
                    console.log("************")
                }
            }
        } else if (currentGroupName === groupMembers2[0].groupName) {
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers2));


            while (i < groupMembers2.length) {
                arr.push(groupMembers2[i].member)
                i++;
                if (i === groupMembers2.length) {
                    setMembers(arr);
                    console.log(arr)
                    console.log("************")
                }
            }
        } else if (currentGroupName === groupMembers3[0].groupName) {
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers3));
            while (i < groupMembers3.length) {
                arr.push(groupMembers3[i].member)
                i++;
                if (i === groupMembers3.length) {
                    setMembers(arr);
                    console.log(arr)
                    console.log("************")
                }
            }
        } else {
            dispatch(getMoneyInfo(currentGroupID, date, groupMembers4));
            while (i < groupMembers4.length) {
                arr.push(groupMembers4[i].member)
                i++;
                if (i === groupMembers4.length) {
                    setMembers(arr);
                    console.log(arr)
                    console.log("************")
                }
            }
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
        //changeCurrent members
        setOptionsUpToDate();
        setOptionsUpToDateGroup();

        getMoneyInfoHandler();
        if (colors.colors) {
            setColorInfo();
        }

        console.log(colors)

        console.log(moneyInfo)
    }, [])

    useEffect(() => {
//changeCurrent members
        getMoneyInfoHandler();
        console.log(moneyInfo)
    }, [currentGroupName])


    //probably remove currently only to check change in moneyInfo
    useEffect(() => {
//changeCurrent members
        console.log(state)

    }, [moneyInfo])

    useEffect(() => {
//change current members
        getMoneyInfoHandler();

    }, [year, month])

    useEffect(() => {

        setColorInfo();

    }, [colors])
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
                    <div className="totalMoney">Total: {moneyInfo.money[0].total} kr</div>
                    <div className="food">Food: {moneyInfo.money[1].Food} kr</div>
                    <div className="hygiene">Hygiene: {moneyInfo.money[3].Hygiene} kr</div>
                    <div className="detergent">Detergent: {moneyInfo.money[4].Detergent} kr</div>
                    <div className="RarelyBoughtItems">Rarely Bought Items: {moneyInfo.money[5].RarelyBoughtItems} kr</div>
                    <div className="storage">Storage: {moneyInfo.money[6].Storage} kr</div>
                    <div className="entertainment">Entertainment: {moneyInfo.money[2].Entertainment} kr</div>
                    <div>{(members !== 0)?
                        members.map((memb) => {
                               return  <div>{memb}: {moneyInfo.money[7].FullData[memb.split(".").join("")] || 0} kr</div>
                            }

                        )
                    :"asd"}</div>

                    <div>{console.log(moneyInfo.money[7].FullData)}</div>
                </div> : ""}
                <div className="pieChart-container">
                    {moneyInfo.money[0] && colors.colors ?
                        <PieChart animate="true" style={{height: "400px"}} onMouseOver={(e, value) => {
                        }}
                                  data={[
                                      {title: 'Food', value: moneyInfo.money[1].Food, color: colors.colors[0].Food},
                                      {
                                          title: 'Rarely bought items',
                                          value: moneyInfo.money[5].RarelyBoughtItems,
                                          color: colors.colors[4].RarelyBoughtItems
                                      },
                                      {
                                          title: 'Detergent',
                                          value: moneyInfo.money[4].Detergent,
                                          color: colors.colors[3].Detergent
                                      },
                                      {
                                          title: 'Hygiene',
                                          value: moneyInfo.money[3].Hygiene,
                                          color: colors.colors[2].Hygiene
                                      },
                                      {
                                          title: 'Storage',
                                          value: moneyInfo.money[6].Storage,
                                          color: colors.colors[5].Storage
                                      },
                                      {
                                          title: 'Entertainment',
                                          value: moneyInfo.money[2].Entertainment,
                                          color: colors.colors[1].Entertainment
                                      },
                                  ]}
                        /> : ""
                    }
                    <div className="labels">
                        {colorDisplay ? <GithubPicker onChange={(evt) => {
                            changeColorOptions(evt)
                        }}/> : ""}
                        <div className="labels-wrapper">
                            <div className="boxShape" id="Food" onClick={(val) => {
                                showColorOptions(val)
                            }}></div>
                            <br/>
                            <div className="chartLable">Food</div>
                            <br/>
                        </div>
                        <div className="labels-wrapper">
                            <div className="boxShape" id="RarelyBoughtItems" onClick={(val) => {
                                showColorOptions(val)
                            }}></div>
                            <br/>
                            <div className="chartLable">RarelyBoughtItems</div>
                            <br/>
                        </div>
                        <div className="labels-wrapper">
                            <div className="boxShape" id="Detergent" onClick={(val) => {
                                showColorOptions(val)
                            }}></div>
                            <br/>
                            <div className="chartLable">Detergent</div>
                            <br/>
                        </div>
                        <div className="labels-wrapper">
                            <div className="boxShape" id="Hygiene" onClick={(val) => {
                                showColorOptions(val)
                            }}></div>
                            <br/>
                            <div className="chartLable">Hygiene</div>
                            <br/>
                        </div>
                        <div className="labels-wrapper">
                            <div className="boxShape" id="Storage" onClick={(val) => {
                                showColorOptions(val)
                            }}></div>
                            <br/>
                            <div className="chartLable">Storage</div>
                            <br/>
                        </div>
                        <div className="labels-wrapper">
                            <div className="boxShape" id="Entertainment" onClick={(val) => {
                                showColorOptions(val)
                            }}></div>
                            <br/>
                            <div className="chartLable">Entertainment</div>
                            <br/>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ChartsPage;