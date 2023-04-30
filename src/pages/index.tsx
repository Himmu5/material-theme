import Head from "next/head";
import Image from "next/image";
import { Button, Typography } from "@mui/material";
import SEO from "@components/common/SEO";

export default function Home() {
  return (
    <>
      <SEO />
      <main>
        <div>
          <Button variant="contained" color="secondary">
            Hello
          </Button>
          <Typography variant="h1">h1. Heading</Typography>
          <Typography variant="h2">h2. Heading</Typography>
          <Typography variant="h3">h3. Heading</Typography>
          <Typography variant="h4">h4. Heading</Typography>
          <Typography variant="h5">h5. Heading</Typography>
          <Typography variant="h6">h6. Heading</Typography>
          <Typography variant="subtitle1">
            subtitle1. Lorem ipsum dolor sit amet
          </Typography>
          <Typography variant="subtitle2">
            subtitle2. Lorem ipsum dolor sit amet,
          </Typography>
          <Typography variant="body1">
            body1. Lorem ipsum dolor sit amet,
          </Typography>
          <Typography variant="body2">
            body2. Lorem ipsum dolor sit amet,
          </Typography>
          <Typography variant="caption" display="block">
            caption text
          </Typography>
          <Typography variant="overline" display="block">
            overline text
          </Typography>
        </div>
      </main>
    </>
  );
}
