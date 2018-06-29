import React, { Component } from 'react';

class MyAttendingEvents extends Component{

    constructor(props){
        super(props);
        this.state = {
            attendingList: []
        }
    }

    handleCancelClick(eventId){
        // Delete from Attedning List

        let data = {
            username: localStorage.curUsername,
            id: eventId
        }

        // axios.post("http://localhost:8080/cancelAttend", data)
        //     .then((res) => {
        //         console.log("=== After Cancel ===")
        //         console.log(res);
        //         this.setState({attendingList: res.data})
        //     }).catch(function(error){if(!error.error);})
    }

    render(){
        let table = this.props.myEvents.map((element, index) => {
            return <div key={index} className="attendingElement" >
                <h3>{element.title}</h3>
                <p>{element.description}</p>
                <h4>{element.location}</h4>
                <h4>{element.time}</h4>
                <button className="btn btn-danger" onClick={()=>{this.handleCancelClick(element.id)}}>Cancel</button>
            </div>
        });


        return(
            <div className="attendingBody">
                {table}
            </div>
        )
    }
}

export default MyAttendingEvents;