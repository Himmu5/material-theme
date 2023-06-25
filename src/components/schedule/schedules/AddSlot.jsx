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
  const [chapters, setChapters] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createToast } = useContext(ToastContext);

  const initialValues = {
    batch: filter,
    chapter: chapters.length > 0 ? chapters[chapters.length - 1]._id : 'select',
    date: '',
    time: '',
  };

  const validationSchema = yup.object({
    date: yup.date('Invalid date!').required('Date is required!'),
    chapter: yup.string().required(''),
    time: yup.string().required('Time is required!'),
  });

  const handleAddSlot = (values) => {
    setLoadingSubmit(true);
    if (filter) {
      api.schedules
        .slots(filter)
        .then((res) => {
          const slots = res?.data && res.data.length > 0
            ? res.data.map((slot) => ({
              date: slot?.date,
              lessonId: slot?.lessonId,
              time: slot?.time,
            }))
            : [];
          console.log('slots', res.data);

          let newSlots = [
            ...slots,
            { date: values?.date, time: values?.time, lessonId: values?.chapter },
          ];
          // setDateTime(new Date(values.date), values.time).toISOString()];
          newSlots = newSlots.sort((date1, date2) => {
            const dateA = new Date(date1);
            const dateB = new Date(date2);
            return dateA > dateB;
          });

          api.schedules
            .update({ slotsForSiteBooking: newSlots }, filter)
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
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
    console.log(filter);
    if (filter) {
      setLoading(true);
      api.schedules
        .chapters(filter)
        .then((res) => {
          formik.setFieldValue(
            'chapter',
            res?.data && res.data.length > 0 ? res.data[res.data.length - 1]?.lessonId : null,
          );
          setChapters(res?.data);
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
  }, [courseId, filter]);

  console.log('chapters', chapters);

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
            <FormControl fullWidth size="small">
              <Typography variant="body1" color="text.secondary" component="label" htmlFor="batch">
                Select chapter
              </Typography>
              <Select
                className="chapter-select"
                displayEmpty
                name="chapter"
                id="chapter"
                value={
                  loading ? 'loading' : chapters.length === 0 ? 'select' : formik.values.chapter
                }
                onChange={formik.handleChange}
                size="small"
                disabled={loading || loadingSubmit}
                defaultValue="select"
              >
                {chapters.length > 0
                  && chapters.map((chapter) => (
                    <MenuItem value={chapter?.lessonId} key={chapter?.lessonId}>
                      {chapter?.lessonTitle}
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
                {formik.touched.chapter && formik.errors.chapter}
              </FormHelperText>
            </FormControl>

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
