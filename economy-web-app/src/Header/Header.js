import React, {useLayoutEffect, useEffect} from "react";
import './Header.css';
//actions
import {signOut} from '../Actions/authActions'
//redux
import {useDispatch, useSelector} from 'react-redux'


const Header = () => {

    //hook
    let dispatch = useDispatch();
    //render depending on logged in or not
    const isLogged = useSelector(state => state.auth.isLogged)


    useEffect(() => {
        if (isLogged) {
            const headerWrap = document.querySelector(".header-wrapper");
            const navLinks = document.querySelector(".nav-link");
            const links = document.querySelectorAll(".nav-link li");
            headerWrap.addEventListener("click", () => {
                navLinks.classList.toggle("open");
                links.forEach(link =>{
                    link.classList.toggle("fade");
                })
            })
        }

    }, [])


    return (
        <nav>
            {isLogged?<div className="header-wrapper">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>:""}

            <ul className="nav-link">
                {isLogged ? <li><a href="/addItem">Add Item</a></li> : ""}
                {isLogged ? <li><a href="/groups">Groups</a></li> : ""}
                {isLogged ? <li><a href="/charts">Charts</a></li> : ""}
                {isLogged ? <li><a href="/table">Items</a></li> : ""}
                {isLogged ? <div className="logout-btn-wrapper">
                    <button className="logOut-btn" onClick={() => {
                        dispatch(signOut()); window.location = "/"
                    }}>Log Out
                    </button>
                </div> : ""}
            </ul>

        </nav>


    );

}
/*
    <div className="header-border">
            <ul className="nav">
                <li><a href="/charts">LOGO</a></li>
                <li><a href="/addItem">Add Item</a></li>
                <li><a href="/groups">Groups</a></li>
                <li><a href="/charts">Charts</a></li>
                <li><a href="/table">Items</a></li>
                {isLogged ? <div className="logout-btn-wrapper"><button className="logOut-btn" onClick={() => {dispatch(signOut())}}>Log Out</button></div>: ""}
            </ul>
        </div>
 */
export default Header;