import React, { Component } from 'react';
import axios from 'axios';
import GoogleMap from './GoogleMap';

class FindPickUp extends Component{

    componentDidMount(){
        axios("http://localhost:8080/allEvents")
            .then((res) => {console.log(res)})
            .catch(function(error){if(!error.error);})
    }

    render(){
        return(
            <div className="FindPickUpBody container">
                <GoogleMap />
                <div className="newsFeed">
                    <h1>FindPickUp Body</h1>
                </div>
            </div>
        );
    }
}

export default FindPickUp;
