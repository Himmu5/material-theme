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
import AttendanceSearch from './AttendanceSearch';
import StudentsList from './StudentsList';
import './select.css';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    width: 600,
    overflowX: 'hidden',
  },
}));

function MarkAttendance() {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Button variant="text" size="small" disableElevation onClick={handleClickOpen}>
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
            <Typography variant="h4" fontWeight={600} lineHeight={1}>
              Mark Attendance
            </Typography>

            <FormControl size="small">
              <Select
                className="date-select"
                value={age}
                displayEmpty
                sx={{ borderRadius: 3 }}
                onChange={handleChange}
                size="small"
              >
                <MenuItem value="" disabled>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>01/05/2023</MenuItem>
                <MenuItem value={20}>02/05/2023</MenuItem>
                <MenuItem value={30}>03/05/2023</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <AttendanceSearch />

          <StudentsList />
        </DialogTitle>
        <DialogContent />
      </Dialog>
    </>
  );
}

export default MarkAttendance;
