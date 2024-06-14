"use client";

import { FileUploadOutlined } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, TextField, IconButton, DialogActions, Button, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import { GameMenuButton } from "../gameMenuButton";
import { footerTransitionMiddle, mainBackground, majorHeading, minorHeading } from "@/settings/colours";

const buttonStyle = {
  color: mainBackground,
  backgroundColor: minorHeading,
  '&:hover': {
      backgroundColor: footerTransitionMiddle,
  },
  minHeight: '4vh',
  fontSize: '14px',
  margin: 2,
}

const titleStyle = {
  fontSize: '18px',
  color: majorHeading,
}
const dialogTitleStyle = {
  justifyContent: 'center', 
  display: 'flex'
}

type LoadGameProps = {
  RouterFunction: () => void,
}

export function LoadGameButton({RouterFunction}: LoadGameProps)
{
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File>();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpload = (event: any) => {
      setSelectedFile(event.currentTarget.files[0]);
    };

    const handleSubmit = async () => {
        if (!selectedFile) return;
    
        const reader = new FileReader();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reader.onload = async (e: any) => {
          const jsonString = e.target.result;
          const data = JSON.parse(jsonString);
          
          Object.keys(data).forEach((key) => {
            if (typeof data[key] === 'object' && data[key]!== null) {
                localStorage.setItem(key, JSON.stringify(data[key]));
              } else {
                localStorage.setItem(key, String(data[key]));
              }
          });

          handleClose();
          // router.reload();
          RouterFunction();
        };

        reader.readAsText(selectedFile);
      };

      const width = 20;
      const medium = useMediaQuery('(max-width:1200px)');
      const smallest = useMediaQuery('(max-width:700px)');
      const scale = smallest ? 2 : medium ? 1.5 : 1; 
      const minWidth = width ? width : (scale*25)+'vw';

      const dialogBoxStyle = {
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            minWidth: minWidth,  
            backgroundColor: mainBackground,
          },
        },
      }

    return (
        <>
            <GameMenuButton text="Load Game" onClick={() => {
                handleClickOpen();
            }}></GameMenuButton>
            <Dialog sx={{...dialogBoxStyle}} open={open} onClose={handleClose}>
                <DialogTitle sx={{...dialogTitleStyle}}>
                  <Typography sx={{...titleStyle}}>
                  Upload JSON File
                  </Typography>
                </DialogTitle>
                <DialogContent >
                  <TextField
                  sx={{width: '100%'}}
                  variant="standard"          
                  type="text"
                  value={selectedFile?.name ?? ''}
                  InputProps={{
                      endAdornment: (
                      <IconButton component="label">
                          <FileUploadOutlined/>
                          <input
                          style={{display:"none"}}
                          type="file"
                          hidden
                          onChange={handleUpload}
                          />
                      </IconButton>
                      ),
                  }}
                  />
                </DialogContent>
                <DialogActions sx ={{ justifyContent: 'center' }}>
                    <Button  sx={{...buttonStyle}} onClick={handleSubmit}>Submit</Button>
                    <Button  sx={{...buttonStyle}} onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
