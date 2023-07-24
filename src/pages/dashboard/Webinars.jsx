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
import React, { useState, useEffect, useContext } from "react";
import WorkshopList from "../../components/workshops/WorkshopList";
import AddWorkshop from "../../components/workshops/AddWorkshop";
import AddWebinar from "../../components/webinars/AddWebinar";
import WebinarList from "../../components/webinars/WebinarList";
import { getEvents, deleteEvent } from "../../utils/api";
import { ToastContext } from "../../components/contexts/ToastContext";

function Webinars() {
  const [loading, setLoading] = useState(false);
  const [webinars, setWebinars] = useState([]);
  const [mode, setMode] = useState("normal");
  console.log("Webinars loaded : ", webinars);
  const [open, setOpen] = useState(false);
  const [deleteId, setId] = useState("");
  // const [previous, setPrevious] = useState(undefined);
  const { createToast } = useContext(ToastContext);
  function handleClose() {
    setOpen(false);
  }
  function handleDelete() {
    console.log("id :", deleteId);
    deleteEvent("webinar", deleteId)
      .then(() => {
        createToast({
          type: "success",
          message: `Webinar deleted successfully`,
        });
        refreshWebinars();
        setOpen(false);
      })
      .catch((err) => {
        createToast({
          type: "error",
          message: `Failed to delete webinar`,
        });
      });
  }
  

  useEffect(() => {
    setLoading(true);
    getEvents("webinar")
      .then((res) => {
        console.log("response : ", res.data.webinars);
        setWebinars(res.data.webinars);
        setLoading(false);
      })
      .catch(() => {});
  }, []);

  function refreshWebinars() {
    setLoading(true);
    getEvents("webinar")
      .then((res) => {
        console.log("response : ", res.data.webinars);
        setWebinars(res.data.webinars);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
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
            Webinars
          </Typography>

          <AddWebinar
            mode={mode}
            setMode={setMode}
            webinars={webinars}
            id={deleteId}
            refreshWebinars={refreshWebinars}
          />
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

        <WebinarList
          webinars={webinars}
          setDeleteId={setId}
          setOpen={setOpen}
          setMode={setMode}
        />
      </Box>
    </Box>
  );
}

export default Webinars;
