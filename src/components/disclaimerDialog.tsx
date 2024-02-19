import { mainBackground, minorHeading } from '@/settings/colours';
import { Box, Dialog, DialogTitle, Typography } from '@mui/material';
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

export function DisclaimerDialog({open, onClose}: DialogProps) {
  return (
    <Dialog onClose={onClose} open={open} sx={{...dialogStyle}} fullWidth maxWidth="lg">
      <DialogTitle sx={{color: mainBackground}}>Dislcaimer</DialogTitle>
      <Box>
        <Typography sx={{...typographyStyle}}>
          Please note that this is a 3rd party web application intended to help players play Dune 2019 by Galeforce Nine.
          <br /><br />
          Galeforce Nine is not associated with the production of this web application, and retain their rights to their respective intellectual property.
          <br /><br />
          This application is strictly non-profit, and I do not accept donations for it. 
          <br /><br />
          If you would like to support this project, please use your money to buy more Dune expansions or food and drinks for your next session.
        </Typography>
      </Box>
    </Dialog>
    );
}