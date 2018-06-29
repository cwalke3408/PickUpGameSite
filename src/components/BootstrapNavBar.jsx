import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const mainTag = {
    float: 'left'
}

class BootstrapNavBar extends Component{

    render(){
        let tags = null;

        if(true){
            tags= <ul>
                    <li style={mainTag}><Link to="/">PickUpAround</Link></li>
                    <li><Link to="/">Log Out</Link></li>
                    <li><Link to="/">Profile</Link></li>
                    <li><Link to="/myevents">MyEvents</Link></li>
                </ul>
        } else {
            tags= <ul>
                    <li style={mainTag}><a herf=".profile">PickUpAround</a></li>
                    <li><Link to="/register">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
        }

        return(
            <div className="NavBarBody">
                {tags}
            </div>
        )
    }
}

export default BootstrapNavBar;