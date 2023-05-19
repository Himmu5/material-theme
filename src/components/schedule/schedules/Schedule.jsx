/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Typography,
  styled,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SlotList from './SlotList';
import api from '../../../utils/api';
import DeleteSlot from './DeleteSlot';
import UpdateSlot from './UpdateSlot';

const Accordion = styled((props) => <MuiAccordion elevation={0} {...props} />)(() => ({
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

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '1rem',
  paddingTop: 0,
  backgroundColor: '#E8EDF4',
}));

function Schedule({
<<<<<<< HEAD
  expanded = false, makeExpanded, slot = null, slots = [], index, batchId,
=======
  expanded = false, makeExpanded, slot, index, batchId,
>>>>>>> courses
}) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const date = new Date(slot);
  const dateString = `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
    -2,
  )}-${`0${date.getDate()}`.slice(-2)}`;

  useEffect(() => {
    if (batchId) {
      setLoading(true);
      api.schedules
        .students(batchId, dateString)
<<<<<<< HEAD
        .then((res) => {
          console.log(res);
          setLoading(false);
          setStudents(res.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [batchId]);

  const handleDelete = () => {
    if (slots.find((item) => item === slot)) {
      const newSlots = slots.filter((item) => item !== slot);

      api.schedules
        .update({ slotsForSiteBooking: newSlots }, batchId)
=======
>>>>>>> courses
        .then((res) => {
          console.log(res);
          setStudents(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
<<<<<<< HEAD
  };

  const handleUpdate = () => {
    const itemIndex = slots.indexOf(3452);

    if (itemIndex !== -1) {
      const newSlots = [...slots];
      newSlots[itemIndex] = 1010;
    }
  };
=======
  }, [batchId]);
>>>>>>> courses

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
                Day
                {index + 1}
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
                <UpdateSlot />

                <DeleteSlot slot={slot} deleteSlot={() => handleDelete()} />
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
              {`${date.toLocaleDateString('en-GB', { day: 'numeric' })} ${date.toLocaleDateString(
                'en-GB',
                { month: 'long' },
              )}, ${date.toLocaleDateString('en-GB', { year: 'numeric' })}`}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
<<<<<<< HEAD
        <SlotList rows={students} loading={loading} />
=======
        <SlotList rows={students} loading={loading}/>
>>>>>>> courses
      </AccordionDetails>
    </Accordion>
  );
}

export default Schedule;
