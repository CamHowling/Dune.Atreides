import { mainBackground, minorHeading } from '@/settings/colours';
import { Box, Dialog, DialogTitle, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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

const titleStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: mainBackground,
}


interface DialogProps {
  open: boolean;
  onClose: () => void;
}

export function FaqDialog({open, onClose}: DialogProps) {
  return (
    <Dialog onClose={onClose} open={open} sx={{...dialogStyle}} fullWidth maxWidth="lg">
      <DialogTitle variant='h4' sx={{ ...titleStyle }}>Frequently asked questions
        <IconButton onClick={onClose} sx={{ color: mainBackground }} >
          <FontAwesomeIcon icon={faXmark} />
        </IconButton>
      </DialogTitle>
      <Box>
        <Typography sx={{...typographyStyle}}>
          <b>Why should I use this app?</b>
          <br />
          My friend takes long turns. This app was made to make their turns faster so we could finish more games of dune. 
          <br />
          Hopefully it&apos;ll help you finish more games too.
        </Typography>
        <Typography sx={{...typographyStyle}}>
          <b>Is this cheating?</b>
          <br />
          No. This app has been built carefully to make sure it doesn&apos;t give any advantages over writing your notes on paper. 
        </Typography>
        <Typography sx={{...typographyStyle}}>
          <b>Will you add [INSERT REQUESTED FEATURE HERE] to this webapp?</b>
          <br />
          Maybe, but probably not. I&apos;m happy to improve the app or fix bugs, but any additions must not make the app better than paper.
        </Typography>
      </Box>
    </Dialog>
    );
}