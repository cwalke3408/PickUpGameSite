import React, { Component } from 'react';
import axios from 'axios';
import apiKey from './key_creds.js';


class ModalAdd extends Component{
    constructor(props){
        super(props);

        this.state = {
            time: "",
            location: '',
            title: '',
            description: ''
        }

    }

    handleCancel(e){
        this.props.onCancel();

    }
    handleSubmit(e){
        let newEventEntry = {
            time: false,
            location: false,
            title: false,
            description: false
        }

        newEventEntry.time = this.state.time === "" ? (false) : this.state.time;
        newEventEntry.location = this.state.location === '' ? (false) : this.state.location;
        newEventEntry.title = this.state.title === '' ? (false) : this.state.title;
        newEventEntry.description = this.state.description === '' ? (false) : this.state.description;

        if(Object.values(newEventEntry).indexOf(false) !== -1){
            console.log("Plese enter all entries");
            return;
        }

        this.props.listEvent.push(newEventEntry);
        this.props.onSubmit();




            
            
        axios({
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=+${this.state.location}&key=${apiKey}`
        }).then(geoData => {
            console.log(geoData.data.results[0].geometry.location)

            let data =  {
                Id: 0,
                title: this.state.title,
                timedate: this.state.time,
                location: this.state.location,
                description: this.state.description,
                author: localStorage.curUsername,
                count: 1,
                lat: geoData.data.results[0].geometry.location.lat,
                lng: geoData.data.results[0].geometry.location.lng
            }

            axios.post("http://localhost:8080/addEvent", data)
            .then((res) => {console.log("res: "); console.log(res);})
            .catch(function(error) {if (!error.error); });

        })
    
        




        // this.setState({
        //     time: '',
        //     location: '',
        //     title: '',
        //     description: ''
        // });
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        if(!this.props.show) return null;

        return(
            <div className="modalBackDrop">
                <div className="modalForeDrop">
                    <h1>Modal</h1>

                    <h3>Event Title</h3>      
                    <input onChange={(e)=>{this.handleChange(e)}} name="title" type="text" />             
                    <h3>Address of Event</h3>                   
                    <input onChange={(e)=>{this.handleChange(e)}} name="location" type="text" />
                    <h3>Date</h3>                  
                    <input onChange={(e)=>{this.handleChange(e)}} name="time" type="text" />
                    <h3>Description</h3>                   
                    <input onChange={(e)=>{this.handleChange(e)}} name="description" type="text" />
                </div>
                <button name="Submit" onClick={(e)=>{this.handleSubmit(e)}} className="btn btn-success">Submit</button>
                <button name="cancel" onClick={(e)=>{this.handleCancel(e)}} className="btn btn-warning">Cancel</button>
            </div>
        )
    }
}
export default ModalAdd;