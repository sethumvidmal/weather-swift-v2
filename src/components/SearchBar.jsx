import React, { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 500, margin: '0 auto' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            backgroundColor: 'background.paper',
            borderRadius: 2,
          }
        }}
      />
    </Box>
  );
};

export default SearchBar;
