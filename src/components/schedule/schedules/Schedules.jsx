import {
  Box, LinearProgress, Paper, Skeleton, Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import BatchesFilter from '../../common/BatchesFilter';
import Schedule from './Schedule';
import api from '../../../utils/api';

function Schedules({ activeCourse }) {
  const [expandedSchedule, setExpandedSchedule] = useState(null);
  const [filter, setFilter] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (batchId) => setFilter(batchId);

  useEffect(() => {
    if (filter) {
      setLoading(true);
      api.batch
        .getByBatch(filter)
        .then((res) => {
          console.log(res);
          setSlots(res?.data?.slotsForSiteBooking ? res.data.slotsForSiteBooking : []);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [activeCourse, filter]);

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

        <Typography typography="h3" sx={{ mb: 1 }}>
          Schedules
        </Typography>

        <BatchesFilter
          filter={filter}
          changeFilter={(batchId) => handleFilterChange(batchId)}
          courseId={activeCourse}
          width="min(95%,60vw)"
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
        </Box>
      </Paper>
    </Box>
  );
}

export default Schedules;
