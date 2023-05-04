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
import React, { memo } from 'react';
import './table.css';
import { AnimatePresence, motion } from 'framer-motion';
import colorFns from '../../utils/colorFunctions';

// const TableRow = styled(MuiTableRow)(({ TableCelleme }) => ({
//   '&.MuiTableRow-head': {
//     backgroundColor: '#ECECEC',
//     borderRadius: '16px',
//   },

//   '&.MuiTableRow-root': {
//     border: 0,
//     margin: '0.5rem 0',
//     borderRadius: '16px',
//   },
// }));

function UsersListTable({ rows = [], page, loading }) {
  return (
    <>
      <TableContainer sx={{ width: '100%' }}>
        <Table style={{ width: '100%', borderSpacing: '0 12px' }}>
          <TableHead>
            <TableRow sx={{ color: '#5c5c5c' }}>
              <TableCell sx={{ color: 'inherit' }}>SI no.</TableCell>
              <TableCell sx={{ color: 'inherit' }}>Name</TableCell>
              {page === 'users' && <TableCell sx={{ color: 'inherit' }}>Phone</TableCell>}
              <TableCell sx={{ color: 'inherit' }}>Location</TableCell>
              {page === 'courses' && (
                <TableCell sx={{ color: 'inherit' }}>Type of Degree</TableCell>
              )}
              {page === 'users' && <TableCell sx={{ color: 'inherit' }}>Education</TableCell>}
              <TableCell sx={{ color: 'inherit' }}>Course</TableCell>
              {page === 'users' && <TableCell sx={{ color: 'inherit' }}>Batch</TableCell>}
              <TableCell sx={{ color: 'inherit' }}>Progress</TableCell>
              {page === 'courses' && <TableCell sx={{ color: 'inherit' }}>MCQ score</TableCell>}
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
                    key={row.name}
                    sx={{ color: '#707070' }}
                  >
                    <TableCell sx={{ color: 'inherit' }}>{index + 1}</TableCell>
                    <TableCell sx={{ color: 'inherit' }}>
                      <div style={{ color: 'black' }}>{row.name}</div>
                      <div>{row.email}</div>
                    </TableCell>
                    {page === 'users' && (
                      <TableCell sx={{ color: 'inherit' }}>{row.phone.number}</TableCell>
                    )}

                    <TableCell sx={{ color: 'inherit' }}>{row.location}</TableCell>

                    <TableCell sx={{ color: 'inherit' }}>{row.degree}</TableCell>
                    <TableCell sx={{ color: 'inherit' }}>
                      {row?.coursesRegistered && row.coursesRegistered.length > 0
                        ? row.coursesRegistered[0].course.name
                        : null}
                    </TableCell>
                    {page === 'users' && (
                      <TableCell sx={{ color: 'inherit' }}>
                        {row?.coursesRegistered && row.coursesRegistered.length > 0
                          ? row.coursesRegistered[0].batch.name
                          : null}
                      </TableCell>
                    )}
                    <TableCell sx={{ color: 'inherit' }}>
                      {row?.coursesRegistered && row.coursesRegistered.length > 0 ? (
                        <Box
                          sx={{
                            bgcolor: colorFns.getColorShade(0),
                            color: colorFns.getColorShadeText(0),
                            p: 0.5,
                            borderRadius: 5,
                            textAlign: 'center',
                            width: '5rem',
                          }}
                        >
                          {row.coursesRegistered[0].activity.progress}
                          %
                        </Box>
                      ) : (
                        <span
                          style={{ textAlign: 'center', width: '5rem', display: 'inline-block' }}
                        >
                          N/A
                        </span>
                      )}
                    </TableCell>
                    {page === 'courses' && <TableCell sx={{ color: 'inherit' }}>9.5</TableCell>}
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
          There are no registered students!
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

export default memo(UsersListTable);
