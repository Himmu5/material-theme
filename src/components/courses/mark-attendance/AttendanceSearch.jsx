import {
  Autocomplete, Box, InputAdornment, TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

function AttendanceSearch({ keys = [] }) {
  const [searchKey, setSearchKey] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  //   const orderIds = keys.length > 0 ? keys.map((order) => order?.no) : [];

  const handleSearchClick = (e, newValue) => {
    setSearchKey(newValue);
    console.log(newValue);

    // if (newValue !== null && orderIds.find((orderId) => orderId === newValue)) {
    //   console.log(orderIds.find((orderId) => orderId === newValue));

    //   navigate(`/marketing/keys/order/${newValue}`, {
    //     state: { keys },
    //   });
    // } else if (newValue !== null) setNotFound(true);
  };

  return (
    <Box sx={{
      width: '100%', my: 1, display: 'flex', alignItems: 'stretch',
    }}
    >
      <Autocomplete
        sx={{ flexGrow: 1 }}
        freeSolo
        fullWidth
        size="small"
        value={searchKey}
        onChange={handleSearchClick}
        inputValue={inputValue}
        onInputChange={(e, newValue) => {
          setNotFound(false);
          setInputValue(newValue);
        }}
        options={keys}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{ sx: { pl: 4.5 }, shrink: false }}
            label={inputValue === '' ? 'Search' : ''}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}

export default AttendanceSearch;
