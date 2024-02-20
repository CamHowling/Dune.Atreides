"use client";

import React, { useState }  from 'react';

import { Box } from "@mui/material";
import {mainBackground} from "../settings/colours";
import {PageTitle} from "../components/pageTitle";
import { Footer } from '@/components/footer';
import { GameMenuButton } from '@/components/gameMenuButton';
import { DisclaimerDialog } from '@/components/mainMenu/disclaimerDialog';
import { AboutDialog } from '@/components/mainMenu/aboutDialog';
import { useRouter } from 'next/navigation'

//move to style file
const bodyStyle = {
  display: 'flex',
  backgroundColor: mainBackground,
  flexDirection: 'column',
  justifyContent:'center',
  alignItems: 'center',
  minHeight: '80vh',
}

export default function app() {
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState<boolean>(false);

  const router = useRouter();

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <PageTitle title="Treachery Tracker for Dune"></PageTitle>
      <Box sx={{...bodyStyle}}>
        <GameMenuButton text="New Game" onClick={() => router.push('/setup')}></GameMenuButton>
        <GameMenuButton text="About" onClick={() => setAboutOpen(!aboutOpen)}></GameMenuButton>
        <GameMenuButton text="Disclaimer" onClick={() => setDisclaimerOpen(!disclaimerOpen)}></GameMenuButton>
      </Box>
      <AboutDialog onClose={() => setAboutOpen(!aboutOpen)} open={aboutOpen}></AboutDialog>
      <DisclaimerDialog onClose={() => setDisclaimerOpen(!disclaimerOpen)} open={disclaimerOpen}></DisclaimerDialog>
      <Footer></Footer>
    </Box>
  );
}
