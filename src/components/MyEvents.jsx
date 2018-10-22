import React, { Component } from 'react';
import MyOwnEvents from './MyOwnEvents';
// import MyAttendingEvents from './MyAttendingEvents';
import ModalAdd from './ModalAdd';
import axios from 'axios';
import backEndURL from '../backEndURL';


class MyEvents extends Component{
    constructor(props){
        super(props);

        this.state = {
            myOwnEvents: [],
            myAttendingEvents: [],
            show: false
        }

        this.handleListChange = this.handleListChange.bind(this);
    }

    componentDidMount(){

        // console.log(localStorage.curUsername);
        let data = {
            username: localStorage.curUsername
        }

        axios.post(backEndURL + "userEvents", data)
            .then((res) => {
                // console.log(res.data)
                // console.log(this.props.history);
                // console.log(localStorage);
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

    handleCancelClick(e){
        let data = {
            username: localStorage.curUsername,
            id: e.target.name
        }

        axios.post(backEndURL + "cancelAttend", data)
            .then((res) => {
                this.setState({myAttendingEvents: res.data})
            }).catch(function(error){if(!error.error);})
    }

    handleDeleteClick(e){
        let data = {
            username: localStorage.curUsername,
            id: e.target.name
        }

        axios.post(backEndURL + "deleteEvent", data)
            .then((res) => {
                // console.log(res)
                this.setState({
                    myOwnEvents: res.data.ownEvents,
                    myAttendingEvents: res.data.attendingEvents
                })
            }).catch(function(error){if(!error.error);})
        // eventsList.splice(e.target.name,1);
        // this.setState({
        //     myOwnEvents: eventsList
        // })
    }

    handleSubmit(){
        this.setState({show: false});
    }
    handleCancel(){
        this.setState({show: false});
    }

    handleListChange(listOfOwnEvents){
        this.setState({myOwnEvents: listOfOwnEvents});
    }

    render(){
        let table = this.state.myAttendingEvents.map((element, index) => {

            return  <div key={index} className="aEventBox card" >
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
                        <button name={element.id} onClick={(e)=>{this.handleCancelClick(e)}} className="btn btn-danger btn-block cardButton">Delete</button>
                    </div>
                </div>
            </div>
        </div>

            // return <div key={index} className="card aEventBox row" >
            //     <div className="col-sm-9 textSide">
            //         <div className="card-header">
            //             <h3 className="card-title cardTitle">{element.title}</h3>
            //         </div>
            //         <p>{element.description}</p>
            //         <h4>{element.location}</h4>
            //         <h4>{element.time}</h4>
            //     </div>
            //     <div className="cardButton col-sm-3">
            //         <button className="btn btn-danger" onClick={()=>{this.handleCancelClick(element.id)}}>Cancel</button>
            //     </div>
            // </div>
        });

        return(
            <div className="FindPickUpBody container">
                <ModalAdd
                    show={this.state.show} 
                    listEvent={this.state.myOwnEvents}
                    onCancel={()=>{this.handleCancel()}}
                    onSubmit={()=>{this.handleSubmit()}}
                    onListChange={this.handleListChange}    
                />

                <div className="headerBox">
                    <h2>My Events</h2>
                </div>
                
                <MyOwnEvents
                    myEvents={this.state.myOwnEvents} 
                    onDeleteClick={(e)=>{this.handleDeleteClick(e)}}
                />
                <button onClick={(e)=>{this.handleAddClick(e)}} className="btn btn-info btn-block">Add Event</button>

                <div className="headerBox">
                    <h2>Attending Events</h2>
                </div>
                <div className="newsFeed">
                    {table}
                </div>
            </div>
        )
    }
}

export default MyEvents;