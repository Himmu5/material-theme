import {
  Box,
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputBase,
  Typography,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflowX: 'hidden',
  },
}));

const initialValues = {
  batchName: '',
  courseName: '',
  startDate: '',
  endDate: '',
  durationInDays: '',
  purchaseAvailability: '',
  studentsEnrolled: [],
};

// const validationSchema = Yup.object().shape({
//   email: Yup.string().email('Enter a valid email!').required('This field is required!'),
//   password: Yup.string().required('This field is required!'),
// });

function NewBatch({ loading = false }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
        <DialogContent
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
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
              batchName="batchName"
              size="small"
              sx={{ mt: 1 }}
              fullWidth
              color="secondary"
              disabled={loading}
              value={formik.values.batchName}
              onChange={formik.handleChange}
              error={formik.touched.batchName && Boolean(formik.errors.batchName)}
              helperText={formik.touched.batchName && formik.errors.batchName}
            />
          </FormControl>

          <FormControl fullWidth>
            <Typography
              variant="body1"
              color="text.secondary"
              component="label"
              htmlFor="no_of_intakes"
            >
              Enter the No. of Intakes
            </Typography>
            <InputBase
              id="no_of_intakes"
              name="no_of_intakes"
              size="small"
              sx={{ mt: 1 }}
              fullWidth
              color="secondary"
              // disabled={loading}
              // value={formik.values.no_of_intakes}
              // onChange={formik.handleChange}
              // error={formik.touched.no_of_intakes && Boolean(formik.errors.no_of_intakes)}
              // helperText={formik.touched.no_of_intakes && formik.errors.no_of_intakes}
            />
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
                helperText={formik.touched.startDate && formik.errors.startDate}
              />
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
                helperText={formik.touched.endDate && formik.errors.endDate}
              />
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
              helperText={formik.touched.purchaseAvailibility && formik.errors.purchaseAvailibility}
            />
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ m: 2, mt: 0 }}>
          <Button onClick={handleClose} variant="outlined" fullWidth>
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained" fullWidth>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NewBatch;
