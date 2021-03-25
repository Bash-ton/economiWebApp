import React, {useEffect, useState} from "react";
//css
import './AddItemPage.css';
//redux hooks
import {useDispatch, useSelector} from "react-redux";
//actions
import {createItem} from "../Actions/itemActions";
import {createGroup} from "../Actions/addGroupActions";
import {useFirestoreConnect} from "react-redux-firebase";
import {changeCurrentGroup} from "../Actions/myGroupsActions";

//TODO IF NO GROUPS AT IE NEW USER => SHOW INFO MESSAGE TELLING TO GO TO GROUPS PAGE (ADD LINK) TO CREATE/JOIN GROUP
const AddItemPage = () => {
    //call hook dispatch
    const dispatch = useDispatch();


    const currentGroupID = useSelector(state => state.currentGroup.currentGroupPassword)
    const currentGroupName = useSelector(state => state.currentGroup.currentGroupName)
    const groupCheck = useSelector(state => state.currentGroup)
    const isLogged = useSelector(state => state.auth.isLogged);
    const testSt = useSelector(state => state)

console.log(testSt)



    if (groupCheck.currentGroupName === undefined && isLogged) {
        console.log(testSt)
        window.location = '/groups';
        alert("Please create or join a group first")
    }


    const group1 = useSelector(state => state.currentGroup.myGroups1?.[0].groupName)
    const group2 = useSelector(state => state.currentGroup.myGroups2?.[0].groupName)
    const group3 = useSelector(state => state.currentGroup.myGroups3?.[0].groupName)
    const group4 = useSelector(state => state.currentGroup.myGroups4?.[0].groupName)






    //add to all pages that may need to force to first page when logged out
    useEffect(() => {
        if (isLogged === false) {
            window.location = '/';
        }
    }, [isLogged])


    //handle inputs functions
    //number of items
    const [numberOfItems, setNumberOfItems] = useState(() => {
        return 1;
    });
    const handleNumberOfItems = (event) => {

        setNumberOfItems(event.target.value);
    };

    //price
    const [price, setPrice] = useState(() => {
        return 0;
    });
    const handlePrice = (event) => {
        console.log(event.target.value);
        setPrice(event.target.value);
    };

    //Category
    const [category, setCategory] = useState(() => {
        return "Category";
    });
    const handleCategory = (event) => {
        console.log(event.target.value);
        setCategory(event.target.value);
    };

    //Store
    const [store, setStore] = useState(() => {
        return "";
    });
    const handleStore = (event) => {
        console.log(event.target.value);
        setStore(event.target.value);
    };

    //name
    const [itemName, setItemName] = useState(() => {
        return "";
    });
    const handleItemName = (event) => {
        console.log(event.target.value);
        setItemName(event.target.value);
    };

    const clearForm = () => {
        //document.querySelector("#storeNameField").value = "";
        document.querySelector("#itemNameField").value = "";
        document.querySelector("#priceField").value = "";
        document.querySelector("#defaultOption").selected ="selected";

        document.querySelector("#numberOfItemsField").value = 1;


       // setStore("")
        setPrice(0)
        setItemName("")
        setCategory("category")
        setNumberOfItems(1)
    }

    const [loading, setLoading] = useState(false);
    const addItemToDB = () => {
        setLoading(true)
        if (( (store === "") || (itemName === "") || (price === 0) || (category === "category"))) {
            setLoading(false)
            alert("Fill in all input fields first");
        } else {
            let i = 0;
            while(i < numberOfItems){
                dispatch(createItem({
                    store: store,
                    price: Math.round(parseFloat(price)),
                    name: itemName,
                    category: category
                }, {groupID: currentGroupID}, numberOfItems, i));
                if(i === (numberOfItems - 1)){
                    clearForm();
                    setLoading(false)
                }
                i++;
            }


        }
    };

    const changeCurrentGroupHandler = (event) => {
        dispatch(changeCurrentGroup(event.target.value));
    }

    const setOptionsUpToDate = () => {
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

    useEffect(() => {
        setOptionsUpToDate()
    }, [])


    return (

        <div className="AddItemPage-wrapper">
            <div className="flex-box">
            <div className="currentGroupAddItem-wrapper">
                <div className="activeGroup">My Current Group</div>
                <select onChange={(event) => {
                    changeCurrentGroupHandler(event)
                }} autoComplete="off" id="groups">
                    {group1 ? <option value={group1}>{group1}</option> : ""}
                    {group2 ? <option value={group2}>{group2}</option> : ""}
                    {group3 ? <option value={group3}>{group3}</option> : ""}
                    {group4 ? <option value={group4}>{group4}</option> : ""}
                </select>
            </div>
                <br/>
            <div action="" className="form-item">
                <h2>Add item</h2>
                <div className="input-group">
                    <input type="text" name="loginUser" autoComplete="off" id="storeNameField" onChange={(event) => {
                        handleStore(event)
                    }} required></input>
                    <label htmlFor="loginUser">Store</label>
                </div>
                <div className="input-group">
                    <input type="text" name="loginPassword" autoComplete="off" id="itemNameField" onChange={(event) => {
                        handleItemName(event)
                    }} required></input>
                    <label htmlFor="loginUser">Item Name</label>
                </div>
                <div className="input-group">
                    <input type="number" name="loginPassword" autoComplete="off" id="priceField" min={0}
                           onChange={(event) => {
                               handlePrice(event)
                           }} required></input>
                    <label htmlFor="loginPassword">Price</label>
                </div>
                <div className="input-group">

                    <select type="text" className="options-categories" autoComplete="off" id="loginUser"
                            onChange={(event) => {
                                handleCategory(event)
                            }} required>
                        <option id="defaultOption" value="category">Category</option>
                        <option value="Food">Food</option>
                        <option value="RarelyBoughtItems">Rarely bought items</option>
                        <option value="Detergent">Detergent</option>
                        <option value="Hygiene">Hygiene</option>
                        <option value="Storage">Storage</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>

                </div>
                <div className="input-group">
                    <input type="number" name="loginPassword" autoComplete="off" defaultValue={numberOfItems}
                           id="numberOfItemsField" min={0} required onChange={(event) => {
                        handleNumberOfItems(event)
                    }}></input>
                    <label htmlFor="loginPassword">Number of items</label>
                </div>
                {loading?<button className="submit-btn" >Loading...
                    </button>
                    :<button className="submit-btn" onClick={() => {
                    addItemToDB()
                }}>Add item
                </button>}
            </div>
            </div>
        </div>

    )
}

export default AddItemPage;