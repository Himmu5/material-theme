import {
  Box,
  Button,
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputBase,
  Typography,
  styled,
  CircularProgress,
} from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import { useFormik } from 'formik';
import api from '../../utils/api';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflowX: 'hidden',
  },
}));

const initialValues = {
  code: '',
  courseID: '64523e36119d9d4ff40c4501',
  discountPerCent: '',
};

const validationSchema = yup.object({
  code: yup.string().required('Voucher name is required!'),
  discountPerCent: yup
    .number()
    .min(0, 'Enter valid percentage (0-100)')
    .max(100, 'Enter valid percentage (0-100)')
    .required('Discount percentage is required!'),
});

function AddVoucher({ updateList }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const submitVoucher = (formData) => {
    console.log(formData);
    const voucher = {
      courseID: formData.courseID,
      voucher: {
        code: formData.code,
        discountPerCent: formData.discountPerCent,
      },
    };

    return api.voucher.add(voucher).then((res) => res);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      submitVoucher(values)
        .then((res) => {
          console.log(res);
          handleClose();
          updateList();
          formik.resetForm();
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          handleClose();
          setLoading(false);
        });
    },
  });

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        disableElevation
        onClick={handleClickOpen}
      >
        Add Voucher
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>
          {handleClose ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h4" fontWeight={600}>
                Mark Attendance
              </Typography>

              <IconButton
                aria-label="close"
                onClick={handleClose}
                size="small"
                sx={{
                  mt: -1,
                  mr: -2,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ) : null}
        </DialogTitle>
        <DialogContent sx={{ width: 450 }}>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography variant="body1" color="text.secondary" component="label" htmlFor="code">
                Enter Voucher Name
              </Typography>
              <InputBase
                id="code"
                name="code"
                size="small"
                sx={{ mt: 1 }}
                fullWidth
                color="secondary"
                disabled={loading}
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
              />
              <FormHelperText sx={{ color: '#dd0000' }}>
                {formik.touched.code && formik.errors.code}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <Typography
                variant="body1"
                color="text.secondary"
                component="label"
                htmlFor="discountPerCent"
              >
                Enter Discount Percent
              </Typography>
              <InputBase
                id="discountPerCent"
                name="discountPerCent"
                size="small"
                sx={{ mt: 1 }}
                fullWidth
                color="secondary"
                disabled={loading}
                value={formik.values.discountPerCent}
                onChange={formik.handleChange}
                error={formik.touched.discountPerCent && Boolean(formik.errors.discountPerCent)}
              />
              <FormHelperText sx={{ color: '#dd0000' }}>
                {formik.touched.discountPerCent && formik.errors.discountPerCent}
              </FormHelperText>
            </FormControl>

            <Box
              sx={{
                mb: 0,
                mt: 2,
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
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddVoucher;
