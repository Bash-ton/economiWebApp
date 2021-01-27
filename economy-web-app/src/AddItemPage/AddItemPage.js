import React, {useEffect, useState} from "react";
//css
import './AddItemPage.css';
//redux hooks
import {useDispatch, useSelector} from "react-redux";
//actions
import { createItem } from "../Actions/itemActions";


const AddItemPage = () => {
    //call hook dispatch
    const dispatch = useDispatch();

    //render depending on logged in or not
    const isLogged = useSelector(state => state.auth.isLogged)



    //add to all pages that may need to force to first page when logged out
/*    useEffect(() => {
        if(isLogged === false){
            window.location = '/';
        }
    }, [isLogged])

 */

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

    //button test
    const [db, setDB] = useState(() => {
        return "";
    });
    const addItemToDB = () => {
        if(!((store === "") || (itemName === "") || (price === 0) || (category === "Category"))){

            let date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1);

    /*        //update DB with dynamic date
            dispatch(createItem({ [date] : {
                store: store,
                price: price,
                name: itemName,
                category: category
            }}));

     */
            dispatch(createItem({store: store, price: price, name: itemName, category: category}));

        }else{
            alert("Fill in all input fields first");
        }
    };


    return(
            <div className="AddItemPage-wrapper">
                <div action="" className="form-item">
                    <h2>Add item</h2>
                    <div className="input-group">
                        <input type="text" name="loginUser" autoComplete="off" id="loginUser"  onChange={(event) => {handleStore(event)}} required ></input>
                        <label htmlFor="loginUser">Store</label>
                    </div>
                    <div className="input-group">
                        <input type="text" name="loginPassword" id="loginPassword" onChange={(event) => {handleItemName(event)}} required  ></input>
                        <label htmlFor="loginUser">Item Name</label>
                    </div>
                    <div className="input-group">
                        <input type="number" name="loginPassword" id="loginPassword" min={0} onChange={(event) => {handlePrice(event)}} required  ></input>
                        <label htmlFor="loginPassword">Price</label>
                    </div>
                    <div className="input-group">

                        <select type="text" className="options-categories" autoComplete="off" id="loginUser"  onChange={(event) => {handleCategory(event)}} required >
                            <option value="category">Category</option>
                            <option value="Food">Food</option>
                            <option value="RarelyBoughtItems">Rarely bought items</option>
                            <option value="Detergent">Detergent</option>
                            <option value="Hygiene">Hygiene</option>
                            <option value="Storage">Storage</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>

                    </div>
                    <div className="input-group">
                        <input type="number" name="loginPassword" defaultValue={numberOfItems} id="loginPassword" min={0} required onChange={(event) => {handleNumberOfItems(event)}} ></input>
                        <label htmlFor="loginPassword">Number of items</label>
                    </div>
                    <button className="submit-btn" onClick={() => {addItemToDB()}}>Add item</button>


                </div>
            </div>

    )
}

export default AddItemPage;