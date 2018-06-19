import React, { Component } from 'react';

class MyOwnEvents extends Component{
    constructor(props){
        super(props);

    }

    render(){
        console.log("=====")
        console.log(this.props.myEvents)
        let table = this.props.myEvents.map((element, index) => {
            return  <div key={index} className="attendingElement" >
                    <h3>{element.title}</h3>
                    <p>{element.description}</p>
                    <h4>{element.location}</h4>
                    <h4>{element.time}</h4>
                </div>
        });

        return(
            <div className="attendingBody">{table}</div>
        )
    }
}

export default MyOwnEvents;