import { Box, LinearProgress, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import WorkshopList from "../../components/workshops/WorkshopList";
import AddWorkshop from "../../components/workshops/AddWorkshop";
import AddInternship from "../../components/internships/AddInternship";
import InternshipList from "../../components/internships/InternshipList";
import { getEvents } from "../../utils/api";

function Internships() {
  const [loading, setLoading] = useState(false);

  const [Internship, setInternship] = useState([]);

  useEffect(() => {
    setLoading(true);
    getEvents("internship")
      .then((res) => {
        console.log("response : ", res.data.internships);
        setInternship(res.data.internships);
        setLoading(false);
      })
      .catch(() => {});
  }, []);

  function refreshInternship(){
    setLoading(true);
    getEvents("internship")
      .then((res) => {
        console.log("response : ", res.data.internships);
        setInternship(res.data.internships);
        setLoading(false);
      })
      .catch(() => {});
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
      }}
    >
      {loading && (
        <LinearProgress
          sx={{
            position: "absolute",
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
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography typography="h3" fontWeight={600}>
            Internships
          </Typography>

          <AddInternship refreshInternship={refreshInternship}/>
        </Box>

        <InternshipList Internship={Internship}/>
      </Box>
    </Box>
  );
}

export default Internships;
