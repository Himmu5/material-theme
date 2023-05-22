/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { Box, Chip, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/adminAuth';

function BatchesFilter({
  filter = null, changeFilter, courseId, width,
}) {
  console.log(courseId);
  const [batches, setBatches] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      setLoading(true);
      api.batch
        .list(courseId)
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          setBatches(res.data);
          changeFilter(res?.data && res.data.length > 0 ? res.data[0]._id : null);
          setActive(res?.data && res.data.length > 0 ? res.data[0] : null);
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            dispatch(logout());
            navigate('/admin-login');
          }
          console.log(err);
          setLoading(false);
        });
    }
  }, [courseId]);

  useEffect(() => {
    setActive(batches.find((batch) => batch._id === filter));
  }, [filter]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        gap: 1.5,
        display: 'flex',
        maxWidth: width,
        width,
        overflowX: 'auto',
      }}
    >
      {batches.length > 0 && !loading ? (
        batches.map((batch) => (
          <Chip
            key={batch?._id}
            label={batch?.name}
            color="primary"
            variant={active && active?._id === batch?._id ? 'filled' : 'outlined'}
            onClick={() => changeFilter(batch?._id)}
            // {() => (filter === batch?._id ? changeFilter(null) : changeFilter(batch?._id))}
            sx={{ transition: 'all 0.3s ease-in-out' }}
          />
        ))
      ) : loading ? (
        [...new Array(3)].map((skel, index) => (
          <Skeleton
            key={`skeleton-${skel}-${index}`}
            variant="rounded"
            animation="wave"
            sx={{ borderRadius: '20px' }}
            width={150}
            height={30}
          />
        ))
      ) : batches.length === 0 ? (
        <Chip
          color="warning"
          variant="outlined"
          // size="small"
          label="No batches found for this course"
          icon={<ErrorOutlineIcon />}
        />
      ) : (
        0
      )}
    </Box>
  );
}

export default BatchesFilter;
