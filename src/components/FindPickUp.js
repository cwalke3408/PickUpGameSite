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
        console.log(this.props.route);
        
        if(localStorage.curUsername !== ""){
            // console.log(localStorage.curUsername);
            let data = {
                username: localStorage.curUsername
            }
    
            axios.post("http://localhost:8080/userEvents", data)
                .then((res) => {
                    // console.log(res.data)
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

        // console.log(localStorage.currUsername);


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

        axios.post("http://localhost:8080/attendEvent", data)
            .then((res) => {
                // console.log("=== After Attedning ===");
                // console.log(res);
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
                // console.log("=== After Cancel ===")
                // console.log(res);
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
                                <button onClick={(e)=>{this.handleAttendClick(element.id)}} className="btn btn-info btn-block cardButton">Attend</button>
                            </div>
                        </div>
                    </div>
                </div>
                // <div key={key} className="aEventBox">
                //     <h4>{aEvent.title}</h4>
                //     <h4>{aEvent.timedata}</h4>
                //     <h4>{aEvent.location}</h4>
                //     <h4>{aEvent.description}</h4>
                //     <button className="btn btn-info" onClick={()=>{this.handleAttendClick(aEvent.id)}}>Attend</button>
                // </div>
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
                            <button name={element.id} onClick={(e)=>{this.handleClick(e)}} className="btn btn-danger btn-block cardButton">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>)
            // return(
            //     <div key={key} className="aEventBox">
            //         <h4>{aEvent.title}</h4>
            //         <h4>{aEvent.timedata}</h4>
            //         <h4>{aEvent.location}</h4>
            //         <h4>{aEvent.description}</h4>
            //         <button className="btn btn-danger" onClick={()=>{this.handleCancelClick(aEvent.id)}}>Cancel</button>
            //     </div>
            // )
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
