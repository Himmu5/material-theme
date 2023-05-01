import { Box } from '@mui/material';
import React, { memo } from 'react';
import './table.css';

// const tr = styled(MuiTableRow)(({ theme }) => ({
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

function UsersListTable({ rows = [] }) {
  return (
    <Box sx={{ width: '100%' }}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>SI no.</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Education</th>
            <th>Course</th>
            <th>Progress</th>
            <th>Purchased</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0
            && rows.map((row) => (
              <tr key={row.name}>
                <td>{row.si_no}</td>
                <td>
                  <div style={{ color: 'black' }}>{row.name}</div>
                  <div>{row.email}</div>
                </td>
                <td>{row.phone}</td>
                <td>{row.location}</td>
                <td>{row.education}</td>
                <td>{row.course}</td>
                <td>{row.progress}</td>
                <td>{row.purchased}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Box>
  );
}

export default memo(UsersListTable);
