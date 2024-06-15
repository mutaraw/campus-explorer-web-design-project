import React, {useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import './Header.scss';


// Header for the Map Location goes here
const Header = ({setCoordinates}) => {

  const[autocomplete, setAutocomplete] = useState([])

  const onLoad = (autoC) => setAutocomplete(autoC)

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({lat, lng});
  }

  return (
    <AppBar position="static">
      <Toolbar className="toolbar">
        <Typography variant="h5" className="title">
          Places to visit
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className="title">
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} >
            <div className="search">
              <div className="searchIcon">
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" classes={{ root: 'inputRoot', input: 'inputInput' }} />
            </div>
          </Autocomplete>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
