import {
  Button,
  CircularProgress,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  styled,
  FormControl,
  InputBase,
  FormHelperText,
} from '@mui/material';
import React, { useState } from 'react';
import { MdEditCalendar } from 'react-icons/md';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflowX: 'hidden',
  },
}));

const validationSchema = yup.object({
  newDate: yup.date('Invalid date!').required('New date is required!'),
});

function UpdateSlot({ slot, deleteSlot }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const date = new Date(slot);


  const initialValues = {
    newDate:
  }

 
  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
    },
  });

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  return (
    <>
      <IconButton color="primary" sx={{ fontSize: 20, mr: 1 }} onClick={handleClickOpen}>
        <MdEditCalendar />
      </IconButton>

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
        </DialogContent>
        <DialogActions sx={{ mb: 2, mx: 2 }}>
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
            variant="contained"
            color="error"
            fullWidth
            disabled={loading}
            endIcon={loading ? <CircularProgress size={14} /> : undefined}
            onClick={() => deleteSlot()}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdateSlot;
