import SEO from "@components/common/SEO";
import { Box, Button, Paper, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import textLogo from "@assets/text_logo.svg";
import LoginForm from "@components/admin-login/LoginForm";

export default function AdminLogin() {
  return (
    <>
      <SEO />
      <main>
        <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
          <Box sx={{ flex: "0 0 50%", bgcolor: "primary.main" }} />
          <Box
            sx={{
              flex: "0 0 50%",
              p: 10,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                boxShadow: "0px 3.04038px 27.3634px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box
                sx={{
                  width: "min(35vw,440px)",
                  height: "min(15vw,180px)",
                  position: "relative",
                }}
              >
                <Image
                  src={textLogo}
                  alt="logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>

              <LoginForm />
            </Box>
          </Box>
        </Box>
      </main>
    </>
  );
}
