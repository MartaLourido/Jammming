import React, { Component } from 'react'

export default class Playlist extends Component {
    render() {
        return (
            <div className="Playlist">
            <input defaultValue={'New Playlist'}/>
            <!-- Add a TrackList component -->
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
          </div>
        )
    }
}
