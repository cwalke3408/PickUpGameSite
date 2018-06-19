import React, { Component } from 'react';

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
        console.log(newEventEntry)
        console.log(this.state)

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

        this.setState({
            time: '',
            location: '',
            title: '',
            description: ''
        });

        // {
        //     time: "9",
        //     location: "Smyrna, GA",
        //     title: "Baseball?",
        //     description: "Let the double faults begin!!!"
        // }
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