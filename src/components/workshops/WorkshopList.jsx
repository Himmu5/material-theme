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
import React, { useState } from "react";
import "./table.css";
import Options from "./Options";
import WorkshopItem from "./WorkshopItem";

function WorkshopList({ Workshop, setMode, setOpen, setDeleteId }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <TableContainer
        sx={{
          width: "100%",
          pr: 2,
          maxHeight: "90vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Table
          style={{ width: "100%", borderSpacing: "0 12px" }}
          className="worshop-table"
        >
          <TableHead className="worshop-th">
            <TableRow sx={{ color: "#5c5c5c" }}>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody className="worshop-tbody">
            <AnimatePresence>
              {Workshop.map((row, index) => (
                <WorkshopItem
                  row={row}
                  setDeleteId={setDeleteId}
                  handleOptionsClick={handleOptionsClick}
                />
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>

      <Options
        anchorEl={anchorEl}
        close={() => setAnchorEl(null)}
        setMode={setMode}
        setOpen={setOpen}
      />
    </>
  );
}

export default WorkshopList;
