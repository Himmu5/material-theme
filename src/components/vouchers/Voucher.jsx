import React from 'react';
import './voucher.css';
import { Box, Typography } from '@mui/material';
import { TiTick } from 'react-icons/ti';

function Voucher({ selectable, select }) {
  return (
    <Box
      sx={{
        width: 230,
        height: 115,
        px: 2.5,
        py: 1.5,
        bgcolor: '#fff',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        '&:hover': { transform: 'scale(1.08)' },
      }}
      onClick={() => select()}
    >
      {selectable && (
        <Box
          sx={{
            position: 'absolute',
            left: -10,
            top: -10,
            width: 20,
            height: 20,
            bgcolor: '#fff',
            borderRadius: '50%',
            border: '1px solid #D9D9D9',
            transform: selectable ? 'scale(1)' : 'scale(0)',
            transition: 'all 0.3s ease-in-out',
            fontSize: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.dark',
          }}
        >
          <TiTick />
        </Box>
      )}

      <Typography variant="body1" fontWeight={500} color="primary.main">
        First500
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'end', gap: 0.2 }}>
        <Typography variant="h1" fontWeight={700} color="#091931">
          33%
        </Typography>
        <Typography variant="body1" sx={{ mb: 1.4 }} color="text.secondary" fontWeight={500}>
          OFF
        </Typography>
      </Box>

      <Box
        className="voucher-end"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: 115,
          width: 45,
          display: 'flex',
          alignItems: 'end',
          flexDirection: 'column',
        }}
      >
        <div className="voucher-circ" />
        <div className="voucher-circ" />
        <div className="voucher-circ" />
        <div className="voucher-circ" />
        <div className="voucher-circ" />
        <div className="voucher-circ" />
        <div className="voucher-circ" />
        <div className="voucher-circ" />
        <div className="voucher-circ" />
        <div className="voucher-circ" />
        <div className="voucher-circ" />
        <div className="voucher-circ" />
      </Box>
    </Box>
  );
}

export default Voucher;
