import React, { Component } from 'react';
import MyOwnEvents from './MyOwnEvents';
import MyAttendingEvents from './MyAttendingEvents';

class MyEvents extends Component{
    constructor(props){
        super(props);

        this.state = {
            myOwnEvents: [],
            myAttendingEvents: []
        }
    }

    componentDidMount(){

        this.setState({
            myOwnEvents: [{
                time: "12:12",
                location: "Clemson, SC",
                title: "Frisbee Pickup Game",
                description: "Calling all scrubs to play a pickup game"
            }],
            myAttendingEvents: [{
                time: "1:00",
                location: "Greenville, SC",
                title: "BasketBall Pickup Game",
                description: "Playing some BBall (no flopping zone)"
            },{
                time: "3:00",
                location: "Atlanta, GA",
                title: "Tennis After Work",
                description: "Let the double faults begin!!!"
            }]
        })
    }

    render(){
        console.log(this.state.myOwnEvents)
        console.log(this.state.myAttendingEvents)
        return(
            <div className="myEventsBody container">
                <h2>My Events</h2>
                <MyOwnEvents myEvents={this.state.myOwnEvents} />
                <button className="btn btn-info">Add Event</button>
                <MyAttendingEvents myEvents={this.state.myAttendingEvents} />
            </div>
        )
    }
}

export default MyEvents;