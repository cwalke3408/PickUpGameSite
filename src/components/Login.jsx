import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);

        this.state= {
            userName: '',
            password: ''
        }
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleClick(){
        let data = {
            username: this.state.userName,
            password: this.state.password
        }

        
        axios.post("http://localhost:8080/login", data)
        .then((res) => {
            console.log("res: ");
            console.log(res);
            if(res.data === "") console.log("Login Failure")
            else{
                console.log("Login Success")
                localStorage.setItem('curUsername', res.data.username)
                this.props.history.push('/');
            }
        })
        .catch(function(error) {if (!error.error); });

    }

    render(){
        return(
            <div className="loginBody container">
                <div className="row">
                    <h2>Login</h2>
                    <div className="loginForm col-md-offset-2 col-md-8">
                        <div className="input-group formLine">
                            <span className="input-group-addon formLabel" id="basic-addon1">Username</span>
                            <input type="text" class="form-control" onChange={(e)=>{this.handleChange(e)}} name="userName" placeholder="Username" aria-describedby="basic-addon1"/>
                        </div>

                        <div className="input-group formLine">
                            <span className="input-group-addon formLabel" id="basic-addon1">Password</span>
                            <input type="text" class="form-control" onChange={(e)=>{this.handleChange(e)}} name="password" placeholder="Password" aria-describedby="basic-addon1" />
                        </div>

                        <br />

                        <div className="loginButton">
                            <button className="btn btn-info btn-block" onClick={()=>{this.handleClick()}}>Login</button>
                        </div>
                    </div>
                </div>
                <h5><Link to="/register">Register</Link></h5>
            </div>
        )
    }
}

export default Login;