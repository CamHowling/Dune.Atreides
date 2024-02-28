import { footerTransitionMiddle, mainBackground, minorHeading } from '@/settings/colours';
import { Dialog, DialogTitle, Link, Typography } from '@mui/material';
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

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

export function AboutDialog({open, onClose}: DialogProps) {
  return (
    <Dialog onClose={onClose} open={open} sx={{...dialogStyle}} fullWidth maxWidth="lg">
      <DialogTitle variant='h4' sx={{color: mainBackground}}>About</DialogTitle>
        <Typography variant='h6' sx={{...typographyStyle, pb: 0}}>
        How to Play
        </Typography>
        <Typography sx={{...typographyStyle}}>
          Click new game to open the game set up page. 
          <br />
          From the set up screen, select your factions and the expansion treachery cards you are playing with in your game. 
          <br />
          Click start to start the game.
          <br />
          <br />
          There are 5 screens in the tracker; Options, Deck, Player, Discard, and Notes.
          <br />
          The Options screen allows you to return to the main menu or start a new game.
          <br />
          The Deck screen shows all cards in the game, the player who has or discarded each card, and if a card has been discarded.
          <br />
          The player and discard screens only show cards which are either in a players hand, or have discarded respectively.
          <br />
          The notes screen allows you to keep notes.
        </Typography>
        <Typography variant='h6' sx={{...typographyStyle, pb: 0}}>
          Bugs
        </Typography>
        <Typography sx={{...typographyStyle}}>
          As this is a hobby project, you may encounter a bug - some of which I may not be able to fix quickly. You should be able to resolve most bugs by refreshing the screen.
          If you encounter any serious bugs, you can report them on the projects GitHub page&nbsp;
          <Link href="https://github.com/CamHowling/DuneAtreides/issues" color={footerTransitionMiddle}>here</Link>.
        </Typography>
    </Dialog>
    );
}