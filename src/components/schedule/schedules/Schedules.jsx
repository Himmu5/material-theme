import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import BatchesFilter from '../../common/BatchesFilter';
import Schedule from './Schedule';

function Schedules() {
  const [expandedSchedule, setExpandedSchedule] = useState(null);

  return (
    <Box sx={{ pl: 3, height: '100%' }}>
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
        }}
      >
        <Typography typography="h3" sx={{ mb: 1 }}>
          Schedules
        </Typography>

        <BatchesFilter />

        <Box
          sx={{
            my: 1,
            py: 1,
            overflowY: 'auto',
            pr: 2,
            height: 'calc(100vh - 14rem)',
          }}
        >
          {[...new Array(10)].map((schedule, index) => (
            <Schedule
              expanded={expandedSchedule !== null && expandedSchedule === index}
              makeExpanded={(expand) => setExpandedSchedule(expand ? index : null)}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default Schedules;
