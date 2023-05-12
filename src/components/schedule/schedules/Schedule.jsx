/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  IconButton,
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Typography,
  styled,
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MdEditCalendar } from 'react-icons/md';
import DeleteIcon from '@mui/icons-material/Delete';
import SlotList from './SlotList';

const Accordion = styled((props) => <MuiAccordion elevation={0} {...props} />)(({ theme }) => ({
  '&:before': {
    display: 'none',
  },
  borderRadius: '16px',
  overflow: 'hidden',
  marginBottom: '16px',
  '&.MuiAccordion-root:last-child': { borderRadius: '16px', overflow: 'hidden' },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    // expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#E8EDF4',
  flexDirection: 'row-reverse',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  '&.MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(0deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: '1rem',
  paddingTop: 0,
  backgroundColor: '#E8EDF4',
}));

function Schedule({ expanded = false, makeExpanded }) {
  return (
    <Accordion expanded={expanded} onChange={() => makeExpanded(!expanded)}>
      <AccordionSummary>
        <Box width="100%">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'end' }}>
              <Typography variant="h6" fontWeight={600}>
                Day 1
              </Typography>
              <Typography fontWeight={600} sx={{ fontSize: 14, pb: 0.2 }} color="text.secondary">
                Site visit
              </Typography>
            </Box>
            {expanded && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <IconButton size="small" color="primary" sx={{ fontSize: 20 }}>
                  <MdEditCalendar />
                </IconButton>
                <IconButton size="small" color="error">
                  <DeleteIcon fontSize="18" />
                </IconButton>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <div
                style={{
                  transform: `rotate(${expanded ? '0deg' : '-90deg'})`,
                  fontSize: '18px',
                  transition: 'transform 0.2s ease-in-out',
                  transformOrigin: 'center center',
                }}
              >
                <ExpandMoreIcon fontSize="inherit" />
              </div>
              <Typography variant="body2" fontWeight={500}>
                Naveen, Amjad and 4 others
              </Typography>
            </Box>

            <Typography variant="body2" fontWeight={500} color="text.secondary">
              3 Apr, 2023
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <SlotList />
      </AccordionDetails>
    </Accordion>
  );
}

export default Schedule;
