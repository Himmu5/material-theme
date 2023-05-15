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
import React, { useState } from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from '../../../utils/api';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflowX: 'hidden',
  },
}));

const initialValues = {
  batchName: '',
  courseID: '64523e36119d9d4ff40c4501',
  numberOfIntakes: 30,
  startDate: '',
  endDate: '',
  purchaseAvailability: '',
};

const validationSchema = yup.object({
  batchName: yup.string().required('Batch name is required!'),
  numberOfIntakes: yup.number('Enter a number'),
  startDate: yup.date('Invalid date'),
});

function NewBatch() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitBatch = (formData) => api.batch.createBatch(formData).then((res) => res);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      submitBatch(values)
        .then((res) => {
          console.log(res);
          setOpen(false);
          formik.resetForm();
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          formik.resetForm();
          setLoading(false);
        });
    },
  });

  return (
    <>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
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
              <FormHelperText>{formik.touched.batchName && formik.errors.batchName}</FormHelperText>
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
              <FormHelperText>
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
                <FormHelperText>
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
                <FormHelperText>{formik.touched.endDate && formik.errors.endDate}</FormHelperText>
              </FormControl>
            </Box>

            <FormControl fullWidth>
              <Typography
                variant="body1"
                color="text.secondary"
                component="label"
                htmlFor="purchaseAvailibility"
              >
                Set Purchase Availibility
              </Typography>
              <InputBase
                type="date"
                id="purchaseAvailibility"
                name="purchaseAvailibility"
                size="small"
                sx={{ mt: 1 }}
                fullWidth
                color="secondary"
                disabled={loading}
                value={formik.values.purchaseAvailibility}
                onChange={formik.handleChange}
                error={
                  formik.touched.purchaseAvailibility && Boolean(formik.errors.purchaseAvailibility)
                }
              />
              <FormHelperText>
                {formik.touched.purchaseAvailibility && formik.errors.purchaseAvailibility}
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
