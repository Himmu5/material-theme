import { Box, LinearProgress, Typography } from '@mui/material';
import React, { useState , useEffect } from 'react';
import WorkshopList from '../../components/workshops/WorkshopList';
import AddWorkshop from '../../components/workshops/AddWorkshop';
import AddWebinar from '../../components/webinars/AddWebinar';
import WebinarList from '../../components/webinars/WebinarList';
import { getEvents } from '../../utils/api'

function Webinars() {
  const [loading, setLoading] = useState(false);
  const [webinars , setWebinars] = useState([]);
  
  useEffect(()=>{
    setLoading(true);
    getEvents("webinar").then((res)=>{
      console.log("response : ",res.data.webinars);
      setWebinars(res.data.webinars);
      setLoading(false);
    }).catch(()=>{
    })
  },[])

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
            Webinars
          </Typography>

          <AddWebinar />
        </Box>

        <WebinarList webinars={webinars} />
      </Box>
    </Box>
  );
}

export default Webinars;
