import React, { Component } from 'react';

class MyOwnEvents extends Component{

    handleClick(e){
        this.props.onDeleteClick(e);
    }

    render(){
        let table = this.props.myEvents.map((element, index) => {
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
                                <button name={element.id} onClick={(e)=>{this.handleClick(e)}} className="btn btn-danger btn-block cardButton">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
        });

        return(
            <div className="newsFeed">{table}</div>
        )
    }
}

export default MyOwnEvents;