import {
  Box,
  Button,
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
import { TiTick } from 'react-icons/ti';

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

function SlotList({ rows = [], loading }) {
  console.log(rows);
  return (
    <>
      <TableContainer sx={{ width: '100%' }}>
        <Table style={{ width: '100%', borderSpacing: '0 12px' }} className="slot-table">
          <TableHead>
            <TableRow sx={{ color: '#5c5c5c' }} className="slot-table-thead">
              <TableCell sx={{ color: 'inherit' }}>SI no.</TableCell>
              <TableCell sx={{ color: 'inherit' }}>Name</TableCell>
              <TableCell sx={{ color: 'inherit' }}>Slot status</TableCell>
              <TableCell sx={{ color: 'inherit' }}>Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {rows.length > 0
                && rows.map((row) => (
                  <TableRow
                    component={motion.tr}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ type: 'tween' }}
                    viewport={{ once: true }}
<<<<<<< HEAD
                    key={row?.email}
=======
                    key={row.name}
>>>>>>> courses
                    sx={{ color: '#707070' }}
                  >
                    <TableCell sx={{ color: 'inherit' }}>1</TableCell>
                    <TableCell sx={{ color: 'inherit' }}>
                      <div style={{ color: 'black' }}>{row?.name}</div>
                      <div>{row?.email}</div>
                    </TableCell>
                    <TableCell sx={{ color: 'inherit' }}>Confirmed</TableCell>
                    <TableCell sx={{ color: 'inherit' }}>
                      <Button
                        sx={{ borderRadius: 2 }}
                        size="small"
                        disableElevation
                        variant="contained"
                        disabled={row?.mark}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            bgcolor: '#fff',
                            borderRadius: '50%',
                            transition: 'all 0.3s ease-in-out',
                            fontSize: 18,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'primary.light',
                            borderColor: 'primary.light',
                            border: 1.5,
                            mr: 0.7,
                          }}
                        >
                          {row?.mark && <TiTick />}
                        </Box>
                        {row?.mark ? 'Marked' : 'Mark'}
                      </Button>
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

export default memo(SlotList);
