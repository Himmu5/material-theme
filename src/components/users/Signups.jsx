/* eslint-disable no-nested-ternary */
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { FaUserCheck } from 'react-icons/fa';
import { SiMicrosoftexcel } from 'react-icons/si';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../../utils/api';
import { ToastContext } from '../contexts/ToastContext';
import { logout } from '../../slices/adminAuth';

function Signups() {
  const [signups, setSignups] = useState(null);
  const [loading, setLoading] = useState(false);
  const { createToast } = useContext(ToastContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.users
      .glance()
      .then((res) => {
        console.log(res);
        setSignups(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.code);
        if (err?.code === 'ERR_NETWORK') {
          createToast({ type: 'error', message: 'Network error, try again!' });
        }
        if (err?.response?.status === 401) {
          dispatch(logout());
          navigate('/admin-login');
        }
      });
  }, []);

  return (
    <Box
      component={Paper}
      elevation={5}
      sx={{
        bgcolor: 'primary.main',
        display: 'flex',
        p: 2.5,
        pr: 5,
        gap: 2,
        alignItems: 'center',
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          bgcolor: 'primary.light',
          color: 'white',
          width: '4rem',
          height: '4rem',
          fontSize: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
        }}
      >
        <FaUserCheck />
      </Box>
      <Box sx={{ mr: 1 }}>
        {signups?.numberOfSignUps ? (
          <>
            <Typography variant="h3" color="white" fontWeight={700}>
              {signups.numberOfSignUps}
            </Typography>
            <Typography variant="body1" color="#B8C6DB" fontWeight={500}>
              Sign Ups
            </Typography>
          </>
        ) : loading ? (
          <>
            <Skeleton variant="text" width={40} sx={{ fontSize: 28 }} animation="wave" />
            <Skeleton variant="text" width={70} animation="wave" sx={{ fontSize: 18 }} />
          </>
        ) : (
          <>
            <Typography variant="h3" color="white" fontWeight={700}>
              00
            </Typography>
            <Typography variant="body1" color="#B8C6DB" fontWeight={500}>
              Sign Ups
            </Typography>
          </>
        )}
      </Box>

      <Box sx={{ height: '4rem', bgcolor: 'rgba(255,255,255,0.3)', width: '2px' }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box ml={1} display="flex" alignItems="end" gap={1}>
          {signups?.studentsPurchased ? (
            <>
              <Typography variant="h4" color="white" fontWeight={700}>
                {signups.studentsPurchased}
              </Typography>
              <Typography variant="h6" color="#B8C6DB" fontWeight={500} sx={{ mb: 0.2 }}>
                Purchased
              </Typography>
            </>
          ) : loading ? (
            <>
              <Skeleton variant="text" width={30} sx={{ fontSize: 24 }} animation="wave" />
              <Skeleton variant="text" width={80} animation="wave" sx={{ fontSize: 18, mb: 0.2 }} />
            </>
          ) : (
            <>
              <Typography variant="h4" color="white" fontWeight={700}>
                0
              </Typography>
              <Typography variant="h6" color="#B8C6DB" fontWeight={500} sx={{ mb: 0.2 }}>
                Purchased
              </Typography>
            </>
          )}
        </Box>
        <Box ml={1} display="flex" alignItems="end" gap={1}>
          {signups?.studentsNotPurchased ? (
            <>
              <Typography variant="h4" color="white" fontWeight={700}>
                {signups.studentsNotPurchased}
              </Typography>
              <Typography variant="h6" color="#B8C6DB" fontWeight={500} sx={{ mb: 0.2 }}>
                Not purchased
              </Typography>
            </>
          ) : loading ? (
            <>
              <Skeleton variant="text" width={30} sx={{ fontSize: 24 }} animation="wave" />
              <Skeleton
                variant="text"
                width={100}
                animation="wave"
                sx={{ fontSize: 18, mb: 0.2 }}
              />
            </>
          ) : (
            <>
              <Typography variant="h4" color="white" fontWeight={700}>
                0
              </Typography>
              <Typography variant="h6" color="#B8C6DB" fontWeight={500} sx={{ mb: 0.2 }}>
                Not purchased
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignSelf: 'end', height: '100%' }}>
        <Tooltip title={signups ? 'Download as spreadsheet' : 'Error loading data'}>
          <IconButton
            sx={{ color: '#5DDC21', width: 40, height: 40 }}
            disabled={loading}
            size="small"
          >
            {loading ? (
              <CircularProgress color="secondary" size={20} />
            ) : !signups ? (
              <ErrorOutlineIcon sx={{ color: 'secondary.main', fontSize: 22 }} />
            ) : (
              <SiMicrosoftexcel />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Signups;
