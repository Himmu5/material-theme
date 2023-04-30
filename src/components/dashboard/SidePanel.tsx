import {
  Box,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Typography,
} from "@mui/material";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { GiOpenBook } from "react-icons/gi";
import { HiTicket } from "react-icons/hi";
import Image from "next/image";
import textLogo from "@assets/text_logo.svg";

const ListItem: React.FC<{ isActive?: boolean; children: any }> = ({
  isActive = false,
  children,
}) => {
  return (
    <ListItemButton
      sx={{
        py: isActive ? 1.5 : 1,
        my: 1,
        pl: 3,
        borderTopLeftRadius: 32,
        borderBottomLeftRadius: 32,
        bgcolor: isActive ? "#E8EDF4" : "transparent",
        color: isActive ? "primary.main" : "#ffffff",
        transition: "all 0.4s ease-in-out",
        "&:hover": {
          bgcolor: isActive ? "secondary.light" : "primary.light",
          color: isActive ? "primary.main" : "#ffffff",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
        component={Typography}
        variant="h6"
      >
        {children}
      </Box>
    </ListItemButton>
  );
};

// function BookIcon(props: any) {
//   return (
//     <svg {...props}>
//       <path
//         d="M7.5 14.4375C7.83594 14.4375 8.12891 14.4653 8.37891 14.521C8.62891 14.5767 8.86328 14.6571 9.08203 14.7622C9.30078 14.8674 9.50781 14.9941 9.70312 15.1426C9.90817 15.2984 9.79775 15.625 9.54021 15.625H2.61341C1.17007 15.625 0 14.4549 0 13.0116V2.125C0 1.71079 0.335786 1.375 0.75 1.375C1.16421 1.375 1.5 1.71079 1.5 2.125V10.4375C1.5 12.6466 3.29086 14.4375 5.5 14.4375H7.5ZM7.5 0.1875C8.02344 0.1875 8.53906 0.236979 9.04688 0.335938C9.96101 0.514078 10.5 1.39738 10.5 2.32872V12.5617C10.5 13.2268 9.73282 13.6566 9.09375 13.4727C8.57812 13.3242 8.04688 13.25 7.5 13.25H7C4.79086 13.25 3 11.4591 3 9.25V4.1875C3 1.97836 4.79086 0.1875 7 0.1875H7.5ZM21.75 1.375C22.1642 1.375 22.5 1.71079 22.5 2.125V12.9571C22.5 14.4306 21.3056 15.625 19.8321 15.625H12.9505C12.6912 15.625 12.5787 15.2995 12.7852 15.1426C12.9805 14.9941 13.1875 14.8704 13.4062 14.7715C13.625 14.6725 13.8594 14.5921 14.1094 14.5303C14.3594 14.4684 14.6562 14.4375 15 14.4375H17C19.2091 14.4375 21 12.6466 21 10.4375V2.125C21 1.71079 21.3358 1.375 21.75 1.375ZM15 13.25C14.4531 13.25 13.9219 13.3242 13.4062 13.4727C12.7672 13.6566 12 13.2268 12 12.5617V2.32559C12 1.39798 12.5426 0.522641 13.4531 0.345215C13.9609 0.246257 14.4766 0.193685 15 0.1875H15.5C17.7091 0.1875 19.5 1.97836 19.5 4.1875V9.25C19.5 11.4591 17.7091 13.25 15.5 13.25H15Z"
//         fill="#E8EDF4"
//       />
//     </svg>
//   );
// }

const SidePanel = () => {
  return (
    <Box
      sx={{
        width: "min(280px,20vw)",
        borderTopRightRadius: 32,
        bgcolor: "primary.main",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "135px",
          py: 3,
          position: "relative",
          bgcolor: "primary.dark",
        }}
      >
        <Image
          src={textLogo}
          alt="logo"
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>

      <Box sx={{ pl: "min(24px,5vw)", py: 3 }}>
        <List>
          <ListItem isActive>
            <FaUser />
            Users
          </ListItem>
          <ListItem>
            <GiOpenBook />
            Courses
          </ListItem>

          <ListItem>
            <IoCalendarNumberSharp />
            Scheduled Slots
          </ListItem>

          <ListItem>
            <HiTicket />
            Vouchers
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default SidePanel;
