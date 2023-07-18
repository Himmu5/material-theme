import {
  Button,
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  styled,
  Box,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TestsList from './TestsList';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflowX: 'hidden',
  },
}));

function MCQScores({ avgScore = 0, scores = [] }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="text" size="small" sx={{ fontSize: 12, p: 0 }} onClick={handleClickOpen}>
        View in Detail
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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

          <Typography variant="h4" fontWeight={600}>
            MCQ Scores
          </Typography>
          <Box
            sx={{
              px: 0.8,
              py: 0.5,
              borderRadius: 2,
              lineHeight: 1,
              border: 1,
              borderColor: '#D9D9D9',
              display: 'flex',
              alignItems: 'center',
              gap: 0.4,
            }}
          >
            <Typography color="text.secondary" variant="caption" fontWeight={500}>
              Avg:
            </Typography>
            <Typography variant="caption" color="primary.main" fontWeight={500}>
              {avgScore}
              /10
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ width: 450 }}>
          <TestsList rows={scores} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MCQScores;
