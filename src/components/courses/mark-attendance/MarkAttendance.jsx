/* eslint-disable no-nested-ternary */
import {
  Button,
  Dialog as MuiDialog,
  DialogTitle,
  IconButton,
  styled,
  Typography,
  DialogContent,
  Box,
  Select,
  MenuItem,
  FormControl,
  DialogActions,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AttendanceSearch from './AttendanceSearch';
import StudentsList from './StudentsList';
import './select.css';
import api from '../../../utils/api';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    width: 600,
    overflowX: 'hidden',
  },
}));

function MarkAttendance({ batchId }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState('no-options');
  const [dates, setDates] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [marked, setMarked] = useState([]);

  const formatDateView = (slot) => {
    const dateVal = new Date(slot);
    return `${`0${dateVal.getDate()}`.slice(-2)}/${`0${dateVal.getMonth() + 1}`.slice(
      -2,
    )}/${dateVal.getFullYear()}`;
  };

  const formatDateValue = (slot) => {
    const dateVal = new Date(slot);
    return `${dateVal.getFullYear()}-${`0${dateVal.getMonth() + 1}`.slice(
      -2,
    )}-${`0${dateVal.getDate()}`.slice(-2)}`;
  };

  useEffect(() => {
    if (batchId) {
      setLoading(true);
      setDate('loading');
      api.batch
        .getByBatch(batchId)
        .then((res) => {
          console.log(res?.data?.slotsForSiteBooking);
          const availableDates = res?.data?.slotsForSiteBooking ? res.data.slotsForSiteBooking : [];
          setDates(availableDates);
          setDate(
            availableDates.length !== 0 ? availableDates[availableDates.length - 1] : 'no-options',
          );
          setLoading(false);
        })
        .catch((err) => {
          setDate('no-options');
          console.log(err);
          setLoading(false);
        });
    }
  }, [batchId]);

  useEffect(() => {
    if (batchId && date !== 'no-options' && date !== 'loading') {
      setLoadingStudents(true);
      api.schedules
        .students(batchId, formatDateValue(date))
        .then((res) => {
          console.log(res);
          setBookings(res?.data);
          // eslint-disable-next-line max-len
          const markedStudents = res?.data && res.data.length > 0 ? res.data.filter((booking) => booking.mark) : [];
          setMarked(
            markedStudents.length > 0 ? markedStudents.map((student) => student.email) : [],
          );
          setLoadingStudents(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingStudents(false);
        });
    }
  }, [batchId, date]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  const handleConfirmMarking = () => {
    console.log(marked);
  };

  return (
    <>
      <Button variant="text" size="small" disableElevation onClick={handleClickOpen}>
        Mark Attendance
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>
          {handleClose ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                mt: -1,
                mr: -2,
              }}
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                size="small"
                sx={{
                  //   position: 'absolute',
                  //   top: 8,
                  //   right: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ) : null}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" fontWeight={600} lineHeight={1}>
              Mark Attendance
            </Typography>

            <FormControl size="small">
              <Select
                className="date-select"
                value={date}
                displayEmpty
                sx={{ borderRadius: 3 }}
                onChange={handleChange}
                size="small"
              >
                {dates.length > 0
                  && dates.map((slot) => <MenuItem value={slot}>{formatDateView(slot)}</MenuItem>)}
                {loading && (
                  <MenuItem value="loading" disabled>
                    loading...
                  </MenuItem>
                )}
                {dates.length === 0 && !loading ? (
                  <MenuItem value="no-options" disabled>
                    <em>- No available dates -</em>
                  </MenuItem>
                ) : null}
              </Select>
            </FormControl>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ height: 300, overflowY: 'auto' }}>
          <AttendanceSearch />

          <StudentsList loading={loadingStudents} rows={bookings} />
        </DialogContent>
        <DialogActions sx={{ mb: 1, mx: 1 }}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" onClick={handleConfirmMarking}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MarkAttendance;
