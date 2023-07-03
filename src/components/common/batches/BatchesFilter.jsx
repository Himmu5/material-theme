/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import {
  Backdrop, Box, Chip, CircularProgress, Skeleton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HiPencil } from 'react-icons/hi';
import api from '../../../utils/api';
import { logout } from '../../../slices/adminAuth';
import EditBatch from './EditBatch';

function BatchesFilter({
  filter = null, changeFilter, courseId, width, shouldUpdate = false,
}) {
  const [batches, setBatches] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forceUpdate, setForceUpdate] = useState(false);
  const [edit, setEdit] = React.useState({
    open: false,
    batchId: null,
    loading: false,
    initialValues: {
      batchName: '',
      numberOfIntakes: 30,
      startDate: null,
      endDate: null,
      purchaseAvailability: '',
    },
  });

  useEffect(() => {
    if (courseId) {
      setLoading(true);
      api.batch
        .list(courseId)
        .then((res) => {
          setLoading(false);
          setBatches(res.data);
          changeFilter(res?.data && res.data.length > 0 ? res.data[0]._id : null);
          setActive(res?.data && res.data.length > 0 ? res.data[0] : null);
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            dispatch(logout());
            navigate('/admin-login');
          }
          console.log(err);
          setLoading(false);
        });
    }
  }, [courseId, shouldUpdate, forceUpdate]);

  useEffect(() => {
    setActive(batches.find((batch) => batch._id === filter));
  }, [filter]);

  const handleClose = () => {
    setEdit({ open: false, batchId: null });
  };

  const formatDate = (date) => (date ? String(date).split('T')[0] : '');

  const handleClickOpen = (batchId) => {
    if (batchId) {
      setEdit((prev) => ({ ...prev, loading: true }));
      api.batch
        .getById(batchId)
        .then((res) => {
          if (res?.data && res.data?.batch) {
            const { batch } = res.data;
            setEdit({
              open: true,
              batchId,
              initialValues: {
                ...batch,
                batchName: batch?.name,
                startDate: formatDate(batch?.startDate),
                endDate: formatDate(batch?.endDate),
                purchaseAvailability: formatDate(batch?.purchaseAvailability),
              },
            });
          }
          setEdit((prev) => ({ ...prev, loading: false }));
        })
        .catch((err) => {
          console.log(err);
          setEdit((prev) => ({ ...prev, loading: false }));
        });
    }
  };

  const postUpdate = () => {
    setForceUpdate((prev) => !prev);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        gap: 1.5,
        display: 'flex',
        maxWidth: width,
        width,
        overflowX: 'auto',
      }}
    >
      {batches.length > 0 && !loading ? (
        batches.map((batch) => (
          <Chip
            key={batch?._id}
            label={batch?.name}
            color="primary"
            onDelete={
              active && active?._id === batch?._id ? () => handleClickOpen(batch?._id) : undefined
            }
            deleteIcon={<HiPencil size={24} style={{ padding: '0 3px' }} />}
            variant={active && active?._id === batch?._id ? 'filled' : 'outlined'}
            onClick={() => changeFilter(batch?._id)}
            // {() => (filter === batch?._id ? changeFilter(null) : changeFilter(batch?._id))}
            sx={{ transition: 'all 0.3s ease-in-out' }}
          />
        ))
      ) : loading ? (
        [...new Array(3)].map((skel, index) => (
          <Skeleton
            key={`skeleton-${skel}-${index}`}
            variant="rounded"
            animation="wave"
            sx={{ borderRadius: '20px' }}
            width={150}
            height={30}
          />
        ))
      ) : batches.length === 0 ? (
        <Chip
          color="warning"
          variant="outlined"
          // size="small"
          label="No batches found for this course"
          icon={<ErrorOutlineIcon />}
        />
      ) : (
        0
      )}
      {edit.loading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {edit.open && (
        <EditBatch
          courseId={courseId}
          isOpen={edit.open}
          batchId={edit.batchId}
          initialValues={edit.initialValues}
          close={() => handleClose()}
          updateBatches={() => postUpdate()}
        />
      )}
    </Box>
  );
}

export default BatchesFilter;
