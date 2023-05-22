import {
  Box, LinearProgress, Paper, Skeleton, Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import BatchesFilter from '../../common/BatchesFilter';
import Schedule from './Schedule';
import api from '../../../utils/api';
import AddSlot from './AddSlot';
import { logout } from '../../../slices/adminAuth';

function Schedules({ activeCourse }) {
  const [expandedSchedule, setExpandedSchedule] = useState(null);
  const [filter, setFilter] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFilterChange = (batchId) => setFilter(batchId);

  useEffect(() => {
    if (filter) {
      setLoading(true);
      api.batch
        .getById(filter)
        .then((res) => {
          console.log(res);
          setSlots(res?.data?.slotsForSiteBooking ? res.data.slotsForSiteBooking : []);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
          if (err?.response?.status === 401) {
            dispatch(logout());
            navigate('/admin-login');
          }
        });
    }
  }, [activeCourse, filter, forceUpdate]);

  useEffect(() => {
    setLoading((prev) => (!prev ? !filter : prev));
  }, [filter]);

  return (
    <Box
      sx={{
        pl: 3,
        height: '100%',
        flexGrow: 1,
      }}
    >
      <Paper
        component={motion.div}
        initial={{ opacity: 0.6, y: 100 }}
        transition={{ type: 'tween' }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        elevation={5}
        sx={{
          borderTopLeftRadius: 32,
          bgcolor: 'white',
          width: '100%',
          height: '100%',
          px: 3,
          py: 2,
          overflow: 'hidden',
        }}
      >
        {loading && <LinearProgress sx={{ mx: -3, mt: -2, mb: 1.5 }} />}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
            pr: 2,
          }}
        >
          <Typography typography="h3" sx={{ mb: 1 }}>
            Schedules
          </Typography>
          <AddSlot courseId={activeCourse} updateList={() => setForceUpdate((prev) => !prev)} />
        </Box>
        <BatchesFilter
          filter={filter}
          changeFilter={(batchId) => handleFilterChange(batchId)}
          courseId={activeCourse}
          width="calc(100vw - 370px - min(35vw,35rem))"
        />

        <Box
          sx={{
            my: 1,
            py: 1,
            overflowY: 'auto',
            pr: 2,
            height: 'calc(100vh - 14rem)',
          }}
        >
          {slots.length > 0
            && slots.map((slot, index) => (
              <Schedule
                slots={slots}
                slot={slot}
                index={index}
                key={slot}
                batchId={filter}
                expanded={expandedSchedule !== null && expandedSchedule === index}
                makeExpanded={(expand) => setExpandedSchedule(expand ? index : null)}
                updateList={() => setForceUpdate((prev) => !prev)}
              />
            ))}

          {loading && slots.length === 0
            ? [...new Array(5)].map((slot) => (
              <Skeleton
                key={slot}
                variant="rounded"
                sx={{ width: '100%', mb: 2, borderRadius: 4 }}
                height={80}
                animation="wave"
              />
            ))
            : null}

          {slots.length === 0 && error ? (
            <Typography align="center" variant="body2" color="text.secondary">
              No slots available for this course!
            </Typography>
          ) : null}
        </Box>
      </Paper>
    </Box>
  );
}

export default memo(Schedules);
