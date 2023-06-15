/* eslint-disable no-nested-ternary */
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { SiMicrosoftexcel } from 'react-icons/si';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { read, utils, writeFile } from 'xlsx';

function GenerateSpreadsheet({ loading, users }) {
  const [sheetData, setSheetData] = useState([]);

  useEffect(() => {
    const bakedUsers = users && users.length > 0
      ? users.map((user, index) => ({
        SI_No: index + 1,
        Name: user?.name,
        Email: user?.email,
        Phone: user?.phone && user.phone?.number ? user.phone.number : '',
        Location: user?.location,
        Education: user?.degree,
        Course:
              user?.coursesRegistered && user.coursesRegistered.length > 0
                ? user.coursesRegistered
                  .map((course) => (course?.course && course.course?.name ? course.course.name : ''))
                  .join(', ')
                : '',
        Batch:
              user?.coursesRegistered && user.coursesRegistered.length > 0
                ? user.coursesRegistered
                  .map((course) => (course?.batch && course.batch?.name ? course.batch.name : ''))
                  .join(', ')
                : '',
      }))
      : [];
    setSheetData(bakedUsers);
  }, [users]);

  const exportFile = useCallback(() => {
    /* generate worksheet from state */
    const ws = utils.json_to_sheet(sheetData);
    /* create workbook and append worksheet */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Users');
    /* export to XLSX */
    writeFile(wb, 'SiteXpert Users.xlsx');
  }, [sheetData]);

  console.log(users, sheetData);
  return (
    <Tooltip title={users ? 'Download as spreadsheet' : 'Error loading data'}>
      <IconButton
        sx={{ color: '#5DDC21', width: 40, height: 40 }}
        disabled={loading}
        size="small"
        onClick={exportFile}
      >
        {loading ? (
          <CircularProgress color="secondary" size={20} />
        ) : !users ? (
          <ErrorOutlineIcon sx={{ color: 'secondary.main', fontSize: 22 }} />
        ) : (
          <SiMicrosoftexcel />
        )}
      </IconButton>
    </Tooltip>
  );
}

export default GenerateSpreadsheet;
