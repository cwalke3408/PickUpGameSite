import React, { Component } from 'react';
import axios from 'axios';

const borderErr = {
    border: '1px red solid'
}
const borderDefault = {
    border: '1px grey solid'
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
            emailErr: borderDefault
        }

        console.log("Try Out Input Group")
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
        // console.log(
        //     `${this.state.userName}\n${this.state.password}\n${this.state.passwordCheck}\n${this.state.email}\n`
        // )

        const data = {
            Id: 0,
            username: false,
            password: false,
            userdescription: "user description",
            photolink: "photo link",
            email: false,
            // emailperfence: true
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
                        console.log("Succesful Registration");
                        localStorage.setItem('curUsername', data.username);
                        this.props.history.push('/');
                        break;
                    case 1:
                        console.log("Sorry!  Username Already Exist")
                        break;
                    case 2: 
                        console.log("Sorry!  Email already exist")
                        break;
                    case 3:
                        console.log("Sorry! Username and Email already exist")
                        break;
                    default:
                        console.log("Sorry! Something is wrong on our end")
                }
            
            })
            .catch(function(error) {if (!error.error); });

    }



    render(){
        return(
            <div className="loginBody container">
                <h2>Register</h2>
                <div className="loginForm">
                    <h4>User Name</h4>
                    <input type="text" name="userName" style={this.state.userErr} onChange={(e)=>{this.handleChange(e)}} />
                    <h4>Password</h4>
                    <input type="text" name="password" style={this.state.passwordErr} onChange={(e)=>{this.handleChange(e)}}/>
                    <h4>Re-enter Password</h4>
                    <input type="text" name="passwordCheck" style={this.state.passwordErr} onChange={(e)=>{this.handleChange(e)}}/>
                    <h4>Email</h4>
                    <input type="text" name="email" style={this.state.emailErr} onChange={(e)=>{this.handleChange(e)}}/>
                    <div className="emailPerfernceBox">
                        <label>Email Alerts
                            <input type="checkbox"/>
                        </label>
                    </div>
                    <button className="btn btn-info btn-block" onClick={()=>{this.handleClick()}}>Submit</button>
                </div>
                <a href="localhost:3000/login">login</a>
            </div>
        )
    }
}

export default Register;