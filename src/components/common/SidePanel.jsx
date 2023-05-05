/* eslint-disable react/jsx-props-no-spreading */
import {
  Box, List, ListItemButton, Typography,
} from '@mui/material';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { IoCalendarNumberSharp } from 'react-icons/io5';
import { GiOpenBook } from 'react-icons/gi';
import { HiTicket } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import textLogo from '../../../assets/text_logo.svg';

function ListItem({ isActive = false, children, ...props }) {
  return (
    <ListItemButton
      {...props}
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
          bgcolor: isActive ? 'rgba(255,255,255,0.85)' : 'primary.light',
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

const pages = [
  { icon: <FaUser />, name: 'Users', path: 'users' },
  { name: 'Courses', icon: <GiOpenBook />, path: 'courses' },
  { name: 'Scheduled Slots', icon: <IoCalendarNumberSharp />, path: 'scheduled-slots' },
  { icon: <HiTicket />, name: 'Vouchers', path: 'vouchers' },
];

function SidePanel() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 'min(280px,20vw)',
        minWidth: '280px',
        borderTopRightRadius: 32,
        bgcolor: 'primary.main',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
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
          {pages.length > 0
            && pages.map((page) => (
              <ListItem
                key={page.name}
                onClick={() => navigate(`/dashboard/${page.path}`)}
                isActive={location.pathname.includes(`/dashboard/${page.path}`)}
              >
                {page.icon}
                {page.name}
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
}

export default SidePanel;
