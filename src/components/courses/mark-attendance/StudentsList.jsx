import {
  Box,
  Button,
  CircularProgress,
  IconButton,
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

function StudentsList({ rows = [], page, loading }) {
  console.log(rows);
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
              {/* {rows.length > 0
                && rows.map((row, index) => ( */}
              <TableRow
                component={motion.tr}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ type: 'tween' }}
                viewport={{ once: true }}
                // key={row.name}
                sx={{ color: '#707070' }}
              >
                <TableCell sx={{ color: 'inherit' }}>1</TableCell>
                <TableCell sx={{ color: 'inherit' }}>Mark spectre</TableCell>
                <TableCell sx={{ color: 'inherit' }}>Markspc@gmail.com</TableCell>
                <TableCell
                  sx={{
                    color: 'inherit',
                  }}
                >
                  <Button
                    size="small"
                    sx={{
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      height: 24,
                    }}
                  >
                    Mark
                    <Box
                      sx={{
                        width: 14,
                        height: 14,
                        bgcolor: '#fff',
                        borderRadius: '50%',
                        transition: 'all 0.3s ease-in-out',
                        fontSize: 18,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.light',
                        borderColor: '#808080',
                        border: 1.5,
                        mr: 0.7,
                      }}
                    >
                      <TiTick />
                    </Box>
                  </Button>
                </TableCell>
              </TableRow>
              {/* ))} */}
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

export default memo(StudentsList);
