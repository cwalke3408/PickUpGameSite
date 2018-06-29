import React, { Component } from 'react';
import axios from 'axios';

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
                <div className="loginForm">
                    <h2>Login Page</h2>
                    
                    <h4>User Name</h4>
                    <input onChange={(e)=>{this.handleChange(e)}} name="userName" type="text" />
                    <h4>Password</h4>
                    <input onChange={(e)=>{this.handleChange(e)}} name="password" type="text" />

                    <div className="loginButton">
                        <button className="btn btn-info btn-block" onClick={()=>{this.handleClick()}}>Login</button>
                    </div>
                </div>
                <a href="localhost:3000/">Register</a>
            </div>
        )
    }
}

export default Login;