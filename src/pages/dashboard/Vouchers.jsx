/* eslint-disable no-underscore-dangle */
import {
  Box, Grid, LinearProgress, Paper, Skeleton, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Voucher from '../../components/vouchers/Voucher';
import api from '../../utils/api';
import AddVoucher from '../../components/vouchers/AddVoucher';
import DeleteVouchers from '../../components/vouchers/DeleteVouchers';

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
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [selected, setSelected] = useState([]);
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.voucher
      .list()
      .then((res) => {
        console.log(res?.data);
        setLoading(false);
        setCourseId(res?.data[0]?._id);
        setVouchers(res?.data[0]?.availableVoucherCodes);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [forceUpdate]);

  const handlUpdateList = () => {
    setForceUpdate((prev) => !prev);
    setSelected([]);
  };

  const handleSelect = (id) => {
    let temp = [...selected];
    const foundIndex = temp.indexOf(id);
    if (foundIndex !== -1) {
      temp.splice(foundIndex, 1);
    } else {
      temp = [...temp, id];
    }
    setSelected(temp);
  };

  const deleteVouchers = () => {
    console.log(courseId);
    if (courseId) {
      return api.voucher.deleteList({ IDs: selected }, courseId).then((res) => res);
    }
    return null;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        sx={{
          bgcolor: '#fff',
          ml: -4,
        }}
        elevation={3}
        component={motion.div}
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: -50 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 6,
            pl: 10,
            py: 2,
          }}
        >
          <Typography variant="h3" fontWeight={600}>
            Vouchers Data
          </Typography>
          {selected.length > 0 ? (
            <DeleteVouchers
              deleteVouchers={() => deleteVouchers()}
              updateList={() => handlUpdateList()}
            />
          ) : (
            <AddVoucher updateList={() => handlUpdateList()} />
          )}
        </Box>

        {loading && <LinearProgress />}
      </Paper>

      {loading && vouchers.length === 0 ? (
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
          {[...new Array(3)].map(() => (
            <Grid
              item
              xs="auto"
              component={motion.div}
              variants={animationChild}
              viewport={{ once: true }}
            >
              <Skeleton variant="rectangular" width={240} height={115} animation="wave" />
            </Grid>
          ))}
        </Grid>
      ) : null}

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
        {vouchers.length > 0
          && vouchers.map((voucher) => (
            <Grid
              item
              xs="auto"
              component={motion.div}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ type: 'tween' }}
              viewport={{ once: true }}
              key={`vouch-${voucher._id}`}
            >
              <Voucher
                selectable={selected.length > 0}
                select={() => handleSelect(voucher?._id)}
                checked={selected.includes(voucher?._id)}
                voucher={voucher}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default Vouchers;
