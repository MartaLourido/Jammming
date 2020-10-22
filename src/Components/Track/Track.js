import React, { Component } from 'react'
import './Track.css';

export default class Track extends Component {

  constructor (props) {
    super(props)
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

   addTrack() {
    this.props.onAdd(this.props.Track)
  }

//   //
// In the Track.js - element, add an onClick property with the value set to the this.removeTrack method
  renderAction() {
    if (this.props.isRemoval) {
      return <button className="Track-action" onClick={this.removeTrack}>-</button>
    } else {
      return <button className="Track-action" onClick={this.addTrack}>+</button>
    }
  }

  removeTrack() {
    this.props.onRemove(this.props.Track)
  }


  render() {
    return (
      <div className="Track">
      <div className="Track-information">
        <h3>{this.props.Track.name}</h3>
        <p>{this.props.Track.artist} | {this.props.Track.album}</p>
      </div>
      {this.renderAction()}
    </div>
    )
  }
}
