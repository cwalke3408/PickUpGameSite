import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

// const mainTag = {
//     float: 'left'
// }

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
            tags= <ul className="nav navbar-nav navbar-right">
                    {/* <li style={mainTag}><Link to="/">PickUpAround</Link></li> */}
                    {/* <li><Link to="/">{localStorage.curUsername}</Link></li> */}
                    <NavDropdown eventKey={2} title={localStorage.curUsername} id="nav-dropdown">
                        <li><Link to="/myevents">MyEvents</Link></li>
                        <li><Link onClick={()=>{this.handleLogOut()}} to="/">Log Out</Link></li>
                    </NavDropdown>
                </ul>
        } else {
            tags= <ul className="nav navbar-nav navbar-right">
                    {/* <li style={mainTag}><Link to="/">PickUpAround</Link></li> */}
                    <li><Link to="/register">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    {/* <NavItem eventKey={1}><Link to="/register">Sign Up</Link></NavItem>
                    <NavItem eventKey={2}><Link to="/login">Login</Link></NavItem> */}

                </ul>
        }

        return(
            // <div className="NavBarBody">
            //     {tags}
            // </div>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">PickUpAround</Link>
                    </div>

                    {tags}
                </div>
            </nav>
        )
    }
}

export default BootstrapNavBar;