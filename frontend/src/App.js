import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';

import './App.css';

function App() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 46,
    longitude: 17,
    zoom: 4
  });

  const handlingMapOnChange = nextViewport => setViewport(nextViewport);

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={handlingMapOnChange}
        mapStyle="mapbox://styles/jokerbyakko/ckurjdfqr0euz15o0wnzx3yyh"
      >
        <Marker latitude={48.858093} longitude={2.294694} offsetLeft={-20} offsetTop={-10}>
          <RoomIcon
            style={{ fontSize: viewport.zoom * 7, color: 'slateblue' }}
          />
        </Marker>
        {/* <Popup
          latitude={48.858093}
          longitude={2.294694}
          closeButton={true}
          closeOnClick={false}
          anchor="left" >
          <div className="Card">
            <label>Place</label>
            <h4 className="Card-placeName">Eiffell Tower</h4>
            <label>Review</label>
            <p className="Card-description">Beautiful place. I like it.</p>
            <label>Rating</label>
            <div className="Card-rating">
              <StarIcon className="Card-ratingIcon" />
              <StarIcon className="Card-ratingIcon" />
              <StarIcon className="Card-ratingIcon" />
              <StarIcon className="Card-ratingIcon" />
              <StarIcon className="Card-ratingIcon" />
            </div>
            <label>Information</label>
            <span className="Card-usernameAuthor"> Created by <b>CosmicTiger</b></span>
            <span className="Card-publicationDate">1 hour ago</span>
          </div>
        </Popup> */}
      </ReactMapGL>
    </div>
  );
}

export default App;
