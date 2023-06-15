/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
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
  Typography,
  styled,
  Select,
  MenuItem,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './select.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../../../utils/api';
import { logout } from '../../../slices/adminAuth';
import { ToastContext } from '../../contexts/ToastContext';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflowX: 'hidden',
  },
}));

function AddSlot({ courseId, updateList, filter }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createToast } = useContext(ToastContext);

  console.log(filter);

  const initialValues = {
    batch: filter, // batches.length > 0 ? batches[batches.length - 1]._id : 'select',
    date: '',
    time: '',
  };

  const validationSchema = yup.object({
    batch: yup
      .string()
      .notOneOf(['loading', 'select'], 'No batch is selected to continue!')
      .oneOf(
        batches.length > 0 ? batches.map((batch) => batch?._id) : [],
        'Selected batch is invalid!',
      )
      .required('A batch is required!'),
    date: yup.date('Invalid date!').required('Date is required!'),
    time: yup.string().required('Time is required!'),
  });

  function setDateTime(date, time) {
    const index = time.indexOf('.'); // replace with ":" for differently displayed time.
    const index2 = time.indexOf(' ');

    let hours = time.substring(0, index);
    const minutes = time.substring(index + 1, index2);

    const mer = time.substring(index2 + 1, time.length);
    if (mer === 'PM') {
      hours += 12;
    }

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds('00');

    return date;
  }

  const handleAddSlot = (values) => {
    setLoadingSubmit(true);
    api.batch
      .getById(values.batch)
      .then((res) => {
        const slots = res?.data?.slotsForSiteBooking ? res.data.slotsForSiteBooking : [];

        let newSlots = [...slots, setDateTime(new Date(values.date), values.time).toISOString()];
        newSlots = newSlots.sort((date1, date2) => {
          const dateA = new Date(date1);
          const dateB = new Date(date2);
          return dateA > dateB;
        });

        api.schedules
          .update({ slotsForSiteBooking: newSlots }, values.batch)
          .then(() => {
            setLoadingSubmit(false);
            createToast({
              type: 'success',
              message: 'Added a new slot successfully',
            });
            updateList();
            setOpen(false);
            formik.resetForm();
          })
          .catch((err) => {
            setLoadingSubmit(false);
            createToast({ type: 'error', message: 'Failed to add new slot, try again!' });
            console.log(err);
            if (err?.response?.status === 401) {
              dispatch(logout());
              navigate('/admin-login');
            }
          });
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          dispatch(logout());
          navigate('/admin-login');
        }
        console.log(err);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleAddSlot(values);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  useEffect(() => {
    if (courseId) {
      setLoading(true);
      api.batch
        .list(courseId)
        .then((res) => {
          formik.setFieldValue(
            'batch',
            res?.data && res.data.length > 0 ? res.data[res.data.length - 1]?._id : null,
          );
          setBatches(res?.data);
          setLoading(false);
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
  }, [courseId]);

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        disabled={!filter}
      >
        Add Slot
      </Button>

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
            <AddCircleIcon sx={{ color: '#19488C' }} />
            Add a New Slot
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ width: 400, display: 'flex' }}>
          <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
            {/* <FormControl fullWidth size="small">
              <Typography variant="body1" color="text.secondary" component="label" htmlFor="batch">
                Select Batch
              </Typography>
              <Select
                className="date-select"
                value={loading ? 'loading' : batches.length === 0 ? 'select' : formik.values.batch}
                displayEmpty
                name="batch"
                id="batch"
                onChange={formik.handleChange}
                size="small"
                disabled={loading || loadingSubmit}
                defaultValue="select"
              >
                {batches.length > 0
                  && batches.map((batch) => (
                    <MenuItem value={batch?._id} key={batch?._id}>
                      {batch?.name}
                    </MenuItem>
                  ))}
                {loading && (
                  <MenuItem value="loading" disabled>
                    loading...
                  </MenuItem>
                )}
                <MenuItem value="select" disabled>
                  <em>- Select -</em>
                </MenuItem>
              </Select>
              <FormHelperText sx={{ color: '#dd0000' }}>
                {formik.touched.batch && formik.errors.batch}
              </FormHelperText>
            </FormControl> */}

            <Box sx={{ gap: 1, display: 'flex', my: 1 }}>
              <FormControl fullWidth>
                <Typography variant="body1" color="text.secondary" component="label" htmlFor="date">
                  Set a date
                </Typography>
                <InputBase
                  type="date"
                  id="date"
                  name="date"
                  size="small"
                  sx={{ mt: 0.5 }}
                  fullWidth
                  color="secondary"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  error={formik.touched.date && Boolean(formik.errors.date)}
                  disabled={loadingSubmit}
                />
                <FormHelperText sx={{ color: '#dd0000' }}>
                  {formik.touched.date && formik.errors.date}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth>
                <Typography variant="body1" color="text.secondary" component="label" htmlFor="time">
                  Set Time
                </Typography>
                <InputBase
                  type="time"
                  id="time"
                  name="time"
                  size="small"
                  sx={{ mt: 0.5 }}
                  fullWidth
                  color="secondary"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  error={formik.touched.time && Boolean(formik.errors.time)}
                  disabled={loadingSubmit}
                />

                <FormHelperText sx={{ color: '#dd0000' }}>
                  {formik.touched.time && formik.errors.time}
                </FormHelperText>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button
                onClick={handleClose}
                type="button"
                variant="outlined"
                fullWidth
                disabled={loadingSubmit}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
                disabled={loadingSubmit}
                endIcon={loadingSubmit ? <CircularProgress size={14} /> : undefined}
              >
                {loadingSubmit ? 'Saving...' : 'Save'}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddSlot;
