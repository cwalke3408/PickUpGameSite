import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName: '',
            description: ''
        }
    }

    componentDidMount(){
        
        this.setState({
            userName: "ChillerFiend67",
            description: "Just another Frisbee player"
        })
    }
    render(){
        return(
            <div className="profileBody container">
                <h2>{this.state.userName}</h2>
                <div className="row">
                    <div className="col-sm-3"></div>
                    <p className="col-sm-6">{this.state.description}</p>
                </div>
            </div>
        )
    }
}

export default Profile;