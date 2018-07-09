import React, { Component } from 'react';

class InfoWindowDiv extends Component{

    render(){
        console.log(this.props.selectedPlace);
        return(
            <div className="card infoOuter">
                <div className="card-header infoTitle">
                    <h5 className="cardTitle">{this.props.selectedPlace.title}</h5>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <p>{this.props.selectedPlace.description}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-10 offset-xs-1">
                        {/* <span className="input-group-addon glyphicon glyphicon-map-marker"> </span> */}
                        {/* <input className="form-control" placeholder={this.props.selectedPlace.location} type="text" readOnly/> */}
                        <p>{this.props.selectedPlace.location}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-10 offset-sm-1">
                        {/* <span className="input-group-addon glyphicon glyphicon-hourglass"></span> */}
                        {/* <input className="form-control" placeholder={this.props.selectedPlace.timedate +" "+this.props.selectedPlace.date} type="text" readOnly/> */}
                        <p>{this.props.selectedPlace.timedate +" "+ this.props.selectedPlace.date}</p>
                    </div>
                {/* <input className="form-control" placeholder={this.props.selectedPlace.date} type="text" readOnly/> */}

                </div>
            </div>
        )
    }
}

export default InfoWindowDiv;