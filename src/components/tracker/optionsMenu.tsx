import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import router from "next/router";
import * as React from "react";
import { GameMenuButton } from "../gameMenuButton";
import { useState } from "react";
import { FileUploadOutlined } from "@mui/icons-material";

const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    minHeight: '80vh',
  }

const ClearData = () => {
    localStorage.removeItem('players');
    localStorage.removeItem('cards');
    localStorage.removeItem('unknownCards');
    localStorage.removeItem('note');
}

const SaveData = () => {
    const players = localStorage.getItem('players');
    const cards = localStorage.getItem('cards');
    const unknownCards = localStorage.getItem('unknownCards');
    const note = localStorage.getItem('note');

    const items = {
        players,
        cards,
        unknownCards,
        note
    }

    const fileName = `Atreides ${new Date().toLocaleString()}.json`;
    const data = JSON.stringify(items);
    const blob = new Blob([data], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const MainMenu = () => {
    ClearData();
    router.push('/');
};

const NewGame = () => {
    ClearData();
    router.push('/setup');
};

export function OptionsMenu () {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
  
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
          router.reload();
        };

        reader.readAsText(selectedFile);
      };
  

    return (
        <>
            <Box sx={{...bodyStyle}}>
                <GameMenuButton text="Main Menu" onClick={() => MainMenu()}></GameMenuButton>
                <GameMenuButton text="New Game" onClick={() => NewGame()}></GameMenuButton>
                <GameMenuButton text="Save Game" onClick={() => SaveData()}></GameMenuButton>
                <GameMenuButton text="Load Game" onClick={() => {
                    handleClickOpen();
                }}></GameMenuButton>
            </Box>
            <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload JSON File</DialogTitle>
                    <DialogContent>
                    <TextField
                    variant="standard"          
                    type="text"
                    InputProps={{
                        endAdornment: (
                        <IconButton component="label">
                            <FileUploadOutlined />
                            <input
                            style={{display:"none"}}
                            type="file"
                            hidden
                            onChange={handleUpload}
                            name="[licenseFile]"
                            />
                        </IconButton>
                        ),
                    }}
                    />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            </>
        </>
    )
}