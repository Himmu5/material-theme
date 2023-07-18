/* eslint-disable no-underscore-dangle */
import {
  Box,
  Button,
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputBase,
  Typography,
  styled,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useContext, useState } from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';
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

const validationSchema = yup.object({
  batchName: yup.string().required('Batch name is required!'),
  numberOfIntakes: yup.number('Enter a number'),
  startDate: yup.date('Invalid date').required('Start date is required!'),
  endDate: yup
    .date('Invalid date')
    .required('End date is required!')
    .min(yup.ref('startDate'), 'End date cannot be before start date'),
  purchaseAvailability: yup
    .date('Invalid date')
    .required('Purchase availability is required!')
    .max(yup.ref('endDate'), 'Purchase Availability cannot be after end date'),
});

function NewBatch({ course, updateBatches }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createToast } = useContext(ToastContext);

  const initialValues = {
    batchName: '',
    numberOfIntakes: 30,
    startDate: null,
    endDate: null,
    purchaseAvailability: '',
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const submitBatch = (formData) => api.batch.createBatch(formData).then((res) => res);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = { ...values, courseID: course?._id };
      setLoading(true);
      console.log(formData);
      submitBatch(formData)
        .then(() => {
          setOpen(false);
          createToast({
            type: 'success',
            message: `Created batch ${formik.values.batchName} successfully`,
          });
          updateBatches();
          formik.resetForm();
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          formik.resetForm();
          setLoading(false);
          createToast({ type: 'error', message: 'Failed to create to new batch, try again!' });
          if (err?.response?.status === 401) {
            dispatch(logout());
            navigate('/admin-login');
          }
        });
    },
  });

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        disabled={!course}
      >
        New Batch
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>
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
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            variant="h4"
            fontWeight={600}
          >
            <GroupAddIcon color="primary" />
            Create a New Batch
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              marginTop: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              width: '550px',
            }}
          >
            <FormControl fullWidth>
              <Typography
                variant="body1"
                color="text.secondary"
                component="label"
                htmlFor="batchName"
              >
                Enter Batch Name
              </Typography>
              <InputBase
                id="batchName"
                name="batchName"
                size="small"
                sx={{ mt: 1 }}
                fullWidth
                color="secondary"
                disabled={loading}
                value={formik.values.batchName}
                onChange={formik.handleChange}
                error={formik.touched.batchName && Boolean(formik.errors.batchName)}
              />
              <FormHelperText sx={{ color: '#dd0000' }}>
                {formik.touched.batchName && formik.errors.batchName}
              </FormHelperText>
            </FormControl>

            {/* <FormControl fullWidth>
              <Typography
                variant="body1"
                color="text.secondary"
                component="label"
                htmlFor="courseName"
              >
                Enter Course Name
              </Typography>
              <InputBase
                id="courseName"
                name="courseName"
                size="small"
                sx={{ mt: 1 }}
                fullWidth
                color="secondary"
                disabled={loading}
                value={formik.values.courseName}
                onChange={formik.handleChange}
                error={formik.touched.courseName && Boolean(formik.errors.courseName)}
                helperText={formik.touched.courseName && formik.errors.courseName}
              />
            </FormControl> */}

            <FormControl fullWidth>
              <Typography
                variant="body1"
                color="text.secondary"
                component="label"
                htmlFor="numberOfIntakes"
              >
                Enter the No. of Intakes
              </Typography>
              <InputBase
                id="numberOfIntakes"
                name="numberOfIntakes"
                size="small"
                sx={{ mt: 1 }}
                type="number"
                fullWidth
                color="secondary"
                disabled={loading}
                value={formik.values.numberOfIntakes}
                onChange={formik.handleChange}
                error={formik.touched.numberOfIntakes && Boolean(formik.errors.numberOfIntakes)}
              />
              <FormHelperText sx={{ color: '#dd0000' }}>
                {formik.touched.numberOfIntakes && formik.errors.numberOfIntakes}
              </FormHelperText>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <FormControl fullWidth>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="label"
                  htmlFor="startDate"
                >
                  Start Date
                </Typography>
                <InputBase
                  type="date"
                  id="startDate"
                  name="startDate"
                  size="small"
                  sx={{ mt: 0.5 }}
                  fullWidth
                  color="secondary"
                  disabled={loading}
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                />
                <FormHelperText sx={{ color: '#dd0000' }}>
                  {formik.touched.startDate && formik.errors.startDate}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="label"
                  htmlFor="endDate"
                >
                  End Date
                </Typography>
                <InputBase
                  type="date"
                  id="endDate"
                  name="endDate"
                  size="small"
                  sx={{ mt: 0.5 }}
                  fullWidth
                  color="secondary"
                  disabled={loading}
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                />
                <FormHelperText sx={{ color: '#dd0000' }}>
                  {formik.touched.endDate && formik.errors.endDate}
                </FormHelperText>
              </FormControl>
            </Box>

            <FormControl fullWidth>
              <Typography
                variant="body1"
                color="text.secondary"
                component="label"
                htmlFor="purchaseAvailability"
              >
                Last Date for Purchasing
              </Typography>
              <InputBase
                type="date"
                id="purchaseAvailability"
                name="purchaseAvailability"
                size="small"
                sx={{ mt: 1 }}
                fullWidth
                color="secondary"
                disabled={loading}
                value={formik.values.purchaseAvailability}
                onChange={formik.handleChange}
                error={
                  formik.touched.purchaseAvailability && Boolean(formik.errors.purchaseAvailability)
                }
              />
              <FormHelperText sx={{ color: '#dd0000' }}>
                {formik.touched.purchaseAvailability && formik.errors.purchaseAvailability}
              </FormHelperText>
            </FormControl>
            <Box
              sx={{
                mb: 0,
                mt: 3,
                gap: 1.5,
                display: 'flex',
              }}
            >
              <Button
                onClick={handleClose}
                type="button"
                variant="outlined"
                fullWidth
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                endIcon={loading ? <CircularProgress size={14} /> : undefined}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewBatch;
