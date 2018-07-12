import React, { Component } from 'react';
import axios from 'axios';
import GoogleMap from './GoogleMap';
import backEndURL from '../backEndURL';


class FindPickUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            eventsList: [],
            myAttendingEvents: []
        }
    }

    componentDidMount(){ 
        console.log(process.env)
        console.log(process.env.REACT_APP_apiKey)   
        console.log(apiKey);
        if(localStorage.curUsername !== ""){
            let data = { username: localStorage.curUsername }
    
            axios.post(backEndURL + 'userEvents', data)
                .then(res => {
                    // console.log(res)
                    this.setState({myAttendingEvents: res.data.attendingEvents})})
                .catch(function(error){if (!error.error); });
        }

        axios(backEndURL + 'allEvents')
            .then(res => {
                // console.log(res)
                this.setState({eventsList: res.data.allEvents})})
            .catch(function(error){if(!error.error);});
    }


    handleAttendClick(eventId){

        if(localStorage.curUsername === ""){
            console.log("Please Sign In");
            return;
        }

        let data = {
            username: localStorage.curUsername,
            id: eventId
        }

        axios.post(backEndURL + 'attendEvent', data)
            .then(res =>{
                if(res.data !== "") this.setState({myAttendingEvents: res.data})
                else console.log("Couldn't Add User to Event")
            })
            .catch(function(error){if(!error.error);})
    }

    handleCancelClick(eventId){
        // Delete from Attedning List
        let data = {
            username: localStorage.curUsername,
            id: eventId
        }

        axios.post(backEndURL + "cancelAttend", data)
            .then(res =>this.setState({myAttendingEvents: res.data}))
            .catch(function(error){if(!error.error);})
    }

    render(){
        let myAttendingEvents = this.state.myAttendingEvents;
        let allEvents = this.state.eventsList.filter((event) => {
            if(!myAttendingEvents.find((myAEvent)=>{
                return myAEvent.id === event.id; }))
                return event;
                
            return null;
        });

        let events = allEvents.map((element, index) => {
            return(
                <div key={index} className="aEventBox card" >
                    <div className="card-header textSide">
                        <h3 className="cardTitle">{element.title}</h3>
                    </div>
                    <div className="card-body">
                        <div className="row cardBody">
                            <div className="col-sm-9 cardText">
                                <p>{element.description}</p>
                                {/* <h4>{element.location}</h4> */}

                                <div className="input-group inputGroup">
                                    <span className="input-group-addon glyphicon glyphicon-map-marker"> </span>
                                    <input className="form-control" placeholder={element.location} type="text" readOnly/>
                                    {/* <h5>{element.date}</h5> */}
                                </div>
                                
                                <div className="input-group inputGroup">
                                    <span className="input-group-addon glyphicon glyphicon-hourglass"></span>
                                    <input className="form-control" placeholder={element.date} type="text" readOnly/>
                                    <input className="form-control" placeholder={element.timedate} type="text" readOnly/>
                                </div>
                            
                            </div>
                            <div className="col-sm-3 cardButton">
                                <button onClick={()=>{this.handleAttendClick(element.id)}} className="btn btn-info btn-block cardButton">Attend</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        let attending = myAttendingEvents.map((element, index) => {
            return(  
            <div key={index} className="aEventBox card" >
                <div className="card-header textSide">
                    <h3 className="cardTitle">{element.title}</h3>
                </div>
                <div className="card-body">
                    <div className="row cardBody">
                        <div className="col-sm-9 cardText">
                            <p>{element.description}</p>
                            {/* <h4>{element.location}</h4> */}

                            <div className="input-group inputGroup">
                                <span className="input-group-addon glyphicon glyphicon-map-marker"> </span>
                                <input className="form-control" placeholder={element.location} type="text" readOnly/>
                                {/* <h5>{element.date}</h5> */}
                            </div>
                            
                            <div className="input-group inputGroup">
                                <span className="input-group-addon glyphicon glyphicon-hourglass"></span>
                                <input className="form-control" placeholder={element.date} type="text" readOnly/>
                                <input className="form-control" placeholder={element.timedate} type="text" readOnly/>
                            </div>
                        
                        </div>
                        <div className="col-sm-3 cardButton">
                            <button name={element.id} onClick={()=>{this.handleCancelClick(element.id)}} className="btn btn-danger btn-block cardButton">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>)
        })

        return(
            <div className="FindPickUpBody container">
                <div className="mapNews">
                    <div className="headerBox">
                        <h2>MAPPP </h2>
                    </div>
                    <GoogleMap 
                        events={this.state.eventsList}
                        myEvents={this.state.myAttendingEvents}
                    />
                </div>

                <div className="headerBox">
                    <h2>FindPickUp Body</h2>
                </div>
                <div className="newsFeed">
                    {events}
                </div>

                <div className="headerBox">
                    <h2>What I'm attending</h2>
                </div>
                <div className="newsFeed" >
                    {attending}
                </div>
            </div>
        );
    }
}

export default FindPickUp;
