import React, {Component} from 'react'
import {Link, NavLink} from 'react-router-dom'
import AccountComponent from "./AccountComponent";

const Links = () => {
    return <React.Fragment>
        <h1>Fit-tastic center</h1>
        <NavLink className="navigation-item" style={({isActive}) => {
            console.log(`isActive: ${isActive}`)
            return {color: (isActive ? "#f4f4f4" : "#a2a9b9")};
        }
        } to="/">
            Home
        </NavLink>
        <NavLink className="navigation-item" style={({isActive}) => {
            console.log(`isActive: ${isActive}`)
            return {color: (isActive ? "#f4f4f4" : "#a2a9b9")};
        }
        } to="/articles">
            Articles
        </NavLink>
        <NavLink className="navigation-item" style={({isActive}) => {
            console.log(`isActive: ${isActive}`)
            return {color: (isActive ? "#f4f4f4" : "#a2a9b9")};
        }
        } to="/trainers">
            Trainers
        </NavLink>
        <NavLink className="navigation-item" style={({isActive}) => {
            console.log(`isActive: ${isActive}`)
            return {color: (isActive ? "#f4f4f4" : "#a2a9b9")};
        }
        } to="/training-types">
            Training types
        </NavLink>
        <AccountComponent/>

    </React.Fragment>
}

export default Links