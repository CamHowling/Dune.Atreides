import React  from 'react';

// import styles from "./page.module.css";
import { Box, Typography } from "@mui/material";
import {mainBackground, footerTransitionBottom} from "./../settings/colours";
import {PageTitle} from "./../components/pageTitle";
import { Footer } from '@/components/footer';

//move to style file
const bodyStyle = {
  display: 'flex',
  backgroundColor: mainBackground,
  flexDirection: 'column',
  justifyContent:' space-between',
  alignItems: 'center',
  minHeight: '80vh',
}

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <PageTitle title="Treachery Tracker for Dune"></PageTitle>
      <Box sx={{...bodyStyle}}>
        <Typography sx={{color:footerTransitionBottom}}>This is a simple demo text for MUI</Typography>
      </Box>
      <Footer></Footer>
    </Box>
  );
}
