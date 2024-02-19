import { Dialog, DialogTitle, Typography } from '@mui/material';
import * as React from 'react';

type DialogProps = {
  open: boolean;
  onClose: () => void;
}

export function DisclaimerDialog({open, onClose}: DialogProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Dislcaimer</DialogTitle>
      <Typography>Please note that this is a 3rd party web application intended to help players play Dune 2019 by Galeforce Nine.</Typography>
      <Typography>Galeforce Nine is not associated with the production of this web application, and retain their rights to their respective intellectual property.</Typography>
      <Typography>This application is strictly non-profit, and I do not accept donations for it. If you would like to support this project, please spend the money to buy additional Dune expansions, or food and drinks for your future sessions</Typography>
    </Dialog>
    );
}