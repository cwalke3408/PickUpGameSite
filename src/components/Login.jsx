import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);

        this.state= {
            userName: '',
            password: '',
            alert: false
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
            if(res.data === ""){
                this.setState({
                    password: '',
                    alert: true
                });
             } else {
                localStorage.setItem('curUsername', res.data.username)
                this.props.history.push('/');
            }
        })
        .catch(function(error) {if (!error.error) console.log("server error")});

    }

    render(){

        let alertDiv = this.state.alert ? 
            (<div className="alert alert-danger" role="alert">
                Invalid Username or Password!!
            </div>) : null;


        return(
            <div className="loginBody container">
                <div className="row">
                    <h2>Login</h2>

                    {alertDiv}

                    <div className="loginForm col-md-offset-2 col-md-8">
                        <div className="input-group formLine">
                            <span className="input-group-addon formLabel" id="basic-addon1">Username</span>
                            <input type="text" className="form-control" onChange={(e)=>{this.handleChange(e)}} name="userName" placeholder="Username" aria-describedby="basic-addon1"/>
                        </div>

                        <div className="input-group formLine">
                            <span className="input-group-addon formLabel" id="basic-addon1">Password</span>
                            <input type="password" className="form-control" onChange={(e)=>{this.handleChange(e)}} name="password" placeholder="Password" aria-describedby="basic-addon1" />
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