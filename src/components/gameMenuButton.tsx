import { footerTransitionMiddle, mainBackground, minorHeading } from '@/settings/colours';
import { Button } from '@mui/material';
import React  from 'react';

const buttonStyle = {
    backgroundColor: minorHeading,
    color: mainBackground,
    '&:hover': {
        backgroundColor: footerTransitionMiddle,
    },
    minHeight: '6vh',
    fontSize: '24px',
    margin: 2,
}

type buttonProps = {
    text: string,
    onClick?: () => void,
    width?: string,
}

export function GameMenuButton({text, onClick, width}: buttonProps) {
    const handleClick = () => {
        if (onClick != undefined) {
            onClick();
        }
    }
    const minWidth = width ? width : '50vh';
    return (
        <Button variant="contained" size="large" sx={{...buttonStyle, minWidth: minWidth}} onClick={() => handleClick()}>{text}</Button>
    );
}
