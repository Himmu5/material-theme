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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
import api from '../../../utils/api';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflowX: 'hidden',
  },
}));

const initialValues = {
  batchName: '',
  courseName: 'Civil Survey Course',
  numberOfIntakes: 30,
  startDate: '',
  endDate: '',
  purchaseAvailability: '',
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

  const submitBatch = (formData) => {
    api.batch
      .createBatch(formData)
      .then((res) => {
        console.log(res);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: (values) => {
      console.log(values);
      submitBatch(values);
      formik.resetForm();
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
                helperText={formik.touched.batchName && formik.errors.batchName}
              />
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
                fullWidth
                color="secondary"
                disabled={loading}
                value={formik.values.numberOfIntakes}
                onChange={formik.handleChange}
                error={formik.touched.numberOfIntakes && Boolean(formik.errors.numberOfIntakes)}
                helperText={formik.touched.numberOfIntakes && formik.errors.numberOfIntakes}
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
                helperText={
                  formik.touched.purchaseAvailibility && formik.errors.purchaseAvailibility
                }
              />
            </FormControl>
            <Box
              sx={{
                mb: 0,
                mt: 3,
                gap: 1.5,
                display: 'flex',
              }}
            >
              <Button onClick={handleClose} type="button" variant="outlined" fullWidth>
                Cancel
              </Button>
              <Button type="submit" variant="contained" fullWidth>
                Save
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewBatch;
