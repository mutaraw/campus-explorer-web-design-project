import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';


import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles.js';


// the details of the places given in a card 
const List = ({places, childClicked, isLoading, type, setType, rating, setRating }) => {
  
  const classes = useStyles();

  
  const[elRefs, setElRefs] = useState([])

  useEffect(() => {
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  

  return (
    <div className={classes.container}>
      <Typography variant="h4" style={{ marginBottom:'10px'}}>Restaurants, Hotels and Attractions around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
        
          <FormControl className={classes.formControl}>
            <InputLabel >Type</InputLabel>
            <Select labelId="type" id="type" label='type' value={type} onChange={(e) => setType(e.target.value)} style={{ marginRight: '20px', marginBottom: '30px',  }}>
              
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel >Rating</InputLabel>
            <Select labelId="rating" id="rating" label="rating" value={rating} onChange={(e) => setRating(e.target.value)} style={{ marginRight: '20px', marginBottom: '30px',  }}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}> 
                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} /> 
              </Grid>
            ))}
          </Grid>
          
       </> 
     )}
    </div>
  );
};

export default List;


