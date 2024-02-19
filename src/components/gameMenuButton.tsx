import { footerTransitionMiddle, mainBackground, minorHeading } from '@/settings/colours';
import { Button } from '@mui/material';
import React  from 'react';

const buttonStyle = {
    backgroundColor: minorHeading,
    color: mainBackground,
    '&:hover': {
        backgroundColor: footerTransitionMiddle,
    },
    minWidth: '50vh',
    minHeight: '6vh',
    fontSize: '24px',
    margin: 2,
}

type buttonProps = {
    text: string,
}

export function GameMenuButton({text}: buttonProps) {
    return (
        <Button variant="contained" size="large" sx={{...buttonStyle}}>{text}</Button>
    )
}
