"use client";

import React, { useEffect, useState }  from 'react';

// import styles from "./page.module.css";
import { Box } from "@mui/material";
import {mainBackground} from "./../settings/colours";
import {PageTitle} from "./../components/pageTitle";
import { Footer } from '@/components/footer';
import { GameMenuButton } from '@/components/gameMenuButton';
import { DisclaimerDialog } from '@/components/disclaimerDialog';

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
  const [disclaimerOpen, setDisclaimerOpen] = useState<boolean>(false);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <PageTitle title="Treachery Tracker for Dune"></PageTitle>
      <Box sx={{...bodyStyle}}>
        <GameMenuButton text="New Game"></GameMenuButton>
        <GameMenuButton text="About"></GameMenuButton>
        <GameMenuButton text="Disclaimer" onClick={() => setDisclaimerOpen(!disclaimerOpen)}></GameMenuButton>
      </Box>
      <DisclaimerDialog onClose={() => setDisclaimerOpen(!disclaimerOpen)} open={disclaimerOpen}></DisclaimerDialog>
      <Footer></Footer>
    </Box>
  );
}
