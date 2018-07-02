import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const mainTag = {
    float: 'left'
}

class BootstrapNavBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            loggedIn: false
        }
    }

    componentDidMount(){
        (localStorage.curUsername === "") ?
            this.setState({loggedIn: false}) :
            this.setState({loggedIn: true})
    }

    handleLogOut(){
        localStorage.setItem('curUsername', "");
        this.setState({loggedIn: false})
    }

    handleLogIn(){
        this.setState({loggedIn: true})
    }

    render(){
        let tags = null;

        if(localStorage.curUsername !== ""){
            tags= <ul>
                    <li style={mainTag}><Link to="/">PickUpAround</Link></li>
                    <li><Link onClick={()=>{this.handleLogOut()}} to="/">Log Out</Link></li>
                    <li><Link to="/">{localStorage.curUsername}</Link></li>
                    <li><Link to="/myevents">MyEvents</Link></li>
                </ul>
        } else {
            tags= <ul>
                    <li style={mainTag}><Link to="/">PickUpAround</Link></li>
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