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

        let data = {
            username: "abc"
        }

        axios.post("http://localhost:8080/userEvents", data)
            .then((res) => {console.log(res)})
            .catch(function(error){if (!error.error); })

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

    handleAddClick(e){    
        this.setState({show: true});
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

        // let data = {
        //      events:[
        //             {
        //                 id: 1,
        //                 title: '1',
        //                 timedate: '1',
        //                 location: '1',
        //                 description: '1',
        //                 author: '1',
        //                 count: '1'   
        //             },{
        //                 id: 2,
        //                 title: '2',
        //                 timedate: '2',
        //                 location: '2',
        //                 description: '2',
        //                 author: '2',
        //                 count: '2'  
        //             }
        //         ]
        // }




    }
    handleCancel(){
        this.setState({show: false});
    }

    render(){
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
                <MyAttendingEvents myEvents={this.state.myAttendingEvents} />
            </div>
        )
    }
}

export default MyEvents;