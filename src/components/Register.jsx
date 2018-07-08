import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const borderErr = {
    border: '1px red solid'
}
const borderDefault = {
    // border: '1px grey solid'
}

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: "",
            password: "",
            passwordCheck: "",
            email: "",
            emailPerfence: false,
            userErr: borderDefault,
            passwordErr: borderDefault,
            emailErr: borderDefault,
            alert: ''
        }
    }

    handleChange(e){

        
        const userErr = e.target.name === 'userName' ? borderDefault : this.state.userErr;
        const passwordErr = e.target.name === 'password' ? borderDefault : this.state.passwordErr;
        // const passwordCheckErr = e.target.name === 'passwordCheck' ? borderDefault : borderErr;
        const emailErr = e.target.name === 'email' ? borderDefault : this.state.emailErr;

        this.setState({
            [e.target.name]: e.target.value,
            userErr: userErr,
            passwordErr: passwordErr,
            emailErr: emailErr
        });
    }

    handleClick(){
        const data = {
            Id: 0,
            username: false,
            password: false,
            userdescription: "user description",
            photolink: "photo link",
            email: false,
        }

        data.username = this.state.userName === "" ? (this.setState({userErr: borderErr}), false) : this.state.userName;
        data.password = (this.state.password === "" || this.state.password !== this.state.passwordCheck) ? (this.setState({passwordErr: borderErr}), false) : this.state.password;
        data.email = this.state.email === "" ? (this.setState({emailErr: borderErr}), false) : this.state.email;

        if(Object.values(data).indexOf(false) !== -1){
            console.log("Error in the Form");
            return;
        }


        // 0: Successful Registration
        // 1: username already exist
        // 2: Email already exist
        // 3: username and email exist
        axios.post("http://localhost:8080/newUser", data)
            .then((res) => {
                switch(res.data){
                    case 0: 
                        localStorage.setItem('curUsername', data.username);
                        this.props.history.push('/');
                        break;
                    case 1:
                        this.setState({alert: "Sorry!  Username Already Exist"})
                        break;
                    case 2: 
                        this.setState({alert: "Sorry!  Email already exist"})
                        break;
                    case 3:
                        this.setState({alert: "Sorry! Username and Email already exist"})
                        break;
                    default:
                        this.setState({alert: "Sorry! Something is wrong on our end"})
                }
            
            })
            .catch(function(error) {if (!error.error); });

    }



    render(){
        let alertDiv = this.state.alert !== '' ? 
        (<div className="alert alert-danger" role="alert">
            {this.state.alert}
        </div>) : null;

        return(
            <div className="loginBody container">
                <div className="row">
                    <h2>Register</h2>

                    {alertDiv}

                    <div className="loginForm col-md-offset-2 col-md-8">
                        <div className="input-group formLine">
                            <div className="formLabel input-group-addon" id="basic-addon1">
                                <span className="" >Username</span>
                            </div>
                            <input type="text" className="form-control" onChange={(e)=>{this.handleChange(e)}} name="userName" style={this.state.userErr} placeholder="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group formLine">
                            <span className="input-group-addon formLabel" id="basic-addon1">Password</span>
                            <input type="password" className="form-control" onChange={(e)=>{this.handleChange(e)}} name="password"  style={this.state.passwordErr} placeholder="Password" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group formLine">
                            <span className="input-group-addon" id="basic-addon1">Re-type Password</span>
                            <input type="password" className="form-control formLabel" onChange={(e)=>{this.handleChange(e)}} name="passwordCheck"  style={this.state.passwordErr} placeholder="Re-type Password" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group formLine">
                            <span className="input-group-addon formLabel" id="basic-addon1">Email</span>
                            <input type="text" className="form-control" onChange={(e)=>{this.handleChange(e)}} name="email" style={this.state.emailErr} placeholder="Email" aria-describedby="basic-addon1"/>
                        </div>

                        <button className="btn btn-info btn-block" onClick={()=>{this.handleClick()}}>Submit</button>
                    </div>
                </div>
                <h5><Link to="/login">Login</Link></h5>
            </div>
        )
    }
}

export default Register;