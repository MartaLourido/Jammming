import React from 'react';
import Track from '../Track/Track.js';

import './TrackList.css';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {
         
             <Track 
              Track={Track}
              key={Track.id}
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
              isRemoval={this.props.isRemoval}
            />
          })
        
      </div>
    )
  }
}

export default TrackList;