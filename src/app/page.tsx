import React  from 'react';

// import styles from "./page.module.css";
import { Box } from "@mui/material";
import {mainBackground} from "./../settings/colours";
import {PageTitle} from "./../components/pageTitle";
import { Footer } from '@/components/footer';
import { GameMenuButton } from '@/components/gameMenuButton';

//move to style file
const bodyStyle = {
  display: 'flex',
  backgroundColor: mainBackground,
  flexDirection: 'column',
  justifyContent:'center',
  alignItems: 'center',
  minHeight: '80vh',
}

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <PageTitle title="Treachery Tracker for Dune"></PageTitle>
      <Box sx={{...bodyStyle}}>
        <GameMenuButton text="New Game"></GameMenuButton>
        <GameMenuButton text="About"></GameMenuButton>
        <GameMenuButton text="Disclaimer"></GameMenuButton>
      </Box>
      <Footer></Footer>
    </Box>
  );
}
