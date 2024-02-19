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
    onClick?: () => void,
}

export function GameMenuButton({text, onClick}: buttonProps) {
    const handleClick = () => {
        if (onClick != undefined) {
            onClick();
        }
    }

    return (
        <Button variant="contained" size="large" sx={{...buttonStyle}} onClick={() => handleClick()}>{text}</Button>
    );
}
