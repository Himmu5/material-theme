import AddIcon from '@mui/icons-material/Add';
import {
  Box, Button, Grid, Paper, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { AnimatePresence, motion } from 'framer-motion';
import Voucher from '../../components/vouchers/Voucher';
import api from '../../utils/api';

const animationParent = {
  hidden: { opacity: 0, y: 10, x: 10 },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { staggerChildren: 0.05, duration: 0.05 },
  },
};

const animationChild = {
  hidden: { opacity: 0, y: 10, x: 10 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
  },
};

function Vouchers() {
  const [selectable, setSelectable] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    api.voucher
      .list()
      .then((res) => {
        console.log(res?.data[0]?.availableVoucherCodes);
        setVouchers(res?.data[0]?.availableVoucherCodes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleVoucherClick = () => {
    setSelectable(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        sx={{
          bgcolor: '#fff',
          ml: -4,
          px: 6,
          pl: 10,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        elevation={3}
        component={motion.div}
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: -50 }}
      >
        <Typography variant="h3" fontWeight={600}>
          Vouchers Data
        </Typography>

        {selectable ? (
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />} disableElevation>
            Delete
          </Button>
        ) : (
          <Button variant="contained" startIcon={<AddIcon />} disableElevation>
            Add Voucher
          </Button>
        )}
      </Paper>

      <Grid
        container
        sx={{ width: '100%', p: 5 }}
        rowGap={3}
        columnGap={4}
        component={motion.div}
        initial="hidden"
        animate="show"
        variants={animationParent}
        viewport={{ once: true }}
      >
        {/* {[...new Array(16)].map(() => (
          <Grid
            item
            xs="auto"
            component={motion.div}
            variants={animationChild}
            viewport={{ once: true }}
          >
            <Voucher selectable={selectable} select={() => handleVoucherClick()} />
          </Grid>
        ))} */}

        {vouchers.length > 0
          && vouchers.map((voucher) => (
            <Grid
              item
              xs="auto"
              component={motion.div}
              variants={animationChild}
              viewport={{ once: true }}
              key={`vouch-${voucher._id}`}
            >
              <Voucher
                selectable={selectable}
                select={() => handleVoucherClick()}
                voucher={voucher}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default Vouchers;
