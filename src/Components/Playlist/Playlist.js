import React, { Component } from 'react'
import TrackList from '../TrackList/TrackList.js';
import './PlayList.css';


export default class PlayList extends Component {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="PlayList">
                <input
                    defaultValue={'New PlayList'}
                    onChange={this.handleNameChange}
                />
                <TrackList
                    tracks={this.props.PlayListTracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true}
                />
                <button onClick={this.props.onSave} className="PlayList-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}
