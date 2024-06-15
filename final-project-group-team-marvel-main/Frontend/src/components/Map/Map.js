import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Rating } from '@mui/material';
import { useMediaQuery } from '@mui/material';

import mapStyles from './mapStyles'
import useStyles from './styles.js';

// Google Maps api and shows the current location
const Map = ({ setCoordinates,setBounds, coordinates, places, setChildClicked}) => {
  const isDesktop = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDHtISiyXBympMhAS9UWTIKMYX0A6KZX8o' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
        onChange={(e) => {
            console.log(e)
            setCoordinates({ lat: e.center.lat, lng: e.center.lng})
            setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place,i) => (
          <div className={classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}
           >
            {
              !isDesktop ? (
                <LocationOnOutlinedIcon color='primary' fontSize='large'/>
              ): (
                <Paper elevation={3} className={classes.paper} >
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )
            }
          </div>
        )) }
      </GoogleMapReact>
    </div>
  );
};

export default Map;


