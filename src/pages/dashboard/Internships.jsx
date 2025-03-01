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
import React, { useState, useEffect , useContext } from "react";
import AddInternship from "../../components/internships/AddInternship";
import InternshipList from "../../components/internships/InternshipList";
import { getEvents, deleteEvent } from "../../utils/api";
import { ToastContext } from "../../components/contexts/ToastContext";

function Internships() {
  const [loading, setLoading] = useState(false);
  const [deleteId, setId] = useState("");
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState("normal");
  const [Internship, setInternship] = useState([]);
  const { createToast } = useContext(ToastContext);

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
        setOpen(false);
        refreshInternship();
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

        <Dialog open={open} onClose={handleClose} maxWidth="sm">
          <DialogTitle sx={{ mt: 2, mx: 2 }}>
            {handleClose ? (
              <IconButton
                aria-label="close"
                onClick={handleClose}
                size="small"
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}

            <Typography variant="h4" align="center" fontWeight={600}>
              Are you sure?
            </Typography>
          </DialogTitle>
          <DialogContent
            sx={{ width: 350, display: "flex", justifyContent: "center" }}
          >
            <Typography
              variant="body1"
              align="center"
              fontWeight={500}
              color="text.secondary"
            >
              Do you really wish to delete
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 2 }}>
            <Button
              onClick={handleClose}
              type="button"
              variant="outlined"
              fullWidth
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleDelete}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>

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
