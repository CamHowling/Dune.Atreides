import React  from 'react';

import { majorHeading, mainBackground } from "@/settings/colours";
import { Box, Typography } from "@mui/material";

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
    return (
        <Box sx={{...boxStyle}}>
            <Typography variant='h3' sx={{...textStyle}}>{title}</Typography>    
        </Box>
    )
}
