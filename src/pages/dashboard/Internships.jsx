import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box, LinearProgress, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import WorkshopList from "../../components/workshops/WorkshopList";
import AddWorkshop from "../../components/workshops/AddWorkshop";
import AddInternship from "../../components/internships/AddInternship";
import InternshipList from "../../components/internships/InternshipList";
import { getEvents, deleteEvent } from "../../utils/api";

function Internships() {
  const [loading, setLoading] = useState(false);
  const [deleteId, setId] = useState("");
  const [open, setOpen] = useState(false);

  const [Internship, setInternship] = useState([]);
  const [mode, setMode] = useState("normal");

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

  function refreshInternship() {
    setLoading(true);
    getEvents("internship")
      .then((res) => {
        console.log("response : ", res.data.internships);
        setInternship(res.data.internships);
        setLoading(false);
      })
      .catch(() => {});
  }

  function handleClose() {
    setOpen(false);
  }
  function handleDelete() {
    console.log("id :", deleteId);
    deleteEvent("internship", deleteId)
      .then(() => {
        createToast({
          type: "success",
          message: `internship deleted successfully`,
        });
        refreshInternship();
        setOpen(false);
      })
      .catch((err) => {
        createToast({
          type: "error",
          message: `Failed to delete internship`,
        });
      });
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

          <AddInternship id={deleteId} mode={mode} setMode={setMode} refreshInternship={refreshInternship} />
        </Box>

        <InternshipList
          Internship={Internship}
          setDeleteId={setId}
          setOpen={setOpen}
          setMode={setMode}
        />
      </Box>
    </Box>
  );
}

export default Internships;
