import React, { Component } from 'react';

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
        if(this.state.password === "1234" && this.state.userName === "user"){
            console.log("Success");
        } else {
            console.log("Failed");
        }
     // axios({
    //     method: "POST",
    //     url: "http//:localhost:3030/login",
    //     data: data
    // })
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