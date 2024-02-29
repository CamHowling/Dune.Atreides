import { footerTransitionMiddle, minorHeading } from "@/settings/colours";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { Box, TextField } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";

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
    const { windowHeight } = useWindowDimensions();
    const relativeHeight = windowHeight/1080;
    const maxRows = 32;
    const [rows, setRows] = useState<number>(maxRows);

    useEffect(() => {
        //Note that the relativeHeight ratio is polynomial to create a parabolic shrinking for a smoother experience
        const dynamicRows = Math.floor(relativeHeight * relativeHeight * maxRows);
        const nextRows = dynamicRows >=1 ? dynamicRows : 1;
        setRows(nextRows);
    }, [windowHeight])   

    return (
        <Box sx={{...bodyStyle}}>
            <TextField 
            sx={{ 
                width: '90%',
                ...textFieldStyle,
            }} 
            inputProps={{
                sx: {
                    fontSize: 24
                  }
            }}
            multiline
            rows={rows}
            value={note} 
            onChange={
                (event: React.ChangeEvent<HTMLInputElement>) => {
                    onUpdateNote(event.target.value);
                  }} />
        </Box>
    )
}