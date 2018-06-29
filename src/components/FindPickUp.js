import React, { Component } from 'react';
import axios from 'axios';
import GoogleMap from './GoogleMap';


class FindPickUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            eventsList: [],
            myAttendingEvents: []
        }
    }

    componentDidMount(){
        if(localStorage.curUsername !== ""){
            console.log(localStorage.curUsername);
            let data = {
                username: localStorage.curUsername
            }
    
            axios.post("http://localhost:8080/userEvents", data)
                .then((res) => {
                    console.log(res.data)
                    this.setState({myAttendingEvents: res.data.attendingEvents})
                })
                .catch(function(error){if (!error.error); })
        }

        axios("http://localhost:8080/allEvents")
            .then((res) => {
                this.setState({eventsList: res.data.allEvents})
            
                // console.log("Inside Google")
                // console.log(this.state.eventsList);
        
                // let events1= this.state.eventsList;
                // events1.forEach(element => {
                //     element.coords = this.getGeoCode(element.location)
                // });
                // console.log(events1)
                // // this.setState({event})            
            })
            .catch(function(error){if(!error.error);})

        console.log(localStorage.currUsername);


    }



    handleAttendClick(eventId){
        let data = {
            username: localStorage.curUsername,
            id: eventId
        }

        axios.post("http://localhost:8080/attendEvent", data)
            .then((res) => {
                console.log("=== After Attedning ===");
                console.log(res);
                this.setState({myAttendingEvents: res.data})
            })
            .catch(function(error){if(!error.error);})
    }

    handleCancelClick(eventId){
        // Delete from Attedning List

        let data = {
            username: localStorage.curUsername,
            id: eventId
        }

        axios.post("http://localhost:8080/cancelAttend", data)
            .then((res) => {
                console.log("=== After Cancel ===")
                console.log(res);
                this.setState({myAttendingEvents: res.data})
            }).catch(function(error){if(!error.error);})
    }

    render(){
        let myAttendingEvents = this.state.myAttendingEvents;

        let allEvents = this.state.eventsList.filter((event) => {
            if(!myAttendingEvents.find((myAEvent)=>{
                return myAEvent.id === event.id; }))
                return event; 
        });

        let events = allEvents.map((aEvent, key) => {
            return(
                <div key={key} className="aEventBox">
                    <h4>{aEvent.title}</h4>
                    <h4>{aEvent.timedata}</h4>
                    <h4>{aEvent.location}</h4>
                    <h4>{aEvent.description}</h4>
                    <button className="btn btn-info" onClick={()=>{this.handleAttendClick(aEvent.id)}}>Attend</button>
                </div>
            )
        })

        let attending = myAttendingEvents.map((aEvent, key) => {
            return(
                <div key={key} className="aEventBox">
                    <h4>{aEvent.title}</h4>
                    <h4>{aEvent.timedata}</h4>
                    <h4>{aEvent.location}</h4>
                    <h4>{aEvent.description}</h4>
                    <button className="btn btn-danger" onClick={()=>{this.handleCancelClick(aEvent.id)}}>Cancel</button>
                </div>
            )
        })

        return(
            <div className="FindPickUpBody container">
                <div className="mapNews">
                    <h2>MAPPP </h2>
                    <GoogleMap 
                        events={this.state.eventsList}
                        myEvents={this.state.myAttendingEvents}
                    />
                </div>
                <div className="newsFeed">
                    <h1>FindPickUp Body</h1>
                    {events}
                </div>

                <div className="newsFeed" >
                    <h1>What I'm attending</h1>
                    {attending}
                </div>
            </div>
        );
    }
}

export default FindPickUp;
