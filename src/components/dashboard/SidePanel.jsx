import {
  Box, List, ListItemButton, Typography,
} from '@mui/material';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { IoCalendarNumberSharp } from 'react-icons/io5';
import { GiOpenBook } from 'react-icons/gi';
import { HiTicket } from 'react-icons/hi';
import textLogo from '../../../assets/text_logo.svg';

function ListItem({ isActive = false, children }) {
  return (
    <ListItemButton
      sx={{
        py: isActive ? 1.5 : 1,
        my: 1,
        pl: 3,
        borderTopLeftRadius: 32,
        borderBottomLeftRadius: 32,
        bgcolor: isActive ? '#E8EDF4' : 'transparent',
        color: isActive ? 'primary.main' : '#ffffff',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          bgcolor: isActive ? 'secondary.light' : 'primary.light',
          color: isActive ? 'primary.dark' : '#ffffff',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
        component={Typography}
        variant="h6"
      >
        {children}
      </Box>
    </ListItemButton>
  );
}

function SidePanel() {
  return (
    <Box
      sx={{
        width: 'min(280px,20vw)',
        borderTopRightRadius: 32,
        bgcolor: 'primary.main',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '135px',
          py: 3,
          position: 'relative',
          bgcolor: 'primary.dark',
        }}
      >
        <img
          src={textLogo}
          alt="logo"
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        />
      </Box>

      <Box sx={{ pl: 'min(24px,5vw)', py: 3 }}>
        <List>
          <ListItem isActive>
            <FaUser />
            Users
          </ListItem>
          <ListItem>
            <GiOpenBook />
            Courses
          </ListItem>

          <ListItem>
            <IoCalendarNumberSharp />
            Scheduled Slots
          </ListItem>

          <ListItem>
            <HiTicket />
            Vouchers
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default SidePanel;
