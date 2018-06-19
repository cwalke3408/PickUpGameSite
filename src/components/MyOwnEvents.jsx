import React, { Component } from 'react';

class MyOwnEvents extends Component{

    handleClick(e){
        this.props.onDeleteClick(e);
    }

    render(){
        let table = this.props.myEvents.map((element, index) => {
            return  <div key={index} className="attendingElement" >
                    <h3>{element.title}</h3>
                    <p>{element.description}</p>
                    <h4>{element.location}</h4>
                    <h4>{element.time}</h4>
                    <button name={index} onClick={(e)=>{this.handleClick(e)}} className="btn btn-danger">Delete</button>
                </div>
        });

        return(
            <div className="attendingBody">{table}</div>
        )
    }
}

export default MyOwnEvents;