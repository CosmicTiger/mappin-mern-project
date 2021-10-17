import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { format } from 'timeago.js';

import './App.css';

function App() {
  const currentUser = "reiner";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [rating, setRating] = useState(0);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 46,
    longitude: 17,
    zoom: 4
  });

  const fillingOptions = () => {
    const rowsOptions = [];
    for (let i = 1; i <= 5; i++) {
      rowsOptions.push(<option key={i} value={i}>{i}</option>)
    }

    return rowsOptions
  }

  const handlingMapOnChange = nextViewport => setViewport(nextViewport);
  const handleMarkerClick = (id, latitude, longitude) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude, longitude });
  }

  const handleAddPinClick = e => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      latitude,
      longitude
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      description,
      rating,
      latitude: newPlace.latitude,
      longitude: newPlace.longitude,
    }

    try {
      const response = await axios.post("/pins", newPin);
      setPins([...pins, response.data]);
      setNewPlace(null);
    }
    catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get('/pins');
        setPins(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getPins();
  }, [])

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={handlingMapOnChange}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        onDblClick={handleAddPinClick}
        transitionDuration="200"
      >
        {
          pins && pins.map(pin => (
            <>
              <Marker
                latitude={pin.latitude}
                longitude={pin.longitude}
                offsetLeft={-viewport.zoom * 3.5}
                offsetTop={-viewport.zoom * 7}>
                <RoomIcon
                  style={{
                    fontSize: viewport.zoom * 7,
                    color: pin.username === currentUser ? 'tomato' : 'slateblue',
                    cursor: "pointer"
                  }}
                  onClick={() => handleMarkerClick(pin._id, pin.latitude, pin.longitude)}
                />
              </Marker>
              {pin._id === currentPlaceId &&
                <Popup
                  latitude={pin.latitude}
                  longitude={pin.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                  anchor="left">
                  <div className="Card">
                    <label>Place</label>
                    <h4 className="Card-placeName">{pin.title}</h4>
                    <label>Review</label>
                    <p className="Card-description">{pin.description}</p>
                    <label>Rating</label>
                    <div className="Card-rating">
                      {Array(pin.rating).fill(<StarIcon className="Card-ratingIcon" />)}
                    </div>
                    <label>Information</label>
                    <span className="Card-usernameAuthor"> Created by <b>{pin.username}</b></span>
                    <span className="Card-publicationDate">{format(pin.createdAt)}</span>
                  </div>
                </Popup>
              }
            </>
          ))
        }
        {newPlace && (
          <Popup
            latitude={newPlace.latitude}
            longitude={newPlace.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="left">
            <div>
              <form
                onSubmit={handleSubmit}
              >
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  type="text"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)} />
                <label>Review</label>
                <input
                  placeholder="Say your opinions about this place"
                  type="text"
                  name="review"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>Rating</label>
                <select
                  onChange={(e) => setRating(e.target.value)}
                >
                  {fillingOptions()}
                </select>
                <button className="submitButton" type="submit">Add Pin</button>
              </form>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
