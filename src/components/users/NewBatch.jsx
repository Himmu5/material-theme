import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputBase,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CloseIcon from '@mui/icons-material/Close';

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

      <Dialog open={open} onClose={handleClose} maxWidth="xs">
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
            gap: 2,
            width: '420px',
          }}
        >
          <FormControl fullWidth>
            <Typography variant="body1" color="text.secondary" component="label" htmlFor="password">
              Password
            </Typography>
            <InputBase
              type="password"
              id="password"
              name="password"
              size="small"
              sx={{ mt: 1 }}
              fullWidth
              color="secondary"
              // disabled={loading}
              // value={formik.values.password}
              // onChange={formik.handleChange}
              // error={formik.touched.password && Boolean(formik.errors.password)}
              // helperText={formik.touched.password && formik.errors.password}
            />
          </FormControl>

          <FormControl fullWidth>
            <Typography variant="body1" color="text.secondary" component="label" htmlFor="password">
              Password
            </Typography>
            <InputBase
              type="password"
              id="password"
              name="password"
              size="small"
              sx={{ mt: 1 }}
              fullWidth
              color="secondary"
              // disabled={loading}
              // value={formik.values.password}
              // onChange={formik.handleChange}
              // error={formik.touched.password && Boolean(formik.errors.password)}
              // helperText={formik.touched.password && formik.errors.password}
            />
          </FormControl>

          <FormControl fullWidth>
            <Typography variant="body1" color="text.secondary" component="label" htmlFor="password">
              Password
            </Typography>
            <InputBase
              type="password"
              id="password"
              name="password"
              size="small"
              sx={{ mt: 1 }}
              fullWidth
              color="secondary"
              // disabled={loading}
              // value={formik.values.password}
              // onChange={formik.handleChange}
              // error={formik.touched.password && Boolean(formik.errors.password)}
              // helperText={formik.touched.password && formik.errors.password}
            />
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ m: 1 }}>
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
