/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  CircularProgress,
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputBase,
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Typography,
  styled,
  Skeleton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik } from 'formik';
import { MdEditCalendar } from 'react-icons/md';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SlotList from './SlotList';
import api from '../../../utils/api';
import DeleteSlot from './DeleteSlot';
import { logout } from '../../../slices/adminAuth';

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

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflowX: 'hidden',
  },
}));

const validationSchema = yup.object({
  newDate: yup.date('Invalid date!').required('New date is required!'),
});

function Schedule({
  expanded = false,
  makeExpanded,
  slot = null,
  slots = [],
  index,
  batchId,
  updateList,
}) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const date = new Date(slot);
  const dateString = `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
    -2,
  )}-${`0${date.getDate()}`.slice(-2)}`;

  const formatDateValue = (slotVal) => {
    const dateVal = new Date(slotVal);
    return `${dateVal.getFullYear()}-${`0${dateVal.getMonth() + 1}`.slice(
      -2,
    )}-${`0${dateVal.getDate()}`.slice(-2)}`;
  };

  const initialValues = {
    newDate: formatDateValue(slot),
  };

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleUpdate = (value) => {
    const itemIndex = slots.indexOf(slot);

    if (itemIndex !== -1) {
      let newSlots = [...slots.map((dateVal) => formatDateValue(new Date(dateVal)))];
      newSlots[itemIndex] = formatDateValue(new Date(value.newDate));
      newSlots = newSlots.sort((date1, date2) => {
        const dateA = new Date(date1);
        const dateB = new Date(date2);
        return dateA > dateB;
      });

      console.log(newSlots);
      setLoadingUpdate(true);
      api.schedules
        .update({ slotsForSiteBooking: newSlots }, batchId)
        .then((res) => {
          setLoadingUpdate(false);
          console.log(res);
          updateList();
          setOpen(false);
        })
        .catch((err) => {
          setLoadingUpdate(false);
          if (err?.response?.status === 401) {
            dispatch(logout());
            navigate('/admin-login');
          }
          console.log(err);
        });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleUpdate(values);
      console.log(values);
    },
  });

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    formik.resetForm();
  };

  useEffect(() => {
    if (batchId) {
      setLoading(true);
      api.schedules
        .bookings(batchId, dateString)
        .then((res) => {
          console.log(res);
          setLoading(false);
          setBookings(res.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err?.response?.status === 401) {
            dispatch(logout());
            navigate('/admin-login');
          }
        });
    }
  }, [batchId]);

  const handleDelete = () => {
    if (slots.find((item) => item === slot)) {
      const newSlots = slots.filter((item) => item !== slot);
      const newSlotsFormatted = newSlots.map((dateVal) => formatDateValue(new Date(dateVal)));

      console.log(newSlotsFormatted);
      return api.schedules
        .update({ slotsForSiteBooking: newSlotsFormatted }, batchId)
        .then((res) => res);
    }
    return null;
  };

  const nameBriefing = () => {
    if (bookings.length > 0) {
      if (bookings.length > 3) {
        return `${[bookings[0], bookings[1]].join(', ')} and ${bookings.length - 2}`;
      }
      if (bookings.length === 1) return bookings[0].name;
      return `${[
        bookings.map((booking, itemIndex) => {
          if (itemIndex < booking.length - 1) return booking.name;
          return '';
        }),
      ].join(', ')} and ${bookings[bookings.length - 1].name}`;
    }
    if (loading) return <Skeleton width={100} variant="text" />;
    return '0 bookings in this slot';
  };

  return (
    <>
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
                  {' '}
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
                  <IconButton
                    color="primary"
                    sx={{ fontSize: 20, mr: 1 }}
                    onClick={handleClickOpen}
                  >
                    <MdEditCalendar />
                  </IconButton>

                  <DeleteSlot
                    slot={slot}
                    deleteSlot={() => handleDelete().then((res) => res)}
                    updateList={updateList}
                  />
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
                  {nameBriefing()}
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
          <SlotList rows={bookings} loading={loading} batchId={batchId} date={date} />
        </AccordionDetails>
      </Accordion>

      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle sx={{ mt: 2, mx: 2 }}>
          {handleClose ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              size="small"
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}

          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              justifyContent: 'center',
            }}
            variant="h4"
            align="center"
            fontWeight={600}
          >
            <MdEditCalendar style={{ color: '#19488C' }} />
            Update Schedule
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ width: 400, display: 'flex' }}>
          <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
            <FormControl fullWidth>
              <Typography
                variant="body1"
                color="text.secondary"
                component="label"
                htmlFor="startDate"
              >
                Set a new date
              </Typography>
              <InputBase
                type="date"
                id="newDate"
                name="newDate"
                size="small"
                sx={{ mt: 0.5 }}
                fullWidth
                color="secondary"
                value={formik.values.newDate}
                onChange={formik.handleChange}
                error={formik.touched.newDate && Boolean(formik.errors.newDate)}
                disabled={loadingUpdate}
              />
              <FormHelperText sx={{ color: '#dd0000' }}>
                {formik.touched.startDate && formik.errors.startDate}
              </FormHelperText>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button
                onClick={handleClose}
                type="button"
                variant="outlined"
                fullWidth
                disabled={loadingUpdate}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
                disabled={loadingUpdate}
                endIcon={loadingUpdate ? <CircularProgress size={14} /> : undefined}
              >
                {loadingUpdate ? 'Saving...' : 'Save'}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Schedule;
