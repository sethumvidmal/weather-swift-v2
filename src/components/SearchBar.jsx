import { useState, useCallback, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Autocomplete,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme as useAppTheme } from "../hooks/useTheme";
import { searchLocations } from "../services/api";

const SearchWrapper = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1000,
  padding: theme.spacing(2),
  backdropFilter: "blur(10px)",
  display: "flex",
  alignItems: "center",
  gap: 2,
  backgroundColor: theme.palette.mode === "dark" 
    ? "rgba(0, 0, 0, 0.3)" 
    : "rgba(255, 255, 255, 0.3)",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.palette.mode === "dark"
    ? "0 4px 30px rgba(0, 0, 0, 0.1)"
    : "0 4px 30px rgba(255, 255, 255, 0.1)",
  border: `1px solid ${theme.palette.mode === "dark" 
    ? "rgba(255, 255, 255, 0.1)" 
    : "rgba(209, 213, 219, 0.3)"}`
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    background: "transparent",
    "& fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.23)"
          : "rgba(0, 0, 0, 0.23)",
    },
    "&:hover fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.4)"
          : "rgba(0, 0, 0, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor:
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.7)"
          : "rgba(0, 0, 0, 0.7)",
    },
  },
  "& .MuiAutocomplete-paper": {
    background:
      theme.palette.mode === "dark"
        ? "rgba(0, 0, 0, 0.8)"
        : "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
  },
}));

const SearchBar = ({ onLocationSelect }) => {
  const theme = useTheme();
  const { darkMode, toggleTheme } = useAppTheme();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const lastRequestTime = useRef(0);
  const typingTimeout = useRef(null);

  const fetchLocations = useCallback(async (query) => {
    if (!query) {
      setOptions([]);
      return;
    }

    const now = Date.now();
    if (now - lastRequestTime.current < 1000) {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      typingTimeout.current = setTimeout(() => fetchLocations(query), 500);
      return;
    }

    setLoading(true);
    lastRequestTime.current = now;

    try {
      const locations = await searchLocations(query);
      setOptions(locations || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedFetchLocations = useCallback(
    (query) => {
      const debouncedFn = debounce((q) => fetchLocations(q), 500, {
        leading: false,
        trailing: true,
      });
      debouncedFn(query);
      return debouncedFn;
    },
    [fetchLocations]
  );

  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      const debouncedFn = debouncedFetchLocations("");
      debouncedFn.cancel();
    };
  }, [debouncedFetchLocations]);

  const handleInputChange = useCallback(
    (event, newInputValue) => {
      setInputValue(newInputValue);
      debouncedFetchLocations(newInputValue);
    },
    [debouncedFetchLocations]
  );

  const handleLocationChange = (event, newValue) => {
    setSelectedOption(newValue);
    if (newValue) {
      onLocationSelect(newValue);
      setInputValue(newValue.name);
    }
  };

  const handleSearchClick = () => {
    if (inputValue) {
      if (!selectedOption) {
        const option = options.length > 0 ? options[0] : { name: inputValue, country: '' };
        setSelectedOption(option);
        onLocationSelect(option);
      } else {
        onLocationSelect(selectedOption);
      }
    }
  };

  const isOptionEqualToValue = (option, value) => {
    if (!option || !value) return false;
    return option.name === value.name && option.country === value.country;
  };

  return (
    <SearchWrapper>
      <StyledAutocomplete
        fullWidth
        loading={loading}
        options={options}
        inputValue={inputValue}
        value={selectedOption}
        onInputChange={handleInputChange}
        onChange={handleLocationChange}
        isOptionEqualToValue={isOptionEqualToValue}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : option
            ? `${option.name}, ${option.country}`
            : ""
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search location..."
            sx={{
              "& .MuiInputBase-input": {
                color: theme.palette.mode === "dark" ? "white" : "black",
              },
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleSearchClick}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchClick();
              }
            }}
          />
        )}
        filterOptions={(x) => x}
        noOptionsText="No locations found"
        loadingText="Searching..."
      />
      <IconButton onClick={toggleTheme} color="inherit" sx={{ flexShrink: 0 }}>
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </SearchWrapper>
  );
};

SearchBar.propTypes = {
  onLocationSelect: PropTypes.func.isRequired,
};

export default SearchBar;
