import React, { Component } from 'react';
import MyOwnEvents from './MyOwnEvents';
import MyAttendingEvents from './MyAttendingEvents';
import ModalAdd from './ModalAdd';
import axios from 'axios';

class MyEvents extends Component{
    constructor(props){
        super(props);

        this.state = {
            myOwnEvents: [],
            myAttendingEvents: [],
            show: false
        }
    }

    componentDidMount(){

        console.log(localStorage.curUsername);
        let data = {
            username: localStorage.curUsername
        }

        axios.post("http://localhost:8080/userEvents", data)
            .then((res) => {
                console.log(res)
                console.log(this.props.history);
                console.log(localStorage);
                this.setState({
                    myOwnEvents: res.data.ownEvents,
                    myAttendingEvents: res.data.attendingEvents
                })
            })
            .catch(function(error){if (!error.error); })
    }

    handleAddClick(e){    
        this.setState({show: true});
    }

    handleCancelClick(eventId){
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

    handleDeleteClick(e){
        let eventsList = this.state.myOwnEvents;
        eventsList.splice(e.target.name,1);
        this.setState({
            myOwnEvents: eventsList
        })
    }

    handleSubmit(){
        this.setState({show: false});
    }
    handleCancel(){
        this.setState({show: false});
    }

    render(){
        let table = this.state.myAttendingEvents.map((element, index) => {
            return <div key={index} className="attendingElement" >
                <h3>{element.title}</h3>
                <p>{element.description}</p>
                <h4>{element.location}</h4>
                <h4>{element.time}</h4>
                <button className="btn btn-danger" onClick={()=>{this.handleCancelClick(element.id)}}>Cancel</button>
            </div>
        });

        return(
            <div className="myEventsBody container">
                <ModalAdd
                    show={this.state.show} 
                    listEvent={this.state.myOwnEvents}
                    onCancel={()=>{this.handleCancel()}}
                    onSubmit={()=>{this.handleSubmit()}}
                />

                <h2>My Events</h2>
                
                <MyOwnEvents
                    myEvents={this.state.myOwnEvents} 
                    onDeleteClick={(e)=>{this.handleDeleteClick(e)}}    
                />
                <button onClick={(e)=>{this.handleAddClick(e)}} className="btn btn-info">Add Event</button>
                <div className="attendingBody">
                    {table}
                </div>
            </div>
        )
    }
}

export default MyEvents;