/* eslint-disable no-underscore-dangle */
import {
  Box,
  Button,
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputBase,
  Typography,
  styled,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext, useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdWorkHistory } from "react-icons/md";
import api, { createEvents , getEventById ,updateEvent } from "../../utils/api";
import { logout } from "../../slices/adminAuth";
import { ToastContext } from "../contexts/ToastContext";

const Dialog = styled(MuiDialog)(() => ({
  "& .MuiDialog-paper": {
    borderRadius: 16,
    overflowX: "hidden",
  },
}));

const validationSchema = yup.object({
  title: yup.string().required("title is required!"),
  description: yup.string().required("Enter the description"),
  startDate: yup.date("Invalid date").required("Start date is required!"),
  endDate: yup
    .date("Invalid date")
    .required("End date is required!")
    .min(yup.ref("startDate"), "End date cannot be before start date"),
  price: yup.number("Invalid Amount").required("Amount is needed!"),
});

function AddInternship({ course, refreshInternship, mode , id , setMode }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createToast } = useContext(ToastContext);

  useEffect(() => {
    formik.values.title = ""
    formik.values.description =""
    formik.values.startDate = null;
    formik.values.endDate = null;
    formik.values.price = ""
    setOpen(mode === "update");
    if (mode === "update") {
      setLoading(true);
      getEventById("internship" , id).then((res) => {
        setLoading(false);
        const response = res.data;
        formik.values.title = response.title;
        formik.values.description = response.description;
        formik.values.startDate = response.startDate.slice(0, 10);
        formik.values.endDate = response.endDate.slice(0, 10);
        formik.values.price = response.price;
      });
    }
  }, [mode]);


  const initialValues = {
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    price: "",
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const submitBatch = (formData) => api.batch.createBatch(formData).then((res) => res);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = { ...values, courseID: course?._id };
      setLoading(true);
      console.log(formData);
      setMode("update")
      if (mode === "normal") {
        const response = await createEvents({
          ...formData,
          learningType: "internship",
        });
        if (response.success === true) {
          setOpen(false);
          setMode("normal");
          createToast({
            type: "success",
            message: `Created new Internship successfully`,
          });
          refreshInternship();
          formik.resetForm();
          setLoading(false);
        } else if (response.status === false) {
          console.log(err);
          setMode("normal");
          formik.resetForm();
          setLoading(false);
          createToast({
            type: "error",
            message: "Failed to create new Internship, try again!",
          });
          if (err?.response?.status === 401) {
            dispatch(logout());
            navigate("/admin-login");
          }
        }
      } else if (mode === "update") {
        console.log("Update mode");
        const res = await updateEvent(formik.values , id);
        if (res.success === true) {
          setOpen(false);
          createToast({
            type: "success",
            message: `Webinar updated successfully`,
          });
          refreshInternship();
          setMode("normal");
          formik.resetForm();
          setLoading(false);
        } else if (res.success === false) {
          console.log(err);
          formik.resetForm();
          setMode("normal");
          setLoading(false);
          createToast({
            type: "error",
            message: "Failed to update the webinar, try again!",
          });
          if (err?.response?.status === 401) {
            dispatch(logout());
            navigate("/admin-login");
          }
        }
      }
    },
  });

  const handleClose = () => {
    setOpen(false);
    setMode("normal")
    formik.resetForm();
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        // disabled={!course}
      >
        Add Internships
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>
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

          <Typography
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            variant="h4"
            fontWeight={600}
          >
            <MdWorkHistory color="#19488C" />
            {mode ==="normal" ? "Add a New Internship" : "Update the Internship"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              marginTop: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
              width: "550px",
            }}
          >
            <FormControl fullWidth>
              <Typography
                variant="body1"
                color="text.secondary"
                component="label"
                htmlFor="title"
              >
                Enter Title
              </Typography>
              <InputBase
                id="title"
                name="title"
                size="small"
                sx={{ mt: 1 }}
                fullWidth
                color="secondary"
                disabled={loading}
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
              />
              <FormHelperText sx={{ color: "#dd0000" }}>
                {formik.touched.title && formik.errors.title}
              </FormHelperText>
            </FormControl>

            {/* <FormControl fullWidth>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    component="label"
                    htmlFor="courseName"
                  >
                    Enter Course Name
                  </Typography>
                  <InputBase
                    id="courseName"
                    name="courseName"
                    size="small"
                    sx={{ mt: 1 }}
                    fullWidth
                    color="secondary"
                    disabled={loading}
                    value={formik.values.courseName}
                    onChange={formik.handleChange}
                    error={formik.touched.courseName && Boolean(formik.errors.courseName)}
                    helperText={formik.touched.courseName && formik.errors.courseName}
                  />
                </FormControl> */}

            <FormControl fullWidth>
              <Typography
                variant="body1"
                color="text.secondary"
                component="label"
                htmlFor="description"
              >
                Enter Description
              </Typography>
              <InputBase
                multiline
                id="description"
                name="description"
                size="small"
                rows={4}
                sx={{ mt: 1 }}
                fullWidth
                color="secondary"
                disabled={loading}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
              />
              <FormHelperText sx={{ color: "#dd0000" }}>
                {formik.touched.description && formik.errors.description}
              </FormHelperText>
            </FormControl>

            <Box sx={{ display: "flex", gap: 1.5 }}>
              <FormControl fullWidth>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="label"
                  htmlFor="startDate"
                >
                  Start Date
                </Typography>
                <InputBase
                  type="date"
                  id="startDate"
                  name="startDate"
                  size="small"
                  sx={{ mt: 0.5 }}
                  fullWidth
                  color="secondary"
                  disabled={loading}
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.startDate && Boolean(formik.errors.startDate)
                  }
                />
                <FormHelperText sx={{ color: "#dd0000" }}>
                  {formik.touched.startDate && formik.errors.startDate}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="label"
                  htmlFor="endDate"
                >
                  End Date
                </Typography>
                <InputBase
                  type="date"
                  id="endDate"
                  name="endDate"
                  size="small"
                  sx={{ mt: 0.5 }}
                  fullWidth
                  color="secondary"
                  disabled={loading}
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.endDate && Boolean(formik.errors.endDate)
                  }
                />
                <FormHelperText sx={{ color: "#dd0000" }}>
                  {formik.touched.endDate && formik.errors.endDate}
                </FormHelperText>
              </FormControl>
            </Box>

            <FormControl fullWidth>
              <Typography
                variant="body1"
                color="text.secondary"
                component="label"
                htmlFor="purchaseAvailability"
              >
                Price in Rupees(₹)
              </Typography>
              <InputBase
                id="price"
                name="price"
                size="small"
                sx={{ mt: 1 }}
                fullWidth
                color="secondary"
                disabled={loading}
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
              />
              <FormHelperText sx={{ color: "#dd0000" }}>
                {formik.touched.price && formik.errors.price}
              </FormHelperText>
            </FormControl>
            <Box
              sx={{
                mb: 0,
                mt: 3,
                gap: 1.5,
                display: "flex",
              }}
            >
              <Button
                onClick={handleClose}
                type="button"
                variant="outlined"
                fullWidth
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                endIcon={loading ? <CircularProgress size={14} /> : undefined}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddInternship;
