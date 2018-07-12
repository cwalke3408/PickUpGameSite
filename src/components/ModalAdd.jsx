import React, { Component } from 'react';
import axios from 'axios';
// import apiKey from './key_creds.js';
import DatePicker from 'react-date-picker';
import backEndURL from '../backEndURL';



class ModalAdd extends Component{
    constructor(props){
        super(props);

        this.state = {
            time: "",
            city: "",
            loc_state: "",
            address: "",
            location: '',
            title: '',
            description: '',
            date: ""
        }

    }

    handleCancel(e){
        this.props.onCancel();

    }
    handleSubmit(e){
        let newEventEntry = {
            city: false,
            loc_state: false,
            address: false,
            date: false,
            time: false,
            title: false,
            description: false
        }


        // Validation
        newEventEntry.city = this.state.city === "" ? (false) : this.state.city;
        newEventEntry.loc_state = this.state.loc_state === "" ? (false) : this.state.loc_state;
        newEventEntry.address = this.state.address === "" ? (false) : this.state.address;
        newEventEntry.time = this.state.time === "" ? (false) : this.state.time;
        newEventEntry.date = this.state.date === "" ? (false) : this.state.date;
        newEventEntry.title = this.state.title === '' ? (false) : this.state.title;
        newEventEntry.description = this.state.description === '' ? (false) : this.state.description;

        if(Object.values(newEventEntry).indexOf(false) !== -1){
            console.log("Plese enter all entries");
            return;
        }

        let dateSplited = this.state.date.toString().split(' ');
        let theDate = dateSplited.splice(0, 4).join(' ');
        let location =  newEventEntry.address +","+newEventEntry.city +","+ newEventEntry.loc_state;
        this.props.listEvent.push(newEventEntry);
        this.props.onSubmit();

 
        axios({
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=+${location}&key=${process.env.REACT_APP_apiKey}`
        }).then(geoData => {
            console.log(geoData.data.results[0].geometry.location)

            let data =  {
                Id: 0,
                title: newEventEntry.title,
                timedate: newEventEntry.time,
                date: theDate,
                location: geoData.data.results[0].formatted_address,
                description: newEventEntry.description,
                author: localStorage.curUsername,
                count: 1,
                lat: geoData.data.results[0].geometry.location.lat,
                lng: geoData.data.results[0].geometry.location.lng
            }


            axios.post(backEndURL + "addEvent", data)
            .then(res => this.props.onListChange(res.data.ownEvents))
            .catch(function(error) {if (!error.error);});
        })

        // Clear State variables
        this.setState({
            title: "",
            city: "",
            loc_state: "",
            address: "",
            date: "",
            time: "",
            description: ""
        })
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleListChange(val){
        this.props.onListChange(val);
    }

    onChange = date => this.setState({ date })

    render(){
        if(!this.props.show) return null;

        return(
            <div className="modalBackDrop">
                <div className="modalForeDrop">
                    <h1>Modal</h1>

                    <div className="form-group">
                        <label>Event Title</label>      
                        <input onChange={(e)=>{this.handleChange(e)}} name="title" className="form-control" type="text" />
                    </div>

                    <div className="form-group">
                        <label>Address of Event</label>                   
                        <input onChange={(e)=>{this.handleChange(e)}} name="address" className="form-control" type="text" />
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-9">
                            <label>City</label>
                            <input onChange={(e)=>{this.handleChange(e)}} name="city" className="form-control" type="text" />    
                        </div>
                    
                        <div className="form-group col-md-3">
                            <label>State</label>
                            <input onChange={(e)=>{this.handleChange(e)}} name="loc_state" className="form-control" type="text" />             
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Time</label>
                            <input onChange={(e)=>{this.handleChange(e)}} name="time" className="form-control" type="text" />
                        </div>
                        
                        <div className='form-group date col-md-6'>
                            <label>Date</label>                  
                            <DatePicker
                                onChange={this.onChange}
                                value={this.state.date}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>                   
                        <input onChange={(e)=>{this.handleChange(e)}} name="description" className="form-control" type="text" />
                    </div>

                    <button name="Submit" onClick={(e)=>{this.handleSubmit(e)}} className="btn btn-success">Submit</button>
                    <button name="cancel" onClick={(e)=>{this.handleCancel(e)}} className="btn btn-warning">Cancel</button>                
                
                </div>
            </div>
        )
    }
}
export default ModalAdd;