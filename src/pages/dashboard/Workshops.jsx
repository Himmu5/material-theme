import { Box, LinearProgress, Typography } from '@mui/material';
import React, { useState ,useEffect } from 'react';
import WorkshopList from '../../components/workshops/WorkshopList';
import AddWorkshop from '../../components/workshops/AddWorkshop';
import { getEvents } from '../../utils/api';

function Workshops() {
  const [loading, setLoading] = useState(false);

  const [Workshop , setWorkshop] = useState([]);
  
  useEffect(()=>{
    setLoading(true);
    getEvents("workshop").then((res)=>{
      console.log("response : ",res.data.workshops);
      setWorkshop(res.data.workshops);
      setLoading(false);
    }).catch(()=>{
    })
  },[])

  function updateWorkShops(){
    setLoading(true);
    getEvents("workshop").then((res)=>{
      console.log("response : ",res.data.workshops);
      setWorkshop(res.data.workshops);
      setLoading(false);
    }).catch(()=>{
      setLoading(false);
    })
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100vh',
      }}
    >
      {loading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
          color="primary"
        />
      )}
      <Box
        sx={{
          py: 3,
          px: 5,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography typography="h3" fontWeight={600}>
            Workshops
          </Typography>

          <AddWorkshop updateWorkshops={updateWorkShops} />
        </Box>

        <WorkshopList Workshop={Workshop} />
      </Box>
    </Box>
  );
}

export default Workshops;
