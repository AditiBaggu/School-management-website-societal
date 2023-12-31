import React, {useState} from "react";
import MainHeader from "./MainHeader";
import "./MainNavigation.css"
import {Link} from "react-router-dom"
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop"

const MainNavigation=(props)=>{
    const[drawerIsOpen,setDrawerIsOpen]=useState(false)
    function openDrawer(){
        setDrawerIsOpen(true)
    }
    function closeDrawer(){
        setDrawerIsOpen(false)
    }
    return(
        <React.Fragment>
        {drawerIsOpen && <Backdrop onClick={closeDrawer}/>}
        (<SideDrawer show={drawerIsOpen}>
            <nav className="main-navigation__drawer-nav">
                <NavLinks/>
            </nav>
            </SideDrawer>)
        <MainHeader>
            <button className="main-navigation__menu-btn" onClick={openDrawer}>
                <span/>
                <span/>
                <span/>
            </button>
            <h1 className="main-navigation__title">
                Your Places
            </h1>
            <Link to="/">
            <nav className="main-navigation__header-nav">
                <NavLinks/>
            </nav>
            </Link>
        </MainHeader>
        </React.Fragment>
    )
}
export default MainNavigation