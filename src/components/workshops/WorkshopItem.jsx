import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { SiMicrosoftexcel } from "react-icons/si";
import { FiMoreVertical } from "react-icons/fi";
import { useState } from "react";
import { exportEvent } from '../../utils/api'

function WorkshopItem({ row , handleOptionsClick ,setDeleteId }) {
  const [showDetails, setShowDetails] = useState(false);

  function exportFile(){
    exportEvent("workshop" , row._id)
  }
  
  return (
    <>
        <TableRow
          component={motion.tr}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ type: "tween" }}
          viewport={{ once: true }}
        >
          <TableCell>
            <Box
              sx={{
                display: "flex",
                minHeight: 75,
                maxWidth: "20vw",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2">{row.title}</Typography>
              <Typography variant="body2" fontWeight={600}>
                ₹{row.price}
              </Typography>
            </Box>
          </TableCell>
          <TableCell sx={{ color: "inherit", maxWidth: "20vw" }}>
            {row.description.length > 150 ? (
              <div style={{ display: "flex", gap: 2 }}>
                <p>
                  {showDetails === true
                    ? row.description
                    : row.description.slice(0, 149)}
                  {showDetails === false && (
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => setShowDetails(!showDetails)}
                    >
                      {" "}
                      see more
                    </span>
                  )}
                </p>
              </div>
            ) : (
              row.description
            )}
          </TableCell>
          <TableCell>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                From
              </Typography>
              <Typography variant="body2">
                {row.startDate.slice(0, 10)}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                To
              </Typography>
              <Typography variant="body2">
                {row.endDate.slice(0, 10)}
              </Typography>
            </Box>
          </TableCell>
          <TableCell sx={{ color: "inherit" }}>
            <Button
              size="small"
              endIcon={<SiMicrosoftexcel color="#0e733a" />}
              variant="outlined"
              onClick={exportFile}
            >
              Export
            </Button>
          </TableCell>
          <TableCell
            sx={{ color: "inherit" }}
            onClick={() => setDeleteId(row._id)}
          >
            <IconButton size="small" onClick={handleOptionsClick}>
              <FiMoreVertical />
            </IconButton>
          </TableCell>
        </TableRow>
    </>
  );
}

export default WorkshopItem;
