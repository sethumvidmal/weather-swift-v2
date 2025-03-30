import React, { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../hooks/useTheme';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const { darkMode, toggleTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        width: '100%', 
        maxWidth: 500, 
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}
    >
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
      <IconButton 
        onClick={toggleTheme}
        sx={{ 
          backgroundColor: 'background.paper',
          '&:hover': { backgroundColor: 'background.paper' },
        }}
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default SearchBar;
