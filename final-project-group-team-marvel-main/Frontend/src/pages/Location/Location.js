import React, { useState } from "react";
import { getPlacesData } from "../../services/index";
import Header from "../../components/Map_Header/Header";
import List from "../../components/Map_List/List";
import Map from "../../components/Map/Map";
import "./location.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";

// Location Page
function Location() {
  const theme = createTheme();

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  // Loads the current Location of the user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  // Filters the places based on the rating
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  //Loads the bounds location
  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, coordinates, bounds]);
  return (
    <ThemeProvider theme={theme}>
      <div className="location">
        <Header setCoordinates={setCoordinates} />
        <div className="location-content">
          <div className="location-list">
            <List
              places={filteredPlaces.length ? filteredPlaces : places}
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </div>
          <div className="location-map">
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={filteredPlaces.length ? filteredPlaces : places}
              setChildClicked={setChildClicked}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Location;
