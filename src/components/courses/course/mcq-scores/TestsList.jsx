/* eslint-disable no-underscore-dangle */
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { memo } from 'react';
import './table.css';
import { AnimatePresence, motion } from 'framer-motion';

function TestsList({ rows = [], loading = false }) {
  return (
    <>
      <TableContainer sx={{ width: '100%' }}>
        <Table style={{ width: '100%', borderSpacing: '0 12px' }} className="tests-list">
          <TableHead>
            <TableRow sx={{ color: '#5c5c5c' }} className="tests-list-head">
              <TableCell sx={{ color: 'inherit' }}>SI No</TableCell>
              <TableCell sx={{ color: 'inherit' }}>Test No</TableCell>
              <TableCell sx={{ color: 'inherit' }}>Marks Scored</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {rows.length > 0
                && rows.map((row, index) => (
                  <TableRow
                    component={motion.tr}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ type: 'tween' }}
                    viewport={{ once: true }}
                    key={row?._id}
                  >
                    <TableCell sx={{ color: 'text.secondary' }}>
                      {String(index + 1).padStart(2, '0')}
                    </TableCell>
                    <TableCell>
                      Evaluation
                      {` ${String(index + 1).padStart(2, '0')}`}
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>
                      {row?.score ? `${String(row.score).padStart(2, '0')} / 10` : ''}
                    </TableCell>
                  </TableRow>
                ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length === 0 && !loading ? (
        <Typography
          variant="body2"
          align="center"
          component={motion.p}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ type: 'tween' }}
          viewport={{ once: true }}
          sx={{ color: '#707070', width: '100%' }}
        >
          0 tests!
        </Typography>
      ) : null}
      {loading && (
        <Paper
          sx={{
            borderRadius: '50%',
            bgcolor: '#fff',
            width: '2rem',
            mx: 'auto',
            height: '2rem',
            p: 0.8,
          }}
        >
          <CircularProgress color="primary" size="small" sx={{ width: '100%' }} />
        </Paper>
      )}
    </>
  );
}

export default memo(TestsList);
