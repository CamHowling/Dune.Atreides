import { mainBackground, minorHeading } from '@/settings/colours';
import { Dialog, DialogTitle, Typography } from '@mui/material';
import * as React from 'react';

const dialogStyle = {
  display: 'flex',
  '& .MuiPaper-root': {
    background: minorHeading
  },
  flexDirection: 'column',
  justifyContent:'center',
  alignItems: 'center',
  minHeight: '80vh',
}

const typographyStyle = {
  color: mainBackground,
  pr: 3,
  pl: 3,
  pb: 3,
}

type DialogProps = {
  open: boolean;
  onClose: () => void;
}

export function AboutDialog({open, onClose}: DialogProps) {
  return (
    <Dialog onClose={onClose} open={open} sx={{...dialogStyle}} fullWidth maxWidth="lg">
      <DialogTitle sx={{color: mainBackground}}>About</DialogTitle>
        <Typography sx={{...typographyStyle}}>
          To use the application click new game. 
          <br /><br />
          From the set up screen, select your factions up to a maximum of 6, and the expansion treachery cards you are playing with in your game. 
          <br />
          Click start to start the game.
          <br /><br />
          In the game you can navigate between the Deck, Player, and Discard screens to track which treachery cards are where - assigning them to specific players, discarding them, or returning them to the deck if you&apos;ve made a mistake.
          <br /><br />
          You can keep notes in the notes screen.You can exit, or start a new game at any time using the Options menu. 
          <br /><br />
          Please note that this web application does not currently support saving, so avoid refreshing or closing your screen.
        </Typography>
    </Dialog>
    );
}