import React  from 'react';

import { footerTransitionBottom, footerTransitionMiddle, footerTransitionTop } from "@/settings/colours";
import { Box } from "@mui/material";

const top = {
    backgroundColor: footerTransitionTop,
    width: '100%',
    minHeight: '2vh', 
}

const middle = {
    backgroundColor: footerTransitionMiddle,
    width: '100%',
    minHeight: '3vh', 
}

const bottom = {
    backgroundColor: footerTransitionBottom,
    width: '100%',
    minHeight: '5vh', 
}

export function Footer() {
    return (
        <>
            <Box sx={{...top}}></Box>
            <Box sx={{...middle}}></Box>
            <Box sx={{...bottom}}></Box>
        </>
    )
}
