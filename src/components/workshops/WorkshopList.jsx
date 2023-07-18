import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import './table.css';
import { SiMicrosoftexcel } from 'react-icons/si';
import { FiMoreVertical } from 'react-icons/fi';
import Options from './Options';

function WorkshopList({Workshop}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <TableContainer
        sx={{
          width: '100%',
          pr: 2,
          maxHeight: '90vh',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <Table style={{ width: '100%', borderSpacing: '0 12px' }} className="worshop-table">
          <TableHead className="worshop-th">
            <TableRow sx={{ color: '#5c5c5c' }}>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody className="worshop-tbody">
            <AnimatePresence>
              {Workshop.map((row, index) => (
                <TableRow
                  component={motion.tr}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ type: 'tween' }}
                  viewport={{ once: true }}
                >
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        minHeight: 75,
                        maxWidth: '20vw',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="body2">
                        {row.title}
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        ₹{row.price}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: 'inherit', maxWidth: '20vw' }}>
                    {row.description}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        From
                      </Typography>
                      <Typography variant="body2">{row.startDate}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        To
                      </Typography>
                      <Typography variant="body2">{row.endDate}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: 'inherit' }}>
                    <Button
                      size="small"
                      endIcon={<SiMicrosoftexcel color="#0e733a" />}
                      variant="outlined"
                    >
                      Export
                    </Button>
                  </TableCell>
                  <TableCell sx={{ color: 'inherit' }}>
                    <IconButton size="small" onClick={handleOptionsClick}>
                      <FiMoreVertical />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>

      <Options anchorEl={anchorEl} close={() => setAnchorEl(null)} />
    </>
  );
}

export default WorkshopList;
