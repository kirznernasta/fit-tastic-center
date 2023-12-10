import React, { Component } from 'react'
import classes from "./NavBar.module.css";

import Links from '../Links'

class NavBar extends Component {
    render() {
        return (
            <div className={classes.header}>
                <nav>
                    <Links />
                </nav>
            </div>
        )
    }
}

export default NavBar