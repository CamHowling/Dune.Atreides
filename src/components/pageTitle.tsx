import React  from 'react';

import { majorHeading, mainBackground } from "@/settings/colours";
import { Box, Typography, useMediaQuery } from "@mui/material";

const boxStyle = {
    display: 'flex',
    backgroundColor: majorHeading,
    width: '100%',
    minHeight: '10vh', 
    alignItems: 'center',
    justifyContent: 'center',
}

const textStyle = {
    color: mainBackground,
}

type pageTitleProps = {
    title: string,
}

export function PageTitle({title}: pageTitleProps) {
    const largest = useMediaQuery('(min-width:1200px)');
    const medium = useMediaQuery('(min-width:700px)');
    const fontSize = (largest ? 40 : medium ? 36 : 28) + 'px'; 

    return (
        <Box sx={{...boxStyle}}>
            <Typography variant='h3' sx={{...textStyle, fontSize: fontSize}}>{title}</Typography>    
        </Box>
    )
}
