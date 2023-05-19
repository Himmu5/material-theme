import {
  Box,
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
import React, { memo, useState } from 'react';
import './table.css';
import { AnimatePresence, motion } from 'framer-motion';
import { TiTick } from 'react-icons/ti';

function StudentsList({ rows = [], loading }) {
  const [marked, setMarked] = useState(false);

  return (
    <>
      <TableContainer sx={{ width: '100%' }}>
        <Table style={{ width: '100%', borderSpacing: '0 12px' }} className="attendance-list">
          <TableHead>
            <TableRow sx={{ color: '#5c5c5c' }} className="attendance-list-head">
              <TableCell sx={{ color: 'inherit' }}>SI no.</TableCell>
              <TableCell sx={{ color: 'inherit' }}>Name</TableCell>
              <TableCell sx={{ color: 'inherit' }}>Email</TableCell>
              <TableCell sx={{ color: 'inherit' }}>Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {rows.length > 0
                && rows.map((row, index) => (
                  <TableRow
                    hover
                    component={motion.tr}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ type: 'tween' }}
                    viewport={{ once: true }}
                    key={row?.email}
                    sx={{
                      color: row?.mark ? '#fff' : '#707070',
                    }}
                    onClick={() => setMarked((prev) => !prev)}
                  >
                    <TableCell
                      sx={{
                        color: 'inherit',
                        bgcolor: row?.mark ? '#19488C !important' : 'transparent',
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      1
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 'inherit',
                        bgcolor: row?.mark ? '#19488C !important' : 'transparent',
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      {row?.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 'inherit',
                        bgcolor: row?.mark ? '#19488C !important' : 'transparent',
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      {row?.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: 'inherit',
                        bgcolor: row?.mark ? '#19488C !important' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'all 0.2s ease-in-out',
                        gap: 0.5,
                      }}
                    >
                      {row?.mark ? 'Marked' : 'Mark'}
                      <Box
                        sx={{
                          width: 14,
                          height: 14,
                          bgcolor: '#fff',
                          borderRadius: '50%',
                          transition: 'all 0.2s ease-in-out',
                          fontSize: 18,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'primary.light',
                          border: 1.5,
                          borderColor: '#808080',
                          mr: 0.7,
                        }}
                      >
                        {row?.mark && <TiTick />}
                      </Box>
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
          0 students on this date!
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

export default memo(StudentsList);
