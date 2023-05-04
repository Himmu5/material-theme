import {
  Button,
  Dialog as MuiDialog,
  DialogTitle,
  IconButton,
  styled,
  Typography,
  DialogContent,
  Box,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    width: 600,
    overflowX: 'hidden',
  },
}));

function MarkAttendance() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Button variant="contained" disableElevation onClick={handleClickOpen}>
        Mark Attendance
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>
          {handleClose ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                mt: -1,
                mr: -2,
              }}
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                size="small"
                sx={{
                  //   position: 'absolute',
                  //   top: 8,
                  //   right: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ) : null}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" fontWeight={600}>
              Mark Attendance
            </Typography>

            <FormControl sx={{ height: '3rem' }} size="small">
              <Select
                value={age}
                displayEmpty
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogTitle>
        <DialogContent />
      </Dialog>
    </>
  );
}

export default MarkAttendance;
