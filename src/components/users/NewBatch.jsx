import {
  Box,
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputBase,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CloseIcon from '@mui/icons-material/Close';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflowX: 'hidden',
  },
}));

function NewBatch() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <Typography variant="body1" color="text.secondary" component="label" htmlFor="name">
              Enter Batch Name
            </Typography>
            <InputBase
              id="name"
              name="name"
              size="small"
              sx={{ mt: 1 }}
              fullWidth
              color="secondary"
              // disabled={loading}
              // value={formik.values.name}
              // onChange={formik.handleChange}
              // error={formik.touched.name && Boolean(formik.errors.name)}
              // helperText={formik.touched.name && formik.errors.name}
            />
          </FormControl>

          <FormControl fullWidth>
            <Typography
              variant="body1"
              color="text.secondary"
              component="label"
              htmlFor="no_of_intakes"
            >
              Enter the No.of Intakes
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
                htmlFor="start_date"
              >
                Start Date
              </Typography>
              <InputBase
                type="date"
                id="start_date"
                name="start_date"
                size="small"
                sx={{ mt: 0.5 }}
                fullWidth
                color="secondary"
                // disabled={loading}
                // value={formik.values.start_date}
                // onChange={formik.handleChange}
                // error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                // helperText={formik.touched.start_date && formik.errors.start_date}
              />
            </FormControl>

            <FormControl fullWidth>
              <Typography
                variant="body1"
                color="text.secondary"
                component="label"
                htmlFor="end_date"
              >
                End Date
              </Typography>
              <InputBase
                type="date"
                id="end_date"
                name="end_date"
                size="small"
                sx={{ mt: 0.5 }}
                fullWidth
                color="secondary"
                // disabled={loading}
                // value={formik.values.end_date}
                // onChange={formik.handleChange}
                // error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                // helperText={formik.touched.end_date && formik.errors.end_date}
              />
            </FormControl>
          </Box>

          <FormControl fullWidth>
            <Typography
              variant="body1"
              color="text.secondary"
              component="label"
              htmlFor="availibility"
            >
              Set Purchase Availibility
            </Typography>
            <InputBase
              type="date"
              id="availibility"
              name="availibility"
              size="small"
              sx={{ mt: 1 }}
              fullWidth
              color="secondary"
              // disabled={loading}
              // value={formik.values.availibility}
              // onChange={formik.handleChange}
              // error={formik.touched.availibility && Boolean(formik.errors.availibility)}
              // helperText={formik.touched.availibility && formik.errors.availibility}
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
