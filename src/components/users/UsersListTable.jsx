import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import React, { memo } from 'react';
import './table.css';

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

function UsersListTable({ rows = [], page }) {
  return (
    <TableContainer sx={{ width: '100%' }}>
      <Table style={{ width: '100%', borderSpacing: '0 12px' }}>
        <TableHead>
          <TableRow sx={{ color: '#5c5c5c' }}>
            <TableCell sx={{ color: 'inherit' }}>SI no.</TableCell>
            <TableCell sx={{ color: 'inherit' }}>Name</TableCell>
            {page === 'users' ? (
              <TableCell sx={{ color: 'inherit' }}>Phone</TableCell>
            ) : (
              <TableCell sx={{ color: 'inherit' }}>Type of Degree</TableCell>
            )}
            <TableCell sx={{ color: 'inherit' }}>Location</TableCell>
            {page === 'users' && <TableCell sx={{ color: 'inherit' }}>Education</TableCell>}
            <TableCell sx={{ color: 'inherit' }}>Course</TableCell>
            <TableCell sx={{ color: 'inherit' }}>Progress</TableCell>
            {page === 'users' ? (
              <TableCell sx={{ color: 'inherit' }}>Purchased</TableCell>
            ) : (
              <TableCell sx={{ color: 'inherit' }}>MCQ score</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0
            && rows.map((row) => (
              <TableRow key={row.name} sx={{ color: '#707070' }}>
                <TableCell sx={{ color: 'inherit' }}>{row.si_no}</TableCell>
                <TableCell sx={{ color: 'inherit' }}>
                  <div style={{ color: 'black' }}>{row.name}</div>
                  <div>{row.email}</div>
                </TableCell>
                <TableCell sx={{ color: 'inherit' }}>{row.phone}</TableCell>
                <TableCell sx={{ color: 'inherit' }}>{row.location}</TableCell>
                <TableCell sx={{ color: 'inherit' }}>{row.education}</TableCell>
                <TableCell sx={{ color: 'inherit' }}>{row.course}</TableCell>
                <TableCell sx={{ color: 'inherit' }}>{row.progress}</TableCell>
                <TableCell sx={{ color: 'inherit' }}>{row.purchased}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default memo(UsersListTable);
