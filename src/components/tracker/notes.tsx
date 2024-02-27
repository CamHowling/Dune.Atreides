import { footerTransitionMiddle, minorHeading } from "@/settings/colours";
import { Box, TextField } from "@mui/material";
import * as React from "react";

interface NotesProps {
    note: string;
    onUpdateNote: (note: string) => void;
}

const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    minHeight: '80vh',
}

const textFieldStyle = {
    width: '60vw', 
    height: '60vh',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: minorHeading,
          borderWidth: 6,
          borderRadius: 3,
        },
        '&:hover fieldset': {
          borderColor: footerTransitionMiddle,
        },
        '&.Mui-focused fieldset': {
          borderColor: minorHeading,
          borderWidth: 6,
          borderRadius: 3,
        },

    },
}


export function Notes ({note, onUpdateNote} : NotesProps) {
    return (
        <Box sx={{...bodyStyle}}>
            <TextField 
            sx={{ ...textFieldStyle }} 
            inputProps={{style: { fontSize: 24 }}}
            multiline
            rows={18}
            value={note} 
            onChange={
                (event: React.ChangeEvent<HTMLInputElement>) => {
                    onUpdateNote(event.target.value);
                  }} />
        </Box>
    )
}